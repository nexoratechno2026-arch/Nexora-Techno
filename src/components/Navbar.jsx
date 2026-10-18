import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const primaryLinks = [
    { label: "Work",        href: "/projects" },
    { label: "Services",    href: "/services" },
    { label: "Internships", href: "/internship" },
    { label: "About",       href: "/about" },
    { label: "Contact",     href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleAnchorLink = (href) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-paper transition-shadow duration-200 ${
          scrolled ? "shadow-subtle border-b border-rule" : "border-b border-rule"
        }`}
      >
        <div className="container-content">
          <div className="flex items-center justify-between h-[68px]">

            {/* ── Brand ─────────────────────────────────────────────── */}
            <Link
              to="/"
              className="flex items-center gap-2.5 flex-shrink-0"
              aria-label="Nexora Techno — Home"
            >
              <img
                src="/Logo.jpeg"
                alt="Nexora Techno"
                className="h-8 w-8 rounded object-cover border border-rule"
                width="32"
                height="32"
              />
              <div className="flex flex-col leading-none">
                <span className="font-sans font-bold text-[15px] text-ink tracking-tight">
                  Nexora Techno
                </span>
                <span className="font-sans text-[10px] font-semibold text-ink-muted tracking-widest uppercase">
                  Software & EdTech
                </span>
              </div>
            </Link>

            {/* ── Desktop primary nav ────────────────────────────────── */}
            <nav
              className="hidden md:flex items-center gap-6"
              aria-label="Primary navigation"
            >
              {primaryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleAnchorLink(link.href)}
                  className={`font-sans text-sm font-medium transition-colors duration-150 ${
                    isActive(link.href)
                      ? "text-accent-600"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Desktop CTA ───────────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/contact"
                className="btn-primary text-sm"
              >
                Start a project
              </Link>
            </div>

            {/* ── Mobile: CTA + hamburger ────────────────────────────── */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                to="/contact"
                className="btn-primary text-xs py-2 px-3"
              >
                Start a project
              </Link>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="p-2 rounded text-ink-muted hover:text-ink hover:bg-surface transition-colors"
              >
                {menuOpen ? (
                  // X icon
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                  </svg>
                ) : (
                  // Hamburger
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 md:hidden"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer panel */}
          <div className="absolute top-[68px] left-0 right-0 bg-paper border-b border-rule shadow-elevated">
            <nav className="container-content py-4 flex flex-col gap-1">
              {primaryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-accent-600 bg-accent-50"
                      : "text-ink hover:bg-surface"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 pt-3 border-t border-rule">
                <a
                  href="https://wa.me/919345121988?text=Hi%20Nexora%20Techno%2C%20I%20wanted%20to%20discuss%20a%20project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded border border-rule text-sm font-medium text-ink-muted hover:text-ink hover:bg-surface transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.397 5.608L0 24l6.618-1.347C8.214 23.537 10.072 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.807 0-3.487-.476-4.942-1.309l-.354-.21-3.666.747.793-3.569-.232-.368A9.785 9.785 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
                  </svg>
                  WhatsApp us
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
