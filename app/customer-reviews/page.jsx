"use client";
import GenericPage from "../components/GenericPage";
import Link from "next/link";

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
              <li className="">
                <Link href="/who-we-are">Who are we?</Link>
              </li>
              <li className="active">
                <Link href="/customer-reviews">Customer reviews</Link>
              </li>
              <li className="">
                <Link href="/faq">FAQ</Link>
              </li>
              <li className="">
                <Link href="/press">Press</Link>
              </li>
              <li className="">
                <Link href="/jobs">Jobs</Link>
              </li>
              <li className="">
                <Link href="/contact">Contact</Link>
              </li>
              <li className="">
                <Link href="/guarantees">Guarantees</Link>
              </li>
              <li className="">
                <Link href="/newsletters">Newsletters</Link>
              </li>
              <li className="">
                <Link href="/blog">Blog</Link>
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
                  Traveler Reviews
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
              {/* Review: Anonymous - May 2023 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">
                          TripAdvisor Traveler
                        </div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">May 2023</div>
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
                    <div className="opinion-title">
                      <strong>Amazing Safari!</strong>
                    </div>
                    <div className="opinion-review">
                      I did the safari in May with Godi to Ngorongoro — it was
                      an amazing experience!! Godi is really nice, professional,
                      patient, and really friendly. The park was amazing, we saw
                      lots of animals there. I recommend at 100%!!!
                    </div>
                  </div>
                </div>
              </div>

              {/* Review: Audrey O'Neal - Jun 2022 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Audrey O'Neal</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">Jun 2022</div>
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
                    <div className="opinion-title">
                      <strong>Awesome trip!</strong>
                    </div>
                    <div className="opinion-review">
                      I was a little hesitant about visiting Africa with just my
                      daughter and myself, but our guide Gordy spent the next
                      three weeks with us answering every question and catering
                      to our every need on the safaris. I would trust this young
                      man and his business with my life! Don't go for second
                      best — get the best person to help you with your trip to
                      Africa. The most honest and knowledgeable person you'll
                      ever meet.
                    </div>
                  </div>
                </div>
              </div>

              {/* Review: Christian W - Sep 2022 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Christian W</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">Sep 2022</div>
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
                    <div className="opinion-title">
                      <strong>Best safari experience in Africa</strong>
                    </div>
                    <div className="opinion-review">
                      Absolutely perfect safari experience with the best guide
                      ever. Highly recommendable! The staff was attentive and
                      had great knowledge of the sights we were visiting, as
                      well as in-depth knowledge about the cultural experiences
                      we had.
                    </div>
                  </div>
                </div>
              </div>

              {/* Review: Mister GK - Dec 2021 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Mister GK</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">Dec 2021</div>
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
                    <div className="opinion-title">
                      <strong>Great safari and trekking trip</strong>
                    </div>
                    <div className="opinion-review">
                      We had the most enjoyable and adventurous ending to our
                      Christmas Tanzania couples trip with our friendly guide.
                      Day one we went to Ngorongoro Crater for an exciting
                      safari watching Africa's wildlife, and day two to the foot
                      of Kilimanjaro with beautiful local fauna and tall, cold
                      waterfalls. Not only was everything perfect, but we felt
                      in every instance that our guide truly cared about us,
                      kept us safe, and did his best to make this trip
                      memorable. We will definitely be back!
                    </div>
                  </div>
                </div>
              </div>

              {/* Review: Holylight W - Jun 2021 */}
              <div className="opinion-container">
                <div className="row">
                  <div className="opinion col-xs-12 col-sm-10">
                    <div className="opinion-info">
                      <div className="opinion-name-date-and-rate">
                        <div className="opinion-client-name">Holylight W</div>
                        <div className="opinion-date-and-rate">
                          <div className="opinion-date">Jun 2021</div>
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
                    <div className="opinion-title">
                      <strong>Amazing trip</strong>
                    </div>
                    <div className="opinion-review">
                      I will always recommend Kili to Savanna to family and
                      friends. One of the most amazing experiences I've ever
                      had. Thank you!
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
