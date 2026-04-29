"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

function Packages() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [sortType, setSortType] = useState("RELEVANCE");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: categoryParam || "All",
    keywords: "",
    physicalLevel: [],
    minPrice: "",
    maxPrice: "",
    departureDate: "",
    durations: [],
    stayTypes: [],
  });
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
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
                filters.maxPrice
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
                <span className="btn-text">Clear all filters</span>
              </div>
            </div>

            {/* Mobile sort (visible on xs/sm only) */}
            <div
              id="activity-sorting-filters"
              className="list-filter visible-xs visible-sm"
            >
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
            </div>

            {/* Main filter form — onSubmit replaces the jQuery ajax inline handler */}
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
                      >
                        <div className="inner">
                          <span className="label-text">
                            {filters.category === "All"
                              ? "Destinations"
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
                          { value: "All", label: "All Destinations" },
                          { value: "Safari tour", label: "Safari" },
                          {
                            value: "Climbing and Trekking",
                            label: "Climbing & Trekking",
                          },
                          { value: "Cultural tour", label: "Cultural tour" },
                        ].map((dest) => (
                          <li
                            key={dest.value}
                            onClick={() => {
                              handleFilterChange("category", dest.value);
                              setDestDropdownOpen(false);
                            }}
                          >
                            <a style={{ cursor: "pointer" }}>{dest.label}</a>
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
                  readOnly
                />

                {/* Dates filter */}
                <div className="column-filter-elem">
                  <button
                    type="button"
                    className="filter-title btn custom-button white stretch-width"
                  >
                    Your dates
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>
                  <div className="filter-values collapse in">
                    <div className="custom-form-field separated white filter">
                      <input
                        type="date"
                        className="auto-submit"
                        autoComplete="off"
                        name="departureDate"
                        value={filters.departureDate}
                        onChange={(e) =>
                          handleFilterChange("departureDate", e.target.value)
                        }
                        placeholder="Date"
                        style={{ height: "34px", padding: "6px 12px" }}
                      />
                      <span className="icon-container">
                        <i className="material-icons">date_range</i>
                      </span>
                    </div>
                    <div className="custom-form-field separated white filter">
                      <select
                        className="custom-multiple-select auto-submit"
                        name="durationsList"
                        multiple
                        value={filters.durations}
                        onChange={(e) => {
                          const options = e.target.options;
                          const selected = [];
                          for (let i = 0; i < options.length; i++) {
                            if (options[i].selected)
                              selected.push(options[i].value);
                          }
                          handleFilterChange("durations", selected);
                        }}
                        style={{ height: "80px", padding: "6px" }}
                      >
                        <option value="TRIP">4 to 8 days</option>
                        <option value="LONG">9 days and more</option>
                      </select>
                      <span className="icon-container">
                        <i className="material-icons">expand_more</i>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Physical level filter */}
                <div className="column-filter-elem">
                  <button
                    type="button"
                    className="filter-title btn custom-button white stretch-width"
                  >
                    Physical level
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>
                  <div className="filter-values collapse in">
                    {[
                      {
                        id: "physicalCondition1",
                        value: "OCCASIONNAL",
                        label: "Occasional",
                      },
                      {
                        id: "physicalCondition2",
                        value: "REGULAR",
                        label: "Regular",
                      },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="custom-form-field separated white"
                      >
                        <div className="custom-checkbox-zone">
                          <input
                            type="checkbox"
                            name="physicalConditionRequiredList"
                            value={item.value}
                            checked={filters.physicalLevel.includes(item.value)}
                            onChange={(e) => {
                              const next = e.target.checked
                                ? [...filters.physicalLevel, item.value]
                                : filters.physicalLevel.filter(
                                    (x) => x !== item.value,
                                  );
                              handleFilterChange("physicalLevel", next);
                            }}
                            id={item.id}
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
                  >
                    Your budget
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>
                  <div className="filter-values collapse in">
                    <div
                      className="price-inputs"
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <input
                        type="number"
                        placeholder="Min €"
                        value={filters.minPrice}
                        onChange={(e) =>
                          handleFilterChange("minPrice", e.target.value)
                        }
                        style={{
                          width: "50%",
                          padding: "5px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                        }}
                      />
                      <input
                        type="number"
                        placeholder="Max €"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          handleFilterChange("maxPrice", e.target.value)
                        }
                        style={{
                          width: "50%",
                          padding: "5px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Stay type filter */}
                <div className="column-filter-elem">
                  <button
                    type="button"
                    className="filter-title btn custom-button white stretch-width"
                  >
                    Stay type
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>
                  <div className="filter-values collapse in">
                    <div className="custom-form-field separated white filter">
                      <select
                        className="custom-multiple-select auto-submit"
                        name="activityTagList"
                        multiple
                        value={filters.stayTypes}
                        onChange={(e) => {
                          const options = e.target.options;
                          const selected = [];
                          for (let i = 0; i < options.length; i++) {
                            if (options[i].selected)
                              selected.push(options[i].value);
                          }
                          handleFilterChange("stayTypes", selected);
                        }}
                        style={{ height: "120px", padding: "6px" }}
                      >
                        {[
                          {
                            value: "228",
                            label: "Self-drive tour without guide",
                          },
                          { value: "33", label: "Bivouac, under tent" },
                          { value: "65", label: "With family" },
                          { value: "226", label: "Luxury hotel" },
                          { value: "225", label: "Lodge" },
                          { value: "191", label: "Group safari" },
                          { value: "190", label: "Private safari" },
                          { value: "227", label: "Honeymoon" },
                          { value: "224", label: "Wildcamp & Hotel" },
                        ].map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <span className="icon-container">
                        <i className="material-icons">expand_more</i>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Keywords filter */}
                <div className="column-filter-elem">
                  <button
                    type="button"
                    className="filter-title btn custom-button white stretch-width collapsed"
                  >
                    Keywords
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>
                  <div className="filter-values collapse in">
                    <div className="custom-form-field separated white filter">
                      <input
                        type="text"
                        name="keywords"
                        value={filters.keywords}
                        placeholder="Search..."
                        onChange={(e) =>
                          handleFilterChange("keywords", e.target.value)
                        }
                        className="auto-submit"
                      />
                      <span className="icon-container">
                        <i className="material-icons">search</i>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Proximity filter */}
                <div className="column-filter-elem last">
                  <button
                    type="button"
                    className="filter-title btn custom-button white stretch-width collapsed"
                  >
                    Near
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>
                  <div className="filter-values collapse">
                    <div className="custom-form-field separated white filter">
                      <input
                        type="text"
                        name="locationName"
                        defaultValue=""
                        placeholder="Ex: Zanzibar"
                      />
                      <input type="hidden" name="latitude" defaultValue="" />
                      <input type="hidden" name="longitude" defaultValue="" />
                      <input type="hidden" name="maxDistance" defaultValue="" />
                      <span className="icon-container">
                        <i className="material-icons">location_on</i>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hidden fields */}
                <input type="hidden" name="sportId" value="33" readOnly />
                <input type="hidden" name="countryId" defaultValue="" />
                <input type="hidden" name="regionId" defaultValue="" />
                <input type="hidden" name="subRegionId" defaultValue="" />
                <input
                  type="hidden"
                  name="activityStarCategoryId"
                  defaultValue=""
                />
                <input
                  type="hidden"
                  name="unindexedMode"
                  value="false"
                  readOnly
                />
                <input type="hidden" name="bl" value="false" readOnly />
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

export default Packages;
