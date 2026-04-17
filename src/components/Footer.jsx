import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "919345121988";
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedq-NXP8PE5gs3GQ7SNA-8KVlqgQG8yaLEESGIv1qu04CGBg/viewform?usp=dialog";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/#about" },
    { label: "Our Team", href: "/#team" },
    { label: "Internship", href: "/internship" },
    { label: "Contact", href: "/#contact" },
  ],
  Services: [
    { label: "Website Development", href: "/#services" },
    { label: "UI/UX Design", href: "/#services" },
    { label: "AI Automation", href: "/#services" },
    { label: "SEO Strategy", href: "/#services" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Verification", href: "/verify" },
  ],
  Connect: [
    { label: "Get Free Demo", href: GOOGLE_FORM_URL, external: true },
    { label: "WhatsApp Us", href: `https://wa.me/${WHATSAPP_NUMBER}`, external: true },
    { label: "Email Us", href: "mailto:nexoratechnosalem@gmail.com" },
  ],
};

const socialLinks = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M12 2.1a9.8 9.8 0 0 0-8.42 14.8L2 22l5.22-1.54A9.88 9.88 0 1 0 12 2.1Zm0 18.03a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.91.93-3.01-.2-.31A8.25 8.25 0 1 1 12 20.13Zm4.53-6.15c-.25-.13-1.47-.73-1.7-.81-.22-.08-.39-.12-.55.13-.16.24-.64.8-.78.96-.14.16-.28.18-.53.06-.24-.13-1.03-.38-1.96-1.22-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.5l.38-.44c.12-.14.16-.24.24-.4.08-.15.04-.29-.02-.41-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.41-.55-.41h-.47c-.16 0-.41.06-.62.29-.21.23-.81.79-.81 1.92s.83 2.22.95 2.37c.11.15 1.63 2.48 3.95 3.49.55.24.98.38 1.31.49.56.17 1.07.15 1.47.09.45-.06 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nexora_techno",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/nexoratechno",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A]">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="/#home" className="inline-flex items-center gap-3 mb-6">
              <img src="/Logo.jpeg" alt="Nexora Techno" className="h-10 w-auto rounded-lg" onError={(e) => { e.target.style.display = "none"; }} />
              <span className="font-display text-xl font-black text-white">
                Nexora <span className="text-blue-400">Techno</span>
              </span>
            </a>
            <p className="text-slate-400 leading-relaxed text-sm max-w-xs mb-8">
              Helping businesses and ambitious individuals scale through innovative digital solutions, elite design, and strategic engineering.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-all duration-200 hover:bg-blue-600 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([cat, links]) => (
            <div key={cat}>
              <h4 className="mb-5 text-sm font-black uppercase tracking-widest text-white">{cat}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="text-sm text-slate-400 transition-colors duration-200 hover:text-blue-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {year} Nexora Techno. All Rights Reserved. Built in Salem, Tamil Nadu.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-sm text-slate-500 hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-sm text-slate-500 hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
