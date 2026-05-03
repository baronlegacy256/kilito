import { Fragment } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Packages/Header";
import Footer from "@/components/Home/Footer";
import Prefooter from "@/components/Home/Prefooter";
import TopZone from "@/components/Packages/TopZone";
import Principal from "@/components/Packages/Principal";
import { getPackageDetailsBySlug } from "@/lib/packages/getPackageDetails";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const packageData = await getPackageDetailsBySlug(slug);

  if (!packageData) {
    return {
      title: "Package Not Found",
      description: "The requested package could not be found."
    };
  }

  const title = packageData.title || "Tanzania Safari Package";
  // We can use subtitle or a plain text version of description. 
  // We will strip HTML tags if hero_description_html is the only description, or use subtitle.
  let description = packageData.subtitle || "Experience a beautiful safari with Kili to Savanna.";
  if (packageData.hero_description_html && !packageData.subtitle) {
    // Strip HTML tags for meta description
    description = packageData.hero_description_html.replace(/<[^>]+>/g, '').substring(0, 160);
  }

  const images = [];
  const coverImage = packageData.top_background_image || (packageData.carousel_images && packageData.carousel_images[0]?.image_url);
  if (coverImage) {
    images.push(coverImage);
  }

  // Include price in description if available
  const firstPrice = packageData.pricing_tiers && packageData.pricing_tiers[0];
  if (firstPrice) {
    const symbol = firstPrice.currency_code === "EUR" ? "€" : "$";
    const priceText = `Prices from ${Number(firstPrice.price_amount).toLocaleString()} ${symbol} ${firstPrice.per_label || "/ person"}.`;
    description = `${priceText} ${description}`.substring(0, 160);
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: images.length > 0 ? images : undefined,
    }
  };
}

export default async function PackageDetailPage({ params }) {
  const { slug } = await params;
  console.log('[DEBUG] Opening detail page for slug:', slug);
  const packageData = await getPackageDetailsBySlug(slug);

  if (!packageData) {
    console.error('[ERROR] Package not found for slug:', slug);
    notFound();
  }

  return (
    <Fragment>
      <Header />
      <TopZone packageData={packageData} />
      <Principal packageData={packageData} />
      <Prefooter />
      <Footer />
    </Fragment>
  );
}
