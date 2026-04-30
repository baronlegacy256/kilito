import React from "react";
import Link from "next/link";

function Hero() {
  return (
    <div>
      <div
        id="top-inline-zone"
        className="top-inline-zone background-zone-image"
        style={{ backgroundImage: "url(/assets/images/hero/hero.png)" }}
      >
        <div className="img-filter"></div>

        <div className="top-zone-inner">
          <h1 id="content-title" className="">
            <div className="content-title-part-1">Kili to Savanna</div>

            <div className="content-title-part-2">
              Unrivalled, Diverse Of Beauty
            </div>
          </h1>

          <div className="sport-rating-zone">
            <Link href="/#opinion-zone" className="no-decoration">
              <i
                className="rating-icon fa fa-star active"
                aria-hidden="true"
              ></i>

              <i
                className="rating-icon fa fa-star active"
                aria-hidden="true"
              ></i>

              <i
                className="rating-icon fa fa-star active"
                aria-hidden="true"
              ></i>

              <i
                className="rating-icon fa fa-star active"
                aria-hidden="true"
              ></i>

              <i
                className="rating-icon fa fa-star active"
                aria-hidden="true"
              ></i>

              <span className="rating-label">Over 250 Reviews</span>
            </Link>
          </div>

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
                    <span itemProp="name">Home Page</span>
                  </strong>
                  <meta itemProp="position" content="2" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
