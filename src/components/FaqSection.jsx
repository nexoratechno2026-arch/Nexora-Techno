import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "What does Nexora Techno actually build?",
    a: "We build websites, custom web applications, e-commerce stores, management tools, and business software. On the EdTech side, we run project-based internships, college workshops, and guided training programs for engineering students.",
  },
  {
    q: "How is the cost of a project determined?",
    a: "We discuss the actual scope and deliverables first and price based on that — not pre-packaged tiers. A straightforward business website is priced differently from a multi-module software system with authentication and database logic.",
  },
  {
    q: "How long does a project typically take?",
    a: "A responsive business website takes roughly 2 to 3 weeks. A custom software application with multiple roles and data flows will take longer. Timeline is agreed before code is written, and milestones are clear.",
  },
  {
    q: "Can you build something tailored to our specific business process?",
    a: "That is the majority of what we do. If a standard product does not match your workflow, we build something that does — whether that is a billing tool, a client portal, an inventory system, or something more specific.",
  },
  {
    q: "Do you work with clients outside Salem?",
    a: "Yes. We work with businesses across Tamil Nadu and beyond. Discussions, reviews, and hand-overs happen via calls, WhatsApp, and shared documents.",
  },
  {
    q: "How do student internships work?",
    a: "Internships run for 1 to 3 months. Students work through a structured track, build a project, receive code reviews, and complete with a QR-verifiable certificate. No toy assignments — the work is practical.",
  },
  {
    q: "Do you run workshops for colleges and institutions?",
    a: "Yes. We work with engineering colleges across Tamil Nadu for 1 to 5-day hands-on technical sessions. The session is planned around the institution's audience and requirements.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="bg-surface border-b border-rule">
      <div className="container-content py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">

          {/* Left heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow mb-3">Common questions</p>
            <h2 className="heading-display text-display-sm text-ink">
              Questions & answers
            </h2>
          </motion.div>

          {/* Accordion list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-0 border border-rule rounded-lg overflow-hidden"
          >
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  {i > 0 && <div className="h-px bg-rule" />}
                  <div className="bg-paper">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-surface transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      id={`faq-question-${i}`}
                    >
                      <span className="font-sans font-medium text-[14px] text-ink leading-snug">
                        {faq.q}
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className={`flex-shrink-0 text-ink-muted mt-0.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${i}`}
                          role="region"
                          aria-labelledby={`faq-question-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-[13px] text-ink-muted leading-relaxed border-t border-rule pt-3 bg-surface">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
