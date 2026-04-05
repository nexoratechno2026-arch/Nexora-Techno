import { useState, useRef } from "react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "919345121988";
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedq-NXP8PE5gs3GQ7SNA-8KVlqgQG8yaLEESGIv1qu04CGBg/viewform?usp=dialog";

const contactDetails = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "nexoratechnosalem@gmail.com",
    href: "mailto:nexoratechnosalem@gmail.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.09 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.13h3a2 2 0 0 1-2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16l.92.92z" />
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
    label: "Office Address",
    value: "237, East Premanur, Salem, Tamil Nadu",
    href: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    label: "Business Hours",
    value: "Mon – Sat, 10:00 AM – 7:00 PM IST",
    href: null,
  },
];

import { supabase } from "../supabaseClient";

function ContactSection() {
  const [formStatus, setFormStatus] = useState("idle");
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      // Save data directly to Supabase
      const { error } = await supabase
        .from("contact_messages")
        .insert([data]);

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      setFormStatus("success");
      e.target.reset();
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 pb-16 pt-6 lg:px-10 lg:pb-28 lg:pt-10">
      <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-glow lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        {/* Left: contact info */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-accent-400">Contact Nexora Techno</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Let's build your next growth-ready website.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            Share your business goals and we'll give you a fast strategy direction. Clear process, premium
            execution, and strong support throughout.
          </p>

          {/* Contact detail cards */}
          <div className="mt-8 space-y-3">
            {contactDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3.5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300">
                  {detail.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400">{detail.label}</p>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      target={detail.href.startsWith("http") ? "_blank" : undefined}
                      rel={detail.href.startsWith("http") ? "noreferrer" : undefined}
                      className="mt-0.5 block truncate text-sm font-medium text-white transition hover:text-brand-300"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-sm font-medium text-white">{detail.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-6">
            <a
              id="contact-whatsapp-btn"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,211,102,0.35)] transition hover:brightness-110"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M12 2.1a9.8 9.8 0 0 0-8.42 14.8L2 22l5.22-1.54A9.88 9.88 0 1 0 12 2.1Zm0 18.03a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.91.93-3.01-.2-.31A8.25 8.25 0 1 1 12 20.13Zm4.53-6.15c-.25-.13-1.47-.73-1.7-.81-.22-.08-.39-.12-.55.13-.16.24-.64.8-.78.96-.14.16-.28.18-.53.06-.24-.13-1.03-.38-1.96-1.22-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.5l.38-.44c.12-.14.16-.24.24-.4.08-.15.04-.29-.02-.41-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.41-.55-.41h-.47c-.16 0-.41.06-.62.29-.21.23-.81.79-.81 1.92s.83 2.22.95 2.37c.11.15 1.63 2.48 3.95 3.49.55.24.98.38 1.31.49.56.17 1.07.15 1.47.09.45-.06 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Right: Inquiry form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35 }}
          className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-6"
        >
          <h3 className="text-xl font-semibold text-white">Quick Project Inquiry</h3>
          <p className="mt-2 text-sm text-slate-300">
            Fill in your details and we'll reach out within 24 hours with a strategy direction.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-6 space-y-3"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-brand-300/70 focus:outline-none transition"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Business email"
                className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-brand-300/70 focus:outline-none transition"
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone / WhatsApp number"
              className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-brand-300/70 focus:outline-none transition"
            />

            <select
              name="service"
              className="w-full rounded-xl border border-white/15 bg-[#07142a] px-4 py-3 text-sm text-slate-300 focus:border-brand-300/70 focus:outline-none transition"
            >
              <option value="">Service needed...</option>
              <option value="website">Business Website</option>
              <option value="ai-automation">AI Automation</option>
              <option value="seo">SEO & Content</option>
              <option value="ads">Digital Ads & Funnels</option>
              <option value="ui-ux">UI/UX Design</option>
              <option value="other">Other</option>
            </select>

            <textarea
              name="message"
              required
              rows="4"
              placeholder="Tell us your goal and timeline"
              className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-brand-300/70 focus:outline-none transition"
            />

            <button
              id="contact-submit-btn"
              type="submit"
              disabled={formStatus === "loading" || formStatus === "success"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 active:scale-95 disabled:opacity-70"
            >
              {formStatus === "loading" ? "Sending..." : formStatus === "success" ? "Message Sent!" : formStatus === "error" ? "Error! Try again" : "Send Inquiry"}
              {formStatus === "idle" && <span>→</span>}
            </button>
          </form>

          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
          >
            Or use Google Form instead
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;
