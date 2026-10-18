import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ENQUIRY_TYPES = [
  "Website development",
  "Custom software",
  "E-commerce",
  "AI or workflow automation",
  "Business automation",
  "Web or mobile application",
  "SEO and local visibility",
  "Student internship",
  "College workshop",
  "Other",
];

const INITIAL = {
  name: "",
  company: "",
  phone: "",
  email: "",
  enquiryType: "",
  message: "",
};

export default function ContactSection() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()]{8,15}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number";
    if (!form.enquiryType) e.enquiryType = "Please select an enquiry type";
    if (!form.message.trim()) e.message = "Please describe your requirement";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);

    // Compose WhatsApp message as primary action
    const msg = encodeURIComponent(
      `Hi Nexora Techno,\n\n` +
      `Name: ${form.name}\n` +
      `${form.company ? `Company: ${form.company}\n` : ""}` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email}\n` +
      `Enquiry: ${form.enquiryType}\n\n` +
      `${form.message}`
    );

    // Try sending via WhatsApp
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm(INITIAL);
      toast.success("Opening WhatsApp with your enquiry...");
      window.open(`https://wa.me/919345121988?text=${msg}`, "_blank", "noopener,noreferrer");
    }, 600);
  };

  return (
    <section id="contact" className="bg-surface border-b border-rule">
      <div className="container-content py-16 sm:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12">

          {/* Left — intro */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <p className="eyebrow mb-3">Contact</p>
              <h2 className="heading-display text-display-sm text-ink">
                Start with a conversation.
              </h2>
            </div>
            <p className="text-body-md text-ink-muted leading-relaxed">
              Tell us what you are looking to build, improve, or learn. We will
              review the requirement and get back to you.
            </p>

            {/* Contact details */}
            <div className="space-y-3 text-sm">
              <a
                href="tel:+919345121988"
                className="flex items-center gap-3 text-ink-muted hover:text-ink transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.18 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.62 16l.3.92z"/>
                </svg>
                +91 93451 21988
              </a>
              <a
                href="mailto:nexoratechno2026@gmail.com"
                className="flex items-center gap-3 text-ink-muted hover:text-ink transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                nexoratechno2026@gmail.com
              </a>
              <p className="flex items-start gap-3 text-ink-muted">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                241, East Permanur, Anna Park Backside,<br/>Salem — 636007, Tamil Nadu
              </p>
            </div>

            {/* Quick channels */}
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href="https://wa.me/919345121988?text=Hi%20Nexora%20Techno"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
                aria-label="WhatsApp Nexora Techno (opens WhatsApp)"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.397 5.608L0 24l6.618-1.347C8.214 23.537 10.072 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.807 0-3.487-.476-4.942-1.309l-.354-.21-3.666.747.793-3.569-.232-.368A9.785 9.785 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/nexora_techno"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
                aria-label="Nexora Techno on Instagram (opens in new tab)"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/nexoratechno"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5"
                aria-label="Nexora Techno on LinkedIn (opens in new tab)"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                </svg>
                LinkedIn
              </a>
            </div>

            <p className="text-[11px] text-ink-muted">
              Monday to Saturday, 9:00 AM – 7:00 PM IST
            </p>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center p-8 border border-rule rounded-lg bg-paper">
                <div className="w-10 h-10 rounded-full bg-accent-50 border border-accent-200 flex items-center justify-center mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-xl text-ink mb-2">Message sent</h3>
                <p className="text-sm text-ink-muted mb-6">
                  Your enquiry was forwarded to WhatsApp. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary text-sm"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5 p-6 sm:p-8 border border-rule rounded-lg bg-paper"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="form-label">
                      Full name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`form-input ${errors.name ? "border-red-400" : ""}`}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-xs text-red-600" role="alert">{errors.name}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="contact-company" className="form-label">
                      Company / organisation
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label htmlFor="contact-phone" className="form-label">
                      Phone <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={`form-input ${errors.phone ? "border-red-400" : ""}`}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-xs text-red-600" role="alert">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="form-label">
                      Email <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? "border-red-400" : ""}`}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Enquiry type */}
                <div>
                  <label htmlFor="contact-enquiry" className="form-label">
                    Enquiry type <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="contact-enquiry"
                    name="enquiryType"
                    value={form.enquiryType}
                    onChange={handleChange}
                    className={`form-input ${errors.enquiryType ? "border-red-400" : ""}`}
                    aria-describedby={errors.enquiryType ? "enquiry-error" : undefined}
                    aria-invalid={!!errors.enquiryType}
                  >
                    <option value="">Select type</option>
                    {ENQUIRY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.enquiryType && (
                    <p id="enquiry-error" className="mt-1 text-xs text-red-600" role="alert">{errors.enquiryType}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="form-label">
                    Requirement or message <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe what you are looking to build or the problem you want to solve."
                    className={`form-input form-textarea ${errors.message ? "border-red-400" : ""}`}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-600" role="alert">{errors.message}</p>
                  )}
                </div>

                {/* Privacy note */}
                <p className="text-[11px] text-ink-muted">
                  Your information will only be used to respond to this enquiry. We do not share or sell contact details.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    "Send enquiry"
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
