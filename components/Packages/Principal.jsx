"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookingModal from "./BookingModal";

function formatPrice(amount, currencyCode) {
  const symbol = currencyCode === "EUR" ? "€" : "$";
  return `${Number(amount).toLocaleString()} ${symbol}`;
}

function Principal({ packageData }) {
  const pathname = usePathname();
  const pricingTiers = packageData?.pricing_tiers ?? [];
  const itineraryDays = packageData?.itinerary_days ?? [];
  const practicalInformation = packageData?.practical_information ?? [];
  
  const featureSections = packageData?.feature_sections?.length > 0 
    ? packageData.feature_sections 
    : [
        {
          id: 'fallback-included',
          title: 'Included',
          icon_type: 'check',
          items: packageData?.included || [
            "Professional skipper supervision",
            "Nights on board the sailboat",
            "Bedding and towels",
            "End-of-stay cleaning fee",
          ]
        },
        {
          id: 'fallback-to-bring',
          title: 'To bring',
          icon_type: 'circle',
          items: packageData?.to_bring || [
            "Round-trip transport to the meeting point",
            "Provisions",
            "Port fees, fuel",
          ]
        }
      ];

  const firstPrice = pricingTiers[0];
  const firstPriceLabel = firstPrice
    ? `${formatPrice(firstPrice.price_amount, firstPrice.currency_code)} ${
        firstPrice.per_label || "/ person"
      }`
    : "N/A";

  const [similarPackages, setSimilarPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        setLoading(true);
        const category = packageData?.category || "All";
        const response = await fetch(
          `/api/packages?category=${encodeURIComponent(category)}`,
        );
        const data = await response.json();

        // Filter out current package and limit to 3
        const others = (data.packages || [])
          .filter((p) => p.id !== packageData?.id)
          .slice(0, 3);

        // If no similar packages in the same category, fetch some others as fallback
        if (others.length === 0) {
          const fallbackResponse = await fetch(`/api/packages`);
          const fallbackData = await fallbackResponse.json();
          const fallbackOthers = (fallbackData.packages || [])
            .filter((p) => p.id !== packageData?.id)
            .slice(0, 3);
          setSimilarPackages(fallbackOthers);
        } else {
          setSimilarPackages(others);
        }
      } catch (err) {
        console.error("Error fetching similar packages:", err);
      } finally {
        setLoading(false);
      }
    };

    if (packageData?.id) {
      fetchSimilar();
    }
  }, [packageData]);

  const [isAffixed, setIsAffixed] = useState(false);
  const [affixTopOffset, setAffixTopOffset] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("Quote");
  const affixParentRef = useRef(null);
  const [activeTab, setActiveTab] = useState("");

  const SECTION_NAV_HEIGHT = 52;

  useEffect(() => {
    const handleScroll = () => {
      const mainMenu = document.querySelector("header #main-menu");
      let topOffset = 0;
      if (mainMenu) {
        const menuRect = mainMenu.getBoundingClientRect();
        if (menuRect.bottom > 0) {
          topOffset = Math.ceil(menuRect.bottom);
        }
      }
      setAffixTopOffset(topOffset);

      if (affixParentRef.current) {
        const rect = affixParentRef.current.getBoundingClientRect();
        setIsAffixed(rect.top <= topOffset);
      }

      const stickyLine = topOffset + SECTION_NAV_HEIGHT + 16;
      const sections = [
        "accommodation-zone",
        "features-zone",
        "enriched-program-zone",
        "general-conditions-zone",
        "opinion-zone",
      ];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= stickyLine && rect.bottom >= stickyLine) {
            setActiveTab(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sidebar = document.getElementById("top-right-col");
    if (!sidebar) return;

    if (isAffixed) {
      sidebar.style.top = `${affixTopOffset + SECTION_NAV_HEIGHT + 8}px`;
    } else {
      sidebar.style.top = "";
    }
  }, [isAffixed, affixTopOffset]);

  return (
    <div id="principal">
      <div className="main-zone secondary-div">
        <div className="row">
          <div id="top-left-col" className="col-sm-8 custom-col">
            <div
              id="main-infos-zone-mobile"
              className="sub-zone-background-white"
            >
              <div className="activity-infos">
                <div className="activity-infos-details">
                  <div className="activity-price">
                    <div className="activity-price-prefix">
                      <strong> From </strong>
                    </div>
                    <div className="activity-prices">
                      <div id="activity-price-block">
                        <div className="activity-price-amount">
                          <strong>
                            <span id="printed-price">{firstPriceLabel}</span>
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="price-details-link">
                      <Link
                        href={`${pathname}#features-zone`}
                        className="no-decoration scroll-smoothly"
                        data-offset="-35"
                      >
                        <i className="fa fa-info-circle icon"></i>
                      </Link>
                    </div>
                  </div>

                  <div className="activity-infos-details-except-price">
                    <div className="activity-duration">
                      <i className="fa fa-clock-o icon" aria-hidden="true"></i>

                      <div className="activity-info-detail">
                        <span className="activity-infos-details-label">
                          Duration :&nbsp;
                        </span>
                        <span className="activity-infos-details-value">
                          {packageData?.duration_label}
                        </span>
                      </div>
                    </div>

                    <div className="activity-technical-level">
                      <i
                        className="fa fa-line-chart icon"
                        aria-hidden="true"
                      ></i>

                      <div className="activity-info-detail">
                        <span className="activity-infos-details-label">
                          Technical Level :&nbsp;
                        </span>

                        <span className="activity-infos-details-value">
                          {packageData?.technical_level_label}
                          <div
                            className="custom-popover inline most-darker-grey with-icon small"
                            data-toggle="popover"
                            data-container="body"
                            data-placement="bottom"
                            data-html="true"
                            data-content={packageData?.technical_level_note}
                            data-trigger="hover"
                          >
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </span>
                      </div>
                    </div>

                    <div className="activity-physical-condition">
                      <i
                        className="fa fa-heartbeat icon"
                        aria-hidden="true"
                      ></i>

                      <div className="activity-info-detail">
                        <span className="activity-infos-details-label">
                          Physical Level :&nbsp;
                        </span>

                        <span className="activity-infos-details-value">
                          {packageData?.physical_level_label}
                          <div
                            className="custom-popover inline most-darker-grey with-icon small"
                            data-toggle="popover"
                            data-container="body"
                            data-placement="bottom"
                            data-html="true"
                            data-content={packageData?.physical_level_note}
                            data-trigger="hover"
                          >
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </span>
                      </div>
                    </div>

                    <div className="activity-nb-participants-max">
                      <i className="fa fa-users icon" aria-hidden="true"></i>

                      <div className="activity-info-detail">
                        <span className="activity-infos-details-label">
                          Max group size :&nbsp;
                        </span>

                        <span className="activity-infos-details-value">
                          {packageData?.max_group_size_label}
                        </span>
                      </div>
                    </div>

                    <div className="activity-season">
                      <div>
                        <i
                          className="fa fa-calendar icon"
                          aria-hidden="true"
                        ></i>

                        <div className="activity-info-detail">
                          <span className="activity-infos-details-label">
                            Season :&nbsp;
                          </span>

                          <span className="activity-infos-details-value">
                            <span className="capitalize">
                              {packageData?.season_from}
                              <i className="material-icons season-from-to-icon">
                                arrow_forward
                              </i>
                              {packageData?.season_to}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="buttons-zone-mobile-principal"
                  className="activity-infos-details"
                >
                  <button
                    type="button"
                    className="btn custom-button rounded hover-grow white medium-button wrap stretch-width activity-question-link without-dates"
                    onClick={() => {
                      setModalType("Quote");
                      setIsModalOpen(true);
                    }}
                  >
                    <span className="hidden-xs"> Ask for more info </span>
                    <span className="visible-xs"> Ask for more info </span>
                  </button>

                  <div
                    className="btn custom-button rounded hover-grow solid-yellow stretch-width wrap activity-book-it book-now-form-btn"
                    onClick={() => {
                      setModalType("Quote");
                      setIsModalOpen(true);
                    }}
                  >
                    <span className="book"> Request a quote </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sub-zone-background-white"></div>

            <div
              className="affix-parent"
              ref={affixParentRef}
              style={{
                height: isAffixed ? `${SECTION_NAV_HEIGHT + 1}px` : "1px",
                position: "relative",
              }}
            >
              <div
                id="page-navbar-large"
                className={`page-navbar affixable affixable-sm ${isAffixed ? "affix" : ""}`}
                style={{
                  position: isAffixed ? "fixed" : "absolute",
                  top: isAffixed ? affixTopOffset : 0,
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  background: "#fff",
                  opacity: isAffixed ? 1 : 0,
                  height: isAffixed ? `${SECTION_NAV_HEIGHT}px` : 0,
                  visibility: isAffixed ? "visible" : "hidden",
                  transition: "opacity 0.2s ease-in-out",
                  pointerEvents: isAffixed ? "auto" : "none",
                  borderBottom: isAffixed ? "1px solid #e4e4e4" : "none",
                  display: "block",
                }}
              >
                <div className="inner-zone">
                  <ul className="nav nav-tabs" role="tablist">
                    <li
                      className={
                        activeTab === "accommodation-zone" ? "active" : ""
                      }
                    >
                      <Link
                        href={`${pathname}#accommodation-zone`}
                        className="scroll-smoothly"
                      >
                        Description
                      </Link>
                    </li>

                    <li
                      className={activeTab === "features-zone" ? "active" : ""}
                    >
                      <Link
                        href={`${pathname}#features-zone`}
                        className="scroll-smoothly"
                      >
                        Price Details
                      </Link>
                    </li>

                    <li className={activeTab === "enriched-program-zone" ? "active" : ""}>
                      <Link
                        href={`${pathname}#enriched-program-zone`}
                        className="scroll-smoothly"
                      >
                        Itinerary
                      </Link>
                    </li>

                    <li
                      className={
                        activeTab === "general-conditions-zone" ? "active" : ""
                      }
                    >
                      <Link
                        href={`${pathname}#general-conditions-zone`}
                        className="scroll-smoothly"
                      >
                        Practical Info
                      </Link>
                    </li>
                  </ul>
                  <div className="page-navbar-right-zone hidden-xs">
                    <div
                      className="tel-zone"
                      data-toggle="popover"
                      data-template='<div class="popover pop-tel" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
                      data-container="body"
                      data-placement="bottom"
                      data-html="true"
                      data-content="Our sailing cruise advisors are at your disposal from Monday to Saturday, 10am to 6:30pm"
                      data-trigger="hover"
                    >
                      <i className="fa fa-phone icon" aria-hidden="true"></i>
                      +255 734 970 891
                    </div>
                    <div className="share-sub-zone">
                      <a data-sumome-share-id="bd324523-e1fa-4b7b-a27b-1f9be971c6b1"></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="accommodation-zone"
              className="row sub-main-zone sub-zone-background-white"
              style={{ scrollMarginTop: "120px" }}
            >
              <div className="col-sm-12 custom-col">
                <div className="sub-zone-title">
                  <h2>Your trip</h2>
                </div>
                <div className="sub-zone-content">
                  <div className="markdown-content activity-like">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: packageData?.hero_description_html || "",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div id="features-zone" style={{ scrollMarginTop: "120px" }}>
              <div className="row sub-main-zone sub-zone-background-white with-separator">
                <div className="col-sm-12 custom-col">
                  <div className="sub-zone-title">
                    <h2>Pricing</h2>
                  </div>

                  <div className="sub-zone-content with-background sub-zone-background-grey">
                    {pricingTiers.map((tier) => (
                      <div key={tier.id ?? tier.sort_order} className="line">
                        <i className="fa fa-circle icon"></i>
                        <div>
                          {formatPrice(tier.price_amount, tier.currency_code)}{" "}
                          {tier.per_label || "per person"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sub-main-zone sub-zone-full-width-background">
                {featureSections.map(section => (
                  <div className="row full-width-content" key={section.id ?? section.title}>
                    <div className="col-sm-12 custom-col">
                      <div className="sub-zone-title">
                        <h2>{section.title}</h2>
                      </div>
                      <div className="sub-zone-content">
                        {(section.items || []).map((item, idx) => (
                          <div className="line" key={idx}>
                            <i className={`fa fa-${section.icon_type === 'cross' ? 'times' : section.icon_type === 'circle' ? 'circle' : 'check'} icon ${section.icon_type === 'cross' || section.icon_type === 'circle' ? 'not-included' : 'included'}`}></i>
                            <div>{item}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="row full-width-background" aria-hidden="true" />
              </div>
            </div>

            <div
              id="enriched-program-zone"
              className="sub-main-zone sub-zone-background-white row"
              style={{ scrollMarginTop: "120px" }}
            >
              <div className="col-sm-12 custom-col">
                <div className="sub-zone-title">
                  <h2>Detailed program</h2>
                </div>
                <div className="sub-zone-subtitle">
                  <div>
                    <strong>Meeting point</strong>
                    &nbsp;:&nbsp; {packageData?.meeting_point}
                  </div>
                </div>
                <div className="sub-zone-content">
                  <div className="markdown-content activity-like">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: packageData?.itinerary_intro_html || "",
                      }}
                    />
                  </div>
                </div>
                {itineraryDays.map((day) => (
                  <div
                    key={day.id ?? day.sort_order}
                    className="row enriched-program-step"
                  >
                    <div className="col-sm-6 enriched-program-step-photo">
                      {day.image_url ? (
                        <button className="img-button" type="button">
                          <div className="photo-container">
                            <img
                              className="photo ratio-5637"
                              src={day.image_url}
                              alt={day.title}
                            />
                          </div>
                        </button>
                      ) : null}
                      {day.duration_note ? (
                        <div className="hidden-xs step-infos-desktop">
                          <p className="step-info">
                            <span>
                              <strong>
                                <i
                                  className="icon material-icons-outlined md-14"
                                  aria-hidden="true"
                                >
                                  timer
                                </i>
                                Duration :
                              </strong>
                              {` ${day.duration_note}`}
                            </span>
                          </p>
                        </div>
                      ) : null}
                    </div>
                    <div className="col-sm-6 sub-zone-content">
                      <div className="step-title">
                        <h3>
                          <span className="title-day">{day.day_label}</span>
                          {day.title}
                        </h3>
                      </div>
                      <div
                        className="markdown-content activity-like"
                        dangerouslySetInnerHTML={{
                          __html: day.description_html || "",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="buttons-zone-mobile-secondary"
              className="activity-infos-details"
            >
              <button
                type="button"
                className="btn custom-button rounded hover-grow white medium-button wrap stretch-width activity-question-link without-dates"
                onClick={() => {
                  setModalType("Quote");
                  setIsModalOpen(true);
                }}
              >
                <span className="hidden-xs"> Ask for more info </span>
                <span className="visible-xs"> Ask for more info </span>
              </button>

              <div
                className="btn custom-button rounded hover-grow solid-yellow stretch-width wrap activity-book-it book-now-form-btn"
                onClick={() => {
                  setModalType("Quote");
                  setIsModalOpen(true);
                }}
              >
                <span className="book"> Request a quote </span>
              </div>
            </div>
          </div>

          <div id="top-right-col" className="col-sm-4 custom-col">
            <div
              id="main-infos-zone-desktop"
              className="sub-zone-background-white"
            >
              <div className="activity-infos">
                <div className="activity-infos-details">
                  <div className="activity-price">
                    <div className="activity-price-prefix">
                      <strong>From </strong>
                    </div>
                    <div className="activity-prices">
                      <div id="activity-price-block">
                        <div className="activity-price-amount">
                          <strong>
                            <span id="printed-price">{firstPriceLabel}</span>
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="price-details-link">
                      <Link
                        href={`${pathname}#features-zone`}
                        className="no-decoration scroll-smoothly"
                        data-offset="-35"
                      >
                        <i className="fa fa-info-circle icon"></i>
                      </Link>
                    </div>
                  </div>

                  <div className="activity-infos-details-except-price">
                    <div className="activity-duration">
                      <i className="fa fa-clock-o icon" aria-hidden="true"></i>

                      <div className="activity-info-detail">
                        <span className="activity-infos-details-label">
                          Duration :&nbsp;
                        </span>
                        <span className="activity-infos-details-value">
                          {packageData?.duration_label}
                        </span>
                      </div>
                    </div>

                    <div className="activity-technical-level">
                      <i
                        className="fa fa-line-chart icon"
                        aria-hidden="true"
                      ></i>

                      <div className="activity-info-detail">
                        <span className="activity-infos-details-label">
                          Technical level :&nbsp;
                        </span>

                        <span className="activity-infos-details-value">
                          {packageData?.technical_level_label}
                          <div
                            className="custom-popover inline most-darker-grey with-icon small"
                            data-toggle="popover"
                            data-container="body"
                            data-placement="bottom"
                            data-html="true"
                            data-content={packageData?.technical_level_note}
                            data-trigger="hover"
                          >
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </span>
                      </div>
                    </div>

                    <div className="activity-physical-condition">
                      <i
                        className="fa fa-heartbeat icon"
                        aria-hidden="true"
                      ></i>

                      <div className="activity-info-detail">
                        <span className="activity-infos-details-label">
                          Physical level :&nbsp;
                        </span>

                        <span className="activity-infos-details-value">
                          {packageData?.physical_level_label}
                          <div
                            className="custom-popover inline most-darker-grey with-icon small"
                            data-toggle="popover"
                            data-container="body"
                            data-placement="bottom"
                            data-html="true"
                            data-content={packageData?.physical_level_note}
                            data-trigger="hover"
                          >
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </span>
                      </div>
                    </div>

                    <div className="activity-nb-participants-max">
                      <i className="fa fa-users icon" aria-hidden="true"></i>

                      <div className="activity-info-detail">
                        <span className="activity-infos-details-label">
                          Max group size :&nbsp;
                        </span>

                        <span className="activity-infos-details-value">
                          {packageData?.max_group_size_label}
                        </span>
                      </div>
                    </div>

                    <div className="activity-season">
                      <div>
                        <i
                          className="fa fa-calendar icon"
                          aria-hidden="true"
                        ></i>

                        <div className="activity-info-detail">
                          <span className="activity-infos-details-label">
                            Season :&nbsp;
                          </span>

                          <span className="activity-infos-details-value">
                            <span className="capitalize">
                              {packageData?.season_from}
                              <i className="material-icons season-from-to-icon">
                                arrow_forward
                              </i>
                              {packageData?.season_to}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="buttons-zone-desktop-principal"
                  className="activity-infos-details"
                >
                  <button
                    type="button"
                    className="btn custom-button rounded hover-grow white medium-button wrap stretch-width activity-question-link without-dates"
                    onClick={() => {
                      setModalType("Quote");
                      setIsModalOpen(true);
                    }}
                  >
                    <span className="hidden-xs"> Ask for more info </span>
                    <span className="visible-xs"> Ask for more info </span>
                  </button>

                  <div
                    className="btn custom-button rounded hover-grow solid-yellow stretch-width wrap activity-book-it book-now-form-btn"
                    onClick={() => {
                      setModalType("Quote");
                      setIsModalOpen(true);
                    }}
                  >
                    <span className="book"> Request a quote </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sub-zone-background-white"></div>
          </div>
        </div>
      </div>

      <div className="main-zone secondary-div full-width">
        <div className="row">
          <div id="bottom-left-col" className="col-sm-12 custom-col">
            <div
              id="general-conditions-zone"
              className="row sub-main-zone sub-zone-full-width-background"
              style={{ scrollMarginTop: "120px" }}
            >
              <div className="col-sm-12 custom-col full-width-content">
                <div className="sub-zone-title">
                  <h2>Practical information</h2>
                </div>
                <div className="sub-zone-content">
                  <div className="row">
                    <div className="col-sm-3 content-menu-col">
                      <div id="general-conditions-menu-container">
                        <div id="general-conditions-menu">
                          <ul className="nav nav-tabs" role="tablist">
                            {practicalInformation.map((item, index) => (
                              <li
                                key={item.id ?? item.sort_order}
                                data-index={index}
                              >
                                <div className="icon">&nbsp;</div>
                                <Link
                                  href={`${pathname}#h3-${index}`}
                                  className="scroll-smoothly"
                                  data-offset="-50"
                                >
                                  <div
                                    data-toggle="collapse"
                                    data-target="#general-conditions-menu-container"
                                  ></div>
                                  {item.question}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-9 content-col">
                      <div
                        id="general-conditions"
                        className="content-text content-text-2"
                      >
                        <div className="markdown-content activity-like">
                          {practicalInformation.map((item, index) => (
                            <div key={item.id ?? item.sort_order}>
                              <h3 id={`h3-${index}`}>{item.question}</h3>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.answer_html || "",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row full-width-background" aria-hidden="true" />
            </div>
            <div
              id="related-activities-zone"
              className="row sub-main-zone sub-zone-background-white"
            >
              <div className="sub-zone-title">
                <h2>Other holiday ideas</h2>
                <div className="sub-zone-link">
                  <Link
                    href="/#children-landings-zone"
                    className="no-decoration related-top-category-link"
                  >
                    <span className="material-icons">chevron_right</span>
                    &nbsp;View all our adventures
                  </Link>
                </div>
              </div>

              <div
                id="related-activities-zone-h-scrollable-zone"
                className="h-scrollable-vignettes-outer-zone"
                data-initialized="false"
              >
                <div className="left-trigger hover-grow">
                  <div className="trigger-container">
                    <div className="photo-container">
                      <img
                        className="photo ratio-10000"
                        src="/assets/arrow_picto-53b8fa32362b481e2ef3b1c4e5b6c0b8.svg"
                        alt="Arrow"
                        title=""
                        width="50"
                        height="50"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="h-scrollable-vignettes-zone"
                  style={{ left: 0 }}
                >
                  {loading ? (
                    <div
                      style={{
                        padding: "40px",
                        textAlign: "center",
                        width: "100%",
                        fontStyle: "italic",
                      }}
                    >
                      Loading similar adventures...
                    </div>
                  ) : (
                    similarPackages.map((pkg) => {
                      const pkgFirstPrice = pkg.package_pricing_tiers?.[0];
                      const pkgFirstPriceLabel = pkgFirstPrice
                        ? formatPrice(
                            pkgFirstPrice.price_amount,
                            pkgFirstPrice.currency_code,
                          )
                        : "N/A";
                      const pkgFirstPriceSuffix =
                        pkgFirstPrice?.per_label || "/person";
                      const imageUrl =
                        pkg.package_carousel_images?.[0]?.image_url ||
                        "https://media.kazaden.com/imgth/864x380/img/activity_instructor_indep/5408/IMG_20230725_165002-3.jpg";

                      return (
                        <div key={pkg.id} className="outer-vignette">
                          <div
                            id={`vignette-activity-${pkg.id}`}
                            className="vignette vignette-activity vignette-no-portrait vignette-no-strengths vignette-selected-activity vignette-large"
                          >
                            <Link
                              href={`/packages/${pkg.slug}`}
                              className="no-decoration"
                            >
                              <div className="vignette-row flex-sm-row row">
                                <div
                                  className="vignette-image with-stripe"
                                  style={{
                                    backgroundImage: `url("${imageUrl}")`,
                                  }}
                                >
                                  <div className="photo-container">
                                    <img
                                      className="photo ratio-4398"
                                      src={imageUrl}
                                      alt={pkg.title}
                                      width="864"
                                      height="380"
                                      style={{
                                        paddingTop: 0,
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                                  <div className="img-filter"></div>
                                  <div className="activity-route-map-trigger hidden-touch hidden-xs">
                                    <i
                                      className="fa fa-map-o icon"
                                      aria-hidden="true"
                                    ></i>
                                    <div
                                      className="activity-route-map hidden-touch hidden-xs"
                                      data-load="true"
                                    ></div>
                                  </div>
                                </div>

                                <div className="content-wrapper">
                                  <div className="vignette-label">
                                    <div className="vignette-label-line">
                                      <h3 className="activity-name">
                                        {pkg.title}
                                      </h3>
                                    </div>
                                    <div className="vignette-label-line">
                                      <div className="row flex-row infos-row">
                                        <div className="activity-instructor-name-location-zone flex-col">
                                          <div className="description-inner-zone">
                                            {pkg.subtitle}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="instructor-duration-and-price-row">
                                      <div className="departure-and-details">
                                        <div className="vignette-label-line details-zone">
                                          <div className="price-and-duration-row">
                                            <div className="activity-price-zone">
                                              <div className="price-prefix">
                                                From
                                              </div>
                                              <div className="price">
                                                &nbsp;{pkgFirstPriceLabel}&nbsp;
                                              </div>
                                              <div className="price-suffix per-person-suffix">
                                                {pkgFirstPriceSuffix}
                                              </div>
                                            </div>
                                            <span className="activity-duration value">
                                              {pkg.duration_label}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="right-trigger hover-grow">
                  <div className="trigger-container">
                    <div className="photo-container">
                      <img
                        className="photo ratio-10000"
                        src="/assets/arrow_picto-53b8fa32362b481e2ef3b1c4e5b6c0b8.svg"
                        alt="Arrow"
                        width="50"
                        height="50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageData={packageData}
        type={modalType}
      />
    </div>
  );
}

export default Principal;
