import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TRACKS = [
  {
    label: "Full Stack Web Development",
    note: "HTML, CSS, JavaScript, React, Node.js. Students build a complete web project.",
    duration: "1–3 months",
  },
  {
    label: "Python Full Stack",
    note: "Python, FastAPI, databases. Practical back-end and API development.",
    duration: "1–2 months",
  },
  {
    label: "Prompt Engineering & AI/ML",
    note: "Working with AI APIs, building assistants, and understanding model behaviour.",
    duration: "1–2 months",
  },
  {
    label: "UI/UX & Web Interface Design",
    note: "Figma wireframes, design systems, and usability-first interface design.",
    duration: "1 month",
  },
  {
    label: "College Workshops",
    note: "1 to 5-day on-campus sessions tailored to the institution's requirements.",
    duration: "1–5 days",
    isWorkshop: true,
  },
];

export default function EdTechSection() {
  return (
    <section id="edtech" className="bg-paper border-b border-rule">
      <div className="container-content py-16 sm:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">

          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <p className="eyebrow mb-3">For students and colleges</p>
              <h2 className="heading-display text-display-sm text-ink mb-4">
                Learn. Build. Get real industry experience.
              </h2>
              <p className="text-body-md text-ink-muted max-w-[52ch]">
                Practical internships, workshops, and guided project work for
                students who want to understand how software is actually built.
                No toy assignments. Every track ends with a verifiable certificate.
              </p>
            </div>

            {/* How it works — simple path */}
            <div>
              <h3 className="font-sans text-sm font-semibold text-ink mb-4 uppercase tracking-wide">
                How it works
              </h3>
              <div className="space-y-0 border border-rule rounded-lg overflow-hidden shadow-sm">
                {[
                  { step: "01", title: "Orientation", desc: "Understand the track, tools, and what you will build." },
                  { step: "02", title: "Guided learning", desc: "Structured learning sessions and hands-on practice." },
                  { step: "03", title: "Project work", desc: "Build a real project with feedback and code reviews." },
                  { step: "04", title: "Completion & certificate", desc: "Receive a QR-verifiable internship certificate." },
                ].map((s, i) => (
                  <div key={s.step}>
                    {i > 0 && <div className="h-px bg-rule" />}
                    <div className="flex items-start gap-4 px-5 py-4 bg-paper hover:bg-surface transition-colors">
                      <span className="text-[11px] font-mono text-accent-600 font-semibold w-8 flex-shrink-0 mt-0.5">{s.step}</span>
                      <div>
                        <p className="font-sans font-semibold text-[14px] text-ink">{s.title}</p>
                        <p className="text-[13px] text-ink-muted mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA links */}
            <div className="flex flex-wrap gap-3">
              <Link to="/internship" className="btn-primary shadow-sm hover:shadow transition-shadow">
                Apply for an internship
              </Link>
              <Link to="/verify" className="btn-secondary">
                Verify a certificate
              </Link>
            </div>
          </motion.div>

          {/* Right — programme tracks */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-3"
          >
            <h3 className="font-sans text-sm font-semibold text-ink uppercase tracking-wide mb-4">
              Programme tracks
            </h3>
            {TRACKS.map((track) => (
              <div
                key={track.label}
                className={`p-4 rounded border transition-all duration-200 hover:-translate-y-0.5 ${
                  track.isWorkshop
                    ? "border-accent-200 bg-accent-50"
                    : "border-rule bg-surface hover:border-ink-muted/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-sans font-medium text-[14px] text-ink leading-snug flex-1">
                    {track.label}
                  </h4>
                  <span className="text-[10px] font-mono text-ink-muted bg-paper border border-rule rounded px-1.5 py-0.5 flex-shrink-0 whitespace-nowrap">
                    {track.duration}
                  </span>
                </div>
                <p className="text-[12px] text-ink-muted mt-1.5 leading-relaxed">
                  {track.note}
                </p>
              </div>
            ))}

            {/* College enquiry */}
            <div className="mt-4 p-4 rounded border border-rule bg-paper text-center shadow-sm">
              <p className="text-[13px] text-ink-muted mb-2">
                For HODs and placement cells
              </p>
              <a
                href="https://wa.me/919345121988?text=Hi%20Nexora%20Techno%2C%20we%20would%20like%20to%20enquire%20about%20a%20college%20workshop"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs w-full flex items-center justify-center hover:bg-surface"
              >
                Enquire about a college session
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
