import { motion } from "framer-motion";

const logos = [];

function ClientLogos() {
  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
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
