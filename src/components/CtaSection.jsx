import { motion } from "framer-motion";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedq-NXP8PE5gs3GQ7SNA-8KVlqgQG8yaLEESGIv1qu04CGBg/viewform?usp=dialog";

const perks = [
  "Free strategy session",
  "No commitment needed",
  "Custom demo in 24–48h",
];

function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-14">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-[2rem] border border-brand-300/25 bg-gradient-to-r from-brand-700/80 via-brand-500/70 to-accent-500/55 p-[1px] shadow-glow"
      >
        <div className="relative rounded-[calc(2rem-1px)] bg-[linear-gradient(160deg,rgba(8,17,31,0.97),rgba(15,23,42,0.95))] px-8 py-12 text-center lg:px-12 lg:py-16">
          {/* Background orb */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/12 blur-3xl" aria-hidden />

          <p className="text-sm uppercase tracking-[0.35em] text-brand-100">Free Growth Session</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Ready to build a website that<br className="hidden md:block" /> actually wins business?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Book a free demo and see exactly how Nexora Techno can transform your digital presence
            into a lead-generating powerhouse.
          </p>

          {/* Perks row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {perks.map((perk) => (
              <span
                key={perk}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-sm text-white/90"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-accent-400" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <path d="m5 12 4.2 4.2L19 6.5" />
                </svg>
                {perk}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              id="cta-demo-btn"
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 via-brand-300 to-brand-100 px-8 py-4 text-sm font-semibold text-slate-950 shadow-[0_0_28px_rgba(10,160,232,0.4)] transition hover:brightness-110"
            >
              Get Free Demo
              <span>→</span>
            </motion.a>
            <motion.a
              id="cta-whatsapp-btn"
              href="https://wa.me/919345121988"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M12 2.1a9.8 9.8 0 0 0-8.42 14.8L2 22l5.22-1.54A9.88 9.88 0 1 0 12 2.1Zm0 18.03a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.91.93-3.01-.2-.31A8.25 8.25 0 1 1 12 20.13Zm4.53-6.15c-.25-.13-1.47-.73-1.7-.81-.22-.08-.39-.12-.55.13-.16.24-.64.8-.78.96-.14.16-.28.18-.53.06-.24-.13-1.03-.38-1.96-1.22-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.5l.38-.44c.12-.14.16-.24.24-.4.08-.15.04-.29-.02-.41-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.41-.55-.41h-.47c-.16 0-.41.06-.62.29-.21.23-.81.79-.81 1.92s.83 2.22.95 2.37c.11.15 1.63 2.48 3.95 3.49.55.24.98.38 1.31.49.56.17 1.07.15 1.47.09.45-.06 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29Z" />
              </svg>
              Chat on WhatsApp
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default CtaSection;
