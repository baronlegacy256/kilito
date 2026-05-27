import GenericPage from "../components/GenericPage";
import Link from "next/link";

export const metadata = {
  title: "Press",
  description:
    "Read the latest press releases and media coverage for Kili to Savanna.",
  openGraph: {
    title: "Press",
    description:
      "Read the latest press releases and media coverage for Kili to Savanna.",
    url: "https://kilitosavannaadventures.com/press",
    images: ["/assets/images/generic.jpg"],
  },
};

export default function Press() {
  return (
    <GenericPage title={"Press"}>
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
              <li className="active">
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
          <div className="content-text">
            <div className="markdown-content">
              <h2>Website Launch</h2>
              <p>
                We are excited to announce the official launch of the Kili to
                Savanna website, providing travelers with an intuitive platform
                to explore our safari packages, book adventures, and stay
                informed about the latest news.
              </p>

              <h2>New Packages Added</h2>
              <p>
                We have a number of new exciting packages and updated prices for
                our customers
              </p>

              <h2>Become a Kili to Savanna Partner</h2>
              <p>
                We invite local operators, lodges, and travel agencies to join
                our partner program. Partners gain access to our booking
                platform, marketing support, and a share of revenue. Learn more
                at <a href="/partner">Partner with Us</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GenericPage>
  );
}
