import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function TermsOfService() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-paper border-b border-rule">
          <div className="container-content py-10 sm:py-12">
            <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-ink transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink">Terms of Service</span>
            </nav>
            <p className="eyebrow mb-3">Legal</p>
            <h1 className="heading-display text-display-md text-ink mb-2">
              Terms of Service
            </h1>
            <p className="text-sm text-ink-muted">Effective date: 8 April 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-surface border-b border-rule">
          <div className="container-content py-10 sm:py-12">
            <div className="max-w-reading article-body">

              <p>
                Welcome to Nexora Techno. By using our website, you agree to the
                following terms.
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing our website, you agree to comply with these Terms of
                Service and all applicable laws.
              </p>

              <h2>2. Our Services</h2>
              <p>We provide:</p>
              <ul>
                <li>Software Development</li>
                <li>Internship &amp; Training Programs</li>
                <li>IT Solutions &amp; Consulting</li>
              </ul>
              <p>We may update or modify our services at any time.</p>

              <h2>3. User Responsibilities</h2>
              <p>You agree:</p>
              <ul>
                <li>To provide accurate information</li>
                <li>Not to misuse our website</li>
                <li>Not to engage in illegal activities</li>
              </ul>

              <h2>4. Payments</h2>
              <ul>
                <li>All payments for services or internships must be completed as specified</li>
                <li>Fees are generally <strong>non-refundable</strong>, unless clearly stated</li>
              </ul>

              <h2>5. Intellectual Property</h2>
              <p>
                All content (logo, text, design, software) belongs to Nexora Techno.
                You may not reuse it without permission.
              </p>

              <h2>6. Limitation of Liability</h2>
              <p>We are not responsible for:</p>
              <ul>
                <li>Service interruptions</li>
                <li>Data loss</li>
                <li>Third-party issues</li>
              </ul>

              <h2>7. Updates</h2>
              <p>
                We may update these Terms at any time. Continued use means acceptance.
              </p>

              <h2>8. Contact</h2>
              <p>
                Email:{" "}
                <a href="mailto:nexoratechno2026@gmail.com">
                  nexoratechno2026@gmail.com
                </a>
                <br />
                Nexora Techno, 241, East Permanur, Anna Park Backside,
                Salem — 636007, Tamil Nadu, India
              </p>

            </div>
          </div>
        </section>

        {/* Back link */}
        <section className="bg-paper border-t border-rule">
          <div className="container-content py-6">
            <Link to="/" className="btn-ghost text-sm">← Back to site</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default TermsOfService;
