import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";
import { projectsData } from "../data/projectsData";
import ConsultationModal from "../components/ConsultationModal";
import { ExternalLink, CheckCircle2, X, ArrowRight, Code2 } from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />
      <ScrollToTop />
      <WhatsAppButton />

      <main className="flex-grow">
        
        {/* Projects Hero */}
        <section className="relative py-16 lg:py-24 tech-grid-bg border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/30">
              <Code2 className="w-4 h-4" /> Live Case Studies
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Real Projects Developed by Nexora Techno
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto mt-4 leading-relaxed">
              Explore live applications, software systems, and e-commerce stores engineered for real clients and operational needs.
            </p>

          </div>
        </section>

        {/* Projects Showcase */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between shadow-xl group"
                >
                  <div>
                    <div className="relative h-60 overflow-hidden bg-slate-900">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                      
                      <span className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/90 text-white text-xs font-bold rounded-full shadow-lg">
                        {project.badge}
                      </span>
                    </div>

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

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((t, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-xs font-medium border border-slate-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full py-3 px-4 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <span>Read Case Study Breakdown</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-slate-950 border border-indigo-500/30 text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">Have a software or web project idea?</h3>
              <p className="text-slate-300 text-sm max-w-xl mx-auto">
                We can architect and build a solution tailored around your business requirements.
              </p>
              <a
                href="https://wa.me/919345121988?text=Hi%20Nexora%20Techno,%20I%20have%20a%20project%20idea%20and%20would%20like%20to%20discuss"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-lg transition-colors"
              >
                <span>Discuss Your Project</span>
              </a>
            </div>

          </div>
        </section>

      </main>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-white">
            
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

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-72">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider mb-2">The Problem</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.problem}</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase text-emerald-400 tracking-wider mb-2">The Solution</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.solution}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase text-slate-300 tracking-wider mb-3">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.features.map((ft, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{ft}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-sm">
                <span className="font-bold">Measurable Result:</span> {selectedProject.result}
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm"
              >
                Close Case Study
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
      <ConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </div>
  );
}
