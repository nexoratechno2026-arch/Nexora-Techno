import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, Database, Bot, CheckCircle } from "lucide-react";

export default function TechnologiesSection() {
  const techCategories = [
    {
      id: "frontend",
      title: "Frontend Engineering",
      icon: <Code2 className="w-5 h-5 text-indigo-600" />,
      skills: [
        { name: "React", level: "Primary UI Library", desc: "Component architecture & dynamic client interfaces" },
        { name: "HTML5", level: "Core Standard", desc: "Semantic markup & accessible structural foundation" },
        { name: "CSS3 / Tailwind", level: "Styling Framework", desc: "Responsive visual styling & design tokens" },
        { name: "JavaScript (ES6+)", level: "Core Logic", desc: "Modern async functions & client side state" }
      ]
    },
    {
      id: "backend",
      title: "Backend Engineering",
      icon: <Server className="w-5 h-5 text-emerald-600" />,
      skills: [
        { name: "Node.js", level: "Server Runtime", desc: "Scalable asynchronous REST microservices" },
        { name: "Python", level: "Data & AI Runtime", desc: "Data processing, machine learning & automation" },
        { name: "Flask", level: "Python Web Engine", desc: "Lightweight API endpoints & service backends" }
      ]
    },
    {
      id: "database",
      title: "Databases & Storage",
      icon: <Database className="w-5 h-5 text-sky-600" />,
      skills: [
        { name: "MySQL", level: "Relational DB", desc: "Structured data storage & ACID financial transactions" },
        { name: "MongoDB", level: "NoSQL DB", desc: "Flexible document store for rapid app development" }
      ]
    },
    {
      id: "ai-automation",
      title: "AI & Automation",
      icon: <Bot className="w-5 h-5 text-purple-600" />,
      skills: [
        { name: "AI APIs (OpenAI/Anthropic)", level: "LLM Engines", desc: "Custom GPT integration & smart support bots" },
        { name: "n8n Automation", level: "Workflow Engine", desc: "Self-hosted visual workflow pipeline triggers" },
        { name: "Automation Workflows", level: "Integration", desc: "WhatsApp, Email, Webhooks & CRM data pipelines" }
      ]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            Modern Tech Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Technologies We Master & Rely On
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            We use proven, production-grade frameworks, databases, and AI automation engines to ensure your products are fast, secure, and future-proof.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {techCategories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06)" }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-indigo-200 transition-all duration-300 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-200">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-start justify-between gap-4 transition-transform"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">
                          {skill.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {skill.desc}
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
