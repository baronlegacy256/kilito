import GenericPage from "../components/GenericPage";

export default function WhoWeAre() {
  return (
    <GenericPage title={"Who We Are"}>
      <div className="blank-mask"></div>

      <div id="main-zone" className="row">
        <div className="col-sm-2 hidden-xs" id="main-zone-menu">
          <div id="main-zone-menu-content">
            <ul id="main-zone-menu-list">
              <li className="active">
                <a href="/annexes/qui-sommes-nous">Who are we?</a>
              </li>
              <li className="">
                <a href="/annexes/avis">Customer reviews</a>
              </li>
              <li className="">
                <a href="/annexes/faq">FAQ</a>
              </li>
              <li className="">
                <a href="/presse">Press</a>
              </li>
              <li className="">
                <a href="/annexes/jobs">Jobs</a>
              </li>
              <li className="">
                <a href="/annexes/contact">Contact</a>
              </li>
              <li className="">
                <a href="/annexes/garanties">Guarantees</a>
              </li>
              <li className="">
                <a href="/annexes/newsletters">Newsletters</a>
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
