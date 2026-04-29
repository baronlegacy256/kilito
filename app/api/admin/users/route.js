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
    // Fetch profiles
    const { data: profiles, error: profileError } = await supabase
      .from("admin_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (profileError) throw profileError;

    // Fetch auth users to get emails (requires service role)
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) throw authError;

    const users = profiles.map(p => {
      const authUser = authData.users.find(u => u.id === p.user_id);
      return {
        ...p,
        email: authUser?.email || "Unknown",
        last_sign_in: authUser?.last_sign_in_at
      };
    });

    return NextResponse.json({ users });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to fetch users" },
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
  const body = await request.json();
  const { email, password, full_name } = body;

  try {
    // 1. Create auth user
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name }
    });

    if (userError) throw userError;

    // 2. Create admin profile
    const { error: profileError } = await supabase
      .from("admin_profiles")
      .insert([{
        user_id: userData.user.id,
        full_name,
        is_active: true
      }]);

    if (profileError) {
      // Cleanup auth user if profile creation fails?
      await supabase.auth.admin.deleteUser(userData.user.id);
      throw profileError;
    }

    return NextResponse.json({ success: true, user: userData.user });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to create user" },
      { status: 500 }
    );
  }
}
