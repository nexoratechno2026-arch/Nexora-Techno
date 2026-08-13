import React from "react";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  MessageSquare, 
  Layers, 
  Cpu, 
  Headphones, 
  Eye 
} from "lucide-react";

export default function WhyChooseSection() {
  const points = [
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      title: "Affordable Development",
      description: "Custom software and web solutions designed for startups and growing businesses without enterprise bloat or hidden fees."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-indigo-600" />,
      title: "Direct Communication",
      description: "Communicate directly with our lead developers and project managers in Salem without layers of sales middlemen."
    },
    {
      icon: <Layers className="w-6 h-6 text-sky-600" />,
      title: "Custom Built",
      description: "100% custom codebase designed specifically around your operational workflow rather than restricted templates."
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-600" />,
      title: "Modern Technology",
      description: "Built with modern frameworks like React, Node.js, Python, Flask, MongoDB, MySQL, and state-of-the-art AI automation tools."
    },
    {
      icon: <Headphones className="w-6 h-6 text-amber-600" />,
      title: "Post-Launch Support",
      description: "We continue maintaining, securing, and scaling your digital products long after initial deployment."
    },
    {
      icon: <Eye className="w-6 h-6 text-teal-600" />,
      title: "Transparent Process",
      description: "Clear milestone updates, transparent timelines, direct code repositories, and no unexpected lock-ins."
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
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            Why Partner With Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Businesses Choose Nexora
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            We combine high-level software engineering with local accountability, transparent pricing, and practical business focus.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {points.map((pt, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06)" }}
              className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200 hover:border-indigo-200 transition-all duration-300 hover:bg-white group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {pt.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {pt.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {pt.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
