import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { projectsData } from "../data/projectsData";

export default function Projects() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-rule">
          <div className="container-content pt-14 pb-12 sm:pt-20 sm:pb-16">
            <h1 className="heading-display text-[2.5rem] sm:text-[3.25rem]">Work</h1>
            <p className="mt-5 max-w-[56ch] text-lg text-ink-muted leading-relaxed">
              Some of what we've built recently. Where there's a link, you can open it and try it.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {projectsData.map((p) => (
                <li key={p.id}><a href={`#${p.id}`} className="link">{p.name}</a></li>
              ))}
            </ul>
          </div>
        </section>

        {projectsData.map((p, i) => (
          <section key={p.id} id={p.id} className={`border-b border-rule scroll-mt-16 ${i % 2 ? "bg-surface" : ""}`}>
            <div className="container-content py-14 sm:py-20">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h2 className="heading-display text-3xl sm:text-4xl">{p.name}</h2>
                <p className="text-ink-muted">{p.kind}{p.year ? `, ${p.year}` : ""}</p>
              </div>

              <img
                src={p.image}
                alt={`${p.name} screenshot`}
                loading={i === 0 ? "eager" : "lazy"}
                className={`mt-8 w-full border border-rule ${p.logo ? "aspect-[16/7] object-contain bg-white p-12" : "aspect-[16/8] object-cover object-top"}`}
              />

              <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-16">
                <div className="max-w-[62ch]">
                  <p className="text-lg leading-relaxed">{p.summary}</p>
                  <h3 className="mt-8 font-semibold">Why it was built</h3>
                  <p className="mt-2 text-ink-muted leading-relaxed">{p.why}</p>
                  <h3 className="mt-8 font-semibold">What it does</h3>
                  <ul className="mt-2 list-disc pl-5 space-y-1.5 text-ink-muted marker:text-gold">
                    {p.details.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                </div>
                <dl className="space-y-5 text-[15px] lg:border-l lg:border-rule lg:pl-8">
                  <div>
                    <dt className="text-sm text-ink-muted">Built with</dt>
                    <dd className="mt-1">{p.stack}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-ink-muted">Where to see it</dt>
                    <dd className="mt-1">
                      {p.url
                        ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="link">{p.url.replace(/^https?:\/\/(www\.)?/, "")}</a>
                        : "Not public yet"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        ))}

        <section className="container-content py-14 sm:py-20">
          <h2 className="heading-display text-2xl sm:text-3xl">Have something in mind?</h2>
          <p className="mt-3 max-w-[52ch] text-ink-muted">Tell us about it. Even a rough idea is enough to start.</p>
          <Link to="/contact" className="btn-primary mt-6">Get in touch</Link>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
