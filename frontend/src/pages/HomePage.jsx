import React from "react";
import AppHeader from "../components/AppHeader";
import FeatureSection from "../components/Home/FeatureSection";
import HeroSection from "../components/Home/HeroSection";

export default function HomePage() {
  return (
    <>
      <AppHeader />
      <main className="home-page">
        <HeroSection />
        <FeatureSection />
      </main>
    </>
  );
}
