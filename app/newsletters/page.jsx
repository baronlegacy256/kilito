import GenericPage from "../components/GenericPage";
import Link from "next/link";

export const metadata = {
  title: "Newsletters",
  description: "Subscribe to the Kili to Savanna newsletter for the latest updates on Tanzania safaris, travel tips, and exclusive offers.",
  openGraph: {
    title: "Newsletters",
    description: "Subscribe to the Kili to Savanna newsletter for the latest updates on Tanzania safaris, travel tips, and exclusive offers.",
    url: "https://kilitosavannaadventures.com/newsletters",
    images: ["/assets/images/home/slider1.png"],
  }
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
            <div className="markdown-content"></div>
          </div>
        </div>
      </div>
    </GenericPage>
  );
}
