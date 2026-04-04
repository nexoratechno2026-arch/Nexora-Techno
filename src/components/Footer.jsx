const WHATSAPP_NUMBER = "919345121988";
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSedq-NXP8PE5gs3GQ7SNA-8KVlqgQG8yaLEESGIv1qu04CGBg/viewform?usp=dialog";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/#about" },
    { label: "Our Services", href: "/#services" },
    { label: "Client Portal", href: "/#dashboard" },
    { label: "Our Process", href: "/#portfolio" },
    { label: "Internship", href: "/internship" },
    { label: "Verification", href: "/verify" },
    { label: "Contact", href: "/#contact" },
  ],
  Services: [
    { label: "Business Website Design", href: "/#services" },
    { label: "AI Automation", href: "/#services" },
    { label: "SaaS Development", href: "/#services" },
    { label: "SEO & Content Strategy", href: "/#services" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Data Security", href: "/privacy" },
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
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
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
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" className="mx-auto max-w-7xl px-6 pb-10 pt-4 lg:px-10">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-glow">
        {/* Top section */}
        <div className="grid gap-10 p-8 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12 lg:p-10">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <a href="/#home" className="inline-flex items-center gap-2 font-display text-xl font-bold text-white">
              <img
                src="/nexora-logo.png"
                alt="Nexora Techno"
                className="h-9 w-auto rounded-md border border-white/10 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span>Nexora Techno</span>
            </a>
            <p className="text-sm leading-7 text-slate-400">
              Nexora Techno builds premium websites, AI automations, and digital growth systems for ambitious startups
              and growing businesses.
            </p>
            <div className="space-y-1 text-sm text-slate-400">
              <p className="flex items-center gap-2"><span className="text-brand-300">✉</span> nexoratechnosalem@gmail.com</p>
              <p className="flex items-center gap-2"><span className="text-brand-300">☎</span> +91 93451 21988</p>
            </div>
            <p className="text-sm text-slate-400">
              237, East Premanur, Salem, Tamil Nadu &nbsp;·&nbsp; Serving globally
            </p>

            {/* Social icons */}
            <div className="mt-2 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-white/70 transition hover:border-brand-300/40 hover:bg-brand-500/15 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-white">{category}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-8 border-t border-white/10 lg:mx-10" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-3 p-6 text-center sm:flex-row sm:justify-between sm:text-left lg:px-10">
          <p className="text-sm text-slate-400">
            © {year} Nexora Techno. All rights reserved. Founded by{" "}
            <span className="font-medium text-white">Kapil Js</span>, Founder & CEO.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex h-2 w-2 rounded-full bg-accent-400" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
