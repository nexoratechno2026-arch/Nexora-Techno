import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PortfolioSection from "../components/PortfolioSection";
import WhyChooseSection from "../components/WhyChooseSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import TeamSection from "../components/TeamSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PortfolioSection />
        <WhyChooseSection />
        <AboutSection />
        <ServicesSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}

export default Home;
