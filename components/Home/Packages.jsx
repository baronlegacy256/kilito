"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DatePicker, Select } from "antd";
import BookingModal from "../Packages/BookingModal";

// Helper to format currency
const formatPrice = (amount, currency = "USD") => {
  if (amount === null || amount === undefined) return "On request";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Reusable star rating component
function StarRating({ count }) {
  return (
    <div className="rating-zone">
      {Array.from({ length: count }).map((_, i) => (
        <i
          key={i}
          className="rating-icon fa fa-star active"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

// Reusable full package card
function PackageCard({ pkg }) {
  const minPriceTier =
    pkg.package_pricing_tiers?.length > 0
      ? pkg.package_pricing_tiers.reduce(
          (min, cur) => (cur.price_amount < min.price_amount ? cur : min),
          pkg.package_pricing_tiers[0],
        )
      : null;

  return (
    <div className="row flex-sm-row">
      <div className="col-sm-12 flex-sm-col">
        <div
          id={`vignette-activity-${pkg.id}`}
          className="vignette vignette-activity vignette-line"
        >
          <Link href={`/packages/${pkg.slug}`} className="no-decoration">
            <div className="vignette-row flex-sm-row row">
              {/* Image column */}
              <div
                className="vignette-image with-stripe col-sm-5 flex-sm-col vignette-image-line"
                style={{ display: "block", maxWidth: "100%", padding: 0 }}
              >
                <div
                  className="photo-container"
                  style={{
                    display: "block",
                    height: "100%",
                    minHeight: "220px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {pkg.package_carousel_images?.[0]?.image_url ? (
                    <div
                      className="photo"
                      style={{
                        backgroundImage: `url(${pkg.package_carousel_images[0].image_url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : pkg.top_background_image ? (
                    <div
                      className="photo"
                      style={{
                        backgroundImage: `url(${pkg.top_background_image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <div
                      className="photo lazy-placeholder"
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "220px",
                        backgroundColor: "#eee",
                      }}
                    />
                  )}
                </div>
                <div className="img-filter" style={{ zIndex: 1 }} />
              </div>

              {/* Content column */}
              <div className="col-sm-7 flex-sm-col">
                <div className="vignette-label">
                  {/* Location + title */}
                  <div className="vignette-label-line">
                    <div className="activity-location-zone">
                      <span
                        className="glyphicon glyphicon-map-marker"
                        style={{ marginRight: "5px" }}
                      />
                      {pkg.location || "Tanzania"}
                    </div>
                    <h3 className="activity-name">{pkg.title}</h3>
                  </div>

                  {/* Stars + stamps + strengths */}
                  <div className="vignette-label-line">
                    <div className="row flex-row infos-row">
                      <div className="activity-instructor-name-location-zone flex-col">
                        <div className="stamps-zone">
                          <StarRating count={pkg.rating || 5} />
                          <div className="stamp activity-nature-stamp solid">
                            {pkg.technical_level_label || "PRIVATE TRIP"}
                          </div>
                        </div>
                        <ul className="strengths-inner-zone">
                          {pkg.package_pricing_tiers?.map((tier, tidx) => (
                            <li
                              key={tidx}
                              className="strength-elem"
                              style={{ paddingLeft: 0 }}
                            >
                              <span
                                style={{ marginRight: "8px", color: "#f7c324" }}
                              >
                                &bull;
                              </span>
                              {tier.label}:{" "}
                              <strong>
                                {formatPrice(
                                  tier.price_amount,
                                  tier.currency_code,
                                )}
                              </strong>{" "}
                              {tier.per_label || "/person"}
                            </li>
                          ))}
                          {!pkg.package_pricing_tiers?.length && (
                            <li className="strength-elem">
                              Contact us for pricing
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Duration, price, instructor */}
                  <div className="instructor-duration-and-price-row">
                    <div className="departure-and-details">
                      {(() => {
                        const today = new Date().toISOString().split("T")[0];
                        const futureGroups =
                          pkg.groups?.filter((g) => g.start_date >= today) ||
                          [];
                        if (futureGroups.length > 0) {
                          const nextDep = futureGroups.reduce(
                            (min, cur) =>
                              cur.start_date < min.start_date ? cur : min,
                            futureGroups[0],
                          );

                          const d = new Date(nextDep.start_date);
                          const day = String(d.getDate()).padStart(2, "0");
                          const month = String(d.getMonth() + 1).padStart(
                            2,
                            "0",
                          );
                          const year = d.getFullYear();
                          return (
                            <div className="vignette-label-line">
                              <div className="activity-next-departure-zone maskable-next-departure">
                                <span className="fa fa-calendar-o icon" />
                                <span className="value maskable-default-date-label">
                                  Next departure:{" "}
                                  <span className="date">{`${day}/${month}/${year}`}</span>
                                </span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })()}
                      <div className="vignette-label-line details-zone">
                        <span className="activity-duration value">
                          {pkg.duration_label}
                        </span>
                        <div className="price-and-duration-row">
                          <div className="activity-price-zone">
                            <div className="price-prefix">starting from</div>
                            <div className="price">
                              &nbsp;
                              {minPriceTier ? minPriceTier.price_amount : "---"}
                              {minPriceTier?.currency_code === "EUR"
                                ? "€"
                                : "$"}
                              &nbsp;
                            </div>
                            <div className="price-suffix per-person-suffix">
                              /person
                            </div>
                          </div>
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
    </div>
  );
}

// Placeholder card for lazy-loaded items
// Placeholder card for skeleton loading
function PlaceholderCard() {
  return (
    <div className="row flex-sm-row">
      <div className="col-sm-12 flex-sm-col">
        <div className="activity-vignette-placeholder long">
          <div className="long-row row flex-sm-row">
            <div className="col-sm-5 custom-col flex-sm-col lazy-placeholder">
              <div
                className="image lazy-placeholder"
                style={{
                  backgroundColor: "#f0f0f0",
                  height: "100%",
                  minHeight: "180px",
                }}
              />
            </div>
            <div className="col-sm-7 custom-col flex-sm-col">
              <div className="long-details-col row flex-xs-row">
                <div className="col-xs-12 flex-xs-col details-col">
                  <div className="details" style={{ padding: "15px" }}>
                    <div
                      className="lazy-placeholder"
                      style={{
                        width: "60%",
                        height: "24px",
                        marginBottom: "15px",
                        backgroundColor: "#f0f0f0",
                      }}
                    />
                    <div className="info">
                      <div className="rating-strengths">
                        <div
                          className="rating lazy-placeholder"
                          style={{
                            width: "100px",
                            height: "16px",
                            marginBottom: "10px",
                            backgroundColor: "#f0f0f0",
                          }}
                        />
                        <ul className="strengths lazy-text-placeholder">
                          <li
                            className="lazy-placeholder"
                            style={{
                              width: "80%",
                              height: "12px",
                              marginBottom: "5px",
                              backgroundColor: "#f5f5f5",
                            }}
                          />
                          <li
                            className="lazy-placeholder"
                            style={{
                              width: "70%",
                              height: "12px",
                              marginBottom: "5px",
                              backgroundColor: "#f5f5f5",
                            }}
                          />
                        </ul>
                      </div>
                      <div
                        className="duration-price"
                        style={{ marginTop: "20px" }}
                      >
                        <div
                          className="duration lazy-placeholder"
                          style={{
                            width: "40%",
                            height: "16px",
                            backgroundColor: "#f0f0f0",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PackagesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [sortType, setSortType] = useState("RELEVANCE");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: categoryParam || "All",
    packageType: "All",
    keywords: "",
    physicalLevel: [],
    minPrice: "",
    maxPrice: "",
    departureDate: "",
    durations: [],
    stayTypes: [],
  });
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [pkgTypeDropdownOpen, setPkgTypeDropdownOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update category filter if query param changes
  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category !== "All")
        params.append("category", filters.category);
      if (filters.packageType !== "All")
        params.append("packageType", filters.packageType);
      if (filters.keywords) params.append("keywords", filters.keywords);
      if (filters.physicalLevel.length)
        params.append("physicalLevel", filters.physicalLevel.join(","));
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.departureDate)
        params.append("departureDate", filters.departureDate);
      if (filters.durations.length)
        params.append("durations", filters.durations.join(","));
      if (filters.stayTypes.length)
        params.append("stayTypes", filters.stayTypes.join(","));
      params.append("sortType", sortType);

      const res = await fetch(`/api/packages?${params.toString()}`);
      const data = await res.json();
      setItems(data.packages || []);
    } catch (err) {
      console.error("Failed to fetch packages:", err);
    } finally {
      setLoading(false);
    }
  }, [filters, sortType]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleRenderModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div id="activities-research-zone" className="listing-inline">
      <div className="row">
        {/* ── Sidebar filters ── */}
        <div className="col-md-3 custom-col">
          <div id="filters-container">
            {/* Mobile toggle button */}
            <div className="visible-xs visible-sm button-container">
              <button
                id="minimize-filters-button"
                type="button"
                className="btn custom-button solid-pastel-blue squared uppercase stretch-width"
                onClick={() => setShowFilters(!showFilters)}
                aria-expanded={showFilters}
                aria-controls="filters-container"
              >
                {showFilters ? "Hide filters" : "Show filters"}
                <i className="material-icons">
                  {showFilters ? "expand_less" : "expand_more"}
                </i>
              </button>
            </div>

            {/* Reset filters */}
            <div
              className={
                filters.category !== "All" ||
                filters.keywords ||
                filters.physicalLevel.length > 0 ||
                filters.minPrice ||
                filters.maxPrice ||
                filters.departureDate ||
                filters.durations.length > 0 ||
                filters.stayTypes.length > 0
                  ? ""
                  : "hidden"
              }
            >
              <div
                className="reset-all-button btn white no-border custom-button stretch-width"
                style={{ cursor: "pointer", marginBottom: "15px" }}
                onClick={() =>
                  setFilters({
                    category: "All",
                    keywords: "",
                    physicalLevel: [],
                    minPrice: "",
                    maxPrice: "",
                    departureDate: "",
                    durations: [],
                    stayTypes: [],
                  })
                }
              >
                <i className="fa fa-times" aria-hidden="true" />
                <span className="btn-text">Remove all filters</span>
              </div>
            </div>

            {/* Mobile sort (visible on xs/sm only) */}
            <div
              id="activity-sorting-filters"
              className="list-filter visible-xs visible-sm"
            >
              <form
                onSubmit={(e) => e.preventDefault()}
                id="activity-sort-form"
              >
                <div className="custom-form-field with-icon separated white">
                  <select
                    name="sortType"
                    className="auto-submit"
                    id="sortType"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                  >
                    <option value="RELEVANCE">Relevance</option>
                    <option value="DURATION_ASC">Increasing duration</option>
                    <option value="DURATION_DESC">Decreasing duration</option>
                    <option value="NEXT_DEPARTURE">Next departure</option>
                  </select>
                  <span className="icon-container">
                    <i className="material-icons">expand_more</i>
                  </span>
                </div>
              </form>
            </div>

            {/* Main filter form */}
            <form
              method="post"
              action="#"
              id="search-form"
              className={showFilters ? "show" : "hidden-xs hidden-sm"}
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Destinations dropdown */}
              <div id="top-filtering-column-zone">
                <div className="column-filter-elem">
                  <div className="filter-title">Destinations</div>
                  <div className="region-filters filter-values">
                    <div className="dropdown filter">
                      <button
                        type="button"
                        onClick={() => setDestDropdownOpen(!destDropdownOpen)}
                        className="btn custom-button separated white stretch-width dropdown-toggle last"
                        aria-expanded={destDropdownOpen}
                      >
                        <div className="inner">
                          <span className="label-text">
                            {filters.category === "All"
                              ? "Tanzania"
                              : filters.category}
                          </span>
                          <i className="material-icons">expand_more</i>
                        </div>
                      </button>
                      <ul
                        className={`dropdown-menu ${destDropdownOpen ? "show" : ""}`}
                        role="menu"
                        style={{ display: destDropdownOpen ? "block" : "none" }}
                      >
                        {[
                          { value: "Tanzania", label: "Tanzania" },
                          { value: "All", label: "All Destinations" },
                        ].map((dest) => (
                          <li
                            key={dest.value}
                            onClick={() => {
                              handleFilterChange("category", dest.value);
                              setDestDropdownOpen(false);
                            }}
                          >
                            <span
                              style={{
                                cursor: "pointer",
                                display: "block",
                                padding: "3px 20px",
                              }}
                            >
                              {dest.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Package Type dropdown */}
                <div className="column-filter-elem">
                  <div className="filter-title">Package Type</div>
                  <div className="region-filters filter-values">
                    <div className="dropdown filter">
                      <button
                        type="button"
                        onClick={() =>
                          setPkgTypeDropdownOpen(!pkgTypeDropdownOpen)
                        }
                        className="btn custom-button separated white stretch-width dropdown-toggle last"
                        aria-expanded={pkgTypeDropdownOpen}
                      >
                        <div className="inner">
                          <span className="label-text">
                            {filters.packageType === "All"
                              ? "All packages"
                              : filters.packageType}
                          </span>
                          <i className="material-icons">expand_more</i>
                        </div>
                      </button>
                      <ul
                        className={`dropdown-menu ${pkgTypeDropdownOpen ? "show" : ""}`}
                        role="menu"
                        style={{
                          display: pkgTypeDropdownOpen ? "block" : "none",
                        }}
                      >
                        {[
                          { value: "Safari tour", label: "Safari tour" },
                          {
                            value: "Climbing and Trekking",
                            label: "Climbing and Trekking",
                          },
                          { value: "Cultural tour", label: "Cultural tour" },
                          { value: "All", label: "All packages" },
                        ].map((pkg) => (
                          <li
                            key={pkg.value}
                            onClick={() => {
                              handleFilterChange("packageType", pkg.value);
                              setPkgTypeDropdownOpen(false);
                            }}
                          >
                            <span
                              style={{
                                cursor: "pointer",
                                display: "block",
                                padding: "3px 20px",
                              }}
                            >
                              {pkg.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column filters */}
              <div id="research-filters" className="research-filtering-zone">
                <input
                  type="hidden"
                  name="sortType"
                  value="RELEVANCE"
                  id="sortType"
                  readOnly
                />

                {/* Physical level filter */}
                <div className="column-filter-elem">
                  <button
                    type="button"
                    className="filter-title btn custom-button white stretch-width"
                    data-toggle="collapse"
                    data-target="#physicalConditionLevels-filter"
                  >
                    Physical level
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>

                  <div
                    id="physicalConditionLevels-filter"
                    className="filter-values collapse in"
                  >
                    {[
                      {
                        id: "physicalConditionRequiredList[1]",
                        value: "SUITABLE",
                        label: "Suitable for all",
                      },
                      {
                        id: "physicalConditionRequiredList[2]",
                        value: "ALL LEVELS",
                        label: "All Levels",
                      },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="custom-form-field separated white"
                      >
                        <div className="custom-checkbox-zone">
                          <input
                            type="checkbox"
                            name={`physicalConditionRequiredList[${item.value}]`}
                            value={item.value}
                            className="auto-submit"
                            id={item.id}
                            checked={filters.physicalLevel.includes(item.value)}
                            onChange={(e) => {
                              const next = e.target.checked
                                ? [...filters.physicalLevel, item.value]
                                : filters.physicalLevel.filter(
                                    (x) => x !== item.value,
                                  );
                              handleFilterChange("physicalLevel", next);
                            }}
                          />
                          <label htmlFor={item.id} className="filter-label">
                            {item.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration filter */}
                <div className="column-filter-elem">
                  <button
                    type="button"
                    className="filter-title btn custom-button white stretch-width"
                    data-toggle="collapse"
                    data-target="#durations-filter"
                  >
                    Duration
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>

                  <div
                    id="durations-filter"
                    className="filter-values collapse in"
                  >
                    {[
                      {
                        id: "duration[TRIP]",
                        value: "TRIP",
                        label: "4 to 8 days",
                      },
                      {
                        id: "duration[LONG]",
                        value: "LONG",
                        label: "9 days or more",
                      },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="custom-form-field separated white"
                      >
                        <div className="custom-checkbox-zone">
                          <input
                            type="checkbox"
                            name={item.id}
                            value={item.value}
                            className="auto-submit"
                            id={item.id}
                            checked={filters.durations.includes(item.value)}
                            onChange={(e) => {
                              const next = e.target.checked
                                ? [...filters.durations, item.value]
                                : filters.durations.filter(
                                    (x) => x !== item.value,
                                  );
                              handleFilterChange("durations", next);
                            }}
                          />
                          <label htmlFor={item.id} className="filter-label">
                            {item.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget filter */}
                <div className="column-filter-elem">
                  <button
                    type="button"
                    className="filter-title btn custom-button white stretch-width"
                    data-toggle="collapse"
                    data-target="#price-filter"
                  >
                    Your budget
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>

                  <div id="price-filter" className="filter-values collapse in">
                    <div
                      className="price-slider-container"
                      style={{ position: "relative", paddingBottom: "20px" }}
                    >
                      <input
                        type="hidden"
                        name="minPrice"
                        className="auto-submit minPrice"
                        value={filters.minPrice}
                      />
                      <input
                        type="hidden"
                        name="maxPrice"
                        className="auto-submit maxPrice"
                        value={filters.maxPrice}
                      />

                      {/* Native range inputs acting as dual handles */}
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="50"
                        value={filters.minPrice || 0}
                        onChange={(e) => {
                          const val = Math.min(
                            Number(e.target.value),
                            (filters.maxPrice || 5000) - 50,
                          );
                          handleFilterChange("minPrice", val);
                        }}
                        style={{
                          position: "absolute",
                          width: "100%",
                          zIndex: 3,
                          opacity: 0,
                          cursor: "pointer",
                          height: "20px",
                          top: "-5px",
                        }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="50"
                        value={filters.maxPrice || 5000}
                        onChange={(e) => {
                          const val = Math.max(
                            Number(e.target.value),
                            (filters.minPrice || 0) + 50,
                          );
                          handleFilterChange("maxPrice", val);
                        }}
                        style={{
                          position: "absolute",
                          width: "100%",
                          zIndex: 4,
                          opacity: 0,
                          cursor: "pointer",
                          height: "20px",
                          top: "-5px",
                        }}
                      />

                      <div
                        className="price-slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
                        aria-disabled="false"
                      >
                        <div
                          className="ui-slider-range ui-widget-header ui-corner-all"
                          style={{
                            left: `${((filters.minPrice || 0) / 5000) * 100}%`,
                            width: `${(((filters.maxPrice || 5000) - (filters.minPrice || 0)) / 5000) * 100}%`,
                          }}
                        ></div>
                        <a
                          className="ui-slider-handle ui-state-default ui-corner-all"
                          href="#"
                          style={{
                            left: `${((filters.minPrice || 0) / 5000) * 100}%`,
                          }}
                          onClick={(e) => e.preventDefault()}
                        ></a>
                        <a
                          className="ui-slider-handle ui-state-default ui-corner-all"
                          href="#"
                          style={{
                            left: `${((filters.maxPrice || 5000) / 5000) * 100}%`,
                          }}
                          onClick={(e) => e.preventDefault()}
                        ></a>
                      </div>

                      <div className="price-range">
                        <div className="price-range-min">
                          €{filters.minPrice || 0}
                        </div>
                        <div className="price-range-max">
                          €{filters.maxPrice || 5000}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keywords filter */}
                <div className="column-filter-elem">
                  <button
                    type="button"
                    className="filter-title btn custom-button white stretch-width collapsed"
                    data-toggle="collapse"
                    data-target="#keywords-filter"
                  >
                    Keywords
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>

                  <div
                    id="keywords-filter"
                    className="filter-values collapse in"
                  >
                    <div className="custom-form-field separated white filter">
                      <input
                        type="text"
                        name="keywords"
                        value={filters.keywords}
                        onChange={(e) =>
                          handleFilterChange("keywords", e.target.value)
                        }
                        className="auto-submit"
                        id="keywords"
                        placeholder="Search..."
                      />
                      <span className="icon-container">
                        <i className="material-icons">search</i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* ── Main listing column ── */}
        <div className="col-md-9 custom-col">
          <div id="activityListZone" className="show-strengths">
            {/* Sort bar */}
            <div
              id="activity-sorting-zone"
              className="sorting-zone inline-elements"
            >
              <div>
                <h2 className="title">
                  {filters.category !== "All"
                    ? filters.category
                    : "All packages"}{" "}
                  :{" "}
                  <span id="totalResultsIndicator">
                    {items.length} {items.length === 1 ? "stay" : "stays"}
                  </span>
                </h2>
              </div>
              <div
                id="activity-sorting-filters"
                className="list-filter hidden-xs hidden-sm"
              >
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="custom-form-field with-icon separated white">
                    <select
                      name="sortType"
                      className="auto-submit"
                      value={sortType}
                      onChange={(e) => setSortType(e.target.value)}
                    >
                      <option value="RELEVANCE">Relevance</option>
                      <option value="DURATION_ASC">Duration ascending</option>
                      <option value="DURATION_DESC">Duration descending</option>
                      <option value="NEXT_DEPARTURE">Next departure</option>
                    </select>
                    <span className="icon-container">
                      <i className="material-icons">expand_more</i>
                    </span>
                  </div>
                </form>
              </div>
            </div>

            {/* List zone */}
            <div id="list-zone">
              <div className="load-more-zone previous" />

              <div id="sections-container">
                <div
                  id="products-section-1"
                  className="products-section"
                  data-section-index="1"
                  data-url="/sp-safari"
                  data-title="Safari Africa: Custom Trips and Stays - Kili to Savanna"
                  data-canonical="https://kilitosavannaadventures.com/sp-safari"
                  data-prev-link=""
                  data-next-link="https://kilitosavannaadventures.com/sp-safari?page=2"
                >
                  {loading ? (
                    <div className="loading-zone">
                      {[1, 2, 3].map((i) => (
                        <PlaceholderCard key={i} />
                      ))}
                    </div>
                  ) : items.length > 0 ? (
                    items.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)
                  ) : (
                    <div
                      className="no-results-zone"
                      style={{ padding: "40px", textAlign: "center" }}
                    >
                      <h3>No packages found matching your filters.</h3>
                      <p>
                        Try clearing some filters or searching for something
                        else.
                      </p>
                      <button
                        className="btn btn-link"
                        onClick={() => handleFilterChange("category", "All")}
                        style={{ textDecoration: "underline" }}
                      >
                        Reset all filters
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Load more hidden to avoid static count mismatch
              <div className="load-more-zone next">
                ... 
              </div> 
              */}
            </div>

            {/* Mobile bottom bar */}
            <div className="custom-bottom-zone">
              <div id="mobile-filter-trigger">
                <button
                  type="button"
                  className="btn custom-button white stretch-width wrap"
                >
                  <i className="fa fa-sliders" />
                  See filters
                </button>
              </div>
              <div id="mobile-custom-lead-trigger">
                <div
                  id="custom-lead-button"
                  className="btn custom-button solid-yellow stretch-width wrap"
                  onClick={handleRenderModal}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleRenderModal()}
                >
                  <span id="booking-link">
                    <i className="fa fa-file-text-o" aria-hidden="true" />
                    Custom quote
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageData={{ title: "Custom Safari Quote" }}
        type="Quote"
      />
      <style jsx global>{`
        .strength-elem::before,
        .strength-elem:before {
          content: none !important;
        }
      `}</style>
    </div>
  );
}

export default function Packages() {
  return (
    <React.Suspense
      fallback={<div className="loading-container">Loading packages...</div>}
    >
      <PackagesContent />
    </React.Suspense>
  );
}
