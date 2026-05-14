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
            📍 Nexora Techno – IT Software Company in Salem
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-4xl font-display text-5xl font-black leading-[1.1] text-slate-900 sm:text-6xl lg:text-7xl"
          >
            We Build{" "}
            <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
              Digital Engines
            </span>
            {" "}That Grow Businesses &amp; Careers in Salem.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-slate-500"
          >
            From custom software development and AI-powered solutions to SEO and web services — Nexora Techno is a leading IT Software Company in Salem. We deliver results for businesses and provide professional tech internships for students.
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
              aria-label="Get started with Nexora Techno IT services"
              className="rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-blue-500/40"
            >
              Get Started Free
            </a>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Book a free demo with Nexora Techno"
              className="rounded-xl border-2 border-blue-600 bg-white px-8 py-4 text-base font-bold text-blue-600 transition-all duration-200 hover:bg-blue-50"
            >
              Book a Demo →
            </a>
          </motion.div>

          {/* Secondary tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 text-sm italic text-slate-400"
          >
            Providing professional IT Internships in Salem with live-project experience.
          </motion.p>

          {/* Service pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            {[
              "Custom Software Development",
              "IT Internships in Salem",
              "AI-Powered Automation",
              "SEO & Content Strategy",
              "Digital Ads & Performance",
              "IT Consulting Services",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm"
              >
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
