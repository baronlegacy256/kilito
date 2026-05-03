
import { Fragment } from "react";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import Categories from "@/components/Home/Categories";
import Prefooter from "@/components/Home/Prefooter";
import Experts from "@/components/Home/Experts";
import About from "@/components/Home/About";
import Packages from "@/components/Home/Packages";
import Information from "@/components/Home/Information";

export const metadata = {
  title: "Tanzania Safari: Tailor-made Trips and Stays",
  description: "Kili to Savanna is a Tanzanian safari company providing high quality travel and tour services from Mt Kilimanjaro to the Serengeti and beautiful beaches.",
  openGraph: {
    title: "Tanzania Safari: Tailor-made Trips and Stays",
    description: "Kili to Savanna is a Tanzanian safari company providing high quality travel and tour services from Mt Kilimanjaro to the Serengeti and beautiful beaches.",
    url: "https://kilitosavannaadventures.com/",
    images: ["/assets/images/home/slider.jpg"],
  }
};

export default function Home() {
  return (
    <Fragment>
      <Header/>
      <Hero/>
      <Categories/>
      <About/>
      <Packages/>
      
      <Prefooter/>
      <Footer/>
    </Fragment>
  );
}

