import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    title: "Business Website Development",
    desc: "Fast, responsive, and SEO-ready websites tailored for trust, lead capture, and conversion.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design Systems",
    desc: "Modern interfaces with clear hierarchy, better spacing, and friction-free user journeys.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    title: "AI Automation Solutions",
    desc: "Automate repetitive business tasks with AI workflows, smart assistants, and CRM integrations.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2.8v2.8M12 18.4v2.8M21.2 12h-2.8M5.6 12H2.8M18.8 5.2l-2 2M7.2 16.8l-2 2M18.8 18.8l-2-2M7.2 7.2l-2-2" />
      </svg>
    ),
  },
  {
    title: "SEO & Content Strategy",
    desc: "Rank higher on search with technical SEO, strategic content structure, and intent-driven pages.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: "Digital Ads & Lead Funnels",
    desc: "Data-backed ad campaigns and conversion funnels designed to turn clicks into qualified leads.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Brand Consulting",
    desc: "Strategic support to improve your messaging, offer clarity, and optimize customer decision flow.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
];

function ServicesSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600">
            Our Services
          </span>
          <h2 className="font-display text-4xl font-black text-slate-900 sm:text-5xl">
            Solutions Built for Growth
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500">
            From design to deployment — every service is engineered to drive real business outcomes.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`group cursor-default rounded-2xl border p-8 transition-all duration-300 ${
                hovered === i
                  ? "border-blue-200 bg-white shadow-2xl shadow-blue-500/10 -translate-y-1 scale-[1.01]"
                  : "border-slate-100 bg-white shadow-sm"
              }`}
            >
              <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200 ${
                hovered === i ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
              }`}>
                {s.icon}
              </div>
              <h3 className="mb-3 text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{s.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
