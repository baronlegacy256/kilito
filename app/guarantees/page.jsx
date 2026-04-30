import GenericPage from "../components/GenericPage";
import Link from "next/link";

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
              <li class Name="">
                <Link href="/newsletters">Newsletters</Link>
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
