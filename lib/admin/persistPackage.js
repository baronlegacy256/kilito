/**
 * @param {import("@supabase/supabase-js").SupabaseClient} supabase
 * @param {string} packageId
 * @param {{
 *   carouselImages?: object[],
 *   pricingTiers?: object[],
 *   itineraryDays?: object[],
 *   practicalInformation?: object[],
 * }} children
 */
export async function replacePackageChildren(supabase, packageId, children) {
  const carouselImages = children.carouselImages ?? [];
  const pricingTiers = children.pricingTiers ?? [];
  const itineraryDays = children.itineraryDays ?? [];
  const stays = children.stays ?? [];
  const practicalInformation = children.practicalInformation ?? [];
  const featureSections = children.featureSections ?? [];

  const replaceRows = async (table, rows) => {
    const { error: deleteError } = await supabase.from(table).delete().eq("package_id", packageId);
    if (deleteError) throw deleteError;
    if (!rows.length) return;
    const payload = rows.map((row, idx) => {
      const { id: _id, package_id: _pid, created_at: _ca, updated_at: _ua, ...rest } = row;
      return {
        ...rest,
        package_id: packageId,
        sort_order: idx + 1,
      };
    });
    const { error: insertError } = await supabase.from(table).insert(payload);
    if (insertError) throw insertError;
  };

  await Promise.all([
    replaceRows("package_carousel_images", carouselImages),
    replaceRows("package_pricing_tiers", pricingTiers),
    replaceRows("package_itinerary_days", itineraryDays),
    replaceRows("package_practical_information", practicalInformation),
    replaceRows("package_stays", stays),
    replaceRows("package_feature_sections", featureSections),
  ]);
}
