import { NextResponse } from "next/server";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";
import { requireAdminSession } from "@/lib/admin/requireAdmin";

export async function PATCH(request, { params }) {
  try {
    const session = await requireAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const supabase = getSupabaseServiceRoleClient();
    if (!supabase) {
      return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
    }
    
    // Filter out restricted fields if any
    const { updated_at, created_at, id: _dropId, ...updateData } = body;

    const { data, error } = await supabase
      .from('bookings')
      .update({ 
        ...updateData, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error('PATCH booking error:', err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
