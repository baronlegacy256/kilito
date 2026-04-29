import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";

export async function POST(request, { params }) {
  const { id: group_id } = params;
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { 
      user_id, 
      full_name, 
      email, 
      phone, 
      num_travelers, 
      special_requests 
    } = body;

    // Fetch the group to get the package_id
    const { data: group, error: groupError } = await supabase
      .from("groups")
      .select("package_id, start_date")
      .eq("id", group_id)
      .single();

    if (groupError) throw groupError;

    // Create a booking tied to this group
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert([{
        user_id: user_id || null,
        package_id: group.package_id,
        group_id: group_id,
        full_name: full_name,
        email: email,
        phone: phone,
        num_travelers: num_travelers || 1,
        start_date: group.start_date,
        special_requests: special_requests || "Added manually by admin",
        status: "Confirmed",
        type: "Booking"
      }])
      .select()
      .single();

    if (bookingError) throw bookingError;

    // Update current_participants count in the group
    // In a real app, this should be a trigger, but I'll do it manually here for simplicity if triggers aren't set up
    const { data: allBookings, error: countError } = await supabase
      .from("bookings")
      .select("num_travelers")
      .eq("group_id", group_id);
    
    if (!countError) {
      const totalParticipants = allBookings.reduce((sum, b) => sum + (b.num_travelers || 0), 0);
      await supabase
        .from("groups")
        .update({ current_participants: totalParticipants })
        .eq("id", group_id);
    }

    return NextResponse.json({ booking });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to add member to group" },
      { status: 500 }
    );
  }
}
