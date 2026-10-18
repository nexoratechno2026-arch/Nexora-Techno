import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Understand",
    desc: "We discuss the actual requirement, the users, the existing process, and what the first version needs to do.",
  },
  {
    num: "02",
    title: "Plan",
    desc: "We agree on scope, structure, technology, and timeline before writing any code.",
  },
  {
    num: "03",
    title: "Build",
    desc: "We design and develop with regular check-ins, so there are no surprises at the end.",
  },
  {
    num: "04",
    title: "Deliver",
    desc: "We test, deploy, hand over access and documentation, and stay available for questions.",
  },
];

export default function HowWeWorkSection() {
  return (
    <section id="how-we-work" className="bg-surface border-b border-rule">
      <div className="container-content py-16 sm:py-20">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="eyebrow mb-3">How we work</p>
          <h2 className="heading-display text-display-sm text-ink max-w-[30ch]">
            Four steps, clearly.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-rule border border-rule rounded-lg overflow-hidden shadow-sm">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -2 }}
              className="bg-paper p-6 sm:p-8 space-y-3 transition-transform duration-200"
            >
              <span className="font-mono text-xs text-accent-600 font-semibold">{step.num}</span>
              <h3 className="font-serif font-semibold text-xl text-ink">
                {step.title}
              </h3>
              <p className="text-[13px] text-ink-muted leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
