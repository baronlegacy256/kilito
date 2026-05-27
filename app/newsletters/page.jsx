import GenericPage from "../components/GenericPage";
import Link from "next/link";

export const metadata = {
  title: "Newsletters",
  description:
    "Subscribe to the Kili to Savanna newsletter for the latest updates on Tanzania safaris, travel tips, and exclusive offers.",
  openGraph: {
    title: "Newsletters",
    description:
      "Subscribe to the Kili to Savanna newsletter for the latest updates on Tanzania safaris, travel tips, and exclusive offers.",
    url: "https://kilitosavannasafariclub.com/newsletters",
    images: ["/assets/images/home/slider1.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletters",
    description:
      "Subscribe to the Kili to Savanna newsletter for the latest updates on Tanzania safaris, travel tips, and exclusive offers.",
    url: "https://kilitosavannasafariclub.com/newsletters",
    images: ["/assets/images/home/slider1.png"],
  },
  alternates: {
    canonical: "https://kilitosavannasafariclub.com/newsletters",
  },
};
export default function Newsletters() {
  return (
    <GenericPage title={"Newsletters"}>
      <div className="blank-mask"></div>

      <div id="main-zone" className="row">
        <div className="col-sm-2 hidden-xs" id="main-zone-menu">
          <div id="main-zone-menu-content">
            <ul id="main-zone-menu-list">
              <li className="">
                <Link href="/who-we-are">Who are we?</Link>
              </li>
              <li className="">
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
              <li className="active">
                <Link href="/newsletters">Newsletters</Link>
              </li>
              <li className="">
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-sm-10">
          <div className="content-text">
            <div className="markdown-content">
              <h2>Stay Updated with Our Adventures</h2>
              <p>
                Subscribe to the Kili to Savanna newsletter and receive the
                latest updates on new safari itineraries, exclusive travel tips,
                special promotions, and inspiring stories from the heart of
                Tanzania.
              </p>

              <h3>What you’ll get</h3>
              <ul>
                <li>
                  Monthly highlights of the most breathtaking wildlife
                  experiences.
                </li>
                <li>
                  Expert advice on preparing for a Kilimanjaro trek and safari
                  travel.
                </li>
                <li>Early‑bird offers and discounts on upcoming tours.</li>
                <li>
                  Behind‑the‑scenes stories from our guides and local partners.
                </li>
              </ul>

              <p>
                We respect your privacy. Your email address will only be used
                for our newsletter communications and will never be shared with
                third parties. You can unsubscribe at any time using the link at
                the bottom of each email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GenericPage>
  );
}
