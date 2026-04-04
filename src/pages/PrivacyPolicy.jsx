import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-24 text-slate-300">
        <h1 className="mb-4 font-display text-4xl font-bold text-white tracking-tight">Privacy Policy</h1>
        <p className="mb-12 text-sm text-slate-400 border-b border-white/10 pb-6 uppercase tracking-widest">Last updated: {new Date().toLocaleDateString()}</p>
        <section className="space-y-6 text-lg leading-relaxed">
          <p>At Nexora Techno, we take your privacy seriously. This privacy policy describes what personal information we collect and how we use it.</p>
          <h2 className="mt-12 text-2xl font-semibold text-white">1. Information Collection</h2>
          <p>We collect information when you engage our business, fill out forms on our website, or subscribe to our communications. This may include your name, email address, phone number, and business details.</p>
          <h2 className="mt-12 text-2xl font-semibold text-white">2. Use of Information</h2>
          <p>The information we collect from you may be used in one of the following ways:</p>
          <ul className="ml-6 mt-4 list-disc space-y-3 text-slate-400">
            <li><strong className="text-white">To personalize your experience:</strong> your information helps us to better respond to your individual needs.</li>
            <li><strong className="text-white">To improve our website:</strong> we continually strive to improve our website offerings based on the information and feedback we receive from you.</li>
            <li><strong className="text-white">To improve customer service:</strong> your information helps us to more effectively respond to your customer service requests and support needs.</li>
            <li><strong className="text-white">To send periodic emails:</strong> the email address you provide may be used to send you information, respond to inquiries, and/or other requests or questions.</li>
          </ul>
          
          <h2 className="mt-12 text-2xl font-semibold text-white">3. Data Protection</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>
          
          <h2 className="mt-12 text-2xl font-semibold text-white">4. Information Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
          
          <h2 className="mt-12 text-2xl font-semibold text-white">5. Cookies</h2>
          <p>We may use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

          <h2 className="mt-12 text-2xl font-semibold text-white">6. Contact Us</h2>
          <p>If there are any questions regarding this privacy policy, you may contact us via our form or email us directly.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
