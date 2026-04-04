import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import PortfolioSection from "../components/PortfolioSection";
import WhyChooseSection from "../components/WhyChooseSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CtaSection from "../components/CtaSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";
import ClientLogos from "../components/ClientLogos";
import ClientDashboardDemo from "../components/ClientDashboardDemo";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ClientLogos />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ClientDashboardDemo />
        <WhyChooseSection />
        <TestimonialsSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}

export default Home;
