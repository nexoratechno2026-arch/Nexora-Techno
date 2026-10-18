import React from "react";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section id="about" className="bg-surface border-b border-rule">
      <div className="container-content py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">

          {/* Left — narrative */}
          <div className="space-y-6">
            <div>
              <p className="eyebrow mb-3">About</p>
              <h2 className="heading-display text-display-sm text-ink">
                A small software team in Salem.
              </h2>
            </div>

            <p className="text-body-md text-ink-muted leading-relaxed max-w-[55ch]">
              Nexora Techno is a software development and practical EdTech company
              based in Salem, Tamil Nadu. We started because local businesses and
              institutions needed straightforward digital tools — not expensive
              agencies or generic SaaS platforms — and engineering students needed
              real project experience, not just certificates.
            </p>

            <p className="text-body-md text-ink-muted leading-relaxed max-w-[55ch]">
              We work directly with clients and students. There is no account
              management layer. The person you talk to is the person building
              the system.
            </p>

            {/* Operating principles */}
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-ink mb-4 uppercase tracking-wide">
                How we work
              </h3>
              <ul className="space-y-2.5 text-sm text-ink-muted">
                {[
                  "Direct access — talk to the engineers building your system",
                  "Scope before code — we understand before we start building",
                  "Clear milestones — you know what is coming at each stage",
                  "Handover with documentation — you own what we build",
                  "Local accountability — we are based here and available",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-600 flex-shrink-0" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/about" className="btn-primary">
                More about us
              </Link>
              <Link to="/projects" className="btn-secondary">
                View our work
              </Link>
            </div>
          </div>

          {/* Right — founder card */}
          <div className="space-y-4">
            {/* Founder */}
            <div className="p-6 rounded border border-rule bg-paper">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/Kapil Js.png"
                  alt="Kapil JS — Founder & CEO, Nexora Techno"
                  className="w-14 h-14 rounded-full object-cover object-top border border-rule"
                  loading="lazy"
                />
                <div>
                  <p className="font-sans font-semibold text-[15px] text-ink">Kapil JS</p>
                  <p className="text-[12px] text-ink-muted">Founder &amp; CEO</p>
                </div>
              </div>
              <p className="text-[13px] text-ink-muted leading-relaxed">
                Building practical software and guiding student projects from Salem, Tamil Nadu.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/kapil-js-99a37130a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-ink-muted hover:text-accent-600 transition-colors flex items-center gap-1.5"
                  aria-label="Kapil JS on LinkedIn (opens in new tab)"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Company details */}
            <div className="p-5 rounded border border-rule bg-paper text-[12px] text-ink-muted space-y-2.5">
              <p className="font-semibold text-ink text-[13px]">Company details</p>
              <p>Nexora Techno</p>
              <p>241, East Permanur, Anna Park Backside<br/>Salem — 636007, Tamil Nadu, India</p>
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
              <p className="text-[11px] text-ink-muted pt-1">MSME Registered Enterprise</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
