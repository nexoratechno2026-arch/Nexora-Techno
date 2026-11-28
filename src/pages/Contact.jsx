import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main>
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
