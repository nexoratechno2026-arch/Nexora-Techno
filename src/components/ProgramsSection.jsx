import { motion } from "framer-motion";

const internships = [
  {
    title: "UI/UX Design",
    duration: "3 Months",
    price: "₹14,999",
    popular: false,
    features: [
      "Figma Mastery",
      "User Research & Personas",
      "Portfolio Projects",
      "Internship Certificate",
      "Mentor Feedback Sessions",
    ],
  },
  {
    title: "Full Stack Web Dev",
    duration: "4 Months",
    price: "₹19,999",
    popular: true,
    features: [
      "React & Next.js",
      "Node.js Backend",
      "Supabase / PostgreSQL",
      "Live Project Experience",
      "Job Referral Support",
    ],
  },
  {
    title: "AI & Data Science",
    duration: "3 Months",
    price: "₹16,499",
    popular: false,
    features: [
      "Python Foundations",
      "Machine Learning",
      "Data Visualization",
      "Real Dataset Projects",
      "Internship Certificate",
    ],
  },
  {
    title: "Digital Marketing",
    duration: "2 Months",
    price: "₹9,999",
    popular: false,
    features: [
      "SEO Optimization",
      "Paid Ads (FB/Google)",
      "Content Strategy",
      "Analytics Dashboard",
      "Client Management",
    ],
  },
];

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedq-NXP8PE5gs3GQ7SNA-8KVlqgQG8yaLEESGIv1qu04CGBg/viewform?usp=dialog";

function ProgramsSection() {
  return (
    <section
      id="internship"
      className="relative overflow-hidden py-20 lg:py-32"
      style={{
        background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #3B82F6 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-100 backdrop-blur-sm">
            Internship Programs
          </span>
          <h2 className="font-display text-4xl font-black text-white sm:text-5xl">
            Launch Your Tech Career
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Choose a program and start your journey towards a high-paying tech career.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {internships.map((prog, i) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative flex flex-col rounded-2xl bg-white p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                prog.popular ? "ring-2 ring-blue-500 ring-offset-2" : ""
              }`}
            >
              {prog.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-1 text-xs font-black text-white shadow-lg">
                    ⭐ Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <span className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                  {prog.duration}
                </span>
                <h3 className="mt-4 text-xl font-black text-slate-900">{prog.title}</h3>
                <p className="mt-1 text-3xl font-black text-blue-600">{prog.price}</p>
              </div>

              <ul className="mb-8 flex flex-1 flex-col gap-3">
                {prog.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className={`block w-full rounded-xl py-3 text-center text-sm font-bold transition-all duration-200 hover:scale-[1.02] ${
                  prog.popular
                    ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                }`}
              >
                Enroll Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramsSection;
