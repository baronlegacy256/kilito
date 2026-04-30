import { NextResponse } from "next/server";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get("category"); // UI 'category' (Destination)
  const packageType = searchParams.get("packageType"); // UI 'packageType' (Safari tour, etc.)
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const durations = searchParams.get("durations");
  const stayTypes = searchParams.get("stayTypes");
  const physicalLevel = searchParams.get("physicalLevel");
  const keywords = searchParams.get("keywords");
  const departureDate = searchParams.get("departureDate");
  const sortType = searchParams.get("sortType") || "RELEVANCE";


  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service role not configured" }, { status: 503 });
  }

  let query = supabase
    .from("packages")
    .select(`
      id, slug, title, subtitle, category, duration_label, technical_level_label,
      package_pricing_tiers (id, label, price_amount, currency_code, per_label),
      package_carousel_images (image_url),
      groups (start_date)
    `)
    .eq("is_active", true);

  // If destination is specific but not 'Tanzania' (all are in Tanzania), we would filter here.
  // For now, we skip filtering by location since it's not a column and everything is Tanzania.
  
  // UI 'packageType' (Safari tour, etc.) maps to the database 'category' column.
  if (packageType && packageType !== "All") {
    query = query.ilike("category", `%${packageType}%`);
  } else if (category && category !== "All" && category !== "Tanzania") {
    // Fallback: if category param is used for a package type (legacy links)
    query = query.ilike("category", `%${category}%`);
  }

  if (keywords) {
    query = query.or(`title.ilike.%${keywords}%,subtitle.ilike.%${keywords}%,hero_description_html.ilike.%${keywords}%`);
  }

  // Sorting
  if (sortType === "DURATION_ASC") query = query.order("duration_label", { ascending: true });
  else if (sortType === "DURATION_DESC") query = query.order("duration_label", { ascending: false });
  else query = query.order("updated_at", { ascending: false });

  try {
    const { data, error } = await query;
    if (error) throw error;

    // Post-filter logic for things that are harder in Supabase simple query
    let filtered = data || [];

    // Filter by price (using the lowest pricing tier)
    if (minPrice || maxPrice) {
      filtered = filtered.filter(pkg => {
        const minTierPrice = Math.min(...(pkg.package_pricing_tiers?.map(t => t.price_amount) || [Infinity]));
        const minP = minPrice ? parseFloat(minPrice) : 0;
        const maxP = maxPrice ? parseFloat(maxPrice) : Infinity;
        return minTierPrice >= minP && minTierPrice <= maxP;
      });
    }

    // Filter by physical level
    if (physicalLevel) {
      const levels = physicalLevel.split(",");
      filtered = filtered.filter(pkg => {
        return levels.some(l => pkg.technical_level_label?.toUpperCase().includes(l));
      });
    }

    // Filter by duration
    if (durations) {
      const selectedDurations = durations.split(",");
      filtered = filtered.filter(pkg => {
        const days = parseInt(pkg.duration_label) || 0;
        return selectedDurations.some(d => {
          if (d === 'TRIP') return days >= 4 && days <= 8;
          if (d === 'LONG') return days >= 9;
          return true;
        });
      });
    }


    return NextResponse.json(
      { packages: filtered },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=59',
        },
      }
    );
  } catch (e) {
    console.error('[API Error] Packages route failed:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
