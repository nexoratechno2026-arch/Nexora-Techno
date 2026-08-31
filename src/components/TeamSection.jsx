import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import teamData from "../data/team.json";
import { GraduationCap, X, UserCheck } from "lucide-react";

function TeamSection() {
  const [selectedMember, setSelectedMember] = useState(null);

  // Generate Schema.org Structured Data for Google SEO
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nexora Techno",
    "url": "https://www.nexoratechno.com",
    "logo": "https://www.nexoratechno.com/Logo.jpeg",
    "employee": teamData.map((member) => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role,
      "description": member.bio,
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": member.education,
      },
      "sameAs": [member.linkedin],
    })),
  };

  return (
    <section id="team" className="bg-slate-50 py-20 lg:py-32">
      {/* Inject SEO Schema.org microdata for Google indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600">
            <UserCheck className="h-4 w-4" /> Leadership & Technical Team
          </span>
          <h2 className="font-display text-4xl font-black text-slate-900 sm:text-5xl">
            Meet the Minds Behind Nexora Techno
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600 leading-relaxed">
            A dedicated team of innovators, engineers, and strategists bringing digital transformation to life.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamData.map((member, index) => (
            <motion.article
              key={member.id || member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -6, boxShadow: "0 24px 48px -8px rgba(37,99,235,0.12)" }}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:border-blue-300"
            >
              <div>
                {/* Circular image */}
                <div className="relative mx-auto mb-6 h-36 w-36 overflow-hidden rounded-full border-4 border-blue-100 bg-blue-50 p-1 shadow-inner transition duration-300 group-hover:border-blue-400">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className={`h-full w-full rounded-full transition-transform duration-500 group-hover:scale-105 ${
                      member.name.toLowerCase().includes("kapil")
                        ? "object-cover object-top"
                        : member.name.toLowerCase().includes("tharani")
                        ? "object-cover object-[center_25%]"
                        : "object-cover object-center"
                    }`}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        member.name
                      )}&background=2563EB&color=fff&size=200`;
                    }}
                  />
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-bold text-blue-600 uppercase tracking-widest">
                    {member.role}
                  </p>

                  {/* Education Pill */}
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-full">
                    <GraduationCap className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    <span className="truncate max-w-[220px]">{member.education}</span>
                  </div>

                  {/* Bio snippet */}
                  <p className="mt-4 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedMember(member)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition hover:underline"
                >
                  Read Full Bio →
                </button>

                <div className="flex items-center gap-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                      title={`${member.name} LinkedIn`}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Full Bio Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-8 shadow-2xl border border-slate-100"
            >
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="h-20 w-20 rounded-full border-2 border-blue-500 object-cover"
                />
                <div>
                  <h3 className="text-xl font-black text-slate-900">{selectedMember.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                    {selectedMember.role}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
                    <span>{selectedMember.education}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Biography & Qualifications
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {selectedMember.bio}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                {selectedMember.linkedin && (
                  <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    Connect on LinkedIn
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default TeamSection;
