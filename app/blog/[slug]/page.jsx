"use client";

import Header from "../../../components/Home/Header";
import Prefooter from "../../../components/Home/Prefooter";
import Footer from "../../../components/Home/Footer";
import Link from "next/link";
import React, { Fragment, use } from "react";

const blogPosts = {
  "tanzania-safari-ultimate-guide-2026": {
    title:
      "Tanzania Safari 2026: The Ultimate Guide to Africa's Greatest Wildlife Destination",
    category: "Safari Guide",
    image: "/assets/images/blog/tanzania-safari-ultimate-guide.jpg",
    content: (
      <>
        <p>
          Tanzania is not just a safari destination — it is <em>the</em> safari
          destination. Home to the world's largest unbroken animal migration,
          the continent's highest mountain, and some of Africa's most pristine
          wilderness, Tanzania offers an experience that simply cannot be
          replicated anywhere else on Earth. This guide, written by the local
          experts at Kili to Savanna Adventures, will help you plan the perfect
          Tanzania safari in 2026.
        </p>

        <h3>Why Tanzania Is the World's #1 Safari Destination</h3>
        <p>
          Year after year, Tanzania tops global travel rankings for wildlife
          safaris. With over one-quarter of the country's landmass protected as
          national parks, conservation areas, or game reserves, Tanzania is a
          sanctuary for Africa's most iconic animals. Lions, leopards, cheetahs,
          elephants, rhinos, and buffaloes — the famous Big Five — all roam
          freely across vast, unspoiled ecosystems.
        </p>
        <p>
          Unlike some more commercialised safari destinations, Tanzania's parks
          retain a sense of raw, untamed wilderness. The Serengeti alone covers
          nearly 15,000 square kilometres, meaning you can drive for hours
          without seeing another vehicle. That is the Tanzania difference — and
          it is why Kili to Savanna Adventures has made this extraordinary
          country the exclusive focus of everything we do.
        </p>

        <h3>The Best Time to Go on a Tanzania Safari</h3>
        <p>
          Tanzania's safari season runs year-round, but different months offer
          distinctly different experiences:
        </p>
        <ul>
          <li>
            <strong>June to October (Dry Season):</strong> Peak safari season.
            Vegetation thins out, animals concentrate around waterholes, and the
            Great Migration reaches the Serengeti's northern Mara River
            crossings. Visibility is exceptional and wildlife sightings are at
            their most reliable.
          </li>
          <li>
            <strong>January to March (Short Dry Season):</strong> The southern
            Serengeti hosts the Great Migration's calving season — one of
            nature's most dramatic spectacles, with thousands of wildebeest
            calves born each day. Predator action is intense.
          </li>
          <li>
            <strong>April to May (Green Season):</strong> Lush landscapes,
            newborn wildlife, and far fewer tourists. Incredible birding,
            dramatic skies, and significantly lower prices — Tanzania's
            best-kept secret.
          </li>
          <li>
            <strong>November to December (Short Rains):</strong> A shoulder
            season with good game viewing and the migration moving southward
            through the Serengeti.
          </li>
        </ul>
        <p>
          Kili to Savanna's local guides know Tanzania's rhythms intimately. We
          design every itinerary around the wildlife cycle to ensure you witness
          the very best nature has to offer at the time of your visit.
        </p>

        <h3>Top Tanzania Safari Destinations</h3>

        <h4>Serengeti National Park</h4>
        <p>
          The Serengeti is Tanzania's crown jewel and one of the Seven Natural
          Wonders of Africa. Spanning the golden plains of northern Tanzania,
          the Serengeti is home to the Great Wildebeest Migration — the largest
          terrestrial animal migration on Earth, involving over 1.5 million
          wildebeest, 200,000 zebras, and 350,000 gazelles moving in an endless
          clockwise circuit across the ecosystem. Kili to Savanna offers mobile
          camping safaris that follow the migration in real time, placing you at
          the heart of the action wherever it unfolds.
        </p>

        <h4>Ngorongoro Conservation Area</h4>
        <p>
          Descend into the Ngorongoro Crater — a collapsed volcanic caldera and
          UNESCO World Heritage Site — and enter a self-contained Eden. Roughly
          25,000 large animals, including Tanzania's last stable black rhino
          population, live within the crater's 260 square kilometre floor. A
          game drive here is unlike anything else in Africa. Our Ngorongoro
          packages include exclusive crater access with expert naturalist guides
          who can identify every species and tell you the stories behind what
          you are seeing.
        </p>

        <h4>Tarangire National Park</h4>
        <p>
          Tarangire is Tanzania's underrated masterpiece. Famous for its ancient
          baobab trees and enormous elephant herds — sometimes numbering over
          300 individuals — Tarangire comes alive during the dry season when
          animals flood in from the surrounding landscape. We strongly recommend
          combining Tarangire with the Serengeti on a northern Tanzania circuit.
        </p>

        <h4>Selous Game Reserve / Nyerere National Park</h4>
        <p>
          Africa's largest protected ecosystem covers an area larger than
          Switzerland. Remote, wild, and relatively untouched by mass tourism,
          it offers walking safaris, boat safaris on the Rufiji River, and some
          of Tanzania's finest fly-camping experiences.
        </p>

        <h3>Why Choose Kili to Savanna Adventures?</h3>
        <p>
          We are a local Tanzanian safari company based in Arusha — the safari
          capital of Tanzania. Unlike international booking platforms or
          foreign-owned operators, every shilling you spend with us stays in
          Tanzania, supporting local communities, conservation, and the
          livelihoods of our guides and staff.
        </p>
        <ul>
          <li>
            Over 250 five-star reviews on TripAdvisor — rated Excellent by
            travellers worldwide
          </li>
          <li>
            Tailor-made itineraries designed around your interests, budget, and
            travel style
          </li>
          <li>
            Expert local guides with lifelong knowledge of Tanzania's wildlife
            and ecosystems
          </li>
          <li>
            All three major Tanzania experiences: safari, Kilimanjaro climbing,
            and cultural tours
          </li>
          <li>
            Secure, transparent payment and full pre-trip support from our
            specialist advisors
          </li>
        </ul>

        <div className="cta-box">
          <h4>Start Planning Your Tanzania Safari Today</h4>
          <p>
            Contact us at <strong>+255 734 970 891</strong> or visit{" "}
            <a
              href="https://www.kilitosavannaadventures.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              kilitosavannaadventures.com
            </a>{" "}
            to speak with one of our expert advisors. Monday to Saturday,
            10am–6:30pm.
          </p>
        </div>
      </>
    ),
  },

  "serengeti-safari-complete-guide": {
    title:
      "Serengeti Safari: Your Complete Guide to Tanzania's Greatest National Park",
    category: "Destination Guide",
    image: "/assets/images/blog/serengeti-safari-tanzania.jpg",
    content: (
      <>
        <p>
          Mention "safari" anywhere in the world and one name immediately comes
          to mind: the Serengeti. This legendary national park in northern
          Tanzania is synonymous with African wildlife, big skies, and the kind
          of raw, primal encounters with nature that change people forever. At
          Kili to Savanna Adventures, the Serengeti is our home ground — and we
          want to help you experience it at its extraordinary best.
        </p>

        <h3>What Makes the Serengeti Unmissable?</h3>
        <p>
          The Serengeti National Park covers 14,763 square kilometres of
          sweeping savanna, acacia woodland, and granite kopje outcroppings in
          northern Tanzania. Established as a national park in 1951 and
          designated a UNESCO World Heritage Site in 1981, the Serengeti is the
          oldest and most scientifically important ecosystem in Africa.
        </p>
        <p>
          The park supports the highest concentration of large mammals on Earth.
          Big cats — lions, leopards, and cheetahs — are all reliably seen here.
          Elephant, buffalo, giraffe, zebra, hippopotamus, and hundreds of bird
          species complete the picture.
        </p>

        <h3>The Great Wildebeest Migration: A Month-by-Month Calendar</h3>

        <h4>December – March: Southern Serengeti &amp; Ndutu</h4>
        <p>
          The herds gather on the short-grass plains of the southern Serengeti
          and the Ndutu area. January and February are peak calving months, with
          up to 8,000 calves born every day. Predators — lions, hyenas, wild
          dogs, and cheetahs — follow the herds closely, creating dramatic daily
          hunting sequences.
        </p>

        <h4>April – May: Moving North</h4>
        <p>
          As the rains fall, the grass in the south is depleted and the herds
          begin their long northward march. This is the green season — fewer
          tourists, lush landscapes, and excellent value. The migration columns
          stretch as far as the eye can see.
        </p>

        <h4>June – July: Western Corridor &amp; Grumeti River</h4>
        <p>
          The herds reach the Grumeti River in the western Serengeti. Enormous
          crocodiles lurk in the pools, and the river crossings here offer
          unforgettable wildlife theatre. June and July are superb months for a
          Serengeti safari.
        </p>

        <h4>August – October: Northern Serengeti &amp; Mara River Crossings</h4>
        <p>
          This is the moment most people picture when they think of the Great
          Migration. The herds bunch up at the Mara River, building courage
          before plunging into the crocodile-filled waters in mass crossings.
          When they happen, they are the most dramatic wildlife spectacle on
          Earth. Kili to Savanna's mobile safari camps follow the migration
          north to position you perfectly for the crossings.
        </p>

        <h4>November: Return South</h4>
        <p>
          As the short rains begin, the herds turn southward, completing the
          circle. A quieter time with good sightings and lower prices.
        </p>

        <h3>Our Serengeti Safari Packages</h3>
        <ul>
          <li>
            <strong>Classic Northern Circuit:</strong> Serengeti, Ngorongoro
            Crater, Tarangire, and Lake Manyara — the ultimate introduction to
            Tanzania's northern parks
          </li>
          <li>
            <strong>Great Migration Safari:</strong> A dedicated itinerary timed
            to the migration, with mobile camping to follow the herds
          </li>
          <li>
            <strong>Exclusive Fly-In Safari:</strong> Skip the road and fly
            directly into the Serengeti for maximum time with the wildlife
          </li>
          <li>
            <strong>Family Safari:</strong> Specially designed itineraries for
            families with children and age-appropriate activities
          </li>
          <li>
            <strong>Honeymoon Safari:</strong> Romantic private camps and
            exclusive experiences for couples
          </li>
        </ul>

        <h3>Practical Information</h3>
        <ul>
          <li>
            <strong>Getting There:</strong> Most safaris begin in Arusha,
            approximately 325 km from the Serengeti's main gate. Fly-in options
            are available from Arusha, Kilimanjaro, or Dar es Salaam airports.
          </li>
          <li>
            <strong>What to Pack:</strong> Light, neutral-coloured clothing, a
            quality camera with zoom lens, binoculars, sunscreen, and insect
            repellent.
          </li>
          <li>
            <strong>Visa:</strong> Most nationalities can obtain a Tanzania
            e-Visa online before travel.
          </li>
        </ul>

        <div className="cta-box">
          <h4>Book Your Serengeti Safari with Kili to Savanna</h4>
          <p>
            Call us on <strong>+255 734 970 891</strong>, Monday to Saturday,
            10am–6:30pm, or send an enquiry at{" "}
            <a
              href="https://www.kilitosavannaadventures.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              kilitosavannaadventures.com
            </a>
            . Secure payment. Clear pricing. Personal service.
          </p>
        </div>
      </>
    ),
  },

  "climbing-kilimanjaro-complete-guide-2026": {
    title:
      "Climbing Kilimanjaro: Your Complete 2026 Guide to Africa's Highest Peak",
    category: "Trekking & Climbing",
    image: "/assets/images/blog/climbing-kilimanjaro-trek.jpg",
    content: (
      <>
        <p>
          At 5,895 metres above sea level, Mount Kilimanjaro is the highest
          mountain in Africa, the world's highest free-standing volcano, and one
          of the Seven Summits. Every year, tens of thousands of trekkers from
          around the world attempt to stand on its iconic glaciated summit —
          Uhuru Peak. At Kili to Savanna Adventures, guiding climbers safely to
          the top of Kilimanjaro is one of our greatest passions.
        </p>

        <h3>Why Kilimanjaro?</h3>
        <p>
          Kilimanjaro is unique in the world of high-altitude mountaineering.
          Unlike the Himalayas or the Andes, it requires no technical climbing
          skills or prior mountaineering experience. The mountain is climbed
          entirely on foot via well-maintained trails, making it accessible to
          anyone with a reasonable level of fitness and the determination to
          push through altitude.
        </p>
        <p>
          Kili to Savanna's guides are certified, experienced mountain
          professionals who have summited Kilimanjaro hundreds of times. They
          know the mountain intimately — its weather patterns, its altitude
          risks, and the encouragement techniques that get tired climbers to
          Uhuru Peak when everything in their body is telling them to stop.
        </p>

        <h3>The Kilimanjaro Routes: Which One Is Right for You?</h3>

        <h4>Machame Route — "The Whiskey Route" (6–7 days, Most Popular)</h4>
        <p>
          The most popular route on Kilimanjaro. Its scenic diversity — from
          lush rainforest through heath and moorland to the lunar alpine desert
          and glaciated summit zone — is breathtaking. Machame follows a "climb
          high, sleep low" acclimatisation profile that gives it a higher
          success rate than the shorter routes. Best for adventurous trekkers
          who want a scenic, rewarding experience.
        </p>

        <h4>
          Lemosho Route — "The Scenic Route" (7–8 days, Best Success Rate)
        </h4>
        <p>
          Our top recommendation for most climbers. Longer and less crowded than
          the Machame, it approaches from the west through pristine wilderness
          before joining the southern circuit to the summit. The extra
          acclimatisation days give climbers the best possible chance of
          reaching Uhuru Peak. Best for those prioritising summit success and a
          quality wilderness experience.
        </p>

        <h4>
          Marangu Route — "The Coca-Cola Route" (5–6 days, Hut Accommodation)
        </h4>
        <p>
          The only route with permanent hut accommodation rather than tents,
          making it appealing to those who prefer not to sleep outdoors.
          However, its shorter length and direct ascent profile give it the
          lowest summit success rate of the major routes. Best for trekkers with
          limited time and a preference for hut accommodation.
        </p>

        <h4>Rongai Route — The Northern Approach (6–7 days)</h4>
        <p>
          Approaches Kilimanjaro from the Kenyan border side, offering a very
          different landscape to the southern routes. Drier, quieter, and
          providing unique views of the mountain's northern ice fields. Best for
          those seeking a less-trodden experience.
        </p>

        <h3>Safety and Altitude</h3>
        <p>
          Altitude sickness is the single biggest reason climbers do not reach
          Uhuru Peak. Our guides are trained in altitude medicine and wilderness
          first aid. We monitor every climber's health throughout the climb
          using pulse oximeters and conduct daily health checks. Our golden
          rule: <strong>"pole pole"</strong> — Swahili for "slowly, slowly." The
          mountain rewards patience. Trust our guides, follow the pace, drink
          plenty of water, and Uhuru Peak is absolutely within your reach.
        </p>

        <h3>What's Included in Our Kilimanjaro Packages</h3>
        <ul>
          <li>Pre-climb briefing and gear check in Arusha</li>
          <li>
            Professional certified mountain guides — minimum 1 guide per 2
            climbers
          </li>
          <li>Licensed, well-paid porters carrying all group equipment</li>
          <li>
            All meals on the mountain — breakfast, lunch, dinner, and snacks
          </li>
          <li>Quality camping equipment (tents, sleeping mats, dining tent)</li>
          <li>All national park and conservation fees</li>
          <li>Hotel accommodation in Arusha before and after the climb</li>
          <li>
            Emergency evacuation insurance and rescue coordination if required
          </li>
        </ul>

        <div className="cta-box">
          <h4>Book Your Kilimanjaro Climb Today</h4>
          <p>
            Ready to stand on the roof of Africa? Contact Kili to Savanna
            Adventures at <strong>+255 734 970 891</strong> or visit{" "}
            <a
              href="https://www.kilitosavannaadventures.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              kilitosavannaadventures.com
            </a>
            . We depart year-round and accommodate solo travellers, couples,
            families, and corporate groups.
          </p>
        </div>
      </>
    ),
  },

  "tanzania-cultural-tours-maasai-chagga-zanzibar": {
    title: "Tanzania Cultural Tours: Discover the Soul of East Africa",
    category: "Cultural Tours",
    image: "/assets/images/blog/tanzania-cultural-tour-experience.jpg",
    content: (
      <>
        <p>
          Tanzania's wildlife is world-famous, but the country's human story is
          equally extraordinary. From the ancient Maasai warriors of the
          northern plains to the Swahili merchants of Zanzibar's Stone Town,
          from the Chagga farmers on Kilimanjaro's slopes to the Hadzabe
          hunter-gatherers of Lake Eyasi — Tanzania is a tapestry of cultures,
          languages, and traditions that have evolved over thousands of years.
          Kili to Savanna Adventures offers authentic, respectful cultural tours
          that bring you face-to-face with this living heritage.
        </p>

        <h3>Why Take a Cultural Tour in Tanzania?</h3>
        <p>
          Wildlife safaris offer an extraordinary window into Africa's natural
          world. Cultural tours offer something equally powerful: a window into
          African humanity. Meeting Tanzanian people in their own communities,
          sharing food, learning traditional skills, and understanding the
          histories and belief systems of different ethnic groups transforms a
          holiday into a genuinely life-changing journey.
        </p>
        <p>
          We are proud to be a Tanzanian-owned and operated company. Our
          cultural tours are designed with and by community members, ensuring
          that tourism benefits flow directly to the people you visit — not as a
          performance for tourists, but as an authentic exchange between people.
        </p>

        <h3>Our Cultural Tour Experiences</h3>

        <h4>Maasai Village Visits — Northern Tanzania</h4>
        <p>
          The Maasai are Tanzania's most iconic people — tall, proud warriors in
          distinctive red shukas who have maintained their traditional pastoral
          lifestyle alongside the wildlife of the Serengeti and Ngorongoro for
          centuries. A Kili to Savanna Maasai village visit takes you beyond the
          roadside curio stand. You will enter a genuine boma (homestead), meet
          family members of all ages, learn about Maasai cattle herding
          traditions, witness traditional dances, and understand how Maasai
          communities are navigating the modern world while preserving their
          ancient identity.
        </p>

        <h4>Chagga Cultural Experience — Mount Kilimanjaro</h4>
        <p>
          The Chagga people live on the fertile slopes of Kilimanjaro and are
          famed for their sophisticated traditional irrigation systems. A Chagga
          cultural day includes a walk through banana and coffee plantations, a
          visit to a traditional homestead, cooking a local meal together, and
          exploring the underground tunnel system that the Chagga built to
          protect themselves from Maasai raids in the 19th century.
        </p>

        <h4>Hadzabe Bushwalk — Lake Eyasi</h4>
        <p>
          One of the most unique cultural experiences available anywhere in
          Africa. The Hadzabe are one of the world's last remaining
          hunter-gatherer peoples, living in the remote Lake Eyasi basin.
          Spending a morning with a Hadzabe hunting group — watching them track
          game with bows and poisoned arrows, forage for wild berries and honey,
          and communicate in their extraordinary click language — is an
          encounter with a way of life unchanged for tens of thousands of years.
        </p>

        <h4>Zanzibar Cultural Tour — Stone Town &amp; Spice Farms</h4>
        <p>
          Zanzibar is Tanzania's cultural crossroads — an island where African,
          Arab, Indian, and European traditions have blended over centuries of
          trade. Our Zanzibar cultural tours include a guided walk through
          UNESCO-listed Stone Town, with its carved wooden doors and haunting
          history as East Africa's largest slave trading port. We also arrange
          spice farm tours where you will smell, taste, and identify the cloves,
          vanilla, nutmeg, and cinnamon that made Zanzibar famous as the "Spice
          Island."
        </p>

        <h3>Combining Cultural Tours with Safari or Kilimanjaro</h3>
        <p>
          Kili to Savanna's greatest strength is our ability to combine
          experiences seamlessly. Most of our guests combine a cultural tour
          with a wildlife safari or Kilimanjaro climb, creating a Tanzania
          journey that is truly multi-dimensional. Speak with our advisors to
          design the perfect itinerary.
        </p>

        <div className="cta-box">
          <h4>Book a Tanzania Cultural Tour</h4>
          <p>
            Discover a Tanzania that most tourists never see. Contact us at{" "}
            <strong>+255 734 970 891</strong> or visit{" "}
            <a
              href="https://www.kilitosavannaadventures.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              kilitosavannaadventures.com
            </a>
            . Monday to Saturday, 10am–6:30pm.
          </p>
        </div>
      </>
    ),
  },

  "best-safari-company-tanzania-kili-to-savanna": {
    title:
      "Why Kili to Savanna Adventures Is Tanzania's Best Choice for Your Safari",
    category: "About Us",
    image: "/assets/images/blog/best-safari-company-tanzania.jpg",
    content: (
      <>
        <p>
          With hundreds of safari companies competing for your attention online,
          choosing the right operator for your Tanzania trip is one of the most
          important decisions you will make. Get it right and you will return
          home with memories that last a lifetime. This article explains clearly
          and honestly why Kili to Savanna Adventures is the right choice for
          travellers who want the very best from Tanzania.
        </p>

        <h3>We Are Tanzanian. That Matters.</h3>
        <p>
          Kili to Savanna Adventures is a locally owned and operated Tanzanian
          safari company, headquartered in Arusha — the gateway city to
          Tanzania's northern safari circuit and the base camp for Kilimanjaro
          expeditions. We are not a foreign booking platform. We are not an
          international tour operator with a Tanzania section on their website.
          We are Tanzanian, through and through.
        </p>
        <p>
          When you book with us, your money stays in Tanzania. It pays the wages
          of our guides, drivers, administrative staff, porters, and community
          partners. It contributes to local conservation efforts and supports
          the families who depend on responsible, sustainable tourism. And being
          local means we know Tanzania with a depth and intimacy that no
          international operator can match.
        </p>

        <h3>Over 250 Five-Star Reviews</h3>
        <p>
          The truest measure of any safari company is what their guests say
          after they return home. Kili to Savanna Adventures is rated{" "}
          <strong>Excellent</strong> on TripAdvisor with over 250 verified
          reviews from travellers from the United States, Europe, Australia,
          Asia, and beyond. Our guests consistently highlight three things: the
          exceptional quality of our guides, the personal attention from our
          advisors during the planning process, and the fact that their Tanzania
          experience exceeded every expectation.
        </p>

        <h3>Tailor-Made Means Genuinely Tailor-Made</h3>
        <p>
          Many companies claim to offer "tailor-made" safaris, then present you
          with a menu of fixed itineraries to choose from. At Kili to Savanna,
          tailor-made means something different. It starts with a conversation —
          our specialist advisors ask about your travel experience, your budget,
          your interests, your physical condition, and the specific moments you
          most want to experience in Tanzania. Then we design something from
          scratch, just for you.
        </p>

        <h3>Three Experiences. One Expert Company.</h3>
        <ul>
          <li>
            <strong>Safari Tours:</strong> Northern circuit safaris to the
            Serengeti, Ngorongoro, Tarangire, and Lake Manyara; southern
            Tanzania expeditions to Nyerere National Park; and custom multi-park
            itineraries of any length.
          </li>
          <li>
            <strong>Kilimanjaro Climbing &amp; Trekking:</strong> All major
            routes (Machame, Lemosho, Marangu, Rongai) with certified guides and
            fully inclusive packages. We also offer trekking in the Usambara
            Mountains and other Tanzanian ranges.
          </li>
          <li>
            <strong>Cultural Tours:</strong> Authentic community-based cultural
            experiences with the Maasai, Chagga, Hadzabe, and the multicultural
            communities of Zanzibar.
          </li>
        </ul>

        <h3>Transparent Pricing and Secure Payment</h3>
        <p>
          We believe in complete pricing transparency. Every quote we provide
          includes a full breakdown of exactly what is and is not included.
          There are no hidden park fees, no surprise gratuity expectations, and
          no bait-and-switch upgrades. Our secure online payment system protects
          your financial information, and our terms are clear and fair.
        </p>

        <div className="cta-box">
          <h4>Contact Our Advisors Today</h4>
          <p>
            Call <strong>+255 734 970 891</strong>, Monday to Saturday,
            10am–6:30pm, or visit{" "}
            <a
              href="https://www.kilitosavannaadventures.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              kilitosavannaadventures.com
            </a>{" "}
            to browse our tour packages, read customer reviews, and submit an
            enquiry. We look forward to helping you discover the Tanzania of
            your dreams.
          </p>
        </div>
      </>
    ),
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: `Read about ${post.title} on the Kili to Savanna Adventures blog.`,
    openGraph: {
      title: post.title,
      description: `Read about ${post.title} on the Kili to Savanna Adventures blog.`,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default function BlogPostPage({ params }) {
  const { slug } = use(params);
  const post = blogPosts[slug];

  if (!post) {
    return (
      <main className="main-content">
        <Header />
        <div id="principal">
          <div
            className="container"
            style={{ padding: "100px 0", textAlign: "center" }}
          >
            <h1>Oops! We couldn't find that post.</h1>
            <Link
              href="/blog"
              className="btn custom-button yellow"
              style={{ marginTop: "20px" }}
            >
              Back to Blog
            </Link>
          </div>
        </div>
        <Prefooter />
        <Footer />
      </main>
    );
  }

  return (
    <main className="main-content">
      <Header />
      <div id="principal">
        <div id="main-zone" className="row">
          <div className="col-sm-12">
            <div className="blog-post-container">
              <div className="blog-post-header">
                <Link href="/blog" className="back-link">
                  <i className="fa fa-arrow-left"></i> Back to blog
                </Link>
                {post.category && (
                  <span className="category-badge">{post.category}</span>
                )}
              </div>

              <h1 className="blog-post-title">{post.title}</h1>

              <div className="blog-post-featured-image-container">
                <img
                  src={post.image}
                  alt={post.title}
                  className="blog-post-featured-image"
                />
              </div>

              <article className="blog-post-content">
                <div className="markdown-content">{post.content}</div>
              </article>

              <div className="blog-post-share">
                <h4>Share this story</h4>
                <div className="social-share-buttons">
                  <button className="share-btn fb">
                    <i className="fa fa-facebook"></i>
                  </button>
                  <button className="share-btn tw">
                    <i className="fa fa-twitter"></i>
                  </button>
                  <button className="share-btn ln">
                    <i className="fa fa-linkedin"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Prefooter />
      <Footer />

      <style jsx>{`
        .blog-post-container {
          padding: 20px 0 80px;
          max-width: 860px;
          margin: 0 auto;
        }

        /* Header row */
        .blog-post-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #666;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s;
        }
        .back-link:hover {
          color: #f9a825;
        }
        .category-badge {
          background: #f9a825;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 20px;
        }

        /* Title */
        .blog-post-title {
          font-size: 32px;
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.25;
          margin: 0 0 32px;
        }

        /* Hero image */
        .blog-post-featured-image-container {
          height: 460px;
          border-radius: 14px;
          margin-bottom: 48px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }
        .blog-post-featured-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Article body */
        .blog-post-content {
          font-size: 18px;
          line-height: 1.85;
          color: #444;
        }
        .blog-post-content :global(p) {
          margin-bottom: 28px;
        }
        .blog-post-content :global(h3) {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 52px 0 18px;
          padding-bottom: 10px;
          border-bottom: 3px solid #f9a825;
          display: inline-block;
        }
        .blog-post-content :global(h4) {
          font-size: 19px;
          font-weight: 700;
          color: #2d6a2d;
          margin: 36px 0 12px;
        }
        .blog-post-content :global(ul) {
          margin: 0 0 28px;
          padding-left: 24px;
        }
        .blog-post-content :global(li) {
          margin-bottom: 12px;
          line-height: 1.7;
        }
        .blog-post-content :global(em) {
          font-style: italic;
          color: #555;
        }
        .blog-post-content :global(a) {
          color: #2d6a2d;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .blog-post-content :global(a:hover) {
          color: #f9a825;
        }

        /* CTA box */
        .blog-post-content :global(.cta-box) {
          background: #f0f7f0;
          border-left: 5px solid #2d6a2d;
          border-radius: 10px;
          padding: 24px 28px;
          margin: 48px 0 12px;
        }
        .blog-post-content :global(.cta-box h4) {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 10px;
        }
        .blog-post-content :global(.cta-box p) {
          margin: 0;
          font-size: 16px;
          color: #444;
          line-height: 1.7;
        }

        /* Share */
        .blog-post-share {
          margin-top: 64px;
          padding-top: 32px;
          border-top: 1px solid #eee;
        }
        .blog-post-share h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 14px;
        }
        .social-share-buttons {
          display: flex;
          gap: 12px;
        }
        .share-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition:
            transform 0.2s,
            opacity 0.2s;
          font-size: 16px;
        }
        .share-btn:hover {
          transform: scale(1.1);
          opacity: 0.9;
        }
        .share-btn.fb {
          background: #3b5998;
        }
        .share-btn.tw {
          background: #1da1f2;
        }
        .share-btn.ln {
          background: #0077b5;
        }

        @media (max-width: 768px) {
          .blog-post-title {
            font-size: 24px;
          }
          .blog-post-featured-image-container {
            height: 240px;
          }
          .blog-post-content {
            font-size: 16px;
          }
          .blog-post-content :global(h3) {
            font-size: 20px;
          }
          .blog-post-content :global(h4) {
            font-size: 17px;
          }
        }
      `}</style>
    </main>
  );
}
