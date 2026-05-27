import { Fragment } from "react";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";
import Packages from "@/components/Home/Packages";
import Link from "next/link";

const BASE_URL = "https://kilitosavannasafariclub.com";

export async function generateMetadata({ searchParams }) {
  const category = searchParams?.category || "All";

  let title = "Tanzania Safari Packages | Kilimanjaro & Serengeti Tours";
  let description =
    "Browse our Tanzania safari packages including Serengeti wildlife safaris, Kilimanjaro trekking, Zanzibar holidays, and cultural tours.";

  let image = "/assets/images/home/allPackages.jpg";

  if (category === "Safari tour") {
    title = "Safari Tours in Tanzania | Serengeti Wildlife Safaris";
    image = "/assets/images/home/safari.jpg";
  } else if (category === "Cultural tour") {
    title = "Cultural Tours in Tanzania | Maasai & Local Experiences";
    image = "/assets/images/home/cultural.jpeg";
  } else if (category === "Climbing and Trekking") {
    title = "Climbing and Trekking Packages | Mountain Climbing Tanzania";
    image = "/assets/images/home/trekking.jpeg";
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/packages`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/packages`,
      images: [image],
      siteName: "Kili to Savanna Safari Club",
      type: "website",
    },
  };
}

export default async function PackagesPage(props) {
  const searchParams = await props.searchParams;
  const category = searchParams?.category || "All";

  // Map category to a specific image and title
  let bannerImage = "/assets/images/home/allPackages.jpg";
  let titlePart2 = "All our Packages";
  let pageLabel = "All packages";

  if (category === "Safari tour") {
    bannerImage = "/assets/images/home/safari.jpg";
    titlePart2 = "Safari Tour";
    pageLabel = "Safari Tour";
  } else if (category === "Cultural tour") {
    bannerImage = "/assets/images/home/cultural.jpeg";
    titlePart2 = "Cultural Tour";
    pageLabel = "Cultural Tour";
  } else if (category === "Climbing and Trekking") {
    bannerImage = "/assets/images/home/trekking.jpeg";
    titlePart2 = "Climbing & Trekking";
    pageLabel = "Climbing & Trekking";
  } else if (category && category !== "All" && category !== "All Packages") {
    titlePart2 = category;
    pageLabel = category;
  }

  return (
    <Fragment>
      <Header />
      <div>
        <div
          id="top-inline-zone"
          className="top-inline-zone background-zone-image"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="img-filter"></div>

          <div className="top-zone-inner">
            <h1 id="content-title" className="">
              <div className="content-title-part-1"> {titlePart2}</div>

              <div className="content-title-part-2">
                {titlePart2}
              </div>
            </h1>

            

            <div className="custom-breadcrumb-container sport-breadcrumb ">
              <div className="custom-breadcrumb">
                <ul itemScope itemType="http://schema.org/BreadcrumbList">
                  <li
                    itemProp="itemListElement"
                    itemScope
                    itemType="http://schema.org/ListItem"
                  >
                    <span className="glyphicon glyphicon-home"></span>
                    <span>
                      <Link href="/" itemProp="item">
                        <span itemProp="name">kili to savanna adventures</span>
                      </Link>
                      <i className="material-icons">arrow_forward_ios</i>
                    </span>
                    <meta itemProp="position" content="1" />
                  </li>

                  <li
                    itemProp="itemListElement"
                    itemScope
                    itemType="http://schema.org/ListItem"
                  >
                    <strong>
                      <span itemProp="name">{pageLabel}</span>
                    </strong>
                    <meta itemProp="position" content="2" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main style={{ minHeight: '60vh' }}>
        <Packages />
      </main>
      <Footer />
    </Fragment>
  );
}
