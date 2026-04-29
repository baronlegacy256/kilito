"use client";
import GenericPage from "../components/GenericPage";

const renderMoreOpinions = () => {
  console.log("Load more opinions clicked");
  // Implement logic if needed or leave as placeholder
};

export default function CustomerReviews() {
  return (
    <GenericPage title={"Customer Reviews"}>
      <div className="blank-mask"></div>

      <div id="main-zone" className="row">
        <div className="col-sm-2 hidden-xs" id="main-zone-menu">
          <div id="main-zone-menu-content">
            <ul id="main-zone-menu-list">
              <li className="active">
                <a href="/annexes/qui-sommes-nous">Who are we?</a>
              </li>
              <li className="">
                <a href="/annexes/avis">Customer reviews</a>
              </li>
              <li className="">
                <a href="/annexes/faq">FAQ</a>
              </li>
              <li className="">
                <a href="/presse">Press</a>
              </li>
              <li className="">
                <a href="/annexes/jobs">Jobs</a>
              </li>
              <li className="">
                <a href="/annexes/contact">Contact</a>
              </li>
              <li className="">
                <a href="/annexes/garanties">Guarantees</a>
              </li>
              <li className="">
                <a href="/annexes/newsletters">Newsletters</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-sm-10">
          <div className="opinion-content">
            <div className="sub-title">
              <h2>
                <span id="average-rating">4.7</span> /5&nbsp;&nbsp;
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
                &nbsp;&nbsp;
                <a
                  href="https://www.avis-verifies.com/avis-clients/kazaden.com"
                  target="_blank"
                >
                  2,700 Traveler Reviews
                </a>
              </h2>
              <a href="javascript:void(0)" id="views-modal-toggle">
                Publication criteria
              </a>
            </div>

            <div className="content-text">
              <div className="markdown-content">
                <p>
                  <span
                    style={{
                      backgroundColor: "transparent",
                      color: "rgb(0, 0, 0)",
                    }}
                  >
                    Our priority is to ensure you have an unforgettable stay.
                    Your satisfaction is our reward, and your feedback allows us
                    to continuously improve our offerings.
                  </span>
                </p>
                <p>
                  <span
                    style={{
                      backgroundColor: "transparent",
                      color: "rgb(0, 0, 0)",
                    }}
                  >
                    All our reviews are genuine and collected directly from you,
                    our customers. They are gathered through the trusted
                    "Verified Reviews" service or entered directly into the
                    customer account at the end of their stay.
                  </span>
                </p>
                <p>
                  <span
                    style={{
                      backgroundColor: "transparent",
                      color: "rgb(0, 0, 0)",
                    }}
                  >
                    On this page, you can find reviews reflecting the user
                    experience of our website. Reviews of stays are available on
                    both the catalog and stay pages.
                  </span>
                </p>
              </div>
            </div>

            <div id="opinions-list" className="opinions-zone">
              {/* Review: Séverine - March 2026 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Séverine</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">March 2026</div>
                          <div className="opinion-rate">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opinion-review">
                      The site is clear, well-organized, and provides a wealth
                      of information. It's easy to find what you're looking for.
                    </div>
                  </div>
                </div>
              </div>

              {/* Review: Gulay - March 2026 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Gulay</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">March 2026</div>
                          <div className="opinion-rate">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opinion-review">
                      The team is very responsive, available, and attentive to
                      customer requests. Excellent value for money on paper.
                      We're looking forward to the trip.
                    </div>
                  </div>
                </div>
              </div>

              {/* Review: Sylvie - March 2026 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Sylvie</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">March 2026</div>
                          <div className="opinion-rate">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opinion-review">
                      The booking went very well...with great professionalism
                      and kindness...hoping for the best for the future...
                    </div>
                  </div>
                </div>
              </div>

              {/* Review: Séverine - March 2026 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Séverine</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">March 2026</div>
                          <div className="opinion-rate">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opinion-review">
                      Booking was easy. The website is user-friendly and the
                      offers are well-detailed. Quick and efficient contact for
                      this first experience on Kazaden.com.
                    </div>
                  </div>
                </div>
              </div>

              {/* Review: Speedwell - March 2026 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Speedwell</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">March 2026</div>
                          <div className="opinion-rate">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opinion-review">
                      The initial contact was quick and efficient. There were no
                      surprises in the price of the planned stay.
                    </div>
                  </div>
                </div>
              </div>

              {/* Review: Annie - March 2026 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Annie</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">March 2026</div>
                          <div className="opinion-rate">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opinion-review">
                      Laure was a wonderful, friendly, attentive, and efficient
                      listener. She's a lovely person who inspired me to choose
                      Kazaden for this family trip.
                    </div>
                  </div>
                </div>
              </div>

              {/* Review: Pauline - Feb. 2026 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Pauline</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">Feb. 2026</div>
                          <div className="opinion-rate">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opinion-review">
                      The welcome was very professional, our questions were
                      answered, our wishes were taken into account, and we were
                      assigned a dedicated contact person for our file, making
                      it easy to follow up. Any questions or changes were
                      resolved immediately. The services included in our chosen
                      trip perfectly suited our needs. The advisor was warm and
                      attentive.
                    </div>
                  </div>
                </div>
              </div>

              {/* Review: Vivien - Feb. 2026 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Vivien</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">Feb. 2026</div>
                          <div className="opinion-rate">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opinion-review">
                      The website is very well structured. Excellent support:
                      the staff is very responsive and available. I highly
                      recommend it!
                    </div>
                  </div>
                </div>
              </div>

              {/* Review: Thierry - Feb. 2026 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Thierry</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">Feb. 2026</div>
                          <div className="opinion-rate">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opinion-review">
                      Quick and efficient in connecting you with the service
                      provider. Simplicity. Clarity. Easy communication via
                      email.
                    </div>
                  </div>
                </div>
              </div>

              {/* Review: Laure - Feb. 2026 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Laure</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">Feb. 2026</div>
                          <div className="opinion-rate">
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opinion-review">
                      Personalized contact and special attention to our needs.
                      The discount we received because we mentioned it was our
                      wedding anniversary made things much easier. The photos
                      and the option to call each other with personalized
                      messages were helpful. It was quite simple. Good
                      follow-up. A variety of options with clear pricing
                      outlining what is included and what isn't.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="show-more-opinions-button-zone">
              <button
                className="btn custom-button yellow no-border stretch-width"
                type="button"
                onClick={() =>
                  renderMoreOpinions(
                    "opinions-list",
                    "2649",
                    "/appendixClient/renderMoreOpinions",
                  )
                }
              >
                See more user reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </GenericPage>
  );
}
