import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/requireAdmin";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";
import { replacePackageChildren } from "@/lib/admin/persistPackage";

export async function GET(_request, context) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
  }

  const { id: packageId } = await context.params;
  if (!packageId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const { data: pkg, error: pkgError } = await supabase
      .from("packages")
      .select("*")
      .eq("id", packageId)
      .single();

    if (pkgError) throw pkgError;

    const [imagesRes, pricingRes, itineraryRes, practicalRes, staysRes] = await Promise.all([
      supabase
        .from("package_carousel_images")
        .select("*")
        .eq("package_id", packageId)
        .order("sort_order", { ascending: true }),
      supabase
        .from("package_pricing_tiers")
        .select("*")
        .eq("package_id", packageId)
        .order("sort_order", { ascending: true }),
      supabase
        .from("package_itinerary_days")
        .select("*")
        .eq("package_id", packageId)
        .order("sort_order", { ascending: true }),
      supabase
        .from("package_practical_information")
        .select("*")
        .eq("package_id", packageId)
        .order("sort_order", { ascending: true }),
      supabase
        .from("package_stays")
        .select("*")
        .eq("package_id", packageId)
        .order("start_date", { ascending: true }),
    ]);

    if (imagesRes.error) throw imagesRes.error;
    if (pricingRes.error) throw pricingRes.error;
    if (itineraryRes.error) throw itineraryRes.error;
    if (practicalRes.error) throw practicalRes.error;
    if (staysRes.error) throw staysRes.error;

    return NextResponse.json({
      package: pkg,
      carouselImages: imagesRes.data ?? [],
      pricingTiers: pricingRes.data ?? [],
      itineraryDays: itineraryRes.data ?? [],
      practicalInformation: practicalRes.data ?? [],
      stays: staysRes.data ?? [],
    });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to load package" },
      { status: 500 }
    );
  }
}

export async function PUT(request, context) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
  }

  const { id: packageId } = await context.params;
  if (!packageId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
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
    const { error: updateError } = await supabase
      .from("packages")
      .update(packagePayload)
      .eq("id", packageId);

    if (updateError) throw updateError;

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
      { error: e?.message || "Failed to save package" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, context) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
  }

  const { id: packageId } = await context.params;
  if (!packageId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const { error: updateError } = await supabase
      .from("packages")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", packageId);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to update package" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request, context) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
  }

  const { id: packageId } = await context.params;
  if (!packageId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const { error: deleteError } = await supabase
      .from("packages")
      .delete()
      .eq("id", packageId);

    if (deleteError) throw deleteError;

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e?.message || "Failed to delete package" },
      { status: 500 }
    );
  }
}
