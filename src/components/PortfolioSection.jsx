import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../data/projectsData";
import { ExternalLink, CheckCircle2, X, ArrowRight } from "lucide-react";

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-slate-950 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-500/30">
              Proven Deliveries
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real Projects Built by Nexora Techno
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-2 max-w-2xl">
              We build functional, real-world digital products for businesses and users. Explore our recent live software and web platforms.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm hover:underline"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -6, borderColor: "rgba(99, 102, 241, 0.5)" }}
              className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  
                  <span className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/90 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                    {project.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {project.shortDescription}
                  </p>

                  {/* Technologies tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-3 px-4 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <span>View Case Study</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Case Study Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-white"
            >
              
              {/* Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-0.5">
                    {selectedProject.name} — Case Study
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                
                {/* Image Preview */}
                <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-72">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Case Study Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                    <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider mb-2">
                      The Problem
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                    <h4 className="text-xs font-bold uppercase text-emerald-400 tracking-wider mb-2">
                      The Solution
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-sm font-bold uppercase text-slate-300 tracking-wider mb-3">
                    Key Implemented Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.features.map((ft, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                        <span>{ft}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Used */}
                <div>
                  <h4 className="text-sm font-bold uppercase text-slate-300 tracking-wider mb-2">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg bg-indigo-950 text-indigo-300 text-xs font-medium border border-indigo-800/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Result */}
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-sm">
                  <span className="font-bold">Measurable Result:</span> {selectedProject.result}
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  Close Case Study
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
