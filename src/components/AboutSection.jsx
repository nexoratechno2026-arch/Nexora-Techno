import { motion } from "framer-motion";

function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 p-1 shadow-2xl shadow-blue-500/20">
              <div className="rounded-[22px] bg-[#F8FAFC] p-10">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Design", icon: "🎨", color: "bg-blue-50" },
                    { label: "Engineering", icon: "⚙️", color: "bg-slate-50" },
                    { label: "AI & Automation", icon: "🤖", color: "bg-blue-50" },
                    { label: "Growth", icon: "📈", color: "bg-slate-50" },
                  ].map((item) => (
                    <div key={item.label} className={`${item.color} rounded-2xl p-6 text-center transition-all duration-200 hover:-translate-y-1`}>
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <p className="text-sm font-bold text-slate-700">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-5 text-center text-white">
                  <p className="text-2xl font-black">Nexora Techno</p>
                  <p className="text-sm text-blue-100 mt-1">Your Digital Growth Partner</p>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 rounded-2xl bg-white px-5 py-3 shadow-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Based in</p>
              <p className="text-sm font-black text-slate-900">Salem, Tamil Nadu</p>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600">
              About Nexora
            </span>
            <h2 className="font-display text-4xl font-black text-slate-900 sm:text-5xl leading-tight">
              We Engineer <br />
              <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
                Market Leaders
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-500 leading-relaxed">
              Nexora Techno is a full-spectrum digital agency combining design excellence, engineering depth, and AI-powered automation. We work with ambitious startups, SMBs, and students to build scalable digital products and careers.
            </p>

            <div className="mt-10 grid gap-4">
              {[
                "High-Conversion UI/UX Design & Development",
                "Scalable Full-Stack Web Engineering",
                "AI Workflow Automation & Integration",
                "Performance SEO & Digital Growth Strategy",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 group">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 transition-transform group-hover:scale-110">
                    <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02]"
              >
                Start a Conversation
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
