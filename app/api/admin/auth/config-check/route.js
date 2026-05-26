import { NextResponse } from "next/server";
import { hasAdminCredentialsConfigured } from "@/lib/admin/password";

export async function GET() {
  const configured = hasAdminCredentialsConfigured();
  
  const { getSupabaseServerClient } = await import("@/lib/supabase/server");
  const supabase = getSupabaseServerClient();
  let packages = [];
  let supabaseError = null;

  if (supabase) {
    try {
      const { data, error } = await supabase.from("packages").select("id, slug, title, is_active").limit(5);
      packages = data || [];
      supabaseError = error ? error.message : null;
    } catch (e) {
      supabaseError = e.message;
    }
  }
  
  return NextResponse.json({ 
    configured,
    packages,
    supabaseError
  });
}

