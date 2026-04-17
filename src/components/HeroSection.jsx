import { motion } from "framer-motion";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedq-NXP8PE5gs3GQ7SNA-8KVlqgQG8yaLEESGIv1qu04CGBg/viewform?usp=dialog";

function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white"
    >
      {/* Soft blue gradient background blobs */}
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-100 to-blue-50 opacity-60 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-blue-50 to-indigo-100 opacity-50 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-6 py-24 lg:py-36">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-700"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            Trusted Digital Partner for Startups & SMBs
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-4xl font-display text-5xl font-black leading-[1.1] text-slate-900 sm:text-6xl lg:text-7xl"
          >
            Build Your Vision With Absolute{" "}
            <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
              Precision
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-slate-500"
          >
            We combine elite design thinking, robust engineering, and AI automation
            to build platforms that don't just exist — they perform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#contact"
              className="rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-blue-500/40"
            >
              Get Started Free
            </a>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border-2 border-blue-600 bg-white px-8 py-4 text-base font-bold text-blue-600 transition-all duration-200 hover:bg-blue-50"
            >
              Book a Demo →
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-slate-100 pt-10"
          >
            {[
              "UI/UX Design",
              "Web Development",
              "AI Automation",
              "SEO Strategy",
              "Digital Ads",
            ].map((tag) => (
              <span key={tag} className="flex items-center gap-2 text-sm font-semibold text-slate-400">
                <svg className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
