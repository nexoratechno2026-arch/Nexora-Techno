import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How much does a website cost at Nexora Techno?",
      answer: "Website and software development costs depend on your exact business requirements, features, and project scope. We provide custom cost estimates tailored to your project with 100% transparency and zero hidden fees."
    },
    {
      question: "How long does website or software development take?",
      answer: "Standard business websites take 1 to 2 weeks. Custom software platforms and complex web applications take 3 to 6 weeks depending on requirements."
    },
    {
      question: "Do you build custom software tailored to our specific business process?",
      answer: "Yes, 100%. We build custom software from scratch engineered around your exact daily operations, billing rules, customer portals, and reporting needs."
    },
    {
      question: "Do you provide post-launch maintenance and support?",
      answer: "Yes, all our development packages include post-launch support. We maintain, secure, update, and back up your digital products continuously."
    },
    {
      question: "Do you work with businesses outside Salem?",
      answer: "Yes! While our headquarters is located in Salem, Tamil Nadu, we work with businesses across India and internationally via online collaboration tools and video consultations."
    },
    {
      question: "Do you provide e-commerce development with Indian payment gateways?",
      answer: "Yes, we integrate all leading Indian payment systems including Razorpay, PhonePe, Paytm, and direct instant UPI QR checkout."
    },
    {
      question: "Do you provide AI automation services?",
      answer: "Yes, we build 24/7 AI WhatsApp customer support bots, automated invoice processing pipelines, and n8n workflow triggers for small & medium businesses."
    },
    {
      question: "Do you provide IT internships for computer science students in Salem?",
      answer: "Yes, Nexora Techno runs structured IT internship programs in Full Stack Development, AI/ML, and UI/UX with QR-verifiable certificate credentials."
    },
    {
      question: "How can I contact Nexora Techno for a project?",
      answer: "You can click 'Get a Free Consultation', reach us on WhatsApp at +91 93451 21988, email us at nexoratechno2026@gmail.com, or visit our office in Salem."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Clear answers regarding our software development process, costs, and student programs.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full p-6 text-left font-bold text-slate-900 text-base sm:text-lg flex items-center justify-between gap-4 hover:text-indigo-600 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    openIndex === idx ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-2">
                  <div className="pt-3">{faq.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
