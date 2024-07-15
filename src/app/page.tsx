"use client";

import { InfiniteMovingCardList } from "@/components/ui/CardTestimonialList";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/ui/HeroSection";
import { Navbar } from "@/components/ui/Navbar";

import { Feature } from "@/components/ui/feature";
import Team from "@/components/ui/team";
export default function Home() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Docs",
      link: "/docs/getting-started",
    },
    {
      name: "Playground",
      link: "/playground",
    },
  ];
  return (
    <>
      <Navbar navItems={navItems} />
      <main>
        <HeroSection />
        <InfiniteMovingCardList />
        <Feature />
        <Team />
        <Footer />
      </main>
    </>
  );
}
