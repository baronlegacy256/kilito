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
    const { data: stays, error } = await supabase
      .from("package_stays")
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

    return NextResponse.json({ stays: stays ?? [] });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to fetch stays" },
      { status: 500 }
    );
  }
}
