import { motion } from "framer-motion";
import teamData from "../data/team.json";

function TeamSection() {
  return (
    <section id="team" className="bg-[#F8FAFC] py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600">
            Our Team
          </span>
          <h2 className="font-display text-4xl font-black text-slate-900 sm:text-5xl">
            Meet the Experts
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500">
            A tight-knit team of designers, engineers, and growth strategists dedicated to your success.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamData.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              whileHover={{ y: -6, boxShadow: "0 24px 48px -8px rgba(0,0,0,0.12)" }}
              className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm transition-all duration-300"
            >
              {/* Circular image */}
              <div className={`relative mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-blue-100 bg-blue-50 ${member.name.toLowerCase().includes("kapil") ? "p-2" : ""}`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className={`h-full w-full rounded-full object-cover transition-transform duration-500 hover:scale-110 ${member.name.toLowerCase().includes("kapil") ? "object-top" : "object-center"}`}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=2563EB&color=fff&size=200`;
                  }}
                />
              </div>

              <h3 className="text-lg font-black text-slate-900">{member.name}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-400 uppercase tracking-widest">{member.role}</p>

              {/* LinkedIn */}
              <div className="mt-6">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
