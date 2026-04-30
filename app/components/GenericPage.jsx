"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Home/Header";
import Prefooter from "@/components/Home/Prefooter";
import Footer from "@/components/Home/Footer";

export default function GenericPage({ title, children }) {
  useEffect(() => {
    // Dynamically load the generic-page stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/styles/generic-page.css";
    link.id = "generic-page-stylesheet";
    document.head.appendChild(link);

    return () => {
      // Remove the stylesheet when unmounting
      const existingLink = document.getElementById("generic-page-stylesheet");
      if (existingLink) {
        document.head.removeChild(existingLink);
      }
    };
  }, []);

  return (
    <main className="main-content">
      <Header />
      <div id="principal">
        <div
          id="top-inline-zone"
          className="top-inline-zone background-zone-image"
          style={{
            backgroundImage: 'url("/assets/images/generic.jpg")',
          }}
        >
          <div className="img-filter"></div>

          <div className="top-zone-inner">
            <h1 id="content-title">
              <div className="content-title-part-1">{title}</div>
            </h1>

            <div className="custom-breadcrumb-container sport-breadcrumb">
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
                        <span itemProp="name">Kili to Savanna</span>
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
                      <span itemProp="name">{title}</span>
                    </strong>
                    <meta itemProp="position" content="2" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {children}
      </div>

      <Prefooter />
      <Footer />
    </main>
  );
}
