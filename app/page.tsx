"use client";

import dynamic from "next/dynamic";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Footer from "@/sections/Footer";

// Lazy-load heavy sections
const FeaturedClasses = dynamic(() => import("@/sections/FeaturedClasses"), { ssr: false });
const Advantages = dynamic(() => import("@/sections/Advantages"), { ssr: false });
const HowItWorks = dynamic(() => import("@/sections/HowItWorks"), { ssr: false });
const Testimonials = dynamic(() => import("@/sections/Testimonials"), { ssr: false });
const CallToAction = dynamic(() => import("@/sections/CallToAction"), { ssr: false });
const FaqSection = dynamic(() => import("@/sections/FaqSection"), { ssr: false });
const CurvedLoop = dynamic(() => import("@/sections/CurvedLoopSection"), { ssr: false });

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <FeaturedClasses />
        <Advantages />
        <HowItWorks />
        <Testimonials />
        <FaqSection />
        {/* <CurvedLoop /> */}
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
