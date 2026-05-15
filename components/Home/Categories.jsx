import React from "react";
import Link from "next/link";

function Categories() {
  return (
    <div id="children-landings-zone" className="full-width-div vignettes-zone">
      <h2 className="lvl1-zone-title">Our Diverse Destination Categories</h2>

      <div
        id="selected-children-h-scrollable-zone"
        className="h-scrollable-vignettes-outer-zone"
        data-initialized="false"
      >
        <div className="left-trigger hover-grow">
          <div className="trigger-container">
            <div className="photo-container">
              <img
                className="photo ratio-10000"
                src="#"
                data-src="/assets/arrow_picto-53b8fa32362b481e2ef3b1c4e5b6c0b8.svg"
                alt=""
                data-alt="Arrow"
                title=""
                width="50"
                height="50"
              />

              <noscript>
                <img
                  className="photo"
                  src="/assets/arrow_picto-53b8fa32362b481e2ef3b1c4e5b6c0b8.svg"
                  alt="Arrow"
                  title=""
                  width="50"
                  height="50"
                />
              </noscript>
            </div>
          </div>
        </div>
        <div className="h-scrollable-vignettes-zone">
          <div className="outer-vignette">
            <Link
              href="/packages?category=Safari+tour"
              className="vignette-surrounding-link"
            >
              <div className="card vignette vignette-landing">
                <div className="vignette-image">
                  <div className="photo-container">
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcSet="/assets/images/home/safari.jpg"
                        width="509"
                        height="287"
                      />

                      <img
                        className="photo"
                        src="/assets/images/home/safari.jpg"
                        alt="photos-137"
                        title="photos-137"
                        width="400"
                        height="350"
                      />
                    </picture>
                  </div>
                </div>
                <div className="vignette-image-filter"></div>
                <div className="vignette-label">
                  <div className="vignette-label-inner">
                    <div className="subtitle">Safari Tour</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="outer-vignette">
            <Link
              href="/packages?category=Cultural+tour"
              className="vignette-surrounding-link"
            >
              <div className="card vignette vignette-landing">
                <div className="vignette-image">
                  <div className="photo-container">
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcSet="/assets/images/home/cultural.jpeg"
                        width="509"
                        height="287"
                      />

                      <img
                        className="photo"
                        src="/assets/images/home/cultural.jpeg"
                        alt="photos-136"
                        title="photos-136"
                        width="400"
                        height="350"
                      />
                    </picture>
                  </div>
                </div>
                <div className="vignette-image-filter"></div>
                <div className="vignette-label">
                  <div className="vignette-label-inner">
                    <div className="subtitle">Cultural Tour</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="outer-vignette">
            <Link
              href="/packages?category=Climbing+and+Trekking"
              className="vignette-surrounding-link"
            >
              <div className="card vignette vignette-landing">
                <div className="vignette-image">
                  <div className="photo-container">
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcSet="/assets/images/home/trekking.jpeg"
                        width="509"
                        height="287"
                      />

                      <img
                        className="photo"
                        src="/assets/images/home/trekking.jpeg"
                        alt="photos-138"
                        title="photos-138"
                        width="400"
                        height="350"
                      />
                    </picture>
                  </div>
                </div>
                <div className="vignette-image-filter"></div>
                <div className="vignette-label">
                  <div className="vignette-label-inner">
                    <div className="subtitle">Climbing and Trekking</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="outer-vignette">
            <Link href="/packages" className="vignette-surrounding-link">
              <div className="card vignette vignette-landing">
                <div className="vignette-image">
                  <div className="photo-container">
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcSet="/assets/images/home/allPackages.jpg"
                        width="509"
                        height="287"
                      />

                      <img
                        className="photo"
                        src="/assets/images/home/allPackages.jpg"
                        alt="photos-134"
                        title="photos-134"
                        width="400"
                        height="350"
                      />
                    </picture>
                  </div>
                </div>
                <div className="vignette-image-filter"></div>
                <div className="vignette-label">
                  <div className="vignette-label-inner">
                    <div className="subtitle">All Packages</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="right-trigger hover-grow">
          <div className="trigger-container">
            <div className="photo-container">
              <img
                className="photo ratio-10000"
                src="#"
                data-src="/assets/arrow_picto-53b8fa32362b481e2ef3b1c4e5b6c0b8.svg"
                alt=""
                data-alt="Arrow"
                title=""
                width="50"
                height="50"
              />

              <noscript>
                <img
                  className="photo"
                  src="/assets/arrow_picto-53b8fa32362b481e2ef3b1c4e5b6c0b8.svg"
                  alt="Arrow"
                  title=""
                  width="50"
                  height="50"
                />
              </noscript>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
