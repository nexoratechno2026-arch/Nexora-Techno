import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Nexora rebuilt our website and automation flow in 3 weeks. Lead response time dropped from hours to minutes. The whole team was impressed.",
    name: "Rohit Sharma",
    role: "Founder, Vertex Edu",
    result: "42% higher qualified leads",
    initials: "RS",
    stars: 5,
  },
  {
    quote:
      "Clear process, fast communication, and strong execution. We finally have a site that feels premium and converts. Highly recommend Nexora Techno.",
    name: "Ayesha Khan",
    role: "Director, Bloom Interiors",
    result: "2.1x inquiry rate in 60 days",
    initials: "AK",
    stars: 5,
  },
  {
    quote:
      "Their AI automation setup removed repetitive follow-ups from our team completely. We now focus on closing deals, not chasing leads.",
    name: "Manish Patel",
    role: "Operations Lead, Nova Build",
    result: "18 hours saved per week",
    initials: "MP",
    stars: 5,
  },
];

const trustStats = [
  { value: "120+", label: "Projects delivered" },
  { value: "4.9/5", label: "Average client rating" },
  { value: "24h", label: "Typical response time" },
  { value: "98%", label: "Client satisfaction rate" },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-brand-300" aria-hidden>
          <path d="M12 2l2.7 5.47 6.03.88-4.36 4.25 1.03 6-5.4-2.84-5.4 2.84 1.03-6L3.27 8.35l6.03-.88L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-24">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.35 }}
        className="text-center"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-brand-200">Trusted Results</p>
        <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Real outcomes, not just pretty screens.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          We focus on business impact: lead quality, conversion speed, and reliable systems your team can run every day.
        </p>
      </motion.div>

      {/* Trust stats */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustStats.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center"
          >
            <p className="font-display text-3xl font-bold text-white">{item.value}</p>
            <p className="mt-2 text-sm text-slate-300">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonial cards */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.article
            key={item.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(211,154,43,0.1),transparent_50%)] opacity-0 transition duration-500 group-hover:opacity-100" />
            <div className="relative">
              {/* Stars */}
              <StarRating count={item.stars} />

              {/* Quote */}
              <p className="mt-4 text-sm leading-7 text-slate-200">"{item.quote}"</p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-300 text-sm font-bold text-slate-950">
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-brand-100">{item.role}</p>
                </div>
              </div>

              {/* Result badge */}
              <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-accent-400/25 bg-accent-400/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                <span className="text-xs font-medium text-accent-400">{item.result}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Google rating badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35 }}
        className="mt-10 flex justify-center"
      >
        <div className="inline-flex items-center gap-3 rounded-full border border-brand-300/25 bg-brand-400/10 px-5 py-3 text-sm">
          <StarRating count={5} />
          <span className="text-white/90 font-medium">4.9 / 5 average across all clients</span>
        </div>
      </motion.div>
    </section>
  );
}

export default TestimonialsSection;
