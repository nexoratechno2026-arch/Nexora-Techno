import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-24 text-slate-700">
        <h1 className="mb-4 font-display text-4xl font-bold text-slate-900 tracking-tight">
          Privacy Policy — Varavu Selavu
        </h1>
        <p className="mb-12 text-sm text-slate-500 border-b border-slate-200 pb-6 uppercase tracking-widest">
          Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}
        </p>

        <section className="space-y-6 text-lg leading-relaxed">
          <p>
            Varavu Selavu ("the App") is developed and maintained by Nexora Techno, Salem, Tamil Nadu, India. Your privacy is important to us. This Privacy Policy explains how the App handles your information.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            1. Overview
          </h2>
          <p>
            Varavu Selavu is a personal finance app that helps users track daily income and expenses, manage monthly budgets, view spending reports, and improve savings. <strong className="text-slate-900">All data you enter into the App is stored locally on your device only.</strong> We do not operate a server, database, or cloud service that receives, stores, or processes your financial information.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            2. Information We Do Not Collect
          </h2>
          <p>We do <strong className="text-slate-900">not</strong> collect, transmit, or store any of the following:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2 text-slate-600">
            <li>Your name, email address, or phone number</li>
            <li>Your income, expense, or budget entries</li>
            <li>Bank account details, card numbers, or transaction history from third-party sources</li>
            <li>Your device location</li>
            <li>Any personally identifiable information</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            3. Guest Sign-In
          </h2>
          <p>
            The App allows you to use it via a <strong className="text-slate-900">Guest</strong> option. This does not create an online account, does not require personal information, and does not transmit any identifier to us or any third party. It exists solely to let you start using the App immediately without registration.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            4. Local Data Storage
          </h2>
          <p>All financial data you enter — income, expenses, budgets, and reports — is saved directly on your device using local storage. This data:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2 text-slate-600">
            <li>Is never uploaded to any server operated by us or any third party</li>
            <li>Is never shared, sold, or disclosed to anyone</li>
            <li>Remains fully under your control</li>
            <li>Will be permanently deleted if you uninstall the App or clear its app data, as it is not backed up by us</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            5. Third-Party Services
          </h2>
          <p>
            Varavu Selavu does not integrate any third-party analytics, advertising, or payment SDKs that collect user data. [If this changes in the future — e.g., you add crash reporting, analytics, or ads — this section must be updated to name the specific service and what data it collects.]
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            6. Children's Privacy
          </h2>
          <p>
            The App is not directed at children under 13, and we do not knowingly collect any information from children, in line with our overall practice of not collecting personal data at all.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            7. Security
          </h2>
          <p>
            Because your data never leaves your device, there is no transmission risk from our end. We recommend using your device's built-in security features (screen lock, encryption) to protect locally stored data.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            8. Your Rights and Control
          </h2>
          <p>Since all data resides on your device:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2 text-slate-600">
            <li>You can view, edit, or delete any entry directly within the App</li>
            <li>You can permanently erase all App data by clearing app storage or uninstalling the App</li>
            <li>We have no copy of your data to provide, correct, or delete on our end, as none is transmitted to us</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            9. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in the App's functionality (for example, if cloud sync or account features are introduced in the future). Any such changes will be posted on this page with a revised effective date.
          </p>

          <h2 className="mt-12 text-2xl font-semibold text-slate-900">
            10. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:<br />
            📧 Email:{" "}
            <a
              href="mailto:nexoratechno2026@gmail.com"
              className="font-medium text-blue-600 hover:text-blue-800 underline"
            >
              nexoratechno2026@gmail.com
            </a>
            <br />
            📍 Nexora Techno, Salem, Tamil Nadu, India
          </p>

          <hr className="my-12 border-slate-200" />
          <p className="text-sm italic text-slate-500">
            *This policy applies specifically to the Varavu Selavu application and supersedes any general company privacy policy for matters related to this App.*
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
