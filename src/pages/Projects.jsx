import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";
import { projectsData } from "../data/projectsData";

// Add the LMS portal as a Nexora internal platform
const ALL_PROJECTS = [
  ...projectsData,
  {
    id: "nexora-lms",
    name: "Nexora LMS & Verification Portal",
    category: "Internal Platform",
    shortDescription:
      "Nexora's student management and credential verification system. Manages internship batches, project submissions, attendance, and issues tamper-evident certificates with unique QR validation.",
    image: "/projects/nexora-lms.png",
    technologies: ["React", "Firebase", "Firestore", "Node.js", "QR Code", "PDF Generation"],
    problem:
      "Nexora needed an internal system to manage student interns, track task submissions, review projects, record attendance, and issue verifiable completion certificates.",
    solution:
      "Built a multi-role platform (Admin, Trainer, Intern) with batch management, task submission tracking, attendance records, and a public QR-code verification endpoint.",
    features: [
      "Multi-role dashboard (Admin, Trainer, Intern)",
      "Batch and student management",
      "Task submission and review workflow",
      "Attendance tracking",
      "Certificate issuance with QR code verification",
    ],
    liveUrl: "/lms/login",
    badge: "Internal",
    status: "In use",
  },
];

const DETAIL_CONTENT = {
  "codexpertai": {
    problem: "Traditional developer learning platforms isolate algorithmic practice from interview rehearsals, leaving engineers unprepared for live technical evaluations, high-pressure problem solving, and dynamic technical follow-ups.",
    solution: "Developed entirely by the engineering team at Nexora Techno, CodeXpertAI seamlessly synchronizes hands-on coding execution and interactive AI interview evaluations with isolated multi-language sandboxed execution and real-time conversational evaluation.",
    status: "Live Platform",
  },
  "varavu-selavu": {
    problem: "Small business owners and individuals struggle to track daily cash transactions, credit entries, and monthly summaries using paper or complex accounting tools.",
    solution: "A clean, bilingual financial tracker that lets users record transactions quickly, categorise expenses, and review monthly reports without accounting knowledge.",
    status: "Completed",
  },
  "buddies-unleashed": {
    problem: "The Buddies Unleashed riding community needed a centralised platform to communicate ride activities, safety guidelines, and membership information.",
    solution: "A community website with clan identity, activity calendar, safety guidelines, gallery, and contact channels.",
    status: "Live",
  },
  "home-nest": {
    problem: "Artisan product creators faced difficulty reaching buyers online without paying marketplace commissions.",
    solution: "An e-commerce storefront with WhatsApp order dispatch, UPI payments, and a curated product catalogue.",
    status: "Live",
  },
};

export default function Projects() {
  const [activeId, setActiveId] = useState(null);
  const active = ALL_PROJECTS.find((p) => p.id === activeId);

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="bg-paper border-b border-rule">
          <div className="container-content py-12 sm:py-16">
            <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-ink transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink">Projects</span>
            </nav>
            <p className="eyebrow mb-4">Our work</p>
            <h1 className="heading-display text-display-md text-ink mb-4">
              A few products, platforms,<br className="hidden sm:block" />
              and digital tools we have built.
            </h1>
            <p className="text-body-md text-ink-muted max-w-[52ch]">
              These are real applications used by real people.
              No mock-ups presented as shipped software.
            </p>
          </div>
        </section>

        {/* Project list */}
        <section className="bg-surface">
          <div className="container-content py-12">
            <div className="space-y-6">
              {ALL_PROJECTS.map((project, idx) => (
                <article key={project.id} className="rounded-lg border border-rule bg-paper overflow-hidden">

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] divide-y lg:divide-y-0 lg:divide-x divide-rule">

                    {/* Left: Project info */}
                    <div className="p-6 sm:p-8 space-y-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="eyebrow-muted mb-2 block">
                            {String(idx + 1).padStart(2, "0")} — {project.category}
                          </span>
                          <div className="flex items-center gap-3">
                            {project.logoImage && (
                              <img
                                src={project.logoImage}
                                alt={`${project.name} logo`}
                                className="h-7 w-auto object-contain"
                              />
                            )}
                            <h2 className="font-serif font-semibold text-2xl text-ink leading-snug">
                              {project.name}
                            </h2>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                          {project.badge && (
                            <span className="text-[10px] font-mono text-accent-600 border border-accent-200 bg-accent-50 rounded px-2 py-0.5">
                              {project.badge}
                            </span>
                          )}
                          {(DETAIL_CONTENT[project.id]?.status || project.status) && (
                            <span className="text-[10px] font-mono text-ink-muted border border-rule bg-surface rounded px-2 py-0.5">
                              {DETAIL_CONTENT[project.id]?.status || project.status}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-ink-muted leading-relaxed">
                        {project.shortDescription}
                      </p>

                      {/* Problem / Solution */}
                      {(DETAIL_CONTENT[project.id] || project.problem) && (
                        <div className="space-y-3 pt-1">
                          <div>
                            <p className="text-[11px] font-semibold text-ink uppercase tracking-wide mb-1">
                              The problem
                            </p>
                            <p className="text-[13px] text-ink-muted leading-relaxed">
                              {DETAIL_CONTENT[project.id]?.problem || project.problem}
                            </p>
                          </div>
                          <div>
                            <p className="text-[11px] font-semibold text-ink uppercase tracking-wide mb-1">
                              What was built
                            </p>
                            <p className="text-[13px] text-ink-muted leading-relaxed">
                              {DETAIL_CONTENT[project.id]?.solution || project.solution}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Features */}
                      {project.features && (
                        <ul className="space-y-1.5 text-[13px] text-ink-muted">
                          {project.features.map((f) => (
                            <li key={f} className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-600 flex-shrink-0" aria-hidden="true" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Key Functional Pillars */}
                      {project.pillars && (
                        <div className="pt-2">
                          <p className="text-[11px] font-semibold text-ink uppercase tracking-wide mb-2.5">
                            Key Functional Pillars
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {project.pillars.map((pillar) => (
                              <div key={pillar.name} className="p-3 rounded border border-rule bg-surface/50 space-y-1.5">
                                <div className="font-semibold text-xs text-ink">{pillar.name}</div>
                                <div className="text-[10px] text-accent-700 font-mono leading-tight">{pillar.tagline}</div>
                                <ul className="space-y-1 pt-1">
                                  {pillar.points.map((pt, pidx) => (
                                    <li key={pidx} className="text-[11px] text-ink-muted leading-tight flex items-start gap-1.5">
                                      <span className="text-accent-600 font-bold leading-none mt-0.5">•</span>
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech stack & architecture */}
                      {project.techBreakdown ? (
                        <div className="pt-2">
                          <p className="text-[11px] font-semibold text-ink uppercase tracking-wide mb-2">
                            Technology Architecture Breakdown
                          </p>
                          <div className="rounded border border-rule overflow-hidden divide-y divide-rule text-[12px]">
                            {project.techBreakdown.map((row) => (
                              <div key={row.tier} className="grid grid-cols-1 sm:grid-cols-[175px_1fr] p-2 sm:px-3 sm:py-2 gap-1 bg-paper hover:bg-surface/50 transition-colors">
                                <span className="font-semibold text-ink text-[11px] uppercase tracking-wider">{row.tier}</span>
                                <span className="text-ink-muted text-[12px] leading-relaxed">{row.stack}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[11px] font-semibold text-ink uppercase tracking-wide mb-2">
                            Technology
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies?.map((t) => (
                              <span key={t} className="tech-tag">{t}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        {project.liveUrl && project.liveUrl !== "#" && (
                          project.liveUrl.startsWith("http") ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-ghost text-sm"
                              aria-label={`Visit ${project.name} (opens in new tab)`}
                            >
                              Visit site ↗
                            </a>
                          ) : (
                            <Link to={project.liveUrl} className="btn-ghost text-sm">
                              Open →
                            </Link>
                          )
                        )}
                        <a
                          href={`https://wa.me/919345121988?text=${encodeURIComponent(`Hi, I'd like to discuss a project similar to ${project.name}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-ink-muted hover:text-ink transition-colors"
                          aria-label={`Discuss a similar project to ${project.name} via WhatsApp`}
                        >
                          Discuss a similar project →
                        </a>
                      </div>
                    </div>

                    {/* Right: Screenshot or placeholder */}
                    <div className="bg-surface flex items-stretch">
                      {project.image ? (
                        <div className="w-full h-56 lg:h-full min-h-[200px] overflow-hidden">
                          <img
                            src={project.image}
                            alt={`${project.name} — screenshot`}
                            className="w-full h-full object-cover object-top"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-56 lg:h-full flex flex-col items-center justify-center p-8 text-center">
                          <p className="font-mono text-xs text-ink-muted mb-1">Internal system</p>
                          <p className="text-[11px] text-ink-muted leading-relaxed max-w-[22ch]">
                            Screenshots are not publicly shared for this platform.
                          </p>
                          <Link to="/lms/login" className="mt-4 btn-secondary text-xs">
                            Student login →
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-paper border-t border-rule">
          <div className="container-content py-14">
            <div className="max-w-[44ch]">
              <h2 className="heading-display text-display-sm text-ink mb-3">
                Need something built?
              </h2>
              <p className="text-body-md text-ink-muted mb-6">
                Tell us what you are trying to solve and we will talk through the options.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">Start a project</Link>
                <a
                  href="https://wa.me/919345121988?text=Hi%20Nexora%20Techno%2C%20I%27d%20like%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  WhatsApp us
                </a>
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
