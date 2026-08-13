import React, { useState } from "react";
import { Check, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

export default function PricingSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const plans = [
    {
      name: "Starter Website",
      startingPrice: "₹7,999",
      idealFor: "Small local businesses & startups establishing an online presence",
      features: [
        "Up to 5 Mobile-First Responsive Pages",
        "WhatsApp Direct Contact Button",
        "Fast Page Speed (90+ Google Score)",
        "On-Page SEO & Meta Tags",
        "Domain & Hosting Setup Support",
        "Contact Form with Email Notifications"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Business Website",
      startingPrice: "₹16,999",
      idealFor: "Growing enterprises wanting high conversion & SEO rankings",
      features: [
        "Up to 12 Custom Designed Pages",
        "Advanced Interactive UI/UX",
        "Salem Local Business Schema & Technical SEO",
        "Lead Capture Forms & WhatsApp Integration",
        "Custom Blog / CMS Integration",
        "1 Year Maintenance & Tech Support"
      ],
      popular: true,
      cta: "Build Business Site"
    },
    {
      name: "E-commerce Website",
      startingPrice: "₹24,999",
      idealFor: "Brands selling products online with UPI payment gateway",
      features: [
        "Product Catalog & Shopping Cart",
        "Razorpay / PhonePe / UPI Gateway",
        "Instant WhatsApp Order Alerts",
        "Admin Inventory & Order Management",
        "Coupons & Discount Engine",
        "Mobile App-Like PWA Experience"
      ],
      popular: false,
      cta: "Launch Store"
    },
    {
      name: "Custom Software",
      startingPrice: "Custom Quote",
      idealFor: "Bespoke operational systems, AI automation & web apps",
      features: [
        "Custom Database & Role Architectures",
        "Automated AI Workflow Pipelines",
        "Internal Billing & CRM Systems",
        "Granular Access & Audit Security",
        "Dedicated Development Team",
        "Priority Ongoing SLA Maintenance"
      ],
      popular: false,
      cta: "Request Quote"
    }
  ];

  return (
    <section className="py-20 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3">
            Transparent Investment
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Simple, Transparent Pricing Packages
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            No hidden fees, no per-user monthly lock-ins. You own 100% of your source code and digital assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between relative ${
                plan.popular
                  ? "bg-slate-900 text-white border-indigo-500 shadow-2xl scale-[1.02]"
                  : "bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-300 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className={`text-xl font-bold ${plan.popular ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                
                <div className="mt-4 mb-2">
                  <span className={`text-3xl sm:text-4xl font-black ${plan.popular ? "text-white" : "text-slate-900"}`}>
                    {plan.startingPrice}
                  </span>
                  {plan.startingPrice.startsWith("₹") && (
                    <span className={`text-xs ml-1 ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                      starting
                    </span>
                  )}
                </div>

                <p className={`text-xs leading-relaxed mb-6 ${plan.popular ? "text-slate-300" : "text-slate-600"}`}>
                  {plan.idealFor}
                </p>

                <div className={`pt-6 border-t ${plan.popular ? "border-slate-800" : "border-slate-200"} space-y-3`}>
                  {plan.features.map((ft, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? "text-emerald-400" : "text-indigo-600"}`} />
                      <span className={plan.popular ? "text-slate-200" : "text-slate-700"}>
                        {ft}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-transparent">
                <button
                  onClick={() => setModalOpen(true)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-slate-900 hover:bg-indigo-600 text-white shadow-md"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 text-sm">
            Need a custom scope or enterprise SLA agreement?{" "}
            <button
              onClick={() => setModalOpen(true)}
              className="text-indigo-600 font-bold hover:underline"
            >
              Get a Free Quote
            </button>
          </p>
        </div>

      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
