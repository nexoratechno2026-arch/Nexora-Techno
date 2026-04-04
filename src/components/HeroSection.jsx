import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedq-NXP8PE5gs3GQ7SNA-8KVlqgQG8yaLEESGIv1qu04CGBg/viewform?usp=dialog";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Animated counter hook
function useCountUp(target, duration = 1.5, suffix = "") {
  const ref = useRef(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v) + suffix);

  useEffect(() => {
    if (target === null || target === undefined) return;
    const controls = animate(count, target, { duration, ease: "easeOut" });
    return controls.stop;
  }, [target, duration, count]);

  return { ref, rounded };
}

function AnimatedStat({ value, label, numericValue, suffix }) {
  const { rounded } = useCountUp(numericValue ?? 0, 1.8, suffix);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
      <motion.div className="font-display text-2xl font-bold text-white">
        {numericValue != null ? <motion.span>{rounded}</motion.span> : value}
      </motion.div>
      <p className="mt-1 text-xs leading-5 text-slate-300">{label}</p>
    </div>
  );
}

const stats = [
  { value: "120+", label: "Projects delivered", numericValue: 120, suffix: "+" },
  { value: "24h", label: "Fast support response", numericValue: 24, suffix: "h" },
  { value: "4.9★", label: "Client satisfaction", numericValue: null, suffix: "" },
];

function HeroSection() {
  return (
    <section
      id="home"
      className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-14 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-10 lg:pb-24 lg:pt-20"
    >
      {/* Background orb decorations */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-accent-400/8 blur-3xl" aria-hidden />

      <div className="max-w-2xl">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-3 rounded-full border border-brand-300/20 bg-white/[0.06] px-4 py-2 text-sm text-white/80 shadow-glow"
        >
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-400">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
          </span>
          Nexora Techno — Digital Growth Partner
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.05}
          className="mt-8 font-display text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl"
        >
          Build A Website That
          <span className="block bg-gradient-to-r from-white via-brand-100 to-brand-300 bg-clip-text text-transparent">
            Converts & Grows
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl"
        >
          Nexora Techno builds premium websites, AI automation workflows, and lead systems
          engineered for measurable growth — not just good looks.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.15}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            id="hero-get-demo-btn"
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 px-7 py-4 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(10,160,232,0.4)] transition hover:brightness-110"
          >
            Get Free Demo
            <span className="translate-x-0 transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            id="hero-contact-btn"
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/[0.09]"
          >
            Talk to Us
          </a>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="mt-10 grid gap-3 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>

      {/* Right visual card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Floating ring decoration */}
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-4 top-6 h-24 w-24 rounded-full border border-brand-300/20 bg-brand-400/8"
          aria-hidden
        />
        <motion.div
          animate={{ y: [4, -8, 4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -left-6 bottom-10 h-16 w-16 rounded-full border border-accent-400/20 bg-accent-400/8"
          aria-hidden
        />

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-glow">
          <div className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(10,160,232,0.28),transparent_40%),linear-gradient(180deg,rgba(7,23,48,0.96),rgba(4,12,24,0.99))] p-5">
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Growth Dashboard</p>
                <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                  Your brand's digital engine.
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-300 to-accent-400">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-slate-950" fill="currentColor">
                  <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93s-3.05 7.44-7 7.93v2.02c5.05-.5 9-4.76 9-9.95S18.05 2.55 13 2.05zm-2 0c-1.96.18-3.77.97-5.21 2.2L7.21 5.64C8.32 4.71 9.61 4.09 11 3.84V2.05zm-6.79 3.49C3.77 6.98 2.98 8.79 2.8 10.75h1.79c.17-1.39.75-2.68 1.63-3.72L4.21 5.54zM2.8 12.75c.18 1.96.97 3.77 2.2 5.21l1.26-1.26c-.87-1.04-1.45-2.33-1.63-3.72L2.8 12.75zm3.46 6.47C7.56 20.69 9.26 21.45 11 21.65V19.8c-1.27-.23-2.41-.78-3.37-1.57l-1.37 1.07-.0-.03zm6.74.43v2.02c5.05-.5 9-4.76 9-9.95s-3.95-9.45-9-9.95v2.02c3.95.49 7 3.85 7 7.93s-3.05 7.44-7 7.93z"/>
                </svg>
              </div>
            </div>

            {/* Services mini cards */}
            <div className="mt-5 space-y-3">
              {[
                { label: "Website Design", pct: 92, color: "from-brand-500 to-brand-300" },
                { label: "AI Automation", pct: 87, color: "from-accent-400 to-brand-400" },
                { label: "SEO & Growth", pct: 78, color: "from-brand-300 to-accent-400" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-200">{item.label}</span>
                    <span className="font-semibold text-white">{item.pct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["120+ Projects", "4.9★ Rated", "24h Support"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-brand-300/25 bg-brand-400/10 px-3 py-1 text-xs font-medium text-brand-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
