import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";
import { replacePackageChildren } from "@/lib/admin/persistPackage";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("packages")
    .select("id,slug,title,is_active,category,updated_at")
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ packages: data ?? [] });
}

export async function POST(request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const pkg = body?.package ?? {};
  const carouselImages = body?.carouselImages ?? [];
  const pricingTiers = body?.pricingTiers ?? [];
  const itineraryDays = body?.itineraryDays ?? [];
  const practicalInformation = body?.practicalInformation ?? [];
  const stays = body?.stays ?? [];

  const { id: _dropId, ...restPkg } = pkg;
  const packagePayload = {
    ...restPkg,
    updated_at: new Date().toISOString(),
  };

  try {
    const { data: created, error: createError } = await supabase
      .from("packages")
      .insert([packagePayload])
      .select("id")
      .single();

    if (createError) throw createError;
    const packageId = created.id;

    await replacePackageChildren(supabase, packageId, {
      carouselImages,
      pricingTiers,
      itineraryDays,
      practicalInformation,
      stays,
    });

    return NextResponse.json({ id: packageId });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to create package" },
      { status: 500 }
    );
  }
}
