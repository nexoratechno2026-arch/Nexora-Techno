import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    title: "AI Automation Solutions",
    text: "Automate repetitive business tasks with AI workflows, smart assistants, and integrated lead handling.",
    details: [
      "Custom automations for enquiry routing and follow-ups.",
      "AI chat and response systems for faster customer support.",
      "CRM and tool integrations to reduce manual workload.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2.8v2.8M12 18.4v2.8M21.2 12h-2.8M5.6 12H2.8M18.8 5.2l-2 2M7.2 16.8l-2 2M18.8 18.8l-2-2M7.2 7.2l-2-2" />
      </svg>
    ),
  },
  {
    title: "Business Website Development",
    text: "Fast, responsive, and SEO-ready websites tailored for trust, lead capture, and conversion.",
    details: [
      "Custom UI built to match your brand voice.",
      "Performance-first pages for better retention.",
      "Clear CTA structure to increase inquiries.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h16v12H4z" />
        <path d="M4 10h16" />
        <path d="M9 15h2" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design Systems",
    text: "Modern interfaces with clear hierarchy, better spacing, and friction-free user journeys.",
    details: [
      "Wireframes and high-fidelity visual systems.",
      "Design language aligned with startup positioning.",
      "Component consistency for long-term scalability.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h16v12H4z" />
        <path d="M8 10h8" />
        <path d="M8 14h4" />
      </svg>
    ),
  },
  {
    title: "SEO and Content Strategy",
    text: "Rank higher on search with technical SEO, strategic content structure, and intent-driven pages.",
    details: [
      "Keyword clusters mapped to service intent.",
      "On-page and technical SEO implementation.",
      "Content optimization for sustained traffic.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="5" width="17" height="12" rx="3" />
        <path d="m8 14 3-3 2 2 3-3 2 2" />
      </svg>
    ),
  },
  {
    title: "Digital Ads and Lead Funnels",
    text: "Data-backed ad campaigns and conversion funnels designed to turn clicks into qualified leads.",
    details: [
      "Meta and Google ad campaign setup.",
      "Landing page optimization for better ROI.",
      "Weekly reporting and funnel refinements.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3l2.7 5.47 6.03.88-4.36 4.25 1.03 6-5.4-2.84-5.4 2.84 1.03-6L3.27 9.35l6.03-.88L12 3z" />
      </svg>
    ),
  },
  {
    title: "Brand and Conversion Consulting",
    text: "Strategic support to improve your messaging, offer clarity, and customer decision flow.",
    details: [
      "Messaging improvements for stronger positioning.",
      "Audit of current website and conversion blockers.",
      "Roadmap for monthly growth execution.",
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 13V7a2 2 0 0 1 2-2h12" />
        <path d="M20 11v6a2 2 0 0 1-2 2H6" />
        <path d="m10 9 4 3-4 3V9Z" />
      </svg>
    ),
  },
];

function ServicesSection() {
  const [openCard, setOpenCard] = useState(null);

  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-brand-200">Services</p>
        <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Website, growth, and AI automation services for startups and growing brands.
        </h2>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Nexora Techno combines design, technology, and growth strategy to help your business stand out and scale.
        </p>
        <p className="mt-3 text-sm text-brand-100">Execution focused. Conversion driven. Built for real business outcomes.</p>
      </motion.div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:mt-14 md:grid-cols-2">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.01 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(211,154,43,0.2),transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/90 to-brand-300/80 text-slate-950 shadow-[0_18px_40px_rgba(211,154,43,0.24)]">
                {service.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{service.text}</p>
              <button
                type="button"
                onClick={() => setOpenCard(openCard === index ? null : index)}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-100 transition hover:text-brand-50"
              >
                <span>{openCard === index ? "Hide details" : "Learn more"}</span>
                <span className="transition duration-300 group-hover:translate-x-1">-&gt;</span>
              </button>

              {openCard === index ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <ul className="space-y-2 text-sm text-slate-200">
                    {service.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
