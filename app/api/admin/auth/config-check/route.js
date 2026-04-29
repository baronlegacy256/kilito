import { NextResponse } from "next/server";
import { hasAdminCredentialsConfigured } from "@/lib/admin/password";

export async function GET() {
  const configured = hasAdminCredentialsConfigured();
  const pw = process.env.ADMIN_PASSWORD || "";
  const pwHasHashChar = pw.includes("#");
  const pwLength = pw.length;
  
  const { getSupabaseServerClient } = await import("@/lib/supabase/server");
  const supabase = getSupabaseServerClient();
  let packages = [];
  let supabaseError = null;

  if (supabase) {
    const { data, error } = await supabase.from("packages").select("id, slug, title, is_active");
    packages = data || [];
    supabaseError = error;
  }
  
  return NextResponse.json({ 
    configured,
    pwHasHashChar,
    pwLength,
    packages,
    supabaseError
  });
}
