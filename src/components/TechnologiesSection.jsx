import React from "react";
import { motion } from "framer-motion";

const TECH = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Python", "FastAPI", "REST APIs"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
  },
  {
    category: "Mobile",
    items: ["Kotlin", "Jetpack Compose", "Room DB", "Android SDK"],
  },
  {
    category: "Tools & Cloud",
    items: ["Git", "GitHub", "Docker", "Vercel", "Linux", "AWS"],
  },
  {
    category: "Design",
    items: ["Figma", "Adobe XD"],
  },
];

export default function TechnologiesSection() {
  return (
    <section id="technologies" className="bg-paper border-b border-rule">
      <div className="container-content py-14 sm:py-16">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <p className="eyebrow mb-2">Technology</p>
            <h2 className="heading-display text-display-sm text-ink">
              What we work with
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -2 }}
              className="p-4 rounded-lg border border-rule bg-surface shadow-sm transition-transform duration-200"
            >
              <h3 className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="tech-tag hover:border-accent-300 hover:text-accent-700 hover:bg-accent-50/50 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-[12px] text-ink-muted max-w-[60ch]"
        >
          We choose tools that fit the project — not tools that make the pitch deck look impressive.
          If you have an existing system we need to integrate with, we will work with that first.
        </motion.p>

      </div>
    </section>
  );
}
