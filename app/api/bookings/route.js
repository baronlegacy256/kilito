import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";
import { requireAdminSession } from "@/lib/admin/requireAdmin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      full_name, 
      email, 
      phone, 
      num_travelers, 
      start_date, 
      special_requests,
      package_id,
      type
    } = body;

    if (!full_name || !email) {
      return NextResponse.json({ error: "Name and Email are required" }, { status: 400 });
    }

    // For public bookings, we can use the standard server client or service role.
    // Standard server client works if RLS allows anon insert.
    const supabase = getSupabaseServerClient();
    if (!supabase) {
       return NextResponse.json({ error: "Supabase connection failed" }, { status: 500 });
    }

    const bookingData = {
      full_name,
      email,
      phone,
      num_travelers: parseInt(num_travelers) || 1,
      start_date: start_date || null,
      special_requests,
      package_id: package_id || null,
      type: type || 'Booking',
      status: 'Pending'
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('POST /api/bookings error:', err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await requireAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use service role for admin listing to ensure we see everything
    const supabase = getSupabaseServiceRoleClient();
    if (!supabase) {
      return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
    }

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        packages(title)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ bookings: data ?? [] });
  } catch (err) {
    console.error('GET /api/bookings error:', err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
