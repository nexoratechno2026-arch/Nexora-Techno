import { useParams, Link } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

const PROJECTS = {
  codexpertai: { name: "CodeXpertAI", note: "Coding practice and mock interviews", image: "/projects/codexpertai.png", url: "https://nexoratechno-code.web.app" },
  "home-nest": { name: "Home Nest", note: "Online store for homemade products", image: "/projects/home-nest.png", url: "https://www.home-nest.co.in", logo: true },
  "buddies-unleashed": { name: "Buddies Unleashed", note: "Website for a riding community", image: "/projects/buddies-unleashed.png", url: "https://www.buddiesunleashed.com" },
  "varavu-selavu": { name: "Varavu Selavu", note: "Android expense tracker", image: "/projects/varavu-selavu.png", url: null, logo: true },
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = servicesData.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="container-content py-24">
          <h1 className="heading-display text-3xl">We couldn't find that page</h1>
          <p className="mt-3 text-ink-muted">It may have moved. <Link to="/services" className="link">See all services</Link>.</p>
        </main>
        <Footer />
      </>
    );
  }

  const related = service.relevantProjects.map((id) => PROJECTS[id]).filter(Boolean);
  const whatsappMsg = encodeURIComponent(`Hi Nexora Techno, I'd like to talk about ${service.title.toLowerCase()}.`);

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-rule">
          <div className="container-content pt-10 pb-12 sm:pt-14 sm:pb-16">
            <p className="text-sm text-ink-muted">
              <Link to="/services" className="hover:text-ink">Services</Link>
              <span className="mx-2">/</span>
              {service.category}
            </p>
            <h1 className="mt-6 heading-display text-[2.5rem] sm:text-[3.25rem]">{service.title}</h1>
            <p className="mt-4 max-w-[52ch] text-lg text-ink-muted leading-relaxed">{service.shortDescription}</p>
          </div>
        </section>

        <section className="container-content py-12 sm:py-16 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
          <div className="max-w-[64ch] space-y-10">
            <div>
              <h2 className="text-xl font-semibold">The usual problem</h2>
              <p className="mt-3 text-ink-muted leading-relaxed">{service.problem}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">What we do about it</h2>
              <p className="mt-3 text-ink-muted leading-relaxed">{service.solution}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">What you get</h2>
              <dl className="mt-4 border-t border-ink">
                {service.features.map((f) => (
                  <div key={f.title} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                    <dt className="font-semibold">{f.title}</dt>
                    <dd className="text-ink-muted">{f.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {service.faq?.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold">Questions</h2>
                <div className="mt-4 border-t border-ink">
                  {service.faq.map((q) => (
                    <details key={q.question} className="group border-b border-rule">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                        {q.question}
                        <span className="font-mono text-ink-muted group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                      </summary>
                      <p className="pb-5 -mt-1 text-ink-muted leading-relaxed">{q.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-10 lg:pt-1">
            <div>
              <h2 className="text-sm text-ink-muted">How it usually goes</h2>
              <ol className="mt-3 space-y-2 list-decimal list-inside marker:text-ink-muted">
                {service.process.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
            <div>
              <h2 className="text-sm text-ink-muted">Tools we tend to use</h2>
              <p className="mt-3 leading-relaxed">{service.technologies.join(", ")}</p>
            </div>
            <div className="border-t border-ink pt-5">
              <p className="font-semibold">Want to talk it through?</p>
              <div className="mt-4 flex flex-col items-start gap-3">
                <a href={`https://wa.me/919345121988?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="btn-primary">Message us on WhatsApp</a>
                <a href="tel:+919345121988" className="link text-sm">or call +91 93451 21988</a>
              </div>
            </div>
          </aside>
        </section>

        {related.length > 0 && (
          <section className="border-t border-rule bg-surface">
            <div className="container-content py-12 sm:py-16">
              <h2 className="heading-display text-2xl">Things we've built like this</h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <div key={p.name}>
                    <img
                      src={p.image}
                      alt={`${p.name} screenshot`}
                      loading="lazy"
                      className={`w-full aspect-[4/3] border border-rule ${p.logo ? "object-contain p-8 bg-white" : "object-cover object-top"}`}
                    />
                    <p className="mt-3 font-semibold">{p.name}</p>
                    <p className="text-sm text-ink-muted">{p.note}</p>
                    {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="link text-sm">Visit site</a>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
