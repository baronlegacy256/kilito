import { Fragment } from "react";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";
import Packages from "@/components/Home/Packages";


export const metadata = {
  title: "Our Packages - Kili to Savanna",
  description: "Browse all our Tanzania safari packages, climbing and trekking adventures, and cultural tours.",
};

export default function PackagesPage() {
  return (
    <Fragment>
      <Header />
      <main style={{ paddingTop: '80px', minHeight: '60vh' }}>
        <Packages />
      </main>
      <Footer />
      
    </Fragment>
  );
}
