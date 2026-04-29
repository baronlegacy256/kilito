
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

