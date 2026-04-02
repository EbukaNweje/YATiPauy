import React from "react";
import HeroPage from "../pages/Testing";
import Header from "./Header";
import Weather from "./Weather";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";
import Testimonial from "./Testimonial";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <section id="hero">
        <HeroPage />
      </section>
      <section id="about">
        <Weather />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="testimonial">
        <Testimonial />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};
export default LandingPage;
