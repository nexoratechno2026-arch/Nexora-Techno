import { motion } from "framer-motion";

const reasons = [
  {
    title: "Startup-First Execution",
    description:
      "We understand the pressure of a launch. Every decision is made for speed, budget efficiency, and real business impact — not just aesthetics.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Premium Design Quality",
    description:
      "From typography to micro-interactions, every visual element is crafted to signal trust and professionalism the moment a visitor lands.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
        <path d="M5.5 20a7.5 7.5 0 0 1 13 0" />
      </svg>
    ),
  },
  {
    title: "Conversion-Focused Strategy",
    description:
      "We don't just build websites — we build sales systems. Every page, section, and CTA is engineered to turn visitors into paying customers.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      </svg>
    ),
  },
  {
    title: "Fast Turnaround & Support",
    description:
      "Most projects go live in 3–6 weeks. Post-launch, you get 24h response times and ongoing optimization — not radio silence.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 3.5" />
      </svg>
    ),
  },
  {
    title: "Transparent Communication",
    description:
      "Weekly updates, shared timelines, and an open feedback loop throughout the project. No black boxes, no surprises at delivery.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "AI-Powered Automation",
    description:
      "We integrate smart automations into your workflow — from lead follow-ups to customer support — so your business runs leaner and faster.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2.8v2.8M12 18.4v2.8M21.2 12h-2.8M5.6 12H2.8M18.8 5.2l-2 2M7.2 16.8l-2 2M18.8 18.8l-2-2M7.2 7.2l-2-2" />
      </svg>
    ),
  },
];

function WhyChooseSection() {
  return (
    <section id="why-us" className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-24">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-accent-400">Why Choose Us</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Built for business outcomes,<br className="hidden lg:block" /> not just compliments.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Nexora Techno combines execution speed, design quality, and growth strategy — so founders get results,
            not just deliverables.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.01 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-6 transition"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(10,160,232,0.12),transparent_55%)] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/90 to-brand-300/80 text-slate-950 shadow-[0_12px_30px_rgba(10,160,232,0.22)]">
                  {reason.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{reason.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;
