import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-24 text-slate-700">
        <h1 className="mb-4 font-display text-4xl font-bold text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="mb-12 text-sm text-slate-500 border-b border-slate-200 pb-6 uppercase tracking-widest">
          Effective Date: 8/4/2026
        </p>

        <section className="space-y-6 text-lg leading-relaxed">
          <p>
            Welcome to Nexora Techno. By using our website, you agree to the
            following terms.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing our website, you agree to comply with these Terms of
            Service and all applicable laws.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            2. Our Services
          </h2>
          <p>We provide:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2 text-slate-600">
            <li>Software Development</li>
            <li>Internship &amp; Training Programs</li>
            <li>IT Solutions &amp; Consulting</li>
          </ul>
          <p>We may update or modify our services at any time.</p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            3. User Responsibilities
          </h2>
          <p>You agree:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2 text-slate-600">
            <li>To provide accurate information</li>
            <li>Not to misuse our website</li>
            <li>Not to engage in illegal activities</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            4. Payments
          </h2>
          <ul className="ml-6 mt-2 list-disc space-y-2 text-slate-600">
            <li>
              All payments for services or internships must be completed as
              specified
            </li>
            <li>
              Fees are generally{" "}
              <strong className="text-slate-900">non-refundable</strong>, unless
              clearly stated
            </li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            5. Intellectual Property
          </h2>
          <p>
            All content (logo, text, design, software) belongs to Nexora
            Techno. You may not reuse it without permission.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            6. Limitation of Liability
          </h2>
          <p>We are not responsible for:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2 text-slate-600">
            <li>Service interruptions</li>
            <li>Data loss</li>
            <li>Third-party issues</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            7. Updates
          </h2>
          <p>
            We may update these Terms at any time. Continued use means
            acceptance.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            8. Contact
          </h2>
          <p>
            📧 Email:{" "}
            <a
              href="mailto:nexoratechno2026@gmail.com"
              className="font-medium text-blue-600 hover:text-blue-800 underline"
            >
              nexoratechno2026@gmail.com
            </a>
            <br />
            📍 Salem, Tamil Nadu, India
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default TermsOfService;
