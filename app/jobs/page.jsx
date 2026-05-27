import GenericPage from "../components/GenericPage";
import Link from "next/link";

export const metadata = {
  title: "Jobs",
  description:
    "Join the Kili to Savanna team. Check out our current job openings and career opportunities in Tanzania.",
  openGraph: {
    title: "Jobs",
    description:
      "Join the Kili to Savanna team. Check out our current job openings and career opportunities in Tanzania.",
    url: "https://kilitosavannasafariclub.com/jobs",
    images: ["/assets/images/generic.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobs",
    description:
      "Join the Kili to Savanna team. Check out our current job openings and career opportunities in Tanzania.",
    url: "https://kilitosavannasafariclub.com/jobs",
    images: ["/assets/images/generic.jpg"],
  },
  alternates: {
    canonical: "https://kilitosavannasafariclub.com/jobs",
  },
};

export default function Press() {
  return (
    <GenericPage title={"Jobs"}>
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
              <li className="active">
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
              <h2>Join our team</h2>
              <p>
                At Kili to Savanna, we believe that extraordinary experiences
                begin with an extraordinary team. We are always looking for
                passionate, dedicated individuals who share our love for
                Tanzania, its wildlife, and its people. Whether you are an
                experienced safari guide or a logistics coordinator, we welcome
                your application.
              </p>

              <h2>Current openings</h2>
              <h3>Senior Safari Guide</h3>
              <p>
                We are looking for an experienced and licensed safari guide with
                a deep knowledge of Tanzania&apos;s national parks, wildlife
                behavior, and conservation practices. Candidates must hold a
                valid Tanzania Wildlife Authority (TAWA) guide license and speak
                fluent English. Swahili and additional languages are a strong
                advantage.
              </p>
              <ul>
                <li>
                  Minimum 3 years of guiding experience in Serengeti,
                  Ngorongoro, or Tarangire
                </li>
                <li>Excellent communication and customer service skills</li>
                <li>Wilderness First Aid certification required</li>
                <li>Valid driver&apos;s license for 4WD safari vehicles</li>
              </ul>

              <h3>Mountain Trek Guide — Mount Kilimanjaro</h3>
              <p>
                We seek certified Kilimanjaro guides to lead groups safely to
                the summit of Africa&apos;s highest peak. Candidates must have
                completed a minimum of 30 summit climbs and hold a valid
                climbing guide certification from the Kilimanjaro National Park
                Authority (KINAPA).
              </p>
              <ul>
                <li>
                  Strong understanding of altitude sickness symptoms and
                  prevention
                </li>
                <li>Experience managing group dynamics at high altitude</li>
                <li>
                  Physically fit and able to operate in cold and variable
                  conditions
                </li>
              </ul>

              <h3>Travel Coordinator</h3>
              <p>
                We are hiring a detail-oriented Travel Coordinator to manage
                client bookings, itineraries, and logistics. This is an
                office-based role in Arusha. The ideal candidate is organized,
                tech-savvy, and has experience in travel planning or
                hospitality.
              </p>
              <ul>
                <li>
                  Proficiency in booking systems and MS Office or Google
                  Workspace
                </li>
                <li>Excellent written and spoken English</li>
                <li>
                  Experience in the travel or hospitality industry preferred
                </li>
              </ul>

              <h2>Why work with us?</h2>
              <ul>
                <li>Competitive local salary and performance bonuses</li>
                <li>
                  Ongoing professional development and training opportunities
                </li>
                <li>
                  A team culture built on respect, generosity, and pride in
                  Tanzania
                </li>
                <li>
                  A chance to share the beauty of East Africa with the world
                </li>
              </ul>

              <h2>How to apply</h2>
              <p>
                To apply for any of the positions above, please send your CV and
                a brief cover letter explaining why you want to join the Kili to
                Savanna team to{" "}
                <strong>careers@kilitosavannaadventures.com</strong>. Please
                include the job title in the subject line of your email. Only
                shortlisted candidates will be contacted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GenericPage>
  );
}
