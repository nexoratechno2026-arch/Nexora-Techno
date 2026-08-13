import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, MapPin, Code2, CheckCircle } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28 tech-grid-bg">
      {/* Animated Background Glow Accent Circles */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/25 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-emerald-500/15 blur-[110px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          
          {/* Top pill badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-medium text-slate-300 shadow-xl backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-200 font-semibold">Nexora Techno</span>
              <span className="text-slate-500">|</span>
              <span className="text-indigo-400">Software & AI Solutions in Salem</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
          >
            Websites, Software & AI Solutions for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
              Growing Businesses.
            </span>
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            From business websites to custom software and AI automation, Nexora Techno helps businesses turn ideas into reliable digital products.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3 group text-base"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                to="/projects"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold rounded-2xl border border-slate-800 transition-all hover:border-slate-700 flex items-center justify-center gap-2 text-base"
              >
                <span>View Our Work</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="pt-10 border-t border-slate-800/80 mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              {
                icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
                title: "MSME Registered",
                sub: "Verified Govt Entity",
                bg: "bg-emerald-500/10"
              },
              {
                icon: <MapPin className="w-5 h-5 text-indigo-400" />,
                title: "Salem Based",
                sub: "Tamil Nadu, India",
                bg: "bg-indigo-500/10"
              },
              {
                icon: <Code2 className="w-5 h-5 text-sky-400" />,
                title: "Custom Development",
                sub: "Zero Template Trap",
                bg: "bg-sky-500/10"
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-purple-400" />,
                title: "Real Projects",
                sub: "Proven Deliveries",
                bg: "bg-purple-500/10"
              }
            ].map((trust, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, borderColor: "rgba(99, 102, 241, 0.4)" }}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-center gap-3 text-left transition-all"
              >
                <div className={`p-2 rounded-lg ${trust.bg}`}>
                  {trust.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{trust.title}</div>
                  <div className="text-xs text-slate-400">{trust.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
