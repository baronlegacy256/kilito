import React from "react";
import Link from "next/link";

function Information() {
  return (
    <div id="text-content-zone">
      <h2 className="lvl1-zone-title">
        Everything to know about our Tanzanian Safaris & Treks
      </h2>

      <div className="row">
        <div className="col-md-3 content-menu-col">
          <div id="mobile-text-2-menu-trigger">
            <button
              type="button"
              className="btn custom-button white"
              data-toggle="collapse"
              data-target="#content-text-2-menu-container"
              aria-expanded="false"
              aria-controls="content-text-2-menu-container"
            >
              <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              Chapters
            </button>
          </div>
          <div id="content-text-2-menu-container">
            <div className="button-container">
              <button
                id="minimize-text-2-menu-button"
                type="button"
                className="btn custom-button white"
                data-toggle="collapse"
                data-target="#content-text-2-menu-container"
                aria-expanded="false"
                aria-controls="content-text-2-menu-container"
              >
                <i className="fa fa-times" aria-hidden="true"></i>
                Chapters
              </button>
            </div>

            <div id="content-text-2-menu">
              <ul className="nav nav-tabs" role="tablist">
                <li data-index="0">
                  <div className="icon">&nbsp;</div>
                  <Link href="/#h3-0">
                    <div
                      data-toggle="collapse"
                      data-target="#content-text-2-menu-container"
                    ></div>
                    5 reasons to go on a safari in Tanzania:
                  </Link>
                </li>

                <li data-index="1">
                  <div className="icon">&nbsp;</div>
                  <Link href="/#h3-1">
                    <div
                      data-toggle="collapse"
                      data-target="#content-text-2-menu-container"
                    ></div>
                    What is a safari?
                  </Link>
                </li>

                <li data-index="2">
                  <div className="icon">&nbsp;</div>
                  <Link href="/#h3-2">
                    <div
                      data-toggle="collapse"
                      data-target="#content-text-2-menu-container"
                    ></div>
                    Where to go on safari in Tanzania?
                  </Link>
                </li>

                <li data-index="3">
                  <div className="icon">&nbsp;</div>
                  <Link href="/#h3-3">
                    <div
                      data-toggle="collapse"
                      data-target="#content-text-2-menu-container"
                    ></div>
                    Which season to visit Tanzania?
                  </Link>
                </li>

                <li data-index="4">
                  <div className="icon">&nbsp;</div>
                  <Link href="/#h3-4">
                    <div
                      data-toggle="collapse"
                      data-target="#content-text-2-menu-container"
                    ></div>
                    What price for a Tanzanian safari?
                  </Link>
                </li>

                <li data-index="5">
                  <div className="icon">&nbsp;</div>
                  <Link href="/#h3-5">
                    <div
                      data-toggle="collapse"
                      data-target="#content-text-2-menu-container"
                    ></div>
                    Should I choose a 15-day or 7-day trip?
                  </Link>
                </li>

                <li data-index="6">
                  <div className="icon">&nbsp;</div>
                  <Link href="/#h3-6">
                    <div
                      data-toggle="collapse"
                      data-target="#content-text-2-menu-container"
                    ></div>
                    Is it possible to go as a family?
                  </Link>
                </li>

                <li data-index="7">
                  <div className="icon">&nbsp;</div>
                  <Link href="/#h3-7">
                    <div
                      data-toggle="collapse"
                      data-target="#content-text-2-menu-container"
                    ></div>
                    What are our Tanzanian packages?
                  </Link>
                </li>

                <li data-index="8">
                  <div className="icon">&nbsp;</div>
                  <Link href="/#h3-8">
                    <div
                      data-toggle="collapse"
                      data-target="#content-text-2-menu-container"
                    ></div>
                    Activities for all tastes
                  </Link>
                </li>

                <li data-index="9">
                  <div className="icon">&nbsp;</div>
                  <Link href="/#h3-9">
                    <div
                      data-toggle="collapse"
                      data-target="#content-text-2-menu-container"
                    ></div>
                    What are the accommodation options?
                  </Link>
                </li>

                <li data-index="10">
                  <div className="icon">&nbsp;</div>
                  <Link href="/#h3-10">
                    <div
                      data-toggle="collapse"
                      data-target="#content-text-2-menu-container"
                    ></div>
                    Kili to Savanna's favorite spots
                  </Link>
                </li>

                <li data-index="11">
                  <div className="icon">&nbsp;</div>
                  <Link href="/#h3-11">
                    <div
                      data-toggle="collapse"
                      data-target="#content-text-2-menu-container"
                    ></div>
                    Who are our local guiding experts?
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div id="content-text-2" className="content-text content-text-2">
            <div className="markdown-content">
              <h3 id="h3-0">5 good reasons to go on a safari in Tanzania:</h3>
              <p>
                1. <strong>Ultimate Wildlife Spectacle:</strong> Discover the
                endless plains of the <strong>Tanzanian savanna</strong>, which
                houses the highest concentration of wild animals on the planet.
                <br />
                2. <strong>Spot the full Big Five:</strong> Observe all members
                of the legendary "Big Five" (
                <strong>
                  lions, leopards, elephants, buffaloes, and black rhinoceroses
                </strong>
                ) coexisting in pristine national reserves.
                <br />
                3. <strong>Witness the Great Migration:</strong> Experience the
                incredible sight of millions of wildebeests and zebras
                thundering across the Serengeti in search of fresh pasture.
                <br />
                4. <strong>Climb the Roof of Africa:</strong> Challenge yourself
                by scaling the legendary slopes of{" "}
                <strong>Mount Kilimanjaro</strong>, the highest peak on the
                continent.
                <br />
                5. <strong>Enriching Cultural Encounters:</strong> Connect with
                the welcoming and ancestral cultures of the local{" "}
                <strong>Maasai and Hadzabe populations</strong>.<br />
                6. <strong>Stunning Tropical Beaches:</strong> Seamlessly
                transition from a wild, dusty savanna trek to the crystal-clear
                turquoise waters and white sand coastlines of{" "}
                <strong>Zanzibar Island</strong>.
              </p>

              <h3 id="h3-1">What is a safari?</h3>
              <p>
                The word "safari" is a Swahili word meaning "long journey".
                Primarily representing animal-watching journeys in East Africa,
                a <strong>Tanzanian safari</strong> with Kili to Savanna is a
                highly-organized, private adventure. You will explore untouched
                protected ecosystems in custom-built 4x4 safari Land Cruisers
                with pop-up roofs, accompanied by an expert local guide who
                knows every secret trail, tracking down majestic animals while
                prioritizing ecological preservation and your absolute safety.
              </p>

              <h3 id="h3-2">Where to go on a safari in Tanzania?</h3>
              <p>
                Tanzania is widely recognized as the finest safari destination
                in the world. With over 30% of its total land dedicated to
                wildlife protection, you will traverse iconic natural wonders:
              </p>
              <h4>The Serengeti National Park</h4>
              <p>
                The crown jewel of our safari offerings. Home to the legendary{" "}
                <strong>Great Wildebeest Migration</strong>, the endless
                Serengeti plains host massive lion prides, hunting cheetahs, and
                millions of grazing herbivores throughout the year.
              </p>
              <h4>The Ngorongoro Conservation Area</h4>
              <p>
                A breathtaking, UNESCO-protected volcanic crater which forms a
                unique natural sanctuary. With over 25,000 large mammals living
                inside the crater walls, it offers the absolute best opportunity
                to spot the endangered black rhinoceros.
              </p>
              <h4>Tarangire and Lake Manyara National Parks</h4>
              <p>
                Famous for its colossal elephant herds and ancient giant baobab
                trees, <strong>Tarangire</strong> is a visual masterpiece. Right
                next door, <strong>Lake Manyara</strong> boasts scenic soda lake
                views packed with pink flamingos and the legendary tree-climbing
                lions.
              </p>
              <h4>Mount Kilimanjaro and Zanzibar Island</h4>
              <p>
                For mountain lovers, standing on <strong>Uhuru Peak</strong> is
                a lifetime goal. And for the ultimate relaxation, the spice
                island of <strong>Zanzibar</strong> offers perfect tropical
                beaches, historic Swahili culture in Stone Town, and incredible
                diving around <strong>Mnemba Atoll</strong>.
              </p>

              <h3 id="h3-3">Which season to go to Tanzania?</h3>
              <p>
                Tanzania offers incredible year-round safari and trekking
                opportunities depending on your preferences:
                <br />- <strong>The Dry Season (June to October):</strong> The
                absolute best time for wildlife viewing. The vegetation is
                sparse, and animals congregate densely around remaining water
                sources. It is also the peak period to witness dramatic river
                crossings in the northern Serengeti.
                <br />- <strong>The Green Season (November to May):</strong> The
                savanna turns into a lush, emerald paradise. This is the optimal
                season for bird watching, calving season in Ndutu (where
                thousands of baby wildebeests are born daily in February), and
                enjoying premium lodges at low-season rates without heavy
                tourist traffic.
                <br />- <strong>Kilimanjaro Climbing Seasons:</strong> The best
                climbing conditions with clear skies occur from January to March
                and June to October.
              </p>

              <h3 id="h3-4">What price for a safari in Tanzania?</h3>
              <p>
                Our all-inclusive <strong>Kili to Savanna packages</strong>{" "}
                generally range from{" "}
                <strong>$1,300 to $3,500 per person</strong> depending on the
                duration (from 3-day short highlights to 10-day ultimate grand
                tours) and accommodation level. The price covers private 4x4
                Land Cruisers, expert local driver-guides, national park entry
                fees, comfortable overnight stays (adventure camps or premium
                lodges), and all delicious daily meals. *(International flights
                and personal visa fees are not included).*
              </p>

              <h3 id="h3-5">Should I choose a 15-day or 7-day trip?</h3>
              <p>
                - <strong>A 7-Day Classic Safari:</strong> Perfect for
                experiencing the main highlights. Our 7-day tour seamlessly
                covers Tarangire, the endless plains of the Serengeti, the
                spectacular Ngorongoro Crater, and finishes with a beautiful
                flight to Zanzibar.
                <br />- <strong>A 15-Day Ultimate Kili to Coast:</strong> The
                dream expedition. Spend the first 6 to 7 days climbing Mount
                Kilimanjaro via the scenic Machame or Lemosho routes. Follow it
                with a 5-day luxury private safari across Serengeti and
                Ngorongoro, and top it off with a 3-day premium tropical beach
                retreat in Zanzibar.
              </p>

              <h3 id="h3-6">Is it possible to go as a family?</h3>
              <p>
                Tanzania is a highly safe and deeply educational family
                destination. Sharing a picnic on the golden plains or watching
                baby elephants play is an adventure children will never forget!
                We design private family safaris allowing you to travel at your
                own comfortable pace, staying in family-friendly lodges with
                pools, and arranging interactive cultural activities with local
                Maasai kids.
              </p>

              <h3 id="h3-7">What are our Tanzanian packages?</h3>
              <p>
                We specialize in unforgettable Tanzania travel experiences
                tailored for every type of traveler:
                <br />
                &gt; <strong>Kilimanjaro Climbing Adventures:</strong> Conquer
                Africa’s highest peak through expertly guided treks via Machame,
                Lemosho, Marangu, and other scenic routes with experienced
                mountain crews and full safety support.
                <br />
                &gt; <strong>Wildlife Safari Experiences:</strong> Explore
                Tanzania’s iconic national parks including Serengeti, Ngorongoro
                Crater, Tarangire, and Lake Manyara with private and group
                safari packages designed for comfort and adventure.
                <br />
                &gt; <strong>Zanzibar Beach Holidays:</strong> Relax on the
                beautiful white sand beaches of Zanzibar with customized beach
                stays, snorkeling trips, cultural tours, and luxury island
                experiences.
                <br />
                &gt; <strong>Cultural & Day Tours:</strong> Discover authentic
                local experiences through Maasai village visits, Materuni
                Waterfalls, Chemka Hot Springs, coffee tours, cycling
                adventures, and cultural excursions around Moshi and Arusha.
              </p>

              <h3 id="h3-8">Activities for all tastes</h3>
              <h4>For Trekking and Mountain Lovers</h4>
              <p>
                Conquer the mighty <strong>Mount Kilimanjaro</strong>, the
                tallest free-standing mountain on Earth, or scale its sister
                volcano, <strong>Mount Meru</strong>, enjoying breathtaking
                views of the Rift Valley.
              </p>
              <h4>For Cultural Connection</h4>
              <p>
                Meet the traditional <strong>Maasai tribe</strong> in the
                Ngorongoro highlands, sharing stories, visiting their bomas, and
                understanding their pastoral lifestyle.
              </p>

              <h3 id="h3-9">What are the accommodation options?</h3>
              <p>
                We tailor your accommodation to match your budget and travel
                style:
                <br />
                &gt; <strong>Adventure camping:</strong> Spend nights in cozy
                dome tents in public national park campsites, sitting around a
                campfire listening to the calls of the wild savanna under the
                stars.
                <br />
                &gt; <strong>Luxury Tented Camps:</strong> Enjoy large walk-in
                canvas tents built on wooden decks, complete with comfortable
                beds, en-suite bathrooms, hot bucket showers, and superb dining
                areas.
                <br />
                &gt; <strong>Premium Safari Lodges:</strong> Beautifully
                constructed stone-and-wood lodges offering luxury amenities,
                private balconies overlooking animal watering holes, and
                infinity swimming pools.
                <br />
                &gt; <strong>Zanzibar Beach Resorts:</strong> Elegant beachfront
                boutique hotels and luxury villas lining the warm shores of
                Zanzibar.
              </p>

              <h3 id="h3-10">Kili to Savanna's favorite spots</h3>
              <p>
                Having designed and guided tours for over 9 years, our absolute
                favorite itineraries focus on the endless Serengeti wildebeest
                migration, the spectacular wildlife density of the Ngorongoro
                Crater, elephant tracking in Tarangire, and diving in the Mnemba
                Atoll in Zanzibar.
              </p>

              <h3 id="h3-11">Who are our local guiding experts?</h3>
              <p>
                Based in Arusha, <strong>Kili to Savanna</strong> is a
                fully-licensed local Tanzanian operator. We work with
                highly-trained, certified Tanzanian guides, mountain experts,
                and camp hosts. We own and operate our private fleet of custom
                safari 4x4s, ensuring exceptional standards of comfort and
                safety for your lifetime Swahili adventure.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="up-link">
        <Link
          href="/#activityListZone"
          className="no-decoration scroll-smoothly btn custom-button rounded white hover-grow"
          data-offset="-100"
        >
          <i className="fa fa-chevron-up" aria-hidden="true"></i>
          Back to offers
        </Link>
      </div>
    </div>
  );
}

export default Information;
