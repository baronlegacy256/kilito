import GenericPage from "../components/GenericPage";
import Link from "next/link";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Kili to Savanna. We're here to help you plan your perfect Tanzania safari or climbing adventure.",
  openGraph: {
    title: "Contact Us",
    description: "Get in touch with Kili to Savanna. We're here to help you plan your perfect Tanzania safari or climbing adventure.",
    url: "https://kilitosavannaadventures.com/contact",
    images: ["/assets/images/generic.jpg"],
  }
};

export default function Contact() {
  return (
    <GenericPage title={"Contact"}>
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
              <li className=" ">
                <Link href="/jobs">Jobs</Link>
              </li>
              <li className="active">
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
            <div className="markdown-content"></div>
          </div>
        </div>
      </div>
    </GenericPage>
  );
}
