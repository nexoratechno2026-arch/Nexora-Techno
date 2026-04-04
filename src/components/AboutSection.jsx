import { motion } from "framer-motion";

const highlights = [
  { icon: "🚀", title: "Founded 2026", desc: "Born out of a mission to give startups enterprise-grade digital tools." },
  { icon: "🌍", title: "India & Global", desc: "Serving clients locally and internationally with digital-first workflows." },
  { icon: "⚡", title: "3–6 Week Delivery", desc: "Fast execution without cutting corners on quality or performance." },
  { icon: "🤖", title: "AI-Integrated", desc: "Every project considers automation from day one — not as an afterthought." },
];

function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.45 }}
        className="grid gap-8 lg:grid-cols-[1fr_1fr]"
      >
        {/* Left: main about content */}
        <div className="flex flex-col gap-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 lg:p-10 shadow-glow overflow-hidden">
            <p className="text-sm uppercase tracking-[0.35em] text-brand-200">Our Digital Philosophy</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              We translate business goals into <span className="gradient-text tracking-tighter">high-performance</span> digital engines.
            </h2>
            <p className="mt-6 leading-8 text-slate-300 text-lg">
              Generic templates don't solve complex brand challenges. At Nexora, we focus on "Performance First" engineering, combining sharp messaging, premium
              design, and custom automation so your growth strategy works like an automated 24/7 revenue engine.
            </p>
            
            {/* Logo Cloud for Trust */}
            <div className="mt-10 border-t border-white/5 pt-8">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-6 font-semibold">Technologies we leverage</p>
              <div className="flex flex-wrap gap-x-10 gap-y-6 opacity-30 grayscale hover:grayscale-0 transition duration-700 items-center">
                 {['VERTEX', 'BLOOM', 'NOVA', 'EDGE', 'SCALE'].map((logo) => (
                   <span key={logo} className="font-display text-sm font-black text-white tracking-[0.4em]">{logo}</span>
                 ))}
              </div>
            </div>
          </div>

          {/* Tagline card */}
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-500/14 to-accent-500/10 p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-accent-400">Our Mission</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">Innovating Your Digital Future</h3>
            <p className="mt-4 leading-7 text-slate-300">
              From strategy to launch, every design, development, and automation decision is made to improve trust,
              conversions, and long-term brand visibility.
            </p>
          </div>
        </div>

        {/* Right: highlights + leadership */}
        <div className="flex flex-col gap-6">
          {/* Highlights grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((h) => (
              <motion.div
                key={h.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
              >
                <span className="text-2xl">{h.icon}</span>
                <p className="mt-3 font-semibold text-white">{h.title}</p>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">{h.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Leadership card */}
          <div className="rounded-[2rem] border border-brand-300/25 bg-[linear-gradient(145deg,rgba(10,160,232,0.12),rgba(9,7,5,0.65))] p-6 shadow-glow">
            <p className="text-xs uppercase tracking-[0.35em] text-brand-100">Leadership</p>
            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-200/30 bg-gradient-to-br from-brand-500 to-brand-300 text-sm font-bold text-slate-950">
                KJ
              </div>
              <div>
                <p className="text-xl font-semibold text-white">Kapil Js</p>
                <p className="text-sm text-brand-100">Founder & CEO, Nexora Techno</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              CS student and serial builder. Passionate about helping businesses grow through smart digital systems,
              automation, and conversion-focused design.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Web Development", "AI Automation", "Growth Strategy"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-brand-300/25 bg-brand-400/10 px-3 py-1 text-xs text-brand-100"
                >
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
