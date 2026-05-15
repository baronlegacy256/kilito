import { defaultPackageData } from "@/lib/packages/defaultPackageData";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";

export async function getPackageDetailsBySlug(slug) {
  console.log('[DEBUG] Fetching package for slug:', slug);
  const supabase = getSupabaseServiceRoleClient();

  if (!supabase) {
    return null;
  }

  const { data: pkg, error } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error('[ERROR] Supabase fetch error:', error);
  }

  if (!pkg) {
    console.log('[DEBUG] No package found for slug:', slug);
    return null;
  }

  const [carouselImages, pricingTiers, itineraryDays, practicalInformation, groups, featureSections] =
    await Promise.all([
      supabase
        .from("package_carousel_images")
        .select("*")
        .eq("package_id", pkg.id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("package_pricing_tiers")
        .select("*")
        .eq("package_id", pkg.id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("package_itinerary_days")
        .select("*")
        .eq("package_id", pkg.id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("package_practical_information")
        .select("*")
        .eq("package_id", pkg.id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("groups")
        .select("*")
        .eq("package_id", pkg.id)
        .order("start_date", { ascending: true }),
      supabase
        .from("package_feature_sections")
        .select("*")
        .eq("package_id", pkg.id)
        .order("sort_order", { ascending: true }),
    ]);

  return {
    ...pkg,
    carousel_images: carouselImages.data ?? [],
    pricing_tiers: pricingTiers.data ?? [],
    itinerary_days: itineraryDays.data ?? [],
    practical_information: practicalInformation.data ?? [],
    groups: groups.data ?? [],
    feature_sections: featureSections.data ?? [],
  };
}
