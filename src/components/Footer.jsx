import { Link } from "react-router-dom";

const COLUMNS = [
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Work", "/projects"],
      ["Blog", "/blog"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Services",
    links: [
      ["Websites", "/services/website-development"],
      ["Custom software", "/services/software-development"],
      ["Online stores", "/services/ecommerce-development"],
      ["Automation and AI", "/services/ai-automation"],
      ["All services", "/services"],
    ],
  },
  {
    title: "Students",
    links: [
      ["Internships", "/internship"],
      ["Check a certificate", "/verify"],
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep text-deep-text">
      <div className="container-content pt-14 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="text-[15px] leading-relaxed text-deep-text/75">
            <p className="font-display text-xl font-semibold text-deep-text">Nexora Techno</p>
            <address className="not-italic mt-3">
              241, East Permanur, Anna Park Backside<br />
              Salem 636007, Tamil Nadu
            </address>
            <p className="mt-3">
              <a href="tel:+919345121988" className="hover:text-deep-text">+91 93451 21988</a><br />
              <a href="mailto:nexoratechno2026@gmail.com" className="hover:text-deep-text">nexoratechno2026@gmail.com</a>
            </p>
            <p className="mt-4 text-sm">
              <a href="https://wa.me/919345121988" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-white/30 hover:decoration-white">WhatsApp</a>
              <span className="mx-2 text-deep-text/30">·</span>
              <a href="https://www.instagram.com/nexora_techno" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-white/30 hover:decoration-white">Instagram</a>
              <span className="mx-2 text-deep-text/30">·</span>
              <a href="https://www.linkedin.com/company/nexoratechno" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-white/30 hover:decoration-white">LinkedIn</a>
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm text-deep-text/50">{col.title}</h2>
              <ul className="mt-3 space-y-2 text-[15px]">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link to={href} className="text-deep-text/85 hover:text-deep-text hover:underline underline-offset-4">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/15 flex flex-col gap-3 sm:flex-row sm:justify-between text-sm text-deep-text/50">
          <p>© {year} Nexora Techno · MSME registered</p>
          <p className="flex gap-5">
            <Link to="/privacy" className="hover:text-deep-text">Privacy</Link>
            <Link to="/terms" className="hover:text-deep-text">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
