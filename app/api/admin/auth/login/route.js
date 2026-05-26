import { NextResponse } from "next/server";
import { signAdminSession, ADMIN_COOKIE_NAME } from "@/lib/admin/token";
import { hasAdminCredentialsConfigured } from "@/lib/admin/password";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";

export async function POST(request) {
  try {
    if (!hasAdminCredentialsConfigured()) {
      return NextResponse.json(
        {
          error:
            "Admin login is not fully configured. Ensure NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, and ADMIN_SESSION_SECRET are set.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const email = (body?.email || "").trim().toLowerCase();
    const password = body?.password || "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    console.log('[DEBUG] Admin backend login attempt for:', email);

    // 1. Authenticate credentials via Supabase Auth
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(url, anonKey, {
      auth: { persistSession: false }
    });

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData?.user) {
      console.log('[DEBUG] Admin credentials verification failed via Supabase:', authError?.message);
      return NextResponse.json({ error: authError?.message || "Invalid email or password." }, { status: 401 });
    }

    // 2. Verify user has an active admin profile
    const serviceClient = getSupabaseServiceRoleClient();
    if (!serviceClient) {
      return NextResponse.json({ error: "Supabase service role client is not configured on server." }, { status: 503 });
    }

    const { data: profile, error: profileError } = await serviceClient
      .from("admin_profiles")
      .select("is_active")
      .eq("user_id", authData.user.id)
      .single();

    if (profileError || !profile?.is_active) {
      console.log('[DEBUG] Admin profile check failed or inactive for:', email, profileError);
      return NextResponse.json({ error: "Access denied. You do not have an active administrator profile." }, { status: 403 });
    }

    const token = signAdminSession(email);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e) {
    const message = e?.message?.includes("ADMIN_SESSION_SECRET")
      ? e.message
      : "Login failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

