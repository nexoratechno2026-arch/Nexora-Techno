import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center lg:px-10 lg:pt-40 lg:pb-32">
      {/* Background patterns */}
      <div className="absolute inset-0 -z-10 bg-[#040c18]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e3a8a_0%,transparent_50%)] opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl"
      >
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-brand-500/20 bg-brand-500/10 px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-brand-300">
                🚀 Certified by Nexora Techno
            </span>
            <span className="rounded-full border border-accent-500/20 bg-accent-500/10 px-6 py-2 text-xs font-black uppercase tracking-[0.3em] text-accent-400">
                🎓 50+ Students Trained
            </span>
        </div>

        <h1 className="font-display text-5xl font-black leading-[1.1] text-white sm:text-7xl lg:text-8xl uppercase tracking-tighter">
          Accelerate your <br />
          <span className="text-accent-400">Digital Horizon.</span>
        </h1>

        <p className="mx-auto mt-10 max-w-2xl text-xl leading-relaxed text-slate-400 font-medium">
          Premium Full-Stack Development and AI Solutions. We bridge the gap between education and high-end industrial engineering.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <a
            href="#contact"
            className="group relative flex h-16 w-full items-center justify-center rounded-full bg-brand-500 px-10 text-sm font-black uppercase tracking-widest text-slate-950 transition hover:bg-brand-300 sm:w-auto"
          >
            Start Your Project →
          </a>
          <a
            href="/internship"
            className="flex h-16 w-full items-center justify-cols-center rounded-full border border-white/10 bg-white/5 px-10 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white/10 sm:w-auto"
          >
            Join Internship Program
          </a>
        </div>
        
        {/* TRUST SIGNALS */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-40 grayscale transition hover:grayscale-0">
             <div className="text-center">
                 <p className="text-2xl font-black text-white italic">2026</p>
                 <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Founded</p>
             </div>
             <div className="text-center">
                 <p className="text-2xl font-black text-white italic">50+</p>
                 <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Graduates</p>
             </div>
             <div className="text-center">
                 <p className="text-2xl font-black text-white italic">15</p>
                 <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Day Intensive</p>
             </div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
