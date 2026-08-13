import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Layout, 
  Code, 
  CheckCheck, 
  Rocket, 
  ShieldCheck 
} from "lucide-react";

export default function HowWeWorkSection() {
  const steps = [
    {
      num: "01",
      title: "Understand",
      desc: "Deep-dive business discovery to map your operational requirements, target users, and goals.",
      icon: <Search className="w-5 h-5 text-indigo-600" />
    },
    {
      num: "02",
      title: "Plan",
      desc: "Architect the tech stack, database models, milestone roadmap, and clear cost structure.",
      icon: <MapPin className="w-5 h-5 text-indigo-600" />
    },
    {
      num: "03",
      title: "Design",
      desc: "Craft intuitive, responsive UI/UX wireframes and visual design systems tailored for engagement.",
      icon: <Layout className="w-5 h-5 text-indigo-600" />
    },
    {
      num: "04",
      title: "Develop",
      desc: "Write clean, modular code with React, Node.js, Python, and modern AI integrations.",
      icon: <Code className="w-5 h-5 text-indigo-600" />
    },
    {
      num: "05",
      title: "Test",
      desc: "Rigorously audit security, multi-device responsiveness, speed, and functional logic.",
      icon: <CheckCheck className="w-5 h-5 text-indigo-600" />
    },
    {
      num: "06",
      title: "Launch",
      desc: "Deploy to production cloud infrastructure, domain linkage, and Google search indexing.",
      icon: <Rocket className="w-5 h-5 text-indigo-600" />
    },
    {
      num: "07",
      title: "Support",
      desc: "Provide ongoing maintenance, security updates, and feature scaling as your business expands.",
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3">
            Predictable Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How We Work — 7 Step Development Workflow
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            From initial business discovery to post-launch support, our structured engineering timeline ensures transparent progress and quality delivery.
          </p>
        </motion.div>

        {/* Timeline Desktop Grid / Mobile Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -6, boxShadow: "0 12px 20px -5px rgba(0,0,0,0.08)" }}
              className={`p-6 rounded-3xl bg-white border border-slate-200 shadow-sm transition-all duration-300 relative flex flex-col justify-between ${
                idx === 6 ? "lg:col-span-2 md:col-span-2" : ""
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-indigo-600 tracking-wider">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
