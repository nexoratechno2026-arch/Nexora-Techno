import { motion } from "framer-motion";

const highlights = [
  { icon: "🚀", title: "Founded 2026", desc: "Born out of a mission to give startups enterprise-grade digital tools." },
  { icon: "🎯", title: "50+ Students Trained", desc: "Successfully mentored and certified over 50+ students in modern tech stacks." },
  { icon: "🌍", title: "Global Reach", desc: "Serving clients locally and internationally with digital-first workflows." },
  { icon: "⚡", title: "3–6 Week Delivery", desc: "Fast execution without cutting corners on quality or performance." },
];

function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.45 }}
        className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
      >
        {/* Left: main about content */}
        <div className="flex flex-col gap-6">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 lg:p-12 shadow-2xl backdrop-blur-md">
            <p className="text-sm font-black uppercase tracking-[0.4em] text-brand-300">The Nexora Story</p>
            <h2 className="mt-6 font-display text-4xl font-bold text-white sm:text-5xl leading-tight">
              Bridging the gap between <span className="text-accent-400">Education</span> and <span className="text-brand-300 italic">Industry.</span>
            </h2>
            <p className="mt-8 leading-relaxed text-slate-300 text-lg">
              Nexora Techno started as a vision to simplify complex digital growth. We realized that many businesses lack the high-end automation they need, and many students lack the real-world skills the industry demands.
            </p>
            <p className="mt-4 leading-relaxed text-slate-300 text-lg">
              Today, we have **trained and certified 50+ students**, helping them transition from theory to building real-world projects. At Nexora, we don't just build websites; we build the future workforce.
            </p>
            
            <div className="mt-12 border-t border-white/10 pt-10">
              <div className="flex flex-wrap gap-8 items-center justify-center sm:justify-start opacity-40">
                  <span className="font-display text-xl font-black text-white tracking-[0.2em] uppercase">Built for Scale</span>
                  <div className="h-1 w-1 rounded-full bg-slate-500"></div>
                  <span className="font-display text-xl font-bold text-slate-400 tracking-[0.1em]">AI Integrated 🤖</span>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-brand-300/20 bg-gradient-to-br from-brand-600/20 to-accent-600/10 p-10">
            <h3 className="text-2xl font-bold text-white">Why Choose Us?</h3>
            <p className="mt-4 text-slate-300">
               We deliver **Enterprise-Grade** quality at a specialized price. Every project we touch is optimized for speed, security, and conversion from day one.
            </p>
            <div className="mt-6 flex items-center gap-4">
               <div className="px-4 py-2 rounded-full bg-brand-500 text-slate-950 font-black text-xs uppercase tracking-widest cursor-default">Professional Grade</div>
               <div className="px-4 py-2 rounded-full border border-white/20 text-white font-bold text-xs cursor-default">24/7 Support</div>
            </div>
          </div>
        </div>

        {/* Right: highlights + founder */}
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((h) => (
              <motion.div
                key={h.title}
                whileHover={{ y: -5, borderColor: 'rgba(56, 189, 248, 0.4)' }}
                className="rounded-[2rem] border border-white/5 bg-white/[0.03] p-6 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{h.icon}</div>
                <p className="text-sm font-black text-white uppercase tracking-tight">{h.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{h.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Leadership Spotlight */}
          <div className="rounded-[2.5rem] border border-accent-400/20 bg-[linear-gradient(145deg,rgba(10,160,232,0.1),#070705)] p-8 shadow-glow">
            <div className="flex items-center gap-6">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-brand-500/20">
                KJ
              </div>
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">Kapil Js</p>
                <p className="text-sm font-semibold text-accent-400 uppercase tracking-widest">Founder & CEO</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-8 text-slate-300 italic border-l-2 border-brand-500/30 pl-4">
              "My mission is to help 1,000+ students bridge the gap between classroom theory and industry reality. Nexora Techno is the platform I built to make that happen."
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              {["Full Stack Specialist", "AI Developer", "Industry Mentor"].map((tag) => (
                <span key={tag} className="rounded-full bg-white/5 px-4 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutSection;
