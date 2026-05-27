import GenericPage from "../components/GenericPage";
import Link from "next/link";

export const metadata = {
  title: "Frequently Asked Questions",
  description:
    "Got questions about your Tanzania safari, Cultural Tours or Climbing and Trekking? Read our FAQs to find answers.",
  openGraph: {
    title: "Frequently Asked Questions",
    description:
      "Got questions about your Tanzania safari, Cultural Tours or Climbing and Trekking? Read our FAQs to find answers.",
    url: "https://kilitosavannasafariclub.com/faq",
    images: ["/assets/images/home/slider.jpg"],
  },
  alternates: {
    canonical: "https://kilitosavannasafariclub.com/faq",
  },
};

export default function FAQ() {
  return (
    <GenericPage title={"FAQs"}>
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
              <li className="active">
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
              <h2>General Questions</h2>
              <h3>Do I need a visa to enter Tanzania?</h3>
              <p>
                Yes, most travelers require a tourist visa to enter Tanzania.
                You can apply online for an e-Visa before your departure or
                purchase a visa upon arrival at major entry points such as
                Kilimanjaro International Airport (JRO) or Julius Nyerere
                International Airport (DAR). We recommend applying for an e-Visa
                in advance to avoid delays.
              </p>

              <h3>What is the best time to visit Tanzania?</h3>
              <p>
                The best time to visit depends on what you want to experience.
                For wildlife safaris and the Great Migration, the dry season
                from July to October is ideal. For climbing Mount Kilimanjaro,
                the dry seasons from January to March and June to October offer
                the best conditions with clear skies and less rain.
              </p>

              <h2>Safari FAQs</h2>
              <h3>What should I pack for a safari?</h3>
              <p>
                We recommend packing lightweight, neutral-colored clothing
                (khaki, beige, olive green) to blend in with the environment and
                avoid attracting insects. Be sure to include a warm jacket or
                fleece for chilly morning game drives, comfortable walking
                shoes, a sun hat, sunglasses, sunscreen, insect repellent,
                binoculars, and a good camera.
              </p>

              <h3>Are safaris safe?</h3>
              <p>
                Yes, safaris are highly safe when conducted with professional,
                experienced guides. Our guides are trained to read animal
                behavior and maintain safe distances. You must always follow
                your guide's instructions, stay inside the safari vehicle unless
                specified, and refrain from feeding or provoking wildlife.
              </p>

              <h2>Kilimanjaro FAQs</h2>
              <h3>How difficult is it to climb Mount Kilimanjaro?</h3>
              <p>
                Mount Kilimanjaro is a non-technical climb, meaning you do not
                need climbing ropes, harnesses, or technical mountaineering
                skills. However, it is a high-altitude trek that requires
                excellent physical fitness, mental endurance, and proper
                acclimatization. Training with hikes and cardiovascular
                exercises beforehand is highly recommended.
              </p>

              <h3>What is the success rate for climbing Mount Kilimanjaro?</h3>
              <p>
                Our success rate ranges between 85% and 95%, depending on the
                route chosen. Longer routes (such as Lemosho or Machame over 7
                or 8 days) allow for better acclimatization and have
                significantly higher success rates than shorter routes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GenericPage>
  );
}
