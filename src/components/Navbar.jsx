import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const LINKS = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Internships", href: "/internship" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `text-[15px] ${isActive ? "text-ink underline decoration-gold decoration-[1.5px] underline-offset-[6px]" : "text-ink-muted hover:text-ink"}`;

  return (
    <>
    <header className="sticky top-0 z-50 bg-paper border-b border-rule">
      <div className="container-content flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Nexora Techno, home">
          <img src="/Logo.jpeg" alt="" width="30" height="30" className="h-[30px] w-[30px] rounded-sm object-cover" />
          <span className="font-display text-[17px] font-semibold tracking-tight">Nexora Techno</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Main">
          {LINKS.map((l) => (
            <NavLink key={l.href} to={l.href} className={linkClass}>{l.label}</NavLink>
          ))}
          <Link to="/contact" className="btn-primary py-2 text-sm">Contact us</Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="md:hidden -mr-2 p-2 text-sm font-medium"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

    </header>

      {open && (
        <nav id="mobile-nav" className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-paper border-t border-rule overflow-y-auto" aria-label="Main">
          <ul className="container-content py-4">
            {[...LINKS, { label: "Contact", href: "/contact" }].map((l) => (
              <li key={l.href} className="border-b border-rule">
                <Link to={l.href} className="block py-4 font-display text-2xl font-semibold">{l.label}</Link>
              </li>
            ))}
          </ul>
          <div className="container-content pb-10 text-ink-muted">
            <p>Call or WhatsApp</p>
            <a href="tel:+919345121988" className="text-ink text-lg font-medium">+91 93451 21988</a>
          </div>
        </nav>
      )}
    </>
  );
}
