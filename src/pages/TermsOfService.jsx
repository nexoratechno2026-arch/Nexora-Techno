import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-24 text-slate-300">
        <h1 className="mb-4 font-display text-4xl font-bold text-white tracking-tight">Terms of Service</h1>
        <p className="mb-12 text-sm text-slate-400 border-b border-white/10 pb-6 uppercase tracking-widest">Last updated: {new Date().toLocaleDateString()}</p>
        <section className="space-y-6 text-lg leading-relaxed">
          <p>Welcome to Nexora Techno. By engaging our services or using our website, you agree strictly to the following terms and conditions.</p>
          <h2 className="mt-12 text-2xl font-semibold text-white">1. Services Provided</h2>
          <p>Nexora Techno offers web development, AI automation, UI/UX design, and SEO services. The exact scope of deliverables, timelines, and pricing will be outlined in a formal Statement of Work (SOW) or proposal provided to each client.</p>
          <h2 className="mt-12 text-2xl font-semibold text-white">2. Payments and Billing</h2>
          <p>Unless negotiated otherwise, projects require an upfront deposit (typically 50%) before work commences, with the remainder due upon project completion and before final handover. All invoices must be settled within 14 days of issue.</p>
          <h2 className="mt-12 text-2xl font-semibold text-white">3. Revisions and Modifications</h2>
          <p>Each contract outlines a set number of revision rounds. Any requests beyond the agreed scope will be billed at our standard hourly rate or as a separate change order.</p>
          <h2 className="mt-12 text-2xl font-semibold text-white">4. Intellectual Property</h2>
          <p>Upon full payment, the client retains the intellectual property rights to the final deliverables. Nexora Techno reserves the right to use the produced work in our portfolio, marketing materials, and case studies unless a Non-Disclosure Agreement (NDA) explicitly forbids it.</p>
          <h2 className="mt-12 text-2xl font-semibold text-white">5. Limitation of Liability</h2>
          <p>Nexora Techno aims to implement best practices for security and performance. However, we are not liable for any lost profits, lost savings, or other incidental, consequential, or special damages arising from the operation of or inability to operate the website/software, even if you have advised us of the possibilities of such damages.</p>
          <h2 className="mt-12 text-2xl font-semibold text-white">6. Contact Information</h2>
          <p>If you have any questions regarding these Terms, please contact us at <a href="mailto:legal@nexoratechno.com" className="font-medium text-brand-300 hover:text-brand-100">legal@nexoratechno.com</a>.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default TermsOfService;
