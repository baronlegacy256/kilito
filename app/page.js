
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
import Reviews from "@/components/Home/Reviews";

export const metadata = {
  title:
    "Tanzania Safari Tours | Kilimanjaro & Serengeti Trips | Kili to Savanna Safari Club",

  description:
    "Kili to Savanna Safari Club offers tailor-made Tanzania safari tours, Serengeti wildlife safaris, Kilimanjaro trekking, Zanzibar beach holidays, and authentic African travel experiences.",

  keywords: [
    "Tanzania safari",
    "Serengeti safari",
    "Kilimanjaro trekking",
    "Zanzibar beach holidays",
    "African safari tours",
    "wildlife safari Tanzania",
    "luxury safari Tanzania",
    "budget safari Tanzania",
    "Ngorongoro crater tours",
    "Kili to Savanna Safari Club"
  ],

  openGraph: {
    title:
      "Tanzania Safari Tours | Kilimanjaro & Serengeti, and Zanzibar Trips | Kili to Savanna Safari Club",

    description:
      "Explore Tanzania with Kili to Savanna Safari Club through tailor-made safaris, Kilimanjaro trekking and climbs, Serengeti adventures, and Zanzibar beach escapes.",

    url: "https://kilitosavannasafariclub.com/",

    images: ["/assets/images/home/slider.jpg"],
  },
};

export default function Home() {
  return (
    <Fragment>
      <Header/>
      <Hero/>
      <Categories/>
      <About/>
      <Packages/>
      <Information/>
      
      <Prefooter/>
      <Footer/>
    </Fragment>
  );
}

