import { NextResponse } from "next/server";
import { signAdminSession, ADMIN_COOKIE_NAME } from "@/lib/admin/token";
import { verifyAdminCredentials, hasAdminCredentialsConfigured } from "@/lib/admin/password";

export async function POST(request) {
  try {
    if (!hasAdminCredentialsConfigured()) {
      return NextResponse.json(
        {
          error:
            "Admin login is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD_HASH (or ADMIN_PASSWORD for dev only), and ADMIN_SESSION_SECRET.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const email = (body?.email || "").trim();
    const password = body?.password || "";

    const expectedEmail = (process.env.ADMIN_EMAIL || "").trim();
    const hasPassword = !!process.env.ADMIN_PASSWORD;

    console.log('[DEBUG] Admin login attempt details:', { 
        emailReceived: email,
        emailExpected: expectedEmail,
        hasPasswordConfigured: hasPassword,
        passwordLengthReceived: password.length
    });

    if (!verifyAdminCredentials(email, password)) {
      console.log('[DEBUG] Admin credentials verification failed.');
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = signAdminSession(email.trim());
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
