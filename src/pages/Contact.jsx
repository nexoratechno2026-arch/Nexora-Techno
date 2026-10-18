import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page title header */}
        <section className="bg-paper border-b border-rule">
          <div className="container-content py-10 sm:py-12">
            <p className="eyebrow mb-3">Get in touch</p>
            <h1 className="heading-display text-display-md text-ink">
              Start with a conversation.
            </h1>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
