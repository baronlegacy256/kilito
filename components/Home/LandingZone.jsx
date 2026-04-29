import React from "react";
import Hero from "./Hero";
import About from "./About";
import Categories from "./Categories";
import Packages from "./Packages";
import Reviews from "./Reviews";
import Experts from "./Experts";
import Infrormation from "./Information";

function LandingZone() {
  return (
    <div id="showLandingZone">
      <Hero />

      <div className="blank-mask"></div>

      <Categories />

      <About />

      <Packages />

      <Reviews />

      <Experts />

      <Infrormation />

      <div id="no-scroll-mask"></div>
    </div>
  );
}

export default LandingZone;
