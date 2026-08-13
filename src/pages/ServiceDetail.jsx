import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import { projectsData } from "../data/projectsData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ConsultationModal from "../components/ConsultationModal";
import { 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck, 
  Code2, 
  AlertTriangle, 
  Sparkles,
  ArrowLeft
} from "lucide-react";

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const service = servicesData.find((s) => s.id === serviceId) || servicesData[0];
  const relevantProjectList = projectsData.filter((p) => service.relevantProjects.includes(p.id));

  return (
    <>
      <Navbar />

      <main className="bg-white text-slate-900">
        
        {/* Service Hero */}
        <section className="relative overflow-hidden bg-slate-950 text-white py-16 lg:py-24 tech-grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Services
            </button>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/30">
                {service.category}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {service.heroTitle}
              </h1>

              <p className="text-slate-300 text-lg sm:text-xl mt-4 leading-relaxed">
                {service.heroSubtitle}
              </p>

              <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3"
                >
                  <span>Get Free Service Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="https://wa.me/919345121988"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/80 font-bold rounded-2xl text-center"
                >
                  Talk to Developer on WhatsApp
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Problem vs Solution Section */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Problem Card */}
              <div className="p-8 rounded-3xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-amber-950">
                    The Common Business Challenge
                  </h2>
                </div>
                <p className="text-amber-900/90 text-sm leading-relaxed">
                  {service.problem}
                </p>
              </div>

              {/* Solution Card */}
              <div className="p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-emerald-950">
                    How Nexora Techno Solves It
                  </h2>
                </div>
                <p className="text-emerald-900/90 text-sm leading-relaxed">
                  {service.solution}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Key Features & Capability */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Key Features Included in {service.title}
              </h2>
              <p className="text-slate-600 text-base mt-2">
                Engineered with practical business needs and high quality standards in mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.features.map((ft, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-indigo-200 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{ft.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{ft.description}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Technologies Used */}
        <section className="py-16 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
              <div>
                <h3 className="text-2xl font-bold text-white">Technologies & Tools Employed</h3>
                <p className="text-slate-400 text-sm mt-1">We build using robust modern technologies for performance and scale.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-indigo-300 font-semibold text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Development Process */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Our {service.title} Delivery Roadmap
              </h2>
              <p className="text-slate-600 text-base mt-2">Transparent milestone stages from initial kickoff to live launch.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.process.map((step, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{step}</h4>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                  Measurable Value
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Business Benefits You Can Expect
                </h2>
                <p className="text-slate-600 text-base mt-3 leading-relaxed">
                  Working with Nexora Techno ensures robust software craftsmanship without corporate overheads or agency markup fees.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4">
                {service.benefits.map((b, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-medium text-base">{b}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Relevant Projects */}
        {relevantProjectList.length > 0 && (
          <section className="py-20 bg-slate-950 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white">Relevant Live Projects</h3>
                <p className="text-slate-400 text-sm mt-1">Real-world applications delivered by our engineering team.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relevantProjectList.map((p) => (
                  <div key={p.id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
                    <img src={p.image} alt={p.name} className="h-44 w-full object-cover rounded-2xl mb-4" />
                    <div className="text-xs font-bold text-indigo-400 uppercase mb-1">{p.category}</div>
                    <h4 className="text-xl font-bold text-white mb-2">{p.name}</h4>
                    <p className="text-slate-400 text-xs line-clamp-2">{p.shortDescription}</p>
                  </div>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* Service Specific FAQ */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900">
                {service.title} FAQ
              </h2>
            </div>

            <div className="space-y-4">
              {service.faq.map((q, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    {q.question}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed pl-7">{q.answer}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 bg-indigo-600 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Ready to launch your {service.title} project?
            </h2>
            <p className="text-indigo-100 max-w-2xl mx-auto text-base">
              Get a detailed cost estimate and timeline directly from our engineering team in Salem.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Get Free Consultation
              </button>
              <a
                href="https://wa.me/919345121988"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-indigo-950 text-white border border-indigo-400/30 font-bold rounded-2xl hover:bg-indigo-900 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppButton />
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
