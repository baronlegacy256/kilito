import React from "react";
import Link from "next/link";
import Script from "next/script";

function Footer() {
  return (
    <footer itemScope itemType="http://schema.org/Organization">
      <div id="appendix-links-zone" className="row">
        <div className="col-sm-3 custom-col">
          <h2 itemProp="name">Kili to Savanna</h2>

          <div>
            <div className="">
              <Link href="/who-we-are" className="no-decoration">
                Who we are
              </Link>
            </div>

            <div className="">
              <Link href="/customer-reviews" className="no-decoration">
                Customer reviews
              </Link>
            </div>

            <div className="">
              <Link href="/press" className="no-decoration">
                Press
              </Link>
            </div>

            <div className="">
              <Link href="/jobs" className="no-decoration">
                Jobs
              </Link>
            </div>

            <div className="">
              <Link href="/guarantees" className="no-decoration">
                Guarantees
              </Link>
            </div>

            <div className="">
              <Link href="/newsletters" className="no-decoration">
                Newsletters
              </Link>
            </div>

            <div className="">
              <Link href="/terms-of-use" className="no-decoration">
                Terms of Use
              </Link>
            </div>

            <div className="">
              <a href="https://blog.kilitosavanna.com/" target="_blank">
                The blog
              </a>
            </div>

            <div className=""></div>

            <div className=""></div>
          </div>
        </div>

        <div className="col-sm-3 custom-col">
          <h2>Need help?</h2>

          <div className="">
            <Link href="/faq" className="no-decoration">
              FAQ
            </Link>
          </div>

          <div className="">
            <Link href="/site-map" className="no-decoration">
              Site Map
            </Link>
          </div>

          <div className="">
            <Link href="/contact" className="no-decoration">
              Contact
            </Link>
          </div>

          <div id="footer-tel-zone">
            Call a Kili to Savanna advisor at
            <br />
            <div itemProp="telephone">
              <strong>
                <i className="fa fa-phone" aria-hidden="true"></i>&nbsp; +255
                734 970 891
              </strong>
            </div>
            <div>
              <strong>10am - 6:30pm, Monday to Saturday</strong>
            </div>
          </div>
        </div>

        <div className="col-sm-3 custom-col">
          <h2>Follow us</h2>

          <div id="social-links-zone">
            <span
              data-link="aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2themFkZW4="
              tabIndex="0"
              itemProp="sameAs"
              target="_blank"
            >
              <i
                className="fa fa-facebook icon facebook"
                aria-hidden="true"
              ></i>
            </span>
            <span
              data-link="aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9rYXphZGVuX29mZmljaWVsLw=="
              tabIndex="0"
              itemProp="sameAs"
              target="_blank"
            >
              <i
                className="fa fa-instagram icon instagram"
                aria-hidden="true"
              ></i>
            </span>
            <span
              data-link="aHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2NvbXBhbnkva2F6YWRlbi1jb20="
              tabIndex="0"
              itemProp="sameAs"
              target="_blank"
            >
              <i
                className="fa fa-linkedin icon linkedin"
                aria-hidden="true"
              ></i>
            </span>
          </div>

          <div className="site-opinion-badge-zone">
            <div id="7fa284bf-9f0d-4c51-a13f-5bef0cc527ed"></div>
            <Script
              defer
              charSet="utf-8"
              src="https://widgets.rr.skeepers.io/generated/6a849786-b424-9634-c55e-5a59001faa54/7fa284bf-9f0d-4c51-a13f-5bef0cc527ed.js"
              strategy="lazyOnload"
            />
          </div>
        </div>

        <div className="col-sm-3 custom-col">
          <h2>Pro area</h2>

          <div id="instructor-inscription-zone">
            <div className="instructor-inscription-text">
              Adventure professional? Become a Kili to Savanna partner and
              attract new customers!
            </div>

            <span
              data-link="L3Byby9hbm5leGVzL25vdXMtcmVqb2luZHJl"
              tabIndex="0"
              className="btn custom-button stretch-width solid-yellow rounded hover-grow"
            >
              JOIN US!
            </span>
          </div>
        </div>
      </div>

      <div id="legal-links" className="row flex-sm-row text-center">
        <div className="legal-links-content col-sm-3 flex-sm-col"></div>

        <div className="legal-links-content col-sm-3 flex-sm-col">
          &copy; Kili to Savanna 2026 &nbsp;
        </div>

        <div className="legal-links-content col-sm-3 flex-sm-col">
          All rights reserved &nbsp;
        </div>
        <div className="legal-links-content col-sm-3 flex-sm-col"></div>
      </div>
    </footer>
  );
}

export default Footer;
