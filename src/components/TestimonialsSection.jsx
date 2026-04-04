import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sanjay Kumar",
    role: "Full Stack Intern",
    text: "The 15-day intensive program at Nexora Techno changed my career path. I went from zero coding to building live full-stack projects in just two weeks!",
    rating: 5,
  },
  {
    name: "Meera Nair",
    role: "Digital Marketing Student",
    text: "The value I got was incredible. Kapil's mentorship really helped me understand how modern industry automation works.",
    rating: 5,
  },
  {
    name: "Aditya Verma",
    role: "Prompt Engineering Intern",
    text: "Highly recommended for students looking for real-world experience. The certificate is widely recognized and verified globally.",
    rating: 5,
  },
];

function TestimonialsSection() {
  return (
    <section className="bg-[#050e1b] py-24 px-6 lg:px-10 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="text-sm font-black uppercase tracking-[0.4em] text-accent-400">Voices of Success</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-4xl font-black text-white sm:text-5xl uppercase tracking-tighter italic">What Our <span className="text-brand-300 not-italic">Graduates Say</span></motion.h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto font-medium leading-relaxed">Join over **50+ students** who have transformed their skills with Nexora Techno's intensive training.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-10 hover:border-brand-500/20 transition-all shadow-glow"
            >
              <div className="mb-6 flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-xl text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-lg leading-relaxed text-slate-300 italic group-hover:text-white transition-colors duration-400">
                "{t.text}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-600 to-accent-600 flex items-center justify-center font-black text-slate-950 uppercase text-[10px] shadow-lg shadow-brand-500/10">NX</div>
                <div>
                  <p className="font-black text-white uppercase tracking-widest text-xs">{t.name}</p>
                  <p className="text-[10px] font-bold text-accent-400 uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
