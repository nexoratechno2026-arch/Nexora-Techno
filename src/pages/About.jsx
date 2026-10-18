import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";

export default function About() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="bg-paper border-b border-rule">
          <div className="container-content py-12 sm:py-16">
            <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-ink transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink">About</span>
            </nav>
            <p className="eyebrow mb-4">About Nexora Techno</p>
            <h1 className="heading-display text-display-md text-ink mb-5 max-w-[28ch]">
              A small software team doing straightforward engineering in Salem.
            </h1>
            <p className="text-body-lg text-ink-muted max-w-[55ch] leading-relaxed">
              We build websites, custom software, and practical digital tools for
              businesses — and help engineering students gain real experience through
              project-based internships and workshops.
            </p>
          </div>
        </section>

        {/* ── Why we exist ──────────────────────────────────────────────── */}
        <section className="bg-surface border-b border-rule">
          <div className="container-content py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
              <div>
                <p className="eyebrow mb-3">Why we exist</p>
              </div>
              <div className="space-y-5 max-w-[58ch]">
                <p className="text-body-md text-ink-muted leading-relaxed">
                  Nexora Techno started because local businesses and institutions needed
                  practical digital tools — not expensive agency projects or generic
                  SaaS platforms with features they would never use.
                </p>
                <p className="text-body-md text-ink-muted leading-relaxed">
                  At the same time, engineering students in Salem needed a place to
                  do real project work — not dummy exercises or certification courses
                  without substance. The two sides of the company connect naturally:
                  students work on real problems, and clients get practical solutions.
                </p>
                <p className="text-body-md text-ink-muted leading-relaxed">
                  The goal is not to be the largest or most visible agency. It is to
                  do the work well, communicate clearly, and be genuinely useful to
                  the people we work with.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Flagship Product: CodeXpertAI ─────────────────────────────────── */}
        <section className="bg-paper border-b border-rule">
          <div className="container-content py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
              <div>
                <p className="eyebrow mb-3">Flagship Product</p>
                <div className="mt-3 p-4 rounded-lg border border-rule bg-white inline-block shadow-sm max-w-[240px]">
                  <img
                    src="/projects/codexpertai-logo.png"
                    alt="CodeXpertAI official logo by Nexora Techno"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-ink-muted mt-3 leading-relaxed">
                  Official product of Nexora Techno.<br />
                  Architected and engineered in-house.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono text-accent-600 border border-accent-200 bg-accent-50 rounded px-2 py-0.5">
                      Production SaaS
                    </span>
                    <span className="text-[10px] font-mono text-ink-muted border border-rule bg-surface rounded px-2 py-0.5">
                      Live Platform
                    </span>
                  </div>
                  <h2 className="heading-display text-display-sm text-ink mb-3">
                    CodeXpertAI: Synchronized Coding Execution &amp; AI Interview Intelligence
                  </h2>
                  <p className="text-body-md text-ink-muted leading-relaxed max-w-[62ch]">
                    Developed entirely by the engineering team at Nexora Techno, CodeXpertAI is a production-grade developer platform designed for software engineering students, job candidates, and practicing developers. Unlike traditional learning portals that isolate practice questions from interview rehearsal, CodeXpertAI seamlessly synchronizes hands-on coding execution and interactive AI interview evaluations.
                  </p>
                </div>

                {/* 3 Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                  <div className="p-4 rounded-lg border border-rule bg-surface space-y-1.5">
                    <div className="w-7 h-7 rounded bg-accent-50 border border-accent-200 flex items-center justify-center text-accent-700 font-mono text-xs font-bold">
                      01
                    </div>
                    <h3 className="font-semibold text-sm text-ink">CodeLab</h3>
                    <p className="text-[11px] text-accent-700 font-mono">Sandboxed Code Execution</p>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Monaco Editor supporting 7 languages, isolated containerized execution, 14 CS domains, and dual-stage automated test evaluation.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-rule bg-surface space-y-1.5">
                    <div className="w-7 h-7 rounded bg-accent-50 border border-accent-200 flex items-center justify-center text-accent-700 font-mono text-xs font-bold">
                      02
                    </div>
                    <h3 className="font-semibold text-sm text-ink">InterviewAI</h3>
                    <p className="text-[11px] text-accent-700 font-mono">Conversational AI Mock Interviews</p>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Real-time interactive mock interviews across 5 disciplines with adaptive follow-up questioning and diagnostic reports.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-rule bg-surface space-y-1.5">
                    <div className="w-7 h-7 rounded bg-accent-50 border border-accent-200 flex items-center justify-center text-accent-700 font-mono text-xs font-bold">
                      03
                    </div>
                    <h3 className="font-semibold text-sm text-ink">Unified Intelligence</h3>
                    <p className="text-[11px] text-accent-700 font-mono">Skill Progression Engine</p>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      5-tier product-wide levels (Beginner to Expert) correlating code submission benchmarks with interview performance.
                    </p>
                  </div>
                </div>

                {/* Tech chips & links */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-rule">
                  <div className="flex flex-wrap gap-1.5">
                    {["React 18", "TypeScript 5", "Monaco Editor", "Google Gemini AI", "Firebase Suite", "GCP"].map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <a
                      href="https://nexoratechno-code.web.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-xs"
                      aria-label="Launch CodeXpertAI platform (opens in new tab)"
                    >
                      Launch CodeXpertAI ↗
                    </a>
                    <Link to="/projects" className="btn-secondary text-xs">
                      View in Projects →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How we work ───────────────────────────────────────────────── */}
        <section className="bg-paper border-b border-rule">
          <div className="container-content py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
              <div>
                <p className="eyebrow mb-3">How we work</p>
              </div>
              <div className="space-y-0 border border-rule rounded-lg overflow-hidden">
                {[
                  {
                    title: "Direct access",
                    desc: "You talk to the engineers building your system — not a project manager passing messages.",
                  },
                  {
                    title: "Scope before code",
                    desc: "We understand the actual requirement before committing to an approach or timeline.",
                  },
                  {
                    title: "Clear milestones",
                    desc: "Every project has defined stages. You know what is coming before it is built.",
                  },
                  {
                    title: "Handover with documentation",
                    desc: "You own what we build. We provide access, documentation, and a proper handover.",
                  },
                  {
                    title: "Local accountability",
                    desc: "We are based in Salem and available for discussions in-person if needed.",
                  },
                ].map((item, i) => (
                  <div key={item.title}>
                    {i > 0 && <div className="h-px bg-rule" />}
                    <div className="flex items-start gap-5 px-5 py-5 bg-paper">
                      <span className="font-mono text-xs text-ink-muted w-6 flex-shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-sans font-semibold text-[14px] text-ink mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[13px] text-ink-muted leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Founder ───────────────────────────────────────────────────── */}
        <section className="bg-surface border-b border-rule">
          <div className="container-content py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
              <div>
                <p className="eyebrow mb-3">Founder</p>
              </div>
              <div>
                <div className="flex items-start gap-5">
                  <img
                    src="/Kapil Js.png"
                    alt="Kapil JS — Founder and CEO of Nexora Techno"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover object-top border border-rule flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <h2 className="font-serif font-semibold text-xl text-ink mb-0.5">
                      Kapil JS
                    </h2>
                    <p className="text-sm text-ink-muted mb-4">Founder &amp; CEO</p>
                    <p className="text-sm text-ink-muted leading-relaxed max-w-[50ch]">
                      Building practical software and guiding student projects from Salem, Tamil Nadu.
                      Direct involvement in every project and every student batch.
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <a
                        href="https://www.linkedin.com/in/kapil-js-99a37130a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ink-muted hover:text-accent-600 transition-colors flex items-center gap-2"
                        aria-label="Kapil JS on LinkedIn (opens in new tab)"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                        </svg>
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Company details ───────────────────────────────────────────── */}
        <section className="bg-paper border-b border-rule">
          <div className="container-content py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
              <div>
                <p className="eyebrow mb-3">Company details</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-semibold text-ink mb-2">Nexora Techno</p>
                  <p className="text-ink-muted leading-relaxed">
                    241, East Permanur, Anna Park Backside<br />
                    Salem — 636007<br />
                    Tamil Nadu, India
                  </p>
                </div>
                <div className="space-y-2 text-ink-muted">
                  <p>
                    <a href="tel:+919345121988" className="hover:text-accent-600 transition-colors">
                      +91 93451 21988
                    </a>
                  </p>
                  <p>
                    <a href="mailto:nexoratechno2026@gmail.com" className="hover:text-accent-600 transition-colors">
                      nexoratechno2026@gmail.com
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://www.nexoratechno.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent-600 transition-colors"
                    >
                      nexoratechno.in ↗
                    </a>
                  </p>
                  <p className="text-xs text-ink-muted pt-1">
                    MSME Registered Enterprise, Govt. of India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="bg-surface">
          <div className="container-content py-14">
            <div className="max-w-[42ch]">
              <h2 className="heading-display text-display-sm text-ink mb-3">
                Work with us.
              </h2>
              <p className="text-body-md text-ink-muted mb-6">
                Whether you have a software project in mind or are looking to discuss
                an internship programme, we are happy to talk.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">Get in touch</Link>
                <Link to="/projects" className="btn-secondary">View our work</Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
