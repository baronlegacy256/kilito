import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";

export async function POST(request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || typeof file === "string" || !file.size) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const originalName = file.name || "upload";
  const fileExt = originalName.includes(".") ? originalName.split(".").pop() : "bin";
  const filePath = `admin/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const contentType = file.type || "application/octet-stream";

  const { error: uploadError } = await supabase.storage.from("package-media").upload(filePath, buffer, {
    cacheControl: "3600",
    upsert: false,
    contentType,
  });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data } = supabase.storage.from("package-media").getPublicUrl(filePath);
  return NextResponse.json({ url: data.publicUrl });
}
