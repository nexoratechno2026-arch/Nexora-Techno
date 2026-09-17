import React from "react";
import { Award, Users, CheckCircle, ShieldCheck, MapPin, GraduationCap, Wrench, Briefcase } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      number: "1000+",
      label: "Students Oriented",
      sublabel: "Career roadmaps & tech guidance",
      color: "text-indigo-400",
      bg: "bg-indigo-500/20"
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      number: "100+",
      label: "Workshops Delivered",
      sublabel: "Hands-on college bootcamps",
      color: "text-sky-400",
      bg: "bg-sky-500/20"
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      number: "55+",
      label: "Internships Completed",
      sublabel: "Production-grade project tracks",
      color: "text-emerald-400",
      bg: "bg-emerald-500/20"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      number: "3+",
      label: "Projects Delivered",
      sublabel: "Websites, apps & software",
      color: "text-purple-400",
      bg: "bg-purple-500/20"
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      number: "100%",
      label: "MSME Registered",
      sublabel: "Government recognized entity",
      color: "text-teal-400",
      bg: "bg-teal-500/20"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      number: "Salem, TN",
      label: "Headquarters Base",
      sublabel: "Serving local & remote clients",
      color: "text-amber-400",
      bg: "bg-amber-500/20"
    }
  ];

  return (
    <section className="py-16 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-500/30">
            Verifiable Credentials & Reach
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Nexora By The Numbers
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Real outcomes built on genuine client deliveries and student empowerment across Tamil Nadu.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {stats.map((s, idx) => (
            <div 
              key={idx} 
              className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg hover:border-slate-600 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mx-auto mb-3`}>
                  {s.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {s.number}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
                  {s.label}
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-700/40">
                {s.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
