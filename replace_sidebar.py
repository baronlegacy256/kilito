import sys

with open('c:/Users/Administrator/Documents/barakatechlabs/kilito-next/components/Home/Packages.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '        {/* ── Sidebar filters ── */}'
end_marker = '        {/* ── Main listing column ── */}'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print('Markers not found')
    sys.exit(1)

new_sidebar = """        {/* ── Sidebar filters ── */}
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
              <form onSubmit={(e) => e.preventDefault()} id="activity-sort-form">
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
                          { value: "South Africa", label: "South Africa" },
                          { value: "Kenya", label: "Kenya" },
                          { value: "Namibia", label: "Namibia" },
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
                            <span style={{ cursor: "pointer", display: "block", padding: "3px 20px" }}>
                              {dest.label}
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

                {/* Dates filter */}
                <div className="column-filter-elem">
                  <button
                    type="button"
                    className="filter-title btn custom-button white stretch-width"
                    data-toggle="collapse"
                    data-target="#departureDate-filter"
                  >
                    Your dates
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>

                  <div id="departureDate-filter" className="filter-values collapse in">
                    <div className="custom-form-field separated white filter">
                      <input
                        type="date"
                        className="datepicker auto-submit"
                        autoComplete="off"
                        name="departureDate"
                        value={filters.departureDate}
                        onChange={(e) =>
                          handleFilterChange("departureDate", e.target.value)
                        }
                        placeholder="Date"
                        style={{ appearance: "none" }}
                      />
                      <span className="icon-container">
                        <i className="material-icons">date_range</i>
                      </span>
                    </div>

                    <div className="custom-form-field separated white filter">
                      <select
                        className="custom-multiple-select auto-submit"
                        name="durationsList"
                        value={filters.durations[0] || ""}
                        onChange={(e) =>
                          handleFilterChange("durations", [e.target.value])
                        }
                        style={{ appearance: "none", background: "transparent", border: "none", width: "100%", height: "100%", paddingLeft: "15px" }}
                      >
                        <option value="">Duration</option>
                        <option value="TRIP">4 to 8 days</option>
                        <option value="LONG">9 days or more</option>
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
                    data-toggle="collapse"
                    data-target="#physicalConditionLevels-filter"
                  >
                    Physical level
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>

                  <div id="physicalConditionLevels-filter" className="filter-values collapse in">
                    {[
                      {
                        id: "physicalConditionRequiredList[1]",
                        value: "OCCASIONNAL",
                        label: "Casual athlete",
                      },
                      {
                        id: "physicalConditionRequiredList[2]",
                        value: "REGULAR",
                        label: "Regular athlete",
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
                    <div className="price-slider-container" style={{ position: "relative", paddingBottom: "20px" }}>
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
                          const val = Math.min(Number(e.target.value), (filters.maxPrice || 5000) - 50);
                          handleFilterChange("minPrice", val);
                        }}
                        style={{
                          position: "absolute",
                          width: "100%",
                          zIndex: 3,
                          opacity: 0,
                          cursor: "pointer",
                          height: "20px",
                          top: "-5px"
                        }}
                      />
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="50"
                        value={filters.maxPrice || 5000}
                        onChange={(e) => {
                          const val = Math.max(Number(e.target.value), (filters.minPrice || 0) + 50);
                          handleFilterChange("maxPrice", val);
                        }}
                        style={{
                          position: "absolute",
                          width: "100%",
                          zIndex: 4,
                          opacity: 0,
                          cursor: "pointer",
                          height: "20px",
                          top: "-5px"
                        }}
                      />

                      <div className="price-slider-range ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false">
                        <div
                          className="ui-slider-range ui-widget-header ui-corner-all"
                          style={{
                            left: `${((filters.minPrice || 0) / 5000) * 100}%`,
                            width: `${(((filters.maxPrice || 5000) - (filters.minPrice || 0)) / 5000) * 100}%`
                          }}
                        ></div>
                        <a
                          className="ui-slider-handle ui-state-default ui-corner-all"
                          href="#"
                          style={{ left: `${((filters.minPrice || 0) / 5000) * 100}%` }}
                          onClick={(e) => e.preventDefault()}
                        ></a>
                        <a
                          className="ui-slider-handle ui-state-default ui-corner-all"
                          href="#"
                          style={{ left: `${((filters.maxPrice || 5000) / 5000) * 100}%` }}
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

                {/* Stay type filter */}
                <div className="column-filter-elem">
                  <button
                    type="button"
                    className="filter-title btn custom-button white stretch-width"
                    data-toggle="collapse"
                    data-target="#activityTagList-filter"
                  >
                    Stay type
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>

                  <div id="activityTagList-filter" className="filter-values collapse in">
                    <div className="custom-form-field separated white filter">
                      <select
                        className="custom-multiple-select auto-submit"
                        name="activityTagList"
                        value={filters.stayTypes[0] || ""}
                        onChange={(e) =>
                          handleFilterChange("stayTypes", [e.target.value])
                        }
                        style={{ appearance: "none", background: "transparent", border: "none", width: "100%", height: "100%", paddingLeft: "15px" }}
                      >
                        <option value="">Type</option>
                        <option value="65">With family</option>
                        <option value="226">Luxury Hotel</option>
                        <option value="225">Lodge</option>
                        <option value="191">Group Safari</option>
                        <option value="190">Private Safari</option>
                        <option value="227">Honeymoon</option>
                        <option value="224">Wildcamp & Hotel</option>
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
                    data-toggle="collapse"
                    data-target="#keywords-filter"
                  >
                    Keywords
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>

                  <div id="keywords-filter" className="filter-values collapse in">
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

                {/* Proximity filter */}
                <div className="column-filter-elem last">
                  <button
                    type="button"
                    className="filter-title btn custom-button white stretch-width collapsed"
                    data-toggle="collapse"
                    data-target="#locationName-filter"
                  >
                    Near
                    <i className="material-icons uncollapsed-icon">
                      expand_less
                    </i>
                    <i className="material-icons collapsed-icon">expand_more</i>
                  </button>

                  <div id="locationName-filter" className="filter-values collapse">
                    <div className="autoCompleteDiv autocompletedDiv-auto-submit custom-form-field separated white filter">
                      <input
                        type="text"
                        name="locationName"
                        className="autoCompleteSearchField pac-target-input"
                        placeholder="Example: Zanzibar"
                        id="locationName"
                        autoComplete="off"
                      />
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
"""

new_content = content[:start_idx] + new_sidebar + "\n" + content[end_idx:]

with open('c:/Users/Administrator/Documents/barakatechlabs/kilito-next/components/Home/Packages.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Successfully replaced the sidebar')
