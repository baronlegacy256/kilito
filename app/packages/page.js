import { Fragment } from "react";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";
import Packages from "@/components/Home/Packages";
import Link from "next/link";

export const metadata = {
  title: "Our Packages",
  description: "Browse all our Tanzania safari packages, climbing and trekking adventures, and cultural tours.",
  openGraph: {
    title: "Our Packages",
    description: "Browse all our Tanzania safari packages, climbing and trekking adventures, and cultural tours.",
    url: "https://kilitosavannaadventures.com/packages",
    images: ["/assets/images/home/allPackages.jpg"],
  }
};

export default async function PackagesPage(props) {
  const searchParams = await props.searchParams;
  const category = searchParams?.category || "All";

  // Map category to a specific image and title
  let bannerImage = "/assets/images/home/allpackages.jpg";
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
