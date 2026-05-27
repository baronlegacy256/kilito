import { getSupabaseServiceRoleClient } from "@/lib/supabase/service";

export default async function sitemap() {
  const baseUrl = "https://kilitosavannasafariclub.com";

  // Static routes
  const staticRoutes = [
    "",
    "/packages",
    "/contact",
    "/who-we-are",
    "/blog",
    "/faq",
    "/guarantees",
    "/newsletters",
    "/terms-of-use",
    "/press",
    "/jobs",
    "/customer-reviews",
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch package detail pages dynamically from Supabase
  let packageUrls = [];
  try {
    const supabase = getSupabaseServiceRoleClient();
    if (supabase) {
      const { data: packages, error } = await supabase
        .from("packages")
        .select("slug, updated_at, is_active")
        .not("slug", "is", null)
        .eq("is_active", true)
        .order("updated_at", { ascending: false });

      if (error) {
        throw error;
      }

      packageUrls = (packages || []).map((pkg) => ({
        url: `${baseUrl}/packages/${pkg.slug}`,
        lastModified: new Date(pkg.updated_at || new Date()),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Error generating dynamic package URLs for sitemap:", error);
  }

  return [...staticUrls, ...packageUrls];
}
