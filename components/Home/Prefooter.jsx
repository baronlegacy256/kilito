import React, { Fragment } from "react";
import Script from "next/script";

function Prefooter() {
  return (
    <Fragment>
      <Script id="accept-newsletter-error" strategy="afterInteractive">
        {`var acceptNewsletter_error = "You must check this box to continue";`}
      </Script>
      <div className="pre-footer-zone">
        <div
          id="reinsurance-zone"
          className="zone-container pre-footer-element"
        >
          <div className="row flex-md-row">
            <div className="col-md-3">
              <h2>Kili to Savanna Guarantees</h2>
            </div>

            <div className="col-md-9">
              <div className="row flex-sm-row">
                <div className="col-sm-4 custom-col">
                  <span className="no-decoration">
                    <div className="icon-warranty">
                      <img
                        src="/assets/id_card_picto-79b4633d8e6aaf5ec2f81bb2f77e346b.svg"
                        alt="ID card"
                        width="70px"
                        height="35px"
                      />
                    </div>

                    <div className="text-warranty">
                      <span>Selected</span>
                      <span>Professionals</span>
                    </div>
                  </span>
                </div>

                <div className="col-sm-4 custom-col">
                  <span className="no-decoration">
                    <div className="icon-warranty">
                      <img
                        src="/assets/handshake_picto-247977e4b9ad76e57ab28f99be3e9436.svg"
                        alt="ID card"
                        width="70px"
                        height="35px"
                      />
                    </div>

                    <div className="text-warranty">
                      <span>Specialized</span>
                      <span>Advisors</span>
                    </div>
                  </span>
                </div>

                <div className="col-sm-4 custom-col">
                  <span className="no-decoration">
                    <div className="icon-warranty">
                      <img
                        src="/assets/bank_card_picto-5b412d5e6c5de6eb9368e6ec24ae57f8.svg"
                        alt="ID card"
                        width="70"
                        height="35"
                      />
                    </div>

                    <div className="text-warranty">
                      <span>Secure</span>
                      <span>Payment</span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="row-newsletter" className=" zone-container rounded-container">
        <div className="row flex-row">
          <div className="col-sm-6 flex-col flex-dir-col left-col">
            <h2>
              <div className="title">Adventures in your inbox</div>

              <div className="sub-title"></div>
            </h2>

            <div className="description">
              Receive our newsletter with a selection of the most beautiful
              stays of the moment, travel stories, and all the advice for going
              on an adventure
            </div>
          </div>

          <div className="col-sm-6 custom-col flex-col flex-dir-col right-col">
            <div className="newsletter-form-zone">
              <form
                method="post"
                action=""
                role="form"
                id="newsletterSubscribeNewsletter"
                className="newsletterSubscribe"
              >
                <div className="row subscription-zone">
                  <div className="col-xs-12 custom-col">
                    <div className="custom-form-field stretch-width">
                      <label
                        htmlFor="input-email-newsletter"
                        className="error"
                      ></label>
                      <input
                        type="text"
                        name="email"
                        id="input-email-newsletter"
                        maxLength="128"
                        placeholder="My email"
                        title="Please enter your email address."
                        defaultValue=""
                        required="required"
                      />
                    </div>
                  </div>

                  <div className="col-xs-12 custom-col">
                    <button
                      type="submit"
                      className="btn custom-button stretch-width rounded solid-yellow hover-grow"
                      id="button-email-newsletter"
                    >
                      I subscribe
                    </button>
                  </div>
                </div>

                <div className="row acceptance-zone">
                  <div className="col-xs-12 custom-col">
                    <div className="custom-form-field">
                      <div className="custom-checkbox-zone">
                        <input type="hidden" name="_isNewsletterSubscribed" />
                        <input
                          type="checkbox"
                          name="isNewsletterSubscribed"
                          id="isNewsletterSubscribedNewsletter"
                        />
                        <label
                          htmlFor="isNewsletterSubscribedNewsletter"
                          className="form-field-label custom-style"
                        >
                          I wish to receive Kili to Savanna news (new dates,
                          stays...)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="newsletterSubscribeNewsletterMessage"
                  className="message-zone"
                ></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Prefooter;
