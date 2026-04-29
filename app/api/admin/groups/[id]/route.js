import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";

export async function GET(request, { params }) {
  const { id } = params;
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
  }

  try {
    const { data: group, error } = await supabase
      .from("groups")
      .select(`
        *,
        package:packages (id, title, slug),
        bookings:bookings (*)
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    return NextResponse.json({ group });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to fetch group" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  const { id } = params;
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
    const { updated_at, created_at, id: _dropId, package: _dropPkg, bookings: _dropBk, ...updateData } = body;

    const { data, error } = await supabase
      .from("groups")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ group: data });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to update group" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
  }

  try {
    const { error } = await supabase
      .from("groups")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to delete group" },
      { status: 500 }
    );
  }
}
