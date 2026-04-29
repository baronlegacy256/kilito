import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
  }

  try {
    const { data: groups, error } = await supabase
      .from("groups")
      .select(`
        *,
        package:packages (
          id,
          title,
          slug
        )
      `)
      .order("start_date", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ groups: groups ?? [] });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to fetch groups" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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
      package_id, 
      name, 
      start_date, 
      end_date, 
      min_participants, 
      max_participants, 
      status,
      price_override,
      notes
    } = body;

    if (!package_id || !start_date) {
      return NextResponse.json({ error: "Package and start date are required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("groups")
      .insert([{
        package_id,
        name,
        start_date,
        end_date,
        min_participants: min_participants || 1,
        max_participants,
        status: status || 'Open',
        price_override,
        notes,
        current_participants: 0
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ group: data });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to create group" },
      { status: 500 }
    );
  }
}
