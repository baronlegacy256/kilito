import GenericPage from "../components/GenericPage";
import Link from "next/link";

export const metadata = {
  title: "Our Guarantees",
  description:
    "Learn about the guarantees Kili to Savanna offers to ensure your trip to Tanzania is safe, secure, and unforgettable.",
  openGraph: {
    title: "Our Guarantees",
    description:
      "Learn about the guarantees Kili to Savanna offers to ensure your trip to Tanzania is safe, secure, and unforgettable.",
    url: "https://kilitosavannasafariclub.com/guarantees",
    images: ["/assets/images/generic.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Guarantees",
    description:
      "Learn about the guarantees Kili to Savanna offers to ensure your trip to Tanzania is safe, secure, and unforgettable.",
    images: ["/assets/images/generic.jpg"],
  },
  alternates: {
    canonical: "https://kilitosavannasafariclub.com/guarantees",
  },
};

export default function Guarantees() {
  return (
    <GenericPage title={"Guarantees"}>
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
              <li className="active">
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
          <div className="content-text">
            <div className="markdown-content">
              <h2>Professional guides</h2>
              <p>
                All the guides featured on our site are qualified and insured
                professionals, capable of ensuring your stay is as enjoyable as
                possible.
              </p>
              <h2>Travel insurance</h2>
              <p>
                For our stays, we offer you the option, when preparing your
                quote, to purchase 3 insurance policies:
              </p>
              <ul>
                <li>Cancelation</li>
                <li>Assistance</li>
                <li>Multi-risk insurance (+ epidemics option).</li>
              </ul>
              <p>
                Detailed information sheets are provided to you with your quote.
              </p>
              <h2>Financial guarantee</h2>
              <p>
                Kili To Savanna Safari Club is committed to ensuring that you
                continue your trip or be reimbursed in the event of a failure on
                our part regarding the stays we sell.
              </p>
              <h2>Price match guarantee</h2>
              <p>
                We guarantee to provide the best value for your Tanzanian
                experience. If you find an identical, high-quality itinerary
                offered by another registered local operator at a lower price,
                we will match it without compromising on service or safety
                standards.
              </p>
              <h2>24/7 Local support</h2>
              <p>
                From the moment you arrive in Tanzania until your departure, our
                dedicated local support team is available 24 hours a day, 7 days
                a week, to handle any unexpected changes, emergencies, or
                general inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GenericPage>
  );
}
