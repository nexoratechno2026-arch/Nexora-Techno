import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, GraduationCap, CheckCircle2, ArrowRight } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

export default function SplitAudienceSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-16 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            Tailored Engagement
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Choose Your Path with Nexora Techno
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: For Businesses */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-slate-800/90 to-slate-900 border border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-300 shadow-2xl flex flex-col justify-between group"
          >
            <div className="absolute top-6 right-6 p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Building2 className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/30">
                For Businesses & Startups
              </div>

              <h3 className="text-3xl font-bold text-white tracking-tight">
                Build. Automate. Grow.
              </h3>

              <p className="text-slate-300 mt-3 text-base leading-relaxed">
                Build websites, software and AI-powered solutions designed around your exact business requirements and metrics.
              </p>

              <div className="mt-6 pt-6 border-t border-slate-800/80">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Services Provided:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    "Website Development",
                    "Custom Software",
                    "AI Automation",
                    "Business Automation",
                    "E-commerce Stores",
                    "Web Applications"
                  ].map((service, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-base"
              >
                <span>Build My Business Solution</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: For Students */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-slate-800/90 to-slate-900 border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-300 shadow-2xl flex flex-col justify-between group"
          >
            <div className="absolute top-6 right-6 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <GraduationCap className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
                For Students & Graduates
              </div>

              <h3 className="text-3xl font-bold text-white tracking-tight">
                Learn. Build. Get Industry Experience.
              </h3>

              <p className="text-slate-300 mt-3 text-base leading-relaxed">
                Gain practical experience through internships, real client project workflows and technology-focused hands-on training.
              </p>

              <div className="mt-6 pt-6 border-t border-slate-800/80">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Program Highlights:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    "IT Internships in Salem",
                    "Full Stack Development",
                    "AI/ML & Prompt Eng.",
                    "Real Client Projects",
                    "QR-Verifiable Certificate",
                    "Mentorship by Engineers"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <Link
                to="/internship"
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-base text-center"
              >
                <span>Explore Internships</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
