import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";

export async function DELETE(request, context) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const supabase = getSupabaseServiceRoleClient();
  
  try {
    const { error } = await supabase
      .from("package_stays")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to delete stay" },
      { status: 500 }
    );
  }
}

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
      .from("package_stays")
      .update(body)
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to update stay" },
      { status: 500 }
    );
  }
}
