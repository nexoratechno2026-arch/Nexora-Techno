import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    title: "CodeXpertAI",
    type: "AI Developer Platform",
    url: "nexoratechno-code.web.app",
    liveUrl: "https://nexoratechno-code.web.app",
    image: "/projects/codexpertai.png",
    stack: "React 18 · TypeScript · Gemini AI · Monaco Editor · Firebase",
    note: "AI-guided coding practice & real-time technical mock interview platform.",
  },
  {
    title: "Nexora LMS",
    type: "Verification Portal",
    url: "nexoratechno.in/lms",
    liveUrl: "/lms/login",
    image: "/projects/nexora-lms.png",
    stack: "React · Firebase · QR Validation · PDF Generation",
    note: "Internship management, task submission pipeline, and tamper-evident QR verification.",
  },
  {
    title: "Home Nest",
    type: "E-commerce store",
    url: "home-nest.co.in",
    liveUrl: "https://www.home-nest.co.in",
    image: "/projects/home-nest.png",
    stack: "React · Tailwind · WhatsApp · UPI",
    note: "Online store for artisan products with WhatsApp ordering and UPI checkout.",
  },
  {
    title: "Buddies Unleashed",
    type: "Community platform",
    url: "buddiesunleashed.com",
    liveUrl: "https://www.buddiesunleashed.com",
    image: "/projects/buddies-unleashed.png",
    stack: "React · Tailwind CSS",
    note: "Web presence for a motorcycle riding community in Tamil Nadu.",
  },
  {
    title: "Varavu Selavu",
    type: "Android application",
    url: "varavu-selavu",
    liveUrl: null,
    image: "/projects/varavu-selavu.png",
    stack: "Kotlin · Jetpack Compose · Room DB · Gemini API",
    note: "Income and expense manager with Tamil voice input and AI categorisation.",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const proj = PROJECTS[active];

  return (
    <section className="bg-paper border-b border-rule overflow-hidden">
      <div className="container-content py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">

          {/* ── Left: copy with staggered reveal ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-7 max-w-lg lg:max-w-none"
          >

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="eyebrow"
            >
              Software &amp; EdTech · Salem, Tamil Nadu
            </motion.p>

            {/* Headline — serif display */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="heading-display text-[2.25rem] sm:text-[2.75rem] lg:text-[3rem] text-ink"
            >
              Software for the work<br className="hidden sm:block" /> you actually do.
            </motion.h1>

            {/* Supporting copy */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-body-lg text-ink-muted max-w-[50ch]"
            >
              Websites, custom tools, and practical training from a small
              software team based in Salem. We work directly with businesses
              and help students gain hands-on industry experience.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/contact" className="btn-primary shadow-sm hover:shadow transition-shadow">
                  Start a project
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/projects" className="btn-secondary">
                  See our work
                </Link>
              </motion.div>
            </motion.div>

            {/* Location + registration strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-muted border-t border-rule"
            >
              <span className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Salem — 636007, Tamil Nadu
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
                MSME Registered — Govt. of India
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <path d="M8 21h8M12 17v4"/>
                </svg>
                Real client work
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: browser frame showing real work ───────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
            className="w-full"
          >
            {/* Browser chrome */}
            <div className="rounded-lg border border-rule bg-surface shadow-card overflow-hidden transition-all duration-300 hover:shadow-elevated">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-surface border-b border-rule">
                {/* Traffic-light dots (decorative, muted) */}
                <span className="w-2.5 h-2.5 rounded-full bg-rule inline-block" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-rule inline-block" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-rule inline-block" aria-hidden="true" />
                {/* URL bar */}
                <div className="flex-1 ml-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={proj.title}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.2 }}
                    >
                      {proj.liveUrl ? (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-paper border border-rule rounded px-2.5 py-1 text-[11px] font-mono text-ink-muted hover:text-ink transition-colors w-full max-w-[240px]"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                          <span className="truncate">{proj.url}</span>
                        </a>
                      ) : (
                        <span className="flex items-center gap-1.5 bg-paper border border-rule rounded px-2.5 py-1 text-[11px] font-mono text-ink-muted max-w-[240px]">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                          {proj.url}
                        </span>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] text-ink-muted font-medium whitespace-nowrap">{proj.type}</span>
              </div>

              {/* Screenshot with smooth animated crossfade */}
              <div className="h-52 sm:h-60 bg-paper overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={proj.title}
                    src={proj.image}
                    alt={`${proj.title} — screenshot`}
                    className="w-full h-full object-cover object-top"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    loading="eager"
                  />
                </AnimatePresence>
              </div>

              {/* Project info with smooth animated transition */}
              <div className="p-4 bg-paper border-t border-rule space-y-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={proj.title}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-sans font-semibold text-[15px] text-ink">{proj.title}</h3>
                        <p className="text-[13px] text-ink-muted mt-0.5">{proj.note}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-accent-600 hover:text-accent-700 font-medium transition-colors"
                            aria-label={`Visit ${proj.title} (opens in new tab)`}
                          >
                            Visit site ↗
                          </a>
                        )}
                        <Link to="/projects" className="text-xs text-ink-muted hover:text-ink transition-colors">
                          Details →
                        </Link>
                      </div>
                    </div>

                    {/* Tech stack */}
                    <p className="tech-tag">{proj.stack}</p>
                  </motion.div>
                </AnimatePresence>

                {/* Project switcher */}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-ink-muted mr-1 uppercase tracking-wide font-medium">Preview:</span>
                  {PROJECTS.map((p, i) => (
                    <motion.button
                      key={p.title}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActive(i)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                        active === i
                          ? "bg-accent-600 text-white shadow-sm"
                          : "bg-surface text-ink-muted hover:text-ink border border-rule hover:border-ink-muted/30"
                      }`}
                      aria-label={`Preview ${p.title}`}
                      aria-pressed={active === i}
                    >
                      {p.title}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-2.5 text-center text-[11px] text-ink-muted">
              Actual work by Nexora Techno — not mock-ups
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
