import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projectsData } from "../data/projectsData";

// Full project detail for homepage section (extends projectsData)
const EXTENDED_PROJECTS = [
  ...projectsData,
  {
    id: "nexora-lms",
    name: "Nexora LMS & Verification Portal",
    category: "Internal Platform",
    shortDescription:
      "Student management and credential verification system used by Nexora for internship administration, project tracking, and tamper-evident certificate issuance.",
    image: "/projects/nexora-lms.png",
    technologies: ["React", "Firebase", "Node.js", "QR Code"],
    liveUrl: "/lms/login",
    badge: "Internal",
  },
];

export default function PortfolioSection() {
  const [activeId, setActiveId] = useState(null);
  const active = EXTENDED_PROJECTS.find((p) => p.id === activeId) || null;

  return (
    <section id="projects" className="bg-paper border-b border-rule">
      <div className="container-content py-16 sm:py-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="eyebrow mb-3">Selected work</p>
            <h2 className="heading-display text-display-sm text-ink">
              A few things we've built.
            </h2>
          </div>
          <Link to="/projects" className="btn-ghost text-sm flex-shrink-0 inline-flex items-center gap-1 group">
            <span>All projects</span>
            <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        {/* Horizontal project list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-0 border border-rule rounded-lg overflow-hidden shadow-sm"
        >
          {EXTENDED_PROJECTS.map((project, idx) => (
            <div key={project.id}>
              {idx > 0 && <div className="h-px bg-rule" />}
              <div
                className="group flex flex-col sm:flex-row sm:items-center gap-4 p-5 sm:p-6 hover:bg-surface transition-colors cursor-default"
              >
                {/* Index */}
                <span className="text-[11px] font-mono text-ink-muted w-6 flex-shrink-0 hidden sm:block">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Thumbnail (if available) */}
                {project.image ? (
                  <div className="w-full sm:w-24 h-16 sm:h-16 flex-shrink-0 rounded overflow-hidden border border-rule bg-surface">
                    <img
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-full sm:w-24 h-16 sm:h-16 flex-shrink-0 rounded border border-rule bg-surface flex items-center justify-center">
                    <span className="text-[10px] font-mono text-ink-muted text-center px-1 leading-tight">
                      Internal<br/>Platform
                    </span>
                  </div>
                )}

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-sans font-semibold text-[15px] text-ink">
                      {project.name}
                    </h3>
                    <span className="text-[10px] font-mono text-ink-muted border border-rule rounded px-1.5 py-0.5 bg-surface">
                      {project.category}
                    </span>
                    {project.badge && (
                      <span className="text-[10px] font-mono text-accent-600 border border-accent-200 bg-accent-50 rounded px-1.5 py-0.5">
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-ink-muted leading-relaxed line-clamp-2">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies?.slice(0, 4).map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {project.liveUrl && project.liveUrl !== "#" ? (
                    project.liveUrl.startsWith("http") ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent-600 hover:text-accent-700 font-medium transition-colors"
                        aria-label={`Visit ${project.name} (opens in new tab)`}
                      >
                        Visit site ↗
                      </a>
                    ) : (
                      <Link
                        to={project.liveUrl}
                        className="text-xs text-accent-600 hover:text-accent-700 font-medium transition-colors"
                      >
                        Open →
                      </Link>
                    )
                  ) : null}
                  <Link
                    to="/projects"
                    className="text-xs text-ink-muted hover:text-ink transition-colors"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
