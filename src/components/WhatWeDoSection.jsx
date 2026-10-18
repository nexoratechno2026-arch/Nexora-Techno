import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="bg-surface border-b border-rule">
      <div className="container-content py-16 sm:py-20">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="eyebrow mb-3">Two things we care about</p>
          <h2 className="heading-display text-display-md text-ink max-w-[32ch]">
            Software that works. Education that sticks.
          </h2>
        </motion.div>

        {/* Two-pillar split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rule border border-rule rounded-lg overflow-hidden shadow-sm">

          {/* Pillar 1 — Software */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -2 }}
            className="bg-paper p-8 sm:p-10 space-y-5 transition-transform duration-200"
          >
            <div>
              <span className="eyebrow-muted mb-1.5 block">01</span>
              <h3 className="font-serif text-xl font-semibold text-ink mb-2">
                Useful software
              </h3>
              <p className="text-body-md text-ink-muted leading-relaxed">
                Nexora builds websites and custom software around how your
                organisation actually works — not around what a template offers.
                Every system starts from a clear understanding of the problem.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-ink-muted">
              {[
                "Business websites and landing pages",
                "Custom software and internal tools",
                "E-commerce platforms",
                "Workflow and business automation",
                "Practical AI integrations",
                "UI/UX design and prototyping",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-600 flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className="btn-ghost text-sm inline-flex items-center gap-1 group"
            >
              <span>View all services</span>
              <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          {/* Pillar 2 — EdTech */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -2 }}
            className="bg-paper p-8 sm:p-10 space-y-5 transition-transform duration-200"
          >
            <div>
              <span className="eyebrow-muted mb-1.5 block">02</span>
              <h3 className="font-serif text-xl font-semibold text-ink mb-2">
                Learning by building
              </h3>
              <p className="text-body-md text-ink-muted leading-relaxed">
                The EdTech side focuses on project-based internships and
                workshops where students build real things — not toy
                assignments. Completion is verified with a certificate
                that can be independently checked.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-ink-muted">
              {[
                "IT internships for engineering students",
                "Technical workshops for colleges",
                "Final-year project mentoring",
                "Practical training tracks",
                "Certificate verification portal",
                "Direct guidance from working engineers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-600 flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/internship"
              className="btn-ghost text-sm inline-flex items-center gap-1 group"
            >
              <span>Internships and workshops</span>
              <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
