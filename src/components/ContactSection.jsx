import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { supabase } from "../supabaseClient";

const WHATSAPP_NUMBER = "919345121988";

const contactDetails = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "nexoratechno2026@gmail.com",
    href: "mailto:nexoratechno2026@gmail.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.09 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.13h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16l.92.92z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+91 93451 21988",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Location",
    value: "237, East Premanur, Salem, Tamil Nadu",
    href: null,
  },
];

function ContactSection() {
  const [formStatus, setFormStatus] = useState("idle");
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    try {
      const { error } = await supabase.from("contact_messages").insert([data]);
      if (error) throw error;
      setFormStatus("success");
      alert("Message Sent Successfully!");
      e.target.reset();
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl font-black text-slate-900 sm:text-5xl">
            Contact Us – Salem, Tamil Nadu
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-500">
            Enroll for Internship, Full Stack Course, or Digital Marketing Training in Salem. We'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-2xl font-black text-slate-900 mb-4">
              Connect With Our Experts
            </h3>
            <p className="text-slate-500 leading-relaxed mb-10">
              Whether you're looking to launch an internship, build a product, or grow your brand — we have the expertise to make it happen.
            </p>

            <div className="space-y-6">
              {contactDetails.map((d) => (
                <div key={d.label} className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    {d.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{d.label}</p>
                    {d.href ? (
                      <a href={d.href} className="text-base font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                        {d.value}
                      </a>
                    ) : (
                      <p className="text-base font-semibold text-slate-800">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-10">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-green-500/40"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                  <path d="M12 2.1a9.8 9.8 0 0 0-8.42 14.8L2 22l5.22-1.54A9.88 9.88 0 1 0 12 2.1Zm0 18.03a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.91.93-3.01-.2-.31A8.25 8.25 0 1 1 12 20.13Zm4.53-6.15c-.25-.13-1.47-.73-1.7-.81-.22-.08-.39-.12-.55.13-.16.24-.64.8-.78.96-.14.16-.28.18-.53.06-.24-.13-1.03-.38-1.96-1.22-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.5l.38-.44c.12-.14.16-.24.24-.4.08-.15.04-.29-.02-.41-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.41-.55-.41h-.47c-.16 0-.41.06-.62.29-.21.23-.81.79-.81 1.92s.83 2.22.95 2.37c.11.15 1.63 2.48 3.95 3.49.55.24.98.38 1.31.49.56.17 1.07.15 1.47.09.45-.06 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/60"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">I'm Interested In</label>
                <select
                  name="service"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  <option value="internship">Internship Program</option>
                  <option value="training">Training / Upskilling</option>
                  <option value="website">Website Development</option>
                  <option value="ai">AI Automation</option>
                  <option value="seo">SEO & Marketing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  placeholder="Tell us about your goals..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={formStatus === "loading" || formStatus === "success"}
                className="w-full rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-blue-500/40 disabled:opacity-70"
              >
                {formStatus === "loading"
                  ? "Sending..."
                  : formStatus === "success"
                  ? "✓ Message Sent!"
                  : formStatus === "error"
                  ? "Error — Try Again"
                  : "Send Message →"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
