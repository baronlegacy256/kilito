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
    const [packagesRes, staysRes, usersRes, recentPackagesRes, groupsRes] = await Promise.all([
      supabase.from("packages").select("id", { count: "exact", head: true }),
      supabase.from("package_stays").select("id", { count: "exact", head: true }).eq("status", "Open"),
      supabase.from("admin_profiles").select("id", { count: "exact", head: true }),
      supabase.from("packages").select("id, title, updated_at").order("updated_at", { ascending: false }).limit(5),
      supabase.from("groups").select("id", { count: "exact", head: true })
    ]);

    return NextResponse.json({
      counts: {
        packages: packagesRes.count || 0,
        activeStays: staysRes.count || 0,
        users: usersRes.count || 0,
        groups: groupsRes.count || 0,
      },
      recentActivity: recentPackagesRes.data || []
    });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
