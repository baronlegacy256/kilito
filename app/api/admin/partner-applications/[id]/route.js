import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";

const ALLOWED_STATUSES = ["Pending", "Contacted", "Approved", "Rejected"];

export async function PATCH(request, { params }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const supabase = getSupabaseServiceRoleClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Service role not configured" },
      { status: 503 }
    );
  }

  const update = { updated_at: new Date().toISOString() };

  if (body.status !== undefined) {
    if (!ALLOWED_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    update.status = body.status;
  }

  if (body.admin_notes !== undefined) {
    update.admin_notes = body.admin_notes?.trim() || null;
  }

  const { data, error } = await supabase
    .from("partner_applications")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, application: data });
}
