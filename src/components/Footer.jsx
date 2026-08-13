import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Phone, Mail, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/Logo.jpeg"
                alt="Nexora Techno Logo"
                className="h-10 w-10 rounded-xl border border-slate-700"
              />
              <div className="flex flex-col">
                <span className="font-bold text-xl text-white tracking-tight">
                  Nexora<span className="text-indigo-400">Techno</span>
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  Software Development & AI Solutions
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Salem's premier software engineering and AI solutions company. We build custom websites, enterprise software, AI automation pipelines, and empower computer science students with practical internship training.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>MSME Registered Govt Entity — Salem, TN</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/919345121988"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 hover:text-white text-slate-400 transition-colors border border-slate-800 flex items-center gap-1.5 text-xs"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/nexora_techno"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-pink-600 hover:text-white text-slate-400 transition-colors border border-slate-800 flex items-center gap-1.5 text-xs"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span className="hidden sm:inline">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/nexoratechno"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-400 transition-colors border border-slate-800 flex items-center gap-1.5 text-xs"
                aria-label="LinkedIn"
              >
                <ArrowUpRight className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/about#team" className="hover:text-indigo-400 transition-colors">Our Team</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-indigo-400 transition-colors">Projects & Case Studies</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-indigo-400 transition-colors">Articles & Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact & Quote</Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services/website-development" className="hover:text-indigo-400 transition-colors">Website Development</Link>
              </li>
              <li>
                <Link to="/services/software-development" className="hover:text-indigo-400 transition-colors">Software Development</Link>
              </li>
              <li>
                <Link to="/services/ai-automation" className="hover:text-indigo-400 transition-colors">AI Automation</Link>
              </li>
              <li>
                <Link to="/services/ecommerce-development" className="hover:text-indigo-400 transition-colors">E-commerce Stores</Link>
              </li>
              <li>
                <Link to="/services/business-automation" className="hover:text-indigo-400 transition-colors">Business Automation</Link>
              </li>
              <li>
                <Link to="/services/seo" className="hover:text-indigo-400 transition-colors">SEO & Salem Ranking</Link>
              </li>
            </ul>
          </div>

          {/* Students Links & Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Students & Office
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/internship" className="hover:text-emerald-400 transition-colors font-medium">IT Internships</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-indigo-400 transition-colors">Practical Projects</Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-indigo-400 transition-colors">Certificate Verification</Link>
              </li>
              <li className="pt-3 text-xs text-slate-400 border-t border-slate-800">
                <div className="font-semibold text-slate-300">Salem Headquarters:</div>
                <div>241, East Permanur, Anna Park Backside, Salem 636007, TN</div>
              </li>
              <li className="text-xs text-slate-400">
                <div>Ph: +91 93451 21988</div>
                <div>Email: nexoratechno2026@gmail.com</div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Nexora Techno. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-200 transition-colors">Terms of Service</Link>
            <Link to="/verify" className="hover:text-emerald-400 transition-colors font-semibold">Verify Certificate</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
