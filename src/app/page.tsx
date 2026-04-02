"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatIDo from "@/components/WhatIDo";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Activity from "@/components/Activity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  useEffect(() => {
    // Force scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <WhatIDo />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Activity />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
