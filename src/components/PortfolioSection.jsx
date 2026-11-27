import { Link } from "react-router-dom";

// Written for people skimming the homepage. The Projects page has the long version.
const WORK = [
  {
    id: "codexpertai",
    name: "CodeXpertAI",
    what: "Our own product",
    note: "Coding practice and mock technical interviews, with an AI interviewer that asks follow-up questions.",
    image: "/projects/codexpertai.png",
    url: "https://nexoratechno-code.web.app",
    stack: ["React", "TypeScript", "Firebase", "Gemini"],
  },
  {
    id: "home-nest",
    name: "Home Nest",
    what: "Online store",
    note: "A shop for homemade and artisan products. Orders come in on WhatsApp and are paid by UPI.",
    image: "/projects/home-nest.png",
    logo: true,
    url: "https://www.home-nest.co.in",
    stack: ["React", "Tailwind", "UPI"],
  },
  {
    id: "buddies-unleashed",
    name: "Buddies Unleashed",
    what: "Community website",
    note: "The site for a motorcycle riding group in Tamil Nadu: rides, safety rules, photos and how to join.",
    image: "/projects/buddies-unleashed.png",
    url: "https://www.buddiesunleashed.com",
    stack: ["React", "Tailwind"],
  },
  {
    id: "varavu-selavu",
    name: "Varavu Selavu",
    what: "Android app",
    note: "Income and expense tracker you can talk to in Tamil. It sorts each entry into a category for you.",
    image: "/projects/varavu-selavu.png",
    logo: true,
    url: null,
    stack: ["Kotlin", "Jetpack Compose", "Room"],
  },
];

export default function PortfolioSection() {
  return (
    <section id="projects" className="border-b border-rule">
      <div className="container-content py-16 sm:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
          <h2 className="heading-display text-3xl sm:text-4xl">Recent work</h2>
          <Link to="/projects" className="link text-sm font-medium">More about each project</Link>
        </div>

        <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
          {WORK.map((p, i) => (
            <article key={p.id} className={i === 0 ? "md:col-span-3" : ""}>
              <a
                href={p.url || undefined}
                target={p.url ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`block overflow-hidden border border-rule bg-surface ${p.url ? "" : "pointer-events-none"}`}
              >
                <img
                  src={p.image}
                  alt={`${p.name} screenshot`}
                  loading={i === 0 ? "eager" : "lazy"}
                  className={`w-full ${i === 0 ? "aspect-[16/8] object-cover object-top" : `aspect-[16/9] md:aspect-[4/3] ${p.logo ? "object-contain p-6 md:p-10 bg-white" : "object-cover"}`}`}
                />
              </a>
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className={i === 0 ? "text-2xl font-semibold" : "text-lg font-semibold"}>
                  {p.name} <span className="block font-sans text-sm font-normal text-ink-muted">{p.what}</span>
                </h3>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="link text-sm">
                    {p.url.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                ) : (
                  <span className="text-sm text-ink-muted">Not public yet</span>
                )}
              </div>
              <p className="mt-2 text-ink-muted max-w-[60ch]">{p.note}</p>
              <p className="mt-2">
                {p.stack.map((t) => <span key={t} className="tech-tag">{t}</span>)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
