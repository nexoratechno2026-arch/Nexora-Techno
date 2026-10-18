import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
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
              <span className="text-ink">Privacy Policy</span>
            </nav>
            <p className="eyebrow mb-3">Legal</p>
            <h1 className="heading-display text-display-md text-ink mb-2">
              Privacy Policy — Varavu Selavu
            </h1>
            <p className="text-sm text-ink-muted">
              Effective date:{" "}
              {new Date().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-surface border-b border-rule">
          <div className="container-content py-10 sm:py-12">
            <div className="max-w-reading article-body">

              <p>
                Varavu Selavu ("the App") is developed and maintained by Nexora Techno,
                Salem, Tamil Nadu, India. Your privacy is important to us. This Privacy
                Policy explains how the App handles your information.
              </p>

              <h2>1. Overview</h2>
              <p>
                Varavu Selavu is a personal finance app that helps users track daily
                income and expenses, manage monthly budgets, view spending reports, and
                improve savings. <strong>All data you enter into the App is stored
                locally on your device only.</strong> We do not operate a server,
                database, or cloud service that receives, stores, or processes your
                financial information.
              </p>

              <h2>2. Information We Do Not Collect</h2>
              <p>We do <strong>not</strong> collect, transmit, or store any of the following:</p>
              <ul>
                <li>Your name, email address, or phone number</li>
                <li>Your income, expense, or budget entries</li>
                <li>Bank account details, card numbers, or transaction history from third-party sources</li>
                <li>Your device location</li>
                <li>Any personally identifiable information</li>
              </ul>

              <h2>3. Guest Sign-In</h2>
              <p>
                The App allows you to use it via a <strong>Guest</strong> option. This
                does not create an online account, does not require personal information,
                and does not transmit any identifier to us or any third party.
              </p>

              <h2>4. Local Data Storage</h2>
              <p>All financial data you enter — income, expenses, budgets, and reports — is saved directly on your device using local storage. This data:</p>
              <ul>
                <li>Is never uploaded to any server operated by us or any third party</li>
                <li>Is never shared, sold, or disclosed to anyone</li>
                <li>Remains fully under your control</li>
                <li>Will be permanently deleted if you uninstall the App or clear its app data</li>
              </ul>

              <h2>5. Third-Party Services</h2>
              <p>
                Varavu Selavu does not integrate any third-party analytics, advertising,
                or payment SDKs that collect user data. If this changes in the future,
                this policy will be updated to name the specific service and what data it
                collects.
              </p>

              <h2>6. Children's Privacy</h2>
              <p>
                The App is not directed at children under 13. We do not knowingly collect
                any information from children, in line with our overall practice of not
                collecting personal data.
              </p>

              <h2>7. Security</h2>
              <p>
                Because your data never leaves your device, there is no transmission risk
                from our end. We recommend using your device's built-in security features
                (screen lock, encryption) to protect locally stored data.
              </p>

              <h2>8. Your Rights and Control</h2>
              <p>Since all data resides on your device:</p>
              <ul>
                <li>You can view, edit, or delete any entry directly within the App</li>
                <li>You can permanently erase all App data by clearing app storage or uninstalling the App</li>
                <li>We have no copy of your data to provide, correct, or delete on our end</li>
              </ul>

              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy to reflect changes in the App's
                functionality. Any changes will be posted on this page with a revised
                effective date.
              </p>

              <h2>10. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:<br />
                Email:{" "}
                <a href="mailto:nexoratechno2026@gmail.com">
                  nexoratechno2026@gmail.com
                </a>
                <br />
                Nexora Techno, 241, East Permanur, Anna Park Backside, Salem — 636007,
                Tamil Nadu, India
              </p>

              <hr />
              <p>
                <em>
                  This policy applies specifically to the Varavu Selavu application
                  and supersedes any general company privacy policy for matters related
                  to this app.
                </em>
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

export default PrivacyPolicy;
