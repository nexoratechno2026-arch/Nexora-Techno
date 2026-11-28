import React, { useState } from "react";
import toast from "react-hot-toast";

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
      
      window.open(`https://wa.me/919345121988?text=${msg}`, "_blank", "noopener,noreferrer");
    }, 600);
  };

  return (
    <section id="contact" className="border-b border-rule bg-surface">
      <div className="container-content py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-10 lg:gap-16">
          <div>
            <h2 className="heading-display text-3xl sm:text-4xl">Get in touch</h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Fill this in and it opens WhatsApp with your message ready to send.
              Or skip the form and just call.
            </p>
            <dl className="mt-8 space-y-5 text-[15px]">
              <div>
                <dt className="text-sm text-ink-muted">Phone and WhatsApp</dt>
                <dd className="mt-0.5 font-medium"><a href="tel:+919345121988" className="hover:underline">+91 93451 21988</a></dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">Email</dt>
                <dd className="mt-0.5 font-medium break-all"><a href="mailto:nexoratechno2026@gmail.com" className="hover:underline">nexoratechno2026@gmail.com</a></dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">Office</dt>
                <dd className="mt-0.5">241, East Permanur, Anna Park Backside, Salem 636007</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">Hours</dt>
                <dd className="mt-0.5">Monday to Saturday, 9 am to 7 pm</dd>
              </div>
            </dl>
          </div>

          <div>
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full min-h-[300px] p-8 border border-rule bg-paper">
                <div className="mb-4 text-emerald-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="font-serif font-semibold text-xl text-ink mb-2">Check WhatsApp</h3>
                <p className="text-sm text-ink-muted mb-6">
                  Your message should be open in WhatsApp now. Press send there and we'll reply, usually the same day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary text-sm"
                >
                  Start again
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
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
          </div>

        </div>
      </div>
    </section>
  );
}
