import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SplitAudienceSection from "../components/SplitAudienceSection";
import ServicesSection from "../components/ServicesSection";
import WhyChooseSection from "../components/WhyChooseSection";
import PortfolioSection from "../components/PortfolioSection";
import HowWeWorkSection from "../components/HowWeWorkSection";
import TechnologiesSection from "../components/TechnologiesSection";
import StatsSection from "../components/StatsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FaqSection from "../components/FaqSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Business / Student Split Choice */}
        <SplitAudienceSection />

        {/* 3. Core Engineering Services */}
        <ServicesSection />

        {/* 4. Why Businesses Choose Nexora */}
        <WhyChooseSection />

        {/* 5. Real Projects Showcase & Case Studies */}
        <PortfolioSection />

        {/* 6. How We Work — 7 Step Process */}
        <HowWeWorkSection />

        {/* 7. Technologies Stack */}
        <TechnologiesSection />

        {/* 8. Genuine Numbers & Trust Stats */}
        <StatsSection />

        {/* 9. Client & Student Reviews */}
        <TestimonialsSection />

        {/* 10. FAQ Section */}
        <FaqSection />

        {/* 12. Lead Capture & Direct Contact */}
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
