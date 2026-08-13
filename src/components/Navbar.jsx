import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, ShieldCheck } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location]);

  const navServices = [
    { name: "Website Development", href: "/services/website-development", desc: "High-converting business & brand sites" },
    { name: "Custom Software", href: "/services/software-development", desc: "Bespoke internal systems & management tools" },
    { name: "AI Automation", href: "/services/ai-automation", desc: "Intelligent bots & automated workflows" },
    { name: "E-commerce Development", href: "/services/ecommerce-development", desc: "Online stores with UPI payment integration" },
    { name: "Business Automation", href: "/services/business-automation", desc: "Streamline operations & lead pipelines" },
    { name: "Web & Mobile Apps", href: "/services/web-app-development", desc: "Progressive web & mobile applications" },
    { name: "SEO Optimization", href: "/services/seo", desc: "Google ranking & Salem local visibility" }
  ];

  return (
    <>
      {/* Top Banner - MSME Badge */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50 text-[10px] font-semibold uppercase">
          <ShieldCheck className="w-3 h-3" /> MSME Registered
        </span>
        <span>Salem-Based Software Development & AI Solutions Company</span>
        <a 
          href="https://wa.me/919345121988?text=Hi%20Nexora%20Techno,%20I%20would%20like%20to%20discuss%20a%20project" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 ml-2 underline"
        >
          Talk to a Developer &rarr;
        </a>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md shadow-slate-200/50 py-3 border-b border-slate-100"
            : "bg-white py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/Logo.jpeg"
              alt="Nexora Techno Logo"
              className="h-10 w-10 rounded-xl shadow-sm border border-slate-200 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-slate-900 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">
                Nexora<span className="text-indigo-600">Techno</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
                Software & AI Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/" ? "text-indigo-600 font-semibold bg-indigo-50/60" : "hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname.startsWith("/services") ? "text-indigo-600 font-semibold bg-indigo-50/60" : "hover:text-indigo-600 hover:bg-slate-50"
                }`}
              >
                Services <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 mt-1 grid gap-1 z-50"
                  >
                    <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Our Core Services
                    </div>
                    {navServices.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="p-2.5 rounded-xl hover:bg-indigo-50/60 transition-colors group flex flex-col"
                      >
                        <span className="font-semibold text-slate-900 group-hover:text-indigo-600 text-sm">
                          {service.name}
                        </span>
                        <span className="text-xs text-slate-500 mt-0.5">
                          {service.desc}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/projects"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/projects" ? "text-indigo-600 font-semibold bg-indigo-50/60" : "hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              Projects
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/about" ? "text-indigo-600 font-semibold bg-indigo-50/60" : "hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              About
            </Link>

            <Link
              to="/internship"
              className={`px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5 ${
                location.pathname === "/internship" ? "text-indigo-600 font-semibold bg-indigo-50/60" : "hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              <span>Internships</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full">
                For Students
              </span>
            </Link>

            <Link
              to="/blog"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/blog" ? "text-indigo-600 font-semibold bg-indigo-50/60" : "hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              Blog
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/contact" ? "text-indigo-600 font-semibold bg-indigo-50/60" : "hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setConsultationOpen(true)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => setConsultationOpen(true)}
              className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg"
            >
              Consultation
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Over Drawer with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl overflow-hidden"
            >
              <Link
                to="/"
                className="block px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-indigo-50"
              >
                Home
              </Link>

              <div>
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-indigo-50"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 ${servicesDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {servicesDropdownOpen && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-xl my-1">
                    {navServices.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="block px-3 py-2 text-xs font-medium text-slate-700 hover:text-indigo-600"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/projects"
                className="block px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-indigo-50"
              >
                Projects
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-indigo-50"
              >
                About
              </Link>
              <Link
                to="/internship"
                className="block px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-indigo-50"
              >
                Internships (For Students)
              </Link>
              <Link
                to="/blog"
                className="block px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-indigo-50"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-lg text-slate-800 font-medium hover:bg-indigo-50"
              >
                Contact
              </Link>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setConsultationOpen(true);
                  }}
                  className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl text-center shadow-md text-sm"
                >
                  Get a Free Consultation
                </button>
                <a
                  href="https://wa.me/919345121988?text=Hi%20Nexora%20Techno,%20I%20would%20like%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-50 text-emerald-700 font-semibold rounded-xl text-center text-sm border border-emerald-200"
                >
                  WhatsApp Us Directly
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </>
  );
}
