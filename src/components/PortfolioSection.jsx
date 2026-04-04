import { motion } from "framer-motion";

const projects = [
  {
    title: "Discovery and Strategy Call",
    description: "We identify your goals, audience, and growth blockers to define a focused digital roadmap.",
  },
  {
    title: "Design and Build Sprint",
    description: "Our team creates your website, AI automations, and conversion system with premium visuals and mobile-first UX.",
  },
  {
    title: "Launch and Optimize",
    description: "After launch, we optimize SEO, automation flow, speed, and funnel performance to maximize leads and sales.",
  },
];

function PortfolioSection() {
  return (
    <section id="portfolio" className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-brand-200">Our Process</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Clear 3-step workflow from idea to measurable digital growth.
          </h2>
        </div>
        <p className="max-w-xl text-lg leading-8 text-slate-300">
          Every project at Nexora Techno follows a focused build system so founders can move fast with confidence.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04]"
          >
            <div className="h-44 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(10,160,232,0.26),transparent_40%),linear-gradient(135deg,rgba(8,26,53,0.92),rgba(7,20,42,0.9),rgba(3,12,26,0.96))]">
              <div className="flex h-full items-end p-6 transition duration-500 group-hover:scale-105">
                <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-2 text-sm text-white/90">
                  Step {index + 1}
                </div>
              </div>
            </div>
            <div className="p-7">
              <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{project.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default PortfolioSection;
