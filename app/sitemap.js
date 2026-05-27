import fs from "fs";
import path from "path";

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

  // Read the package-data.json to add all package detail pages
  let packageUrls = [];
  try {
    const packageDataPath = path.join(process.cwd(), "public", "package-data.json");
    if (fs.existsSync(packageDataPath)) {
      const fileContents = fs.readFileSync(packageDataPath, "utf-8");
      const data = JSON.parse(fileContents);
      const packages = data.packages || [];
      packageUrls = packages.map((pkg) => ({
        url: `${baseUrl}/packages/${pkg.slug}`,
        lastModified: new Date(pkg.updated_at || new Date()),
        changeFrequency: "weekly",
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error("Error reading packages data for sitemap:", error);
  }

  return [...staticUrls, ...packageUrls];
}
