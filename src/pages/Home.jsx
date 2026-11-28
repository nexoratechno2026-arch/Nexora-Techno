import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PortfolioSection from "../components/PortfolioSection";
import ServicesSection from "../components/ServicesSection";
import HowWeWorkSection from "../components/HowWeWorkSection";
import EdTechSection from "../components/EdTechSection";
import FaqSection from "../components/FaqSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <PortfolioSection />
        <ServicesSection />
        <HowWeWorkSection />
        <EdTechSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
