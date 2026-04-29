"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Image } from "antd";

function TopZone({ packageData }) {
  const carouselImages = packageData?.carousel_images ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    if (carouselImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const coverImage =
    packageData?.top_background_image || carouselImages[0]?.image_url || "";
  const packagePath = packageData?.slug
    ? `/packages/${packageData.slug}`
    : "/packages/southern-tanzania-safari-zanzibar";

  return (
    <div
      id=""
      className="top-zone"
      style={{
        backgroundImage: `url('${coverImage}')`,
      }}
    >
      <div className="img-filter"></div>

      <div className="carousel-zone">
        <div
          id="carousel0"
          className="carousel slide"
          data-nb-photos={carouselImages.length}
          style={{ width: "100%", height: "100%" }}
        >
          <div
            className="carousel-inner"
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
          >
            {carouselImages.map((image, index) => (
              <div
                key={image.id ?? image.image_url ?? index}
                className={`item ${index === activeIndex ? "active" : ""}`}
                style={{
                  display: index === activeIndex ? "block" : "none",
                  transition: "opacity 0.8s ease-in-out",
                  opacity: index === activeIndex ? 1 : 0,
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                data-index={index}
              >
                <div
                  className="photo-container"
                  style={{ width: "100%", height: "100%" }}
                >
                  <img
                    className="photo"
                    src={image.image_url}
                    alt={
                      image.alt_text || packageData?.title || "Package image"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "none" }}>
        <Image.PreviewGroup
          preview={{
            open: previewVisible,
            onOpenChange: (value) => setPreviewVisible(value),
          }}
        >
          {carouselImages.map((image) => (
            <Image key={image.id ?? image.image_url} src={image.image_url} />
          ))}
        </Image.PreviewGroup>
      </div>

      <div className="top-inner-zone">
        <div className="title-zone">
          <h1>
            <div className="content-title-part-1">{packageData?.title}</div>
          </h1>
          <h2>
            <div className="content-title-part-2">{packageData?.subtitle}</div>
          </h2>
        </div>

        <div className="bottom-zone">
          <button
            type="button"
            onClick={() => setPreviewVisible(true)}
            className="btn custom-button rounded white hover-grow"
          >
            View All {carouselImages.length} Photos
          </button>

          <div className="breadcrumb-and-social-sharing-zone">
            <div className="custom-breadcrumb">
              <ul itemScope itemType="http://schema.org/BreadcrumbList">
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="http://schema.org/ListItem"
                  className=""
                >
                  <Link href="/" itemProp="item">
                    <img
                      src="/assets/picto_logo_white-cb2aff7b5b54faf3c9eeb095ee529509.svg"
                      alt="Kili to Savanna logo"
                      title="Adventure weekends and stays, organized by local experts"
                      width="38"
                      height="32"
                    />

                    <span itemProp="name" className="home-label">
                      {" "}
                      Welcome{" "}
                    </span>
                  </Link>

                  <meta itemProp="position" content="1" />
                </li>

                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="http://schema.org/ListItem"
                  className=""
                >
                  <Link href="/#children-landings-zone" itemProp="item">
                    <span itemProp="name" className="">
                      Packages
                    </span>
                  </Link>

                  <meta itemProp="position" content="2" />
                </li>

                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="http://schema.org/ListItem"
                  className=""
                >
                  <Link href={packagePath} itemProp="item">
                    <span itemProp="name" className="">
                      {" "}
                      {packageData?.title || "Package"}
                    </span>
                  </Link>

                  <meta itemProp="position" content="3" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopZone;
