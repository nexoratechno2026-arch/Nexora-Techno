import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import { projectsData } from "../data/projectsData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = servicesData.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="container-content py-20 text-center">
          <p className="eyebrow mb-3">404</p>
          <h1 className="heading-display text-display-md text-ink mb-4">Service not found</h1>
          <Link to="/services" className="btn-primary">View all services</Link>
        </main>
        <Footer />
      </>
    );
  }

  const relevantProjects = projectsData.filter((p) =>
    service.relevantProjects.includes(p.id)
  );

  const whatsappMsg = encodeURIComponent(
    `Hi Nexora Techno, I'd like to discuss a ${service.title} project.`
  );

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="bg-paper border-b border-rule">
          <div className="container-content py-12 sm:py-16">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-ink transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/services" className="hover:text-ink transition-colors">Services</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink">{service.title}</span>
            </nav>

            <div className="max-w-[55ch]">
              <span className="eyebrow-muted mb-2 block">{service.category}</span>
              <h1 className="heading-display text-display-md text-ink mb-4">
                {service.title}
              </h1>
              <p className="text-body-lg text-ink-muted leading-relaxed mb-8">
                {service.shortDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/919345121988?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  aria-label={`Discuss a ${service.title} project via WhatsApp`}
                >
                  Discuss this service
                </a>
                <Link to="/contact" className="btn-secondary">
                  Send an enquiry
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem & Solution ─────────────────────────────────────────── */}
        <section className="bg-surface border-b border-rule">
          <div className="container-content py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded border border-rule bg-paper">
                <h2 className="font-serif font-semibold text-lg text-ink mb-3">
                  The common challenge
                </h2>
                <p className="text-sm text-ink-muted leading-relaxed">{service.problem}</p>
              </div>
              <div className="p-6 rounded border border-accent-200 bg-accent-50">
                <h2 className="font-serif font-semibold text-lg text-ink mb-3">
                  How Nexora approaches it
                </h2>
                <p className="text-sm text-ink-muted leading-relaxed">{service.solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── What's included ────────────────────────────────────────────── */}
        <section className="bg-paper border-b border-rule">
          <div className="container-content py-12">
            <h2 className="heading-display text-display-sm text-ink mb-8">
              What this service includes
            </h2>
            <div className="space-y-0 border border-rule rounded-lg overflow-hidden">
              {service.features.map((ft, idx) => (
                <div key={idx}>
                  {idx > 0 && <div className="h-px bg-rule" />}
                  <div className="flex items-start gap-5 px-5 sm:px-6 py-5 bg-paper hover:bg-surface transition-colors">
                    <span className="font-mono text-xs text-ink-muted flex-shrink-0 mt-1 w-6">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-sans font-semibold text-[14px] text-ink mb-1">
                        {ft.title}
                      </h3>
                      <p className="text-[13px] text-ink-muted leading-relaxed">
                        {ft.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ───────────────────────────────────────────────────── */}
        <section className="bg-surface border-b border-rule">
          <div className="container-content py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
              <div>
                <p className="eyebrow mb-3">How it works</p>
                <h2 className="heading-display text-display-sm text-ink">
                  Our process
                </h2>
              </div>
              <div className="space-y-0 border border-rule rounded-lg overflow-hidden">
                {service.process.map((step, idx) => (
                  <div key={idx}>
                    {idx > 0 && <div className="h-px bg-rule" />}
                    <div className="flex items-center gap-4 px-5 py-4 bg-paper">
                      <span className="font-mono text-xs text-ink-muted w-6 flex-shrink-0">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className="font-sans text-sm text-ink">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Technologies ──────────────────────────────────────────────── */}
        <section className="bg-paper border-b border-rule">
          <div className="container-content py-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <h2 className="font-sans font-semibold text-[14px] text-ink uppercase tracking-wide mb-2">
                  Technologies used
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Relevant projects ─────────────────────────────────────────── */}
        {relevantProjects.length > 0 && (
          <section className="bg-surface border-b border-rule">
            <div className="container-content py-12">
              <h2 className="heading-display text-display-sm text-ink mb-8">
                Relevant work
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relevantProjects.map((p) => (
                  <div key={p.id} className="rounded border border-rule bg-paper overflow-hidden">
                    {p.image && (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={p.image}
                          alt={`${p.name} screenshot`}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <span className="eyebrow-muted mb-1 block">{p.category}</span>
                      <h3 className="font-sans font-semibold text-[14px] text-ink mb-1">{p.name}</h3>
                      <p className="text-[12px] text-ink-muted leading-relaxed line-clamp-2">
                        {p.shortDescription}
                      </p>
                      {p.liveUrl && p.liveUrl !== "#" && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-xs text-accent-600 hover:text-accent-700 font-medium transition-colors inline-flex items-center gap-1"
                        >
                          Visit site ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        {service.faq && service.faq.length > 0 && (
          <section className="bg-paper border-b border-rule">
            <div className="container-content py-12">
              <div className="max-w-3xl">
                <h2 className="heading-display text-display-sm text-ink mb-8">
                  Common questions
                </h2>
                <div className="space-y-4">
                  {service.faq.map((item, idx) => (
                    <div key={idx} className="p-5 rounded border border-rule bg-surface">
                      <h3 className="font-sans font-semibold text-[14px] text-ink mb-2">
                        {item.question}
                      </h3>
                      <p className="text-[13px] text-ink-muted leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="bg-deep text-deep-text">
          <div className="container-content py-14 sm:py-16">
            <div className="max-w-[42ch]">
              <p className="eyebrow mb-3" style={{ color: "#818CF8" }}>Start a project</p>
              <h2 className="font-serif font-semibold text-[1.75rem] text-deep-text mb-4 leading-snug">
                Need {service.title.toLowerCase()}?
              </h2>
              <p className="text-deep-text/60 text-sm leading-relaxed mb-7">
                Tell us what you need and we will discuss whether and how we can help.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/919345121988?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Discuss on WhatsApp
                </a>
                <Link to="/contact" className="btn-secondary" style={{ color: "#F5F5F0", borderColor: "rgba(255,255,255,0.2)" }}>
                  Send an enquiry
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
