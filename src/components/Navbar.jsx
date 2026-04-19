import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedq-NXP8PE5gs3GQ7SNA-8KVlqgQG8yaLEESGIv1qu04CGBg/viewform?usp=dialog";

const links = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Team", href: "/#team" },
  { label: "Internship", href: "/internship" },
  { label: "Contact", href: "/#contact" },
];

function Navbar() {
  const [logoError, setLogoError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${
          scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.08)]" : "border-b border-slate-100"
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="/#home" className="inline-flex items-center gap-3">
            {!logoError ? (
              <img
                src="/Logo.jpeg"
                alt="Nexora Techno"
                className="h-10 w-auto rounded-lg object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-sm font-black text-white">
                NT
              </span>
            )}
            <span className="hidden font-display sm:block">
              <span className="block text-xl font-black text-slate-900">
                Nexora <span className="text-blue-600">Techno</span>
              </span>
              <span className="block text-xs font-semibold text-slate-400 tracking-wide">
                Salem, Tamil Nadu
              </span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-blue-500/40 hover:scale-[1.02] sm:block"
            >
              Get Free Demo
            </a>
            {/* Mobile Toggle */}
            <button
              id="mobile-menu-toggle"
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
            >
              {mobileOpen ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[73px] z-40 border-b border-slate-100 bg-white px-6 py-4 shadow-lg lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 border-t border-slate-100 pt-4">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/25"
              >
                Get Free Demo →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
