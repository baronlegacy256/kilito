import GenericPage from "../components/GenericPage";
import Link from "next/link";

export default function WhoWeAre() {
  return (
    <GenericPage title={"Who We Are"}>
      <div className="blank-mask"></div>

      <div id="main-zone" className="row">
        <div className="col-sm-2 hidden-xs" id="main-zone-menu">
          <div id="main-zone-menu-content">
            <ul id="main-zone-menu-list">
              <li className="active">
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
              <p>
                Kili to Savanna is a local safari company which provides high
                quality travel and tour services from the heights of Mt
                Kilimanjaro, to plains of Serengeti, Seeing the wildlife of
                mesmerizing beauty highest and small mountains, parks as well as
                beautiful beaches. Enjoy beautiful wildlife parks and amazing
                nature. Generosity and love is our vision. Proudly united by
                Swahili language.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GenericPage>
  );
}
