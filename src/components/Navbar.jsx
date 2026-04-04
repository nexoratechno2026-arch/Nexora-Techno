import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedq-NXP8PE5gs3GQ7SNA-8KVlqgQG8yaLEESGIv1qu04CGBg/viewform?usp=dialog";

const links = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#portfolio" },
  { label: "Results", href: "/#testimonials" },
  { label: "Internship", href: "/internship" },
  { label: "Contact", href: "/#contact" },
];

function MenuIcon({ open }) {
  return (
    <div className="flex h-5 w-5 flex-col justify-center gap-1.5">
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        className="h-0.5 w-full rounded bg-white origin-center block"
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        className="h-0.5 w-full rounded bg-white block"
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        className="h-0.5 w-full rounded bg-white origin-center block"
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

function Navbar() {
  const [logoError, setLogoError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on link click
  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="sticky top-0 z-40"
      >
        <div
          className={`mx-auto mt-4 flex w-[min(94%,76rem)] items-center justify-between gap-2 rounded-full border px-3 py-3 backdrop-blur-sm transition-all duration-300 sm:px-4 lg:px-6 ${
            scrolled
              ? "border-brand-300/30 bg-[#06102280]/95 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "border-brand-300/20 bg-[#09182f]/80"
          }`}
        >
          {/* Logo */}
          <a
            href="/#home"
            className="inline-flex min-w-0 items-center gap-2 font-display text-lg font-bold tracking-tight text-white sm:gap-3 sm:text-xl"
          >
            {!logoError ? (
              <img
                src="/nexora-logo.png"
                alt="Nexora Techno logo"
                className="h-9 w-auto rounded-md border border-white/10 object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-300 to-brand-500 text-xs font-semibold text-slate-950">
                NT
              </span>
            )}
            <span className="truncate">Nexora</span>
            <span className="hidden sm:inline">Techno</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 text-sm text-white/70 lg:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full px-3 py-1.5 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* CTA */}
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden shrink-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110 sm:block"
            >
              Get Free Demo
            </a>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-toggle"
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] transition hover:bg-white/[0.1] lg:hidden"
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[5.5rem] z-30 mx-auto w-[min(94%,76rem)] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07142a]/95 p-5 shadow-2xl backdrop-blur-lg lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 border-t border-white/10 pt-4">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noreferrer"
                onClick={handleNavClick}
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-brand-300 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
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
