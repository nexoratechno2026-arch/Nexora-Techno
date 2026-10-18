import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { servicesData } from "../data/servicesData";

// Curated homepage service list — short editorial copy, no hype
const SERVICE_LIST = [
  {
    id: "website-development",
    label: "Website Development",
    note: "Responsive business websites, landing pages, and institution portals.",
  },
  {
    id: "software-development",
    label: "Custom Software",
    note: "Management dashboards, customer portals, and internal workflow tools.",
  },
  {
    id: "ecommerce-development",
    label: "E-commerce",
    note: "Online stores with WhatsApp ordering, UPI payments, and catalogue management.",
  },
  {
    id: "ai-automation",
    label: "AI &amp; Workflow Automation",
    note: "Practical automation for enquiries, document processing, and notifications.",
  },
  {
    id: "business-automation",
    label: "Business Automation",
    note: "Connecting forms, sheets, messages, and operations into clean workflows.",
  },
  {
    id: "web-app-development",
    label: "Web &amp; Mobile Applications",
    note: "Full-stack applications with user accounts, APIs, and responsive interfaces.",
  },
  {
    id: "ui-ux-design",
    label: "UI/UX Design",
    note: "Wireframes, Figma prototypes, and design systems for digital products.",
  },
  {
    id: "seo",
    label: "SEO &amp; Local Visibility",
    note: "Technical structure, metadata, and local search setup.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-surface border-b border-rule">
      <div className="container-content py-16 sm:py-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="eyebrow mb-3">How we help</p>
            <h2 className="heading-display text-display-sm text-ink">
              Services
            </h2>
            <p className="text-body-md text-ink-muted mt-3 max-w-[52ch]">
              We build practical digital tools around how your organisation
              already works.
            </p>
          </div>
          <Link to="/services" className="btn-ghost text-sm flex-shrink-0 inline-flex items-center gap-1 group">
            <span>All services</span>
            <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        {/* Editorial service list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule border border-rule rounded-lg overflow-hidden shadow-sm"
        >
          {SERVICE_LIST.map((svc, idx) => (
            <Link
              key={svc.id}
              to={`/services/${svc.id}`}
              className="block bg-paper hover:bg-surface p-6 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow-muted mb-1.5 block">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="font-sans font-semibold text-[15px] text-ink group-hover:text-accent-600 transition-colors mb-1.5"
                    dangerouslySetInnerHTML={{ __html: svc.label }}
                  />
                  <p
                    className="text-[13px] text-ink-muted leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: svc.note }}
                  />
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="text-rule group-hover:text-accent-600 flex-shrink-0 mt-1 transition-all duration-200 group-hover:translate-x-1"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Not sure block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 p-5 rounded-lg border border-rule bg-paper shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-sm text-ink-muted">
            <strong className="text-ink">Not sure what you need?</strong>{" "}
            Tell us the problem and we will suggest the right approach.
          </p>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link to="/contact" className="btn-primary text-xs py-2 px-4 shadow-sm hover:shadow transition-shadow">
              Discuss a requirement
            </Link>
            <a
              href="https://wa.me/919345121988?text=Hi%20Nexora%20Techno%2C%20I%27d%20like%20to%20discuss%20a%20requirement"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs py-2 px-4"
            >
              WhatsApp us
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
