import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";

export async function PATCH(request, context) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const supabase = getSupabaseServiceRoleClient();

  try {
    const { error } = await supabase
      .from("admin_profiles")
      .update(body)
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const supabase = getSupabaseServiceRoleClient();

  try {
    // 1. Get profile to find user_id
    const { data: profile, error: getError } = await supabase
      .from("admin_profiles")
      .select("user_id")
      .eq("id", id)
      .single();

    if (getError) throw getError;

    // 2. Delete auth user (cascades to profile)
    const { error: deleteError } = await supabase.auth.admin.deleteUser(profile.user_id);
    if (deleteError) throw deleteError;

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}
