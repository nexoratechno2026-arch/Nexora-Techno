import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { servicesData } from "../data/servicesData";

const GROUPS = [
  { title: "Websites and stores", ids: ["website-development", "ecommerce-development", "seo", "digital-marketing"] },
  { title: "Software", ids: ["software-development", "web-app-development", "full-stack-development"] },
  { title: "Automation", ids: ["ai-automation", "business-automation"] },
  { title: "Design", ids: ["ui-ux-design"] },
];

const byId = Object.fromEntries(servicesData.map((s) => [s.id, s]));

export default function Services() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-rule">
          <div className="container-content pt-14 pb-12 sm:pt-20 sm:pb-16">
            <h1 className="heading-display text-[2.5rem] sm:text-[3.25rem] max-w-[18ch]">What we can build for you</h1>
            <p className="mt-5 max-w-[56ch] text-lg text-ink-muted leading-relaxed">
              We're a small team, so we take on a handful of projects at a time and do
              them properly. If what you need isn't listed here, ask anyway.
            </p>
          </div>
        </section>

        <section className="container-content py-12 sm:py-16 space-y-14">
          {GROUPS.map((g) => (
            <div key={g.title} className="grid gap-6 lg:grid-cols-[16rem_1fr]">
              <h2 className="text-xl font-semibold">{g.title}</h2>
              <ul className="border-t border-ink">
                {g.ids.map((id) => byId[id]).filter(Boolean).map((s) => (
                  <li key={s.id} className="border-b border-rule">
                    <Link to={`/services/${s.id}`} className="group grid gap-1 py-5 sm:grid-cols-[14rem_1fr_auto] sm:gap-6 sm:items-baseline">
                      <span className="font-semibold text-[17px] group-hover:underline decoration-gold decoration-[1.5px] underline-offset-4">{s.title}</span>
                      <span className="text-ink-muted">{s.shortDescription}</span>
                      <span className="hidden sm:inline text-sm text-ink-muted group-hover:text-ink">Details</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="bg-surface border-t border-rule">
          <div className="container-content py-14 sm:py-16 max-w-3xl">
            <h2 className="heading-display text-2xl sm:text-3xl">Not sure which of these you need?</h2>
            <p className="mt-3 text-ink-muted">
              That's normal. Tell us what's going wrong or what you want to do, and we'll
              suggest something. There's no charge for the first conversation.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link to="/contact" className="btn-primary">Send us a message</Link>
              <a href="tel:+919345121988" className="link font-medium">Or call +91 93451 21988</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
