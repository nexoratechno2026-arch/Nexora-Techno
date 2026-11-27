import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="border-b border-rule">
      <div className="container-content pt-14 pb-16 sm:pt-20 sm:pb-24">
        <h1 className="heading-display text-ink text-[2.5rem] leading-[1.05] sm:text-[3.5rem] lg:text-[4.25rem] max-w-[16ch]">
          Websites and software, made in&nbsp;Salem.
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,34rem)_1fr] lg:items-end">
          <div>
            <p className="text-lg leading-relaxed text-ink-muted">
              Nexora Techno is a small team that builds websites, online stores and
              custom tools for businesses. We also run internships and college
              workshops for engineering students across Tamil Nadu.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link to="/contact" className="btn-primary">Tell us what you need</Link>
              <Link to="/projects" className="link font-medium">See what we've built</Link>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-5 text-sm lg:justify-self-end lg:max-w-sm">
            <div>
              <dt className="text-ink-muted">Based in</dt>
              <dd className="mt-1 font-medium">Salem, Tamil Nadu</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Registered</dt>
              <dd className="mt-1 font-medium">MSME, Govt. of India</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Call or WhatsApp</dt>
              <dd className="mt-1 font-medium">
                <a href="tel:+919345121988" className="hover:underline">+91 93451 21988</a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-muted">Hours</dt>
              <dd className="mt-1 font-medium">Mon–Sat, 9 to 7</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
