import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  if (!getSupabaseServiceRoleClient()) {
    return NextResponse.json(
      { ok: false, error: "Server is missing SUPABASE_SERVICE_ROLE_KEY." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, email: session.email });
}
