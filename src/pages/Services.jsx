import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";
import { servicesData } from "../data/servicesData";

// Curated display order
const SERVICE_ORDER = [
  "website-development",
  "software-development",
  "ecommerce-development",
  "ai-automation",
  "business-automation",
  "web-app-development",
  "ui-ux-design",
  "seo",
  "full-stack-development",
  "digital-marketing",
];

// Short, honest descriptions for the index (no hype)
const INDEX_DESCRIPTIONS = {
  "website-development":   "Responsive websites for businesses, institutions, and local brands. Built around your content and contact flows.",
  "software-development":  "Custom tools built around your actual business operations — billing, portals, inventory, dashboards.",
  "ecommerce-development": "Online stores with product catalogues, WhatsApp ordering, UPI payments, and mobile-first shopping.",
  "ai-automation":         "Practical AI for document processing, enquiry handling, and reducing repetitive manual work.",
  "business-automation":   "Connecting your forms, messages, sheets, and databases so things happen without manual transfer.",
  "web-app-development":   "Customer-facing or internal applications with user accounts, APIs, and responsive interfaces.",
  "ui-ux-design":          "Wireframes, Figma prototypes, and design systems for digital products and websites.",
  "seo":                   "Technical structure, metadata, local business information, and search console setup.",
  "full-stack-development":"End-to-end applications from database design through to front-end interface.",
  "digital-marketing":     "Google Ads, Meta Ads, and WhatsApp campaigns with clear targeting and transparent reporting.",
};

const orderedServices = SERVICE_ORDER
  .map((id) => servicesData.find((s) => s.id === id))
  .filter(Boolean);

export default function Services() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-paper border-b border-rule">
          <div className="container-content py-14 sm:py-18">
            <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-ink transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink">Services</span>
            </nav>
            <p className="eyebrow mb-4">What we offer</p>
            <h1 className="heading-display text-display-md text-ink mb-4 max-w-[28ch]">
              Services
            </h1>
            <p className="text-body-lg text-ink-muted max-w-[52ch]">
              We build practical digital tools around how your organisation already works.
              Each engagement starts with understanding your actual problem.
            </p>
          </div>
        </section>

        {/* Service directory */}
        <section className="bg-surface">
          <div className="container-content py-12">
            <div className="space-y-0 border border-rule rounded-lg overflow-hidden bg-paper">
              {orderedServices.map((svc, idx) => (
                <div key={svc.id}>
                  {idx > 0 && <div className="h-px bg-rule" />}
                  <Link
                    to={`/services/${svc.id}`}
                    className="flex items-start sm:items-center gap-5 p-5 sm:p-6 hover:bg-surface transition-colors group"
                  >
                    {/* Index */}
                    <span className="text-[11px] font-mono text-ink-muted w-6 flex-shrink-0 pt-1 sm:pt-0 hidden sm:block">
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mb-1">
                        <h2 className="font-sans font-semibold text-[15px] text-ink group-hover:text-accent-600 transition-colors">
                          {svc.title}
                        </h2>
                        <span className="text-[10px] font-mono text-ink-muted border border-rule bg-surface rounded px-1.5 py-0.5 self-start sm:self-auto">
                          {svc.category}
                        </span>
                      </div>
                      <p className="text-[13px] text-ink-muted leading-relaxed max-w-[65ch]">
                        {INDEX_DESCRIPTIONS[svc.id] || svc.shortDescription}
                      </p>
                    </div>

                    {/* Arrow */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="text-rule group-hover:text-accent-600 flex-shrink-0 transition-colors self-center"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Not sure block */}
        <section className="bg-paper border-t border-rule">
          <div className="container-content py-12">
            <div className="max-w-2xl">
              <h2 className="heading-display text-display-sm text-ink mb-3">
                Not sure what you need?
              </h2>
              <p className="text-body-md text-ink-muted mb-6">
                Tell us the problem and we will suggest the right approach.
                No obligation, no sales pitch.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">
                  Discuss a requirement
                </Link>
                <a
                  href="https://wa.me/919345121988?text=Hi%20Nexora%20Techno%2C%20I%27d%20like%20to%20discuss%20a%20requirement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  aria-label="WhatsApp Nexora Techno (opens WhatsApp)"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
