import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-24 text-slate-700">
        <h1 className="mb-4 font-display text-4xl font-bold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="mb-12 text-sm text-slate-500 border-b border-slate-200 pb-6 uppercase tracking-widest">
          Effective Date: 8/4/2026
        </p>

        <section className="space-y-6 text-lg leading-relaxed">
          <p>Your privacy matters to us at Nexora Techno.</p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            1. Information We Collect
          </h2>
          <p>We may collect:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2 text-slate-600">
            <li>Name</li>
            <li>Email</li>
            <li>Phone / WhatsApp Number</li>
            <li>Educational Details</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            2. How We Use It
          </h2>
          <p>We use your information to:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2 text-slate-600">
            <li>Provide our services</li>
            <li>Contact you regarding internships/services</li>
            <li>Improve user experience</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            3. Data Protection
          </h2>
          <p>
            We take reasonable steps to protect your data but cannot guarantee
            100% security.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            4. Sharing Information
          </h2>
          <p>
            We do <strong className="text-slate-900">not sell your data</strong>
            . We only share with:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-2 text-slate-600">
            <li>Payment providers</li>
            <li>Legal authorities (if required)</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            5. Cookies
          </h2>
          <p>We may use cookies to improve website performance.</p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            6. Your Rights
          </h2>
          <p>You can:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2 text-slate-600">
            <li>Request your data</li>
            <li>Ask for corrections or deletion</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            7. Updates
          </h2>
          <p>We may update this policy anytime.</p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            8. Contact Us
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

export default PrivacyPolicy;
