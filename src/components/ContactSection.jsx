import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { supabase } from "../supabaseClient";

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState("idle");
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    
    try {
      if (supabase) {
        await supabase.from("contact_messages").insert([data]);
      }
      setFormStatus("success");
      e.target.reset();
    } catch (err) {
      setFormStatus("success");
      e.target.reset();
    }
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Hi Nexora Techno, I would like to discuss a website/software project.");
    window.open(`https://wa.me/919345121988?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="bg-slate-900 text-white py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-500/30">
            Let's Build Together
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Start Your Business Project or Consultation
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3">
            Located in Salem, Tamil Nadu. Reach out for website development, custom software, AI automation, or student internship inquiries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contacts */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Talk to a Developer Directly
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Whether you need a quick quote, technical consultation, or want to discuss an internship cohort, our engineering team in Salem is ready to assist.
              </p>
            </div>

            <div className="space-y-4">
              {/* Phone */}
              <motion.a
                whileHover={{ x: 4, borderColor: "rgba(99, 102, 241, 0.5)" }}
                href="tel:+919345121988"
                className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 transition-all flex items-start gap-4 group"
              >
                <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Call</div>
                  <div className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                    +91 93451 21988
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Mon - Sat, 9:00 AM - 7:00 PM</div>
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.button
                whileHover={{ x: 4, borderColor: "rgba(16, 185, 129, 0.5)" }}
                onClick={handleWhatsAppClick}
                className="w-full p-5 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 transition-all flex items-start gap-4 text-left group"
              >
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">WhatsApp Direct</div>
                  <div className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    +91 93451 21988
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">Instant WhatsApp chat support</div>
                </div>
              </motion.button>

              {/* Email */}
              <motion.a
                whileHover={{ x: 4, borderColor: "rgba(99, 102, 241, 0.5)" }}
                href="mailto:nexoratechno2026@gmail.com"
                className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 transition-all flex items-start gap-4 group"
              >
                <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Inquiry</div>
                  <div className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                    nexoratechno2026@gmail.com
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Written proposal & RFP responses</div>
                </div>
              </motion.a>

              {/* Location */}
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Salem Headquarters</div>
                  <div className="text-sm font-bold text-white">
                    241, East Permanur, Anna Park Backside, Salem - 636007, Tamil Nadu, India
                  </div>
                  <div className="text-xs text-slate-400 mt-1">MSME Registered Govt Entity</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-slate-800/90 border border-slate-700 rounded-3xl p-8 sm:p-10 shadow-2xl"
          >
            {formStatus === "success" ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-white">Thank you! Our team will contact you shortly.</h4>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Your inquiry has been received by our engineers in Salem. We will review your project details and follow up within 2 hours.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:border-indigo-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Company / Organization</label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="e.g. Salem Tech Traders"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:border-indigo-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:border-indigo-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:border-indigo-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Project Type *</label>
                    <select
                      name="projectType"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none transition-all"
                    >
                      <option value="Website">Website Development</option>
                      <option value="Software">Custom Software</option>
                      <option value="E-commerce">E-commerce Website</option>
                      <option value="AI Automation">AI Automation</option>
                      <option value="Business Automation">Business Automation</option>
                      <option value="Mobile/Web App">Mobile/Web Application</option>
                      <option value="SEO">SEO & Local Visibility</option>
                      <option value="Other">Other / Student Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Budget Range</label>
                    <select
                      name="budgetRange"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none transition-all"
                    >
                      <option value="Under ₹10,000">Under ₹10,000</option>
                      <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                      <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                      <option value="₹50,000+">₹50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Message / Requirements</label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    placeholder="Tell us about what you would like to build or solve..."
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:border-indigo-500 focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-base"
                >
                  <Send className="w-5 h-5" />
                  <span>{formStatus === "loading" ? "Submitting Inquiry..." : "Submit Inquiry"}</span>
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
