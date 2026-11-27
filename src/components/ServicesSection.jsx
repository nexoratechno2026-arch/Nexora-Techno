import { Link } from "react-router-dom";

const SERVICES = [
  { id: "website-development", label: "Websites", note: "For shops, clinics, schools, colleges and small companies. Fast, works on phones, easy to update." },
  { id: "ecommerce-development", label: "Online stores", note: "Product catalogue, WhatsApp ordering and UPI payments. Built so you can manage it yourself." },
  { id: "software-development", label: "Custom software", note: "Billing, stock, bookings, client portals: the tools you would otherwise run on Excel and phone calls." },
  { id: "web-app-development", label: "Web and mobile apps", note: "Apps with logins, user roles and a proper backend. Android apps in Kotlin." },
  { id: "ai-automation", label: "Automation and AI", note: "Answering common enquiries, reading documents, sending reminders. Only where it saves real time." },
  { id: "business-automation", label: "Connecting your tools", note: "Forms, Google Sheets, WhatsApp and email talking to each other so nobody copies data by hand." },
  { id: "ui-ux-design", label: "Design", note: "Wireframes and Figma prototypes, before or instead of building." },
  { id: "seo", label: "Getting found on Google", note: "Page structure, Google Business Profile and local search setup." },
];

export default function ServicesSection() {
  return (
    <section id="services" className="border-b border-rule bg-surface">
      <div className="container-content py-16 sm:py-24 grid gap-10 lg:grid-cols-[18rem_1fr]">
        <div>
          <h2 className="heading-display text-3xl sm:text-4xl">What we do for businesses</h2>
          <p className="mt-4 text-ink-muted">
            Most jobs start with a phone call about a problem, not a list of features. We
            work out what the first useful version looks like and build that.
          </p>
          <Link to="/services" className="link mt-6 inline-block text-sm font-medium">All services and details</Link>
        </div>

        <ul className="border-t border-ink">
          {SERVICES.map((s) => (
            <li key={s.id} className="border-b border-rule">
              <Link
                to={`/services/${s.id}`}
                className="group grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6"
              >
                <span className="font-semibold text-[17px] group-hover:underline decoration-gold decoration-[1.5px] underline-offset-4">
                  {s.label}
                </span>
                <span className="text-ink-muted">{s.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
