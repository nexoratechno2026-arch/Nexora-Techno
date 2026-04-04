import { motion } from "framer-motion";

const logos = [
  { name: "Acme Corp", font: "font-serif text-xl tracking-wide", color: "text-slate-400" },
  { name: "GlobalTech", font: "font-mono text-xl tracking-tighter", color: "text-slate-500" },
  { name: "Vertex Edu", font: "font-sans text-2xl font-bold uppercase", color: "text-slate-400" },
  { name: "Nova Build", font: "font-display text-2xl lowercase italic", color: "text-slate-500" },
  { name: "Bloom Interiors", font: "font-serif text-xl font-light tracking-widest", color: "text-slate-400" },
];

function ClientLogos() {
  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
          Trusted by innovative companies worldwide
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-10 md:gap-20 opacity-70 grayscale transition-all hover:grayscale-0">
          {logos.map((logo, idx) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`${logo.font} ${logo.color} select-none`}
            >
              {logo.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientLogos;
