import { motion } from "framer-motion";

function ClientDashboardDemo() {
  return (
    <section id="dashboard" className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-accent-400">Premium Feature</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
            Go beyond a website with a custom <span className="gradient-text">Client Portal.</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            For advanced startups, we build custom dashboards to manage leads, track project progress, and automate your entire customer journey. 
          </p>
          
          <ul className="mt-8 space-y-4">
            {[
              "Real-time Lead Management",
              "Automated Client Onboarding",
              "Project Milestone Tracking",
              "AI-Powered Growth Analytics"
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-200">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/20 text-brand-300">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="m5 12 4.2 4.2L19 6.5" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <a 
              href="#contact"
              className="inline-block rounded-full bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(10,160,232,0.3)] hover:brightness-110 hover:-translate-y-0.5 transition"
            >
              Request Portal Demo
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Dashboard Teaser Image / Component */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-4 shadow-2xl backdrop-blur-xl">
            <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-6 overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/50" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                  <div className="h-3 w-3 rounded-full bg-green-500/50" />
                </div>
                <div className="h-2 w-32 rounded-full bg-white/5" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-20 rounded-xl bg-brand-500/10 border border-brand-500/20 p-3">
                  <div className="h-2 w-12 rounded-full bg-brand-300/30 mb-2" />
                  <div className="h-4 w-16 rounded-full bg-white/10" />
                </div>
                <div className="h-20 rounded-xl bg-accent-500/10 border border-accent-500/20 p-3">
                  <div className="h-2 w-12 rounded-full bg-accent-300/30 mb-2" />
                  <div className="h-4 w-16 rounded-full bg-white/10" />
                </div>
                <div className="h-20 rounded-xl bg-white/5 border border-white/10 p-3">
                  <div className="h-2 w-12 rounded-full bg-white/20 mb-2" />
                  <div className="h-4 w-16 rounded-full bg-white/10" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-32 rounded-xl bg-gradient-to-br from-brand-500/5 to-transparent border border-white/5 p-4">
                  <div className="h-3 w-24 rounded-full bg-white/10 mb-4" />
                  <div className="flex items-end gap-1 h-12">
                     {/* Mini Chart Mockup */}
                     {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                       <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        className="flex-1 rounded-t-sm bg-brand-500/40" 
                       />
                     ))}
                  </div>
                </div>
                <div className="flex gap-4">
                   <div className="flex-1 h-24 rounded-xl bg-white/5 border border-white/5" />
                   <div className="flex-1 h-24 rounded-xl bg-white/5 border border-white/5" />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute -z-10 -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/20 blur-[100px]" />
          <div className="absolute -z-10 -left-10 -bottom-10 h-48 w-48 rounded-full bg-accent-500/10 blur-[80px]" />
        </motion.div>
      </div>
    </section>
  );
}

export default ClientDashboardDemo;
