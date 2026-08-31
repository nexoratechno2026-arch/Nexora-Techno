import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";
import teamMembers from "../data/team.json";
import { 
  Building2, 
  Target, 
  Eye, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Code2,
  Users
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />
      <ScrollToTop />
      <WhatsAppButton />

      <main className="flex-grow">
        
        {/* About Hero */}
        <section className="relative py-16 lg:py-24 tech-grid-bg border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/30">
                <Building2 className="w-4 h-4" /> Who We Are
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Software Development & AI Solutions Company in Salem
              </h1>

              <p className="text-slate-300 text-lg sm:text-xl mt-4 leading-relaxed">
                Nexora Techno is a technology company headquartered in Salem, Tamil Nadu. We specialize in custom web application engineering, software automation, e-commerce systems, and practical student internship training.
              </p>

              <div className="pt-6 flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Government Registered MSME Entity</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>Salem, Tamil Nadu, India</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 border border-indigo-500/30 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  To empower growing businesses with high-speed, reliable, custom software and AI automation, while bridging the gap between academic education and industry software engineering for students across Tamil Nadu.
                </p>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 border border-emerald-500/30 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Vision</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  To become the most trusted technology solution partner in Salem and regional South India, recognized for transparent craftsmanship, high quality products, and real-world student mentorship.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section id="team" className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-500/30">
                Leadership & Developers
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Our Engineering & Leadership Team
              </h2>
              <p className="text-slate-400 text-base mt-2">
                Meet the passionate founders, project managers, HR leads, and developers driving Nexora Techno forward.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((m) => (
                <div
                  key={m.id}
                  className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <div className="relative h-72 overflow-hidden rounded-2xl bg-slate-950 mb-6 border border-slate-800 flex items-center justify-center">
                      <img
                        src={m.image}
                        alt={m.name}
                        className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                          m.name.toLowerCase().includes("kapil")
                            ? "object-cover object-top"
                            : m.name.toLowerCase().includes("tharani")
                            ? "object-cover object-[center_20%]"
                            : "object-cover object-top"
                        }`}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    </div>

                    <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
                      {m.role}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{m.name}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-3">
                      {m.education}
                    </p>
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-4 mb-4">
                      {m.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Credentials & Location */}
        <section className="py-20 bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                  Business Entity Details
                </div>
                <h2 className="text-3xl font-extrabold text-white">
                  MSME Registered Technology Enterprise
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Nexora Techno operates under official Government of India MSME registration in Salem, Tamil Nadu. We maintain strict professional standards, data security practices, and reliable project delivery schedules.
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                    <span className="text-xs text-slate-300">
                      <strong>Office Address:</strong> 241, East Permanur, Anna Park Backside, Salem - 636007, TN
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-xs text-slate-300">
                      <strong>Contact Helpline:</strong> +91 93451 21988 / +91 99435 78591
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                    <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                    <span className="text-xs text-slate-300">
                      <strong>Official Email:</strong> nexoratechno2026@gmail.com
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6">
                <h3 className="text-2xl font-bold text-white">Our Journey</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Founded in Salem by computer science engineers driven by passion for software design and entrepreneurship, Nexora Techno has rapidly expanded from core web design into AI workflow automation, custom corporate software systems, and student internship training.
                </p>
                <div className="pt-4 flex items-center gap-4">
                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-colors"
                  >
                    Work With Us
                  </Link>
                  <Link
                    to="/projects"
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-sm transition-colors"
                  >
                    View Our Work
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
