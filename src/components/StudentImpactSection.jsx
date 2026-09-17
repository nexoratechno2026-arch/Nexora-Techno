import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Wrench, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  School, 
  Users, 
  Code2, 
  Terminal,
  CalendarCheck
} from "lucide-react";

export default function StudentImpactSection() {
  const stats = [
    {
      number: "1000+",
      label: "Students Oriented",
      sublabel: "Campus & career roadmaps",
      icon: <GraduationCap className="w-6 h-6 text-indigo-400" />,
      badge: "Orientation Programs",
      accent: "from-indigo-500/20 to-blue-500/10",
      border: "border-indigo-500/30",
      glow: "group-hover:border-indigo-500/60"
    },
    {
      number: "100+",
      label: "Workshops Delivered",
      sublabel: "Hands-on tech bootcamps",
      icon: <Wrench className="w-6 h-6 text-sky-400" />,
      badge: "Practical Training",
      accent: "from-sky-500/20 to-cyan-500/10",
      border: "border-sky-500/30",
      glow: "group-hover:border-sky-500/60"
    },
    {
      number: "55+",
      label: "Internships Completed",
      sublabel: "Production-grade project tracks",
      icon: <Briefcase className="w-6 h-6 text-emerald-400" />,
      badge: "Graduated Interns",
      accent: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30",
      glow: "group-hover:border-emerald-500/60"
    },
    {
      number: "100%",
      label: "Verifiable Outcomes",
      sublabel: "Indexed on public portal",
      icon: <Award className="w-6 h-6 text-amber-400" />,
      badge: "QR-Verified Credentials",
      accent: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/30",
      glow: "group-hover:border-amber-500/60"
    }
  ];

  const journeySteps = [
    {
      step: "01",
      title: "Orientation Programs",
      count: "1000+ Students Impacted",
      icon: <Users className="w-6 h-6 text-indigo-400" />,
      description:
        "Comprehensive tech orientation sessions conducted across colleges in Tamil Nadu to demystify real-world industry demands, career trajectories, and emerging tech stacks.",
      highlights: [
        "Tech Stack Trends (Full Stack, Python, AI/ML)",
        "Industry hiring expectations vs syllabus gap",
        "Career roadmap & GitHub portfolio guidance",
        "Interactive Q&A with working software engineers"
      ]
    },
    {
      step: "02",
      title: "Technical Workshops",
      count: "100+ Hands-on Workshops",
      icon: <Terminal className="w-6 h-6 text-sky-400" />,
      description:
        "Intensive, practical code-along bootcamps where students get their hands dirty building real mini-projects instead of just listening to slides.",
      highlights: [
        "Live coding in React, Python & Modern Web",
        "Git version control & GitHub collaboration workflows",
        "Practical AI prompt engineering & tooling",
        "Certificate of workshop participation"
      ]
    },
    {
      step: "03",
      title: "Production Internship",
      count: "55+ Graduated Interns",
      icon: <Code2 className="w-6 h-6 text-emerald-400" />,
      description:
        "Rigorous 3-month engineering internships with sprint reviews, architecture mentoring, and building production-ready applications for actual clients.",
      highlights: [
        "Live client-facing application development",
        "Code reviews & direct mentorship from senior engineers",
        "Unique credential ID with public QR verification",
        "Letter of recommendation & job referral assistance"
      ]
    }
  ];

  const collegeWhatsAppUrl =
    "https://wa.me/919345121988?text=" +
    encodeURIComponent(
      "Hello Nexora Techno Team, We would like to organize an Orientation / Technical Workshop for our college students. Please share details!"
    );

  return (
    <section className="py-20 bg-slate-950 text-white relative border-b border-slate-800 overflow-hidden">
      {/* Background ambient lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30"
          >
            <Sparkles className="w-4 h-4" /> Proven Student Track Record
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Empowering the Next Generation of{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-sky-300 to-indigo-400">
              Tech Innovators
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed"
          >
            From college auditorium orientations to hands-on bootcamps and intensive internships, here is how Nexora Techno bridges the academic-to-industry divide.
          </motion.p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-b ${item.accent} bg-slate-900/90 border ${item.border} ${item.glow} shadow-2xl transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-950/60 border border-slate-800 text-slate-300">
                    {item.badge}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {item.number}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-100 mt-2">
                  {item.label}
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80">
                {item.sublabel}
              </div>
            </motion.div>
          ))}
        </div>

        {/* The 3-Step Student Growth Pathway */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
              The Nexora Learning Ecosystem
            </h3>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
              From First Awareness to Industry Ready
            </h4>
            <p className="text-slate-400 text-sm mt-2">
              Our structured path provides college students with real skills, genuine guidance, and production exposure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journeySteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative rounded-3xl p-8 bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between shadow-xl"
              >
                {/* Step indicator top */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black text-slate-700 select-none">
                      {step.step}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                      {step.count}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      {step.icon}
                    </div>
                    <h5 className="text-xl font-bold text-white">
                      {step.title}
                    </h5>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-800">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Highlights:
                    </div>
                    {step.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href="#apply-form"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <span>Learn how to join</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Institutional / College Partnership Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl"
        >
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              <School className="w-4 h-4" /> For Colleges, HODs & Placement Cells
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Host a Nexora Orientation or Hands-on Workshop at Your Campus
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We collaborate with colleges and institutions across Tamil Nadu to conduct career orientation seminars and technical workshops. Empower your students with insights from engineers building real-world software.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <a
              href={collegeWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2.5 text-sm"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>Book College Session via WhatsApp</span>
            </a>
            <a
              href="#apply-form"
              className="px-6 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-2xl flex items-center justify-center gap-2 text-sm"
            >
              <span>Student Application</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
