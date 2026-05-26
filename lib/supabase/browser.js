"use client";

import { createClient } from "@supabase/supabase-js";

let supabaseClient = null;
let adminSupabaseClient = null;

export function hasSupabaseBrowserEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function getSupabaseBrowserClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  supabaseClient = createClient(url, anonKey);
  return supabaseClient;
}

export function getAdminSupabaseBrowserClient() {
  if (adminSupabaseClient) {
    return adminSupabaseClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  adminSupabaseClient = createClient(url, anonKey, {
    auth: {
      storageKey: "sb-admin-auth-token",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return adminSupabaseClient;
}

