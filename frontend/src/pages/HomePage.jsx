import React from "react";
import AppHeader from "../components/AppHeader";
import HeroSection from "../components/Home/HeroSection";

export default function HomePage() {
  return (
    <>
      <AppHeader />
      <main className="home-page">
        <HeroSection />
      </main>
    </>
  );
}
