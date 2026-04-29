import { Fragment } from "react";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";
import Prefooter from "@/components/Home/Prefooter";
import RegisterForm from "@/components/Auth/RegisterForm";

export const metadata = {
  title: "Register — Kili to Savanna",
  description: "Create your customer account",
};

export default function RegisterPage() {
  return (
    <Fragment>
      <Header />
      <RegisterForm />
      <Prefooter />
      <Footer />
      
    </Fragment>
  );
}
