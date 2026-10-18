import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep text-deep-text border-t border-white/10">
      <div className="container-content py-12 sm:py-14">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">

          {/* Brand column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5" aria-label="Nexora Techno — Home">
              <img
                src="/Logo.jpeg"
                alt="Nexora Techno"
                className="h-8 w-8 rounded object-cover border border-white/20"
                width="32"
                height="32"
              />
              <div className="flex flex-col leading-none">
                <span className="font-sans font-bold text-[15px] text-deep-text tracking-tight">
                  Nexora Techno
                </span>
                <span className="font-sans text-[10px] font-semibold text-deep-text/50 tracking-widest uppercase">
                  Software & EdTech
                </span>
              </div>
            </Link>

            <p className="text-[13px] text-deep-text/60 leading-relaxed max-w-[34ch]">
              Websites, custom software, and practical technology education from Salem, Tamil Nadu.
            </p>

            {/* Contact */}
            <div className="space-y-1.5 text-[12px] text-deep-text/60">
              <p>241, East Permanur, Anna Park Backside</p>
              <p>Salem — 636007, Tamil Nadu, India</p>
              <a href="tel:+919345121988" className="hover:text-deep-text transition-colors block">
                +91 93451 21988
              </a>
              <a href="mailto:nexoratechno2026@gmail.com" className="hover:text-deep-text transition-colors block">
                nexoratechno2026@gmail.com
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://wa.me/919345121988"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-white/20 text-deep-text/60 hover:text-deep-text hover:border-white/40 transition-colors"
                aria-label="WhatsApp Nexora Techno (opens WhatsApp)"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.397 5.608L0 24l6.618-1.347C8.214 23.537 10.072 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.807 0-3.487-.476-4.942-1.309l-.354-.21-3.666.747.793-3.569-.232-.368A9.785 9.785 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/nexora_techno"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-white/20 text-deep-text/60 hover:text-deep-text hover:border-white/40 transition-colors"
                aria-label="Nexora Techno on Instagram (opens in new tab)"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/nexoratechno"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded border border-white/20 text-deep-text/60 hover:text-deep-text hover:border-white/40 transition-colors"
                aria-label="Nexora Techno on LinkedIn (opens in new tab)"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
                </svg>
              </a>
            </div>

            <p className="text-[11px] text-deep-text/40">MSME Registered Enterprise</p>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-[11px] font-semibold text-deep-text/40 uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              {[
                { label: "About", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-deep-text/60 hover:text-deep-text transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-[11px] font-semibold text-deep-text/40 uppercase tracking-widest mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              {[
                { label: "Website Development", href: "/services/website-development" },
                { label: "Custom Software", href: "/services/software-development" },
                { label: "E-commerce", href: "/services/ecommerce-development" },
                { label: "AI & Automation", href: "/services/ai-automation" },
                { label: "UI/UX Design", href: "/services/ui-ux-design" },
                { label: "All services", href: "/services" },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-deep-text/60 hover:text-deep-text transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student links */}
          <div>
            <h4 className="text-[11px] font-semibold text-deep-text/40 uppercase tracking-widest mb-4">
              Students
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              {[
                { label: "Internships & EdTech", href: "/internship" },
                { label: "Student Portal (LMS)", href: "/lms/login" },
                { label: "Verify Certificate", href: "/verify" },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-deep-text/60 hover:text-deep-text transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-deep-text/40">
          <p>© {year} Nexora Techno. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-deep-text/60 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-deep-text/60 transition-colors">Terms of Service</Link>
            <Link to="/verify" className="hover:text-deep-text/60 transition-colors">Verify Certificate</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
