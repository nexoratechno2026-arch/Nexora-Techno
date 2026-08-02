import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles, Zap, Layers, Smartphone, ShoppingCart, Search, HeartHandshake, DollarSign, Clock } from "lucide-react";

const reasons = [
  {
    title: "Professional Website Development",
    desc: "Custom, high-performing websites built to showcase your brand, drive engagements, and convert visitors.",
    icon: <Layers className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Mobile Application Development",
    desc: "Native & cross-platform Android and iOS applications designed with smooth UI and robust backend architecture.",
    icon: <Smartphone className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Custom Software Solutions",
    desc: "Tailored business software solutions engineered to automate workflows and optimize internal operations.",
    icon: <Zap className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "E-Commerce Development",
    desc: "Full-featured online stores equipped with product catalogs, secure checkout, and WhatsApp order integrations.",
    icon: <ShoppingCart className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "SEO-Friendly Websites",
    desc: "Built-in technical SEO optimization, fast loading speeds, and search-engine-friendly structure to boost rankings.",
    icon: <Search className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Responsive & Modern UI/UX",
    desc: "User-centric design system ensuring flawless visual layout and effortless navigation across every device screen.",
    icon: <Sparkles className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Reliable Technical Support",
    desc: "Continuous technical maintenance, security monitoring, and dedicated post-launch support for peace of mind.",
    icon: <HeartHandshake className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Affordable Pricing",
    desc: "Transparent, budget-friendly pricing models structured to deliver maximal ROI without hidden costs.",
    icon: <DollarSign className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Timely Project Delivery",
    desc: "Agile execution milestones guaranteeing on-time project completion and swift time-to-market.",
    icon: <Clock className="h-6 w-6 text-blue-600" />,
  },
];

function WhyChooseSection() {
  return (
    <section id="why-us" className="bg-slate-50 py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600">
            <ShieldCheck className="h-4 w-4" /> Why Choose Us
          </span>
          <h2 className="font-display text-4xl font-black text-slate-900 sm:text-5xl">
            Why Choose Nexora Techno?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            We are committed to delivering innovative digital solutions that help businesses grow and succeed in the digital world.
          </p>
        </motion.div>

        {/* 9 Pillars Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -8px rgba(37,99,235,0.14)" }}
              className="group rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:border-blue-300"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <div className="transition duration-300 group-hover:brightness-200 group-hover:invert">
                    {r.icon}
                  </div>
                </div>
                <CheckCircle2 className="h-5 w-5 text-blue-500 opacity-60 transition duration-300 group-hover:opacity-100" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Commitment Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-8 text-center text-white shadow-xl shadow-blue-600/20 sm:p-10"
        >
          <h3 className="font-display text-2xl font-bold sm:text-3xl">
            Partner with Nexora Techno Today
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-base text-blue-100">
            We are committed to delivering innovative digital solutions that help businesses grow and succeed in the digital world.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="/#contact"
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-md transition hover:bg-slate-100 hover:scale-105 active:scale-95"
            >
              Start Your Project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseSection;
