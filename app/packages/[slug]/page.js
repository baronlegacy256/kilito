import { Fragment } from "react";
export const dynamic = 'force-dynamic';
import { notFound } from "next/navigation";
import Header from "@/components/Packages/Header";
import Footer from "@/components/Home/Footer";
import Prefooter from "@/components/Home/Prefooter";
import TopZone from "@/components/Packages/TopZone";
import Principal from "@/components/Packages/Principal";
import { getPackageDetailsBySlug } from "@/lib/packages/getPackageDetails";

const BASE_URL = "https://kilitosavannasafariclub.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const packageData = await getPackageDetailsBySlug(slug);

  if (!packageData) {
    return {
      title: "Package Not Found",
      description: "The requested safari package could not be found.",
    };
  }

  const title = packageData.title || "Tanzania Safari Package";

  // Clean description safely
  let description =
    packageData.subtitle ||
    "Experience unforgettable Tanzania safari adventures with Kili to Savanna Safari Club.";

  if (packageData.hero_description_html) {
    const cleanText = packageData.hero_description_html.replace(/<[^>]+>/g, "");
    description = cleanText;
  }

  // Add pricing context (optional SEO boost)
  const firstPrice = packageData.pricing_tiers?.[0];
  if (firstPrice) {
    const symbol = firstPrice.currency_code === "EUR" ? "€" : "$";
    const priceText = `From ${Number(firstPrice.price_amount).toLocaleString()} ${symbol}${firstPrice.per_label || "/person"}.`;
    description = `${priceText} ${description}`;
  }

  description = description.substring(0, 160);

  const coverImage =
    packageData.top_background_image ||
    packageData.carousel_images?.[0]?.image_url ||
    "/assets/images/home/default-package.jpg";

  return {
    title,
    description,

    alternates: {
      canonical: `${BASE_URL}/packages/${slug}`,
    },

    openGraph: {
      title,
      description,
      url: `${BASE_URL}/packages/${slug}`,
      siteName: "Kili to Savanna Safari Club",
      type: "article",
      images: [
        {
          url: coverImage,
        },
      ],
    },
  };
}

export default async function PackageDetailPage({ params }) {
  const { slug } = await params;

  const packageData = await getPackageDetailsBySlug(slug);

  if (!packageData) {
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