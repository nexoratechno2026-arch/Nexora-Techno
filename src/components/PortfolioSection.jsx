import { motion } from "framer-motion";

const projects = [
  {
    category: "Full Stack",
    title: "EcoSmart E-commerce",
    description: "AI-integrated storefront with automated inventory management for a retail brand.",
    image: "🛍️",
  },
  {
    category: "Automation",
    title: "LogiFlow Dashboard",
    description: "Enterprise-grade logistics tracker with real-time analytics and predictive scaling.",
    image: "📊",
  },
  {
    category: "Ed-Tech",
    title: "Nexora Student Portal",
    description: "Custom management system for 50+ students with automated certificate verification.",
    image: "🎓",
  },
];

function PortfolioSection() {
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-32">
      <div className="text-center mb-16">
        <motion.p initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="text-sm font-black uppercase tracking-[0.4em] text-accent-400">Our Portfolio</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-4xl font-black text-white sm:text-5xl uppercase tracking-tighter italic">Proof of <span className="text-brand-300 not-italic">Excellence</span></motion.h2>
        <p className="mt-4 text-slate-400 max-w-xl mx-auto font-medium leading-relaxed">We don't just teach technology; we build enterprise-grade solutions for global clients.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 hover:bg-white/[0.07] transition-all"
          >
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-500/10 text-4xl group-hover:scale-110 group-hover:bg-brand-500/20 transition-all duration-500 shadow-lg shadow-brand-500/5">
                {project.image}
            </div>
            
            <div className="space-y-4">
                <span className="text-[10px] font-black text-accent-500 uppercase tracking-widest px-3 py-1 bg-accent-500/10 rounded-full">{project.category}</span>
                <h3 className="text-2xl font-bold text-white group-hover:text-brand-300 transition-colors uppercase leading-tight">{project.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">{project.description}</p>
            </div>
            
            <div className="mt-8 border-t border-white/5 pt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">View Case Study →</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default PortfolioSection;
