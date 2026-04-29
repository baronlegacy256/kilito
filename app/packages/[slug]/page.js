import { Fragment } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Packages/Header";
import Footer from "@/components/Home/Footer";
import Prefooter from "@/components/Home/Prefooter";
import TopZone from "@/components/Packages/TopZone";
import Principal from "@/components/Packages/Principal";
import { getPackageDetailsBySlug } from "@/lib/packages/getPackageDetails";

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
