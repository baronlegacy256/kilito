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

  const description = (
    packageData.subtitle ||
    "Experience unforgettable Tanzania safari adventures with Kili to Savanna Safari Club."
  ).substring(0, 160);

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
      locale: "en_US",
      type: "article",
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coverImage],
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