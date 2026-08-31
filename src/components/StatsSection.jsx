import React from "react";
import { Award, Users, CheckCircle, ShieldCheck, MapPin, Sparkles } from "lucide-react";

export default function StatsSection() {
  return (
    <section className="py-16 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-500/30">
            Verifiable Credentials
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Nexora By The Numbers
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Real outcomes built on genuine client engagements and practical student training in Salem.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              3
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
              Projects Delivered
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Websites, apps & software
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              50+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
              Students Mentored
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Hands-on internship training
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              100%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
              MSME Registered
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Government recognized entity
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Salem, TN
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
              Headquarters Base
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Serving local & remote clients
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
