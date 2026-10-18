import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function StudentImpactSection() {
  const stats = [
    {
      number: "1,000+",
      label: "Students Oriented",
      sublabel: "Campus awareness & tech roadmaps",
      tag: "Outreach",
      border: "border-indigo-500/30",
    },
    {
      number: "100+",
      label: "Online Workshops",
      sublabel: "Interactive live code sessions",
      tag: "Live Online",
      border: "border-slate-800 hover:border-indigo-500/40",
    },
    {
      number: "55+",
      label: "Internships Completed",
      sublabel: "Production-grade project tracks",
      tag: "Graduates",
      border: "border-slate-800 hover:border-indigo-500/40",
    },
    {
      number: "100%",
      label: "Verifiable Records",
      sublabel: "Indexed on public portal",
      tag: "Authenticity",
      border: "border-slate-800 hover:border-indigo-500/40",
    }
  ];

  const journeySteps = [
    {
      phase: "Phase 01",
      title: "Campus Technical Orientations",
      count: "1,000+ Students Reached",
      description:
        "Direct seminar sessions conducted across colleges in Tamil Nadu to demystify real-world industry demands, career pathways, and emerging engineering tech stacks.",
      highlights: [
        "Current market demand across Full Stack, Python, and AI",
        "Bridging academic curriculum gaps with modern tooling",
        "GitHub repository setup and portfolio architecture",
        "Open technical dialogue with active software developers"
      ]
    },
    {
      phase: "Phase 02",
      title: "Interactive Online Workshops",
      count: "100+ Online Sessions",
      description:
        "Interactive live online code-along workshops where students from across colleges build functional mini-projects and integrate external APIs with live mentor instruction.",
      highlights: [
        "Live coding in React, Python, and Modern JavaScript",
        "Version control best practices with Git & GitHub",
        "Prompt engineering, API orchestration, and LLM tooling",
        "Digital certificates of workshop completion"
      ]
    },
    {
      phase: "Phase 03",
      title: "Production Internship Cohorts",
      count: "55+ Graduated Interns",
      description:
        "Structured project internships featuring code reviews, milestone deadlines, and building production-ready applications engineered for actual use cases.",
      highlights: [
        "Real-world application development and deployment",
        "Direct code review and guidance from senior engineers",
        "Unique credential ID with public verification index",
        "Performance evaluation and career guidance"
      ]
    }
  ];

  const collegeWhatsAppUrl =
    "https://wa.me/919345121988?text=" +
    encodeURIComponent(
      "Hello Nexora Techno Team, We would like to organize an Orientation / Technical Workshop for our college students. Please share details!"
    );

  return (
    <section className="py-20 lg:py-28 bg-slate-950 text-white relative border-b border-slate-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Institutional Outreach
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Measurable Academic Impact
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
            From college auditorium orientations to hands-on bootcamps and intensive internships, here is how Nexora Techno bridges the academic-to-industry divide.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`p-6 sm:p-7 rounded-2xl bg-slate-900/90 border ${item.border} shadow-xl transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950 text-indigo-300 border border-slate-800">
                    {item.tag}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono tracking-tight">
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

        {/* The 3-Step Pathway */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Progressive Learning Pipeline
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              From First Awareness to Industry Ready
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              A structured progression that equips college students with production skills, genuine guidance, and portfolio projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {journeySteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative rounded-2xl p-7 bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-900/50 px-2 py-0.5 rounded">
                      {step.phase}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {step.count}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h4>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-800/80">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Core Deliverables:
                    </div>
                    {step.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="font-mono text-indigo-400 font-bold shrink-0">·</span>
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <a
                    href="#apply-form"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>View track curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
          className="rounded-3xl p-8 sm:p-12 bg-slate-900 border border-indigo-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl"
        >
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400">
              Institutional Collaborations
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Host a Technical Orientation or Code Workshop at Your Campus
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              We collaborate with colleges and university departments across Tamil Nadu to conduct career seminars and hands-on developer workshops directly with practicing software engineers.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <a
              href={collegeWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center text-sm"
            >
              Inquire for College Campus
            </a>
            <a
              href="#apply-form"
              className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold rounded-xl flex items-center justify-center text-sm transition-colors"
            >
              Direct Student Application
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
