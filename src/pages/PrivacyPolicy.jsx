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
            <h1 className="heading-display text-display-md text-ink mb-2">
              Privacy Policy — Varavu Selavu (வரவு செலவு)
            </h1>
            <p className="text-sm text-ink-muted">
              Version 2.0 · Effective 28 November 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-surface border-b border-rule">
          <div className="container-content py-10 sm:py-12">
            <div className="max-w-reading article-body">
              <h2>Summary</h2>
              <p>
                Varavu Selavu keeps your financial records private to your account. We do not sell your data. Payment
                notification text is read on your phone and never uploaded. Your transactions are never given to the ad
                service. This policy explains exactly what is collected and why.
              </p>

              <h2>1. Information we collect</h2>
              <p>Information you or your account provide:</p>
              <ul>
                <li>Your name and email address (for your account), and the sign-in methods linked to it.</li>
                <li>Your account's unique ID from Firebase Authentication.</li>
                <li>
                  Transactions you save: type (income or expense), amount, description, category, date and time, notes,
                  how it was entered (manual, voice, recurring or detected) and the bank account you chose.
                </li>
                <li>
                  Bank account labels you create: bank, nickname, account type and optionally the last four digits. Never
                  full account or card numbers.
                </li>
                <li>Transfers between your accounts, budgets, recurring rules, savings goal and opening balance.</li>
                <li>
                  Settings: your answer to automatic tracking, the category corrections you make (stored as a one-way
                  code, not the payee's name), and which versions of these documents you accepted, when and through which
                  sign-in method.
                </li>
                <li>
                  On your phone only: which versions of these documents were read to the end before accepting (not
                  uploaded).
                </li>
              </ul>
              <p>
                The app itself does not include analytics or crash-reporting tools. Information collected by the ad service
                is described in section 6.
              </p>

              <h2>2. Payment notification access</h2>
              <p>
                Payment notification detection is switched on in the app by default, but nothing is read until you allow
                Notification access in Android settings. You can switch it off in Profile → Automatic Transaction Tracking
                or remove the access in Android settings at any time. Once access is allowed:
              </p>
              <ul>
                <li>
                  The app looks only at notifications from supported payment apps (Google Pay, PhonePe, Paytm, BHIM).
                  Android shows the app all notifications once access is allowed; notifications from other apps are
                  ignored without being read further.
                </li>
                <li>
                  The text is checked on your phone. Messages that look like OTPs, PINs, passwords, requests, reminders or
                  offers are discarded. Notifications without enough payment information are ignored or sent to you for
                  review.
                </li>
                <li>
                  The raw notification text is never stored, logged or uploaded to Firebase, the ad service or anyone
                  else.
                </li>
                <li>
                  When a payment is recorded, only the transaction (amount, date, a short description such as &quot;Paid
                  to Swiggy&quot;, category and the app's name) is saved, like a manual entry.
                </li>
              </ul>

              <h2>3. Information we do not collect</h2>
              <p>The app never asks for, and you should never enter:</p>
              <ul>
                <li>UPI PIN or ATM/card PIN.</li>
                <li>Internet banking passwords or banking login details.</li>
                <li>OTPs. Messages that contain OTPs are discarded by automatic detection.</li>
                <li>Full bank account or card numbers.</li>
                <li>
                  Voice recordings. Voice entry uses your phone's speech recognition service, which may send audio to its
                  provider (for example Google) to convert it to text under that provider's terms. The app receives only
                  the text and never records or keeps audio.
                </li>
              </ul>

              <h2>4. Where your data is stored</h2>
              <ul>
                <li>
                  <strong>Cloud:</strong> your account's records (section 1) are stored in Google Cloud Firestore under your account, so
                  they sync between your devices and survive reinstalling.
                </li>
                <li>
                  <strong>On your phone:</strong> a copy of your records is cached by Firestore so the app works offline; settings are kept
                  in the app's private storage; and detected payments are kept in a local database for up to 90 days to
                  recognise duplicate notifications. In that database the payee name and account digits are encrypted with
                  a key held in the Android Keystore, and payment reference numbers are stored only as one-way codes. This
                  data is not uploaded.
                </li>
                <li>
                  Android's automatic cloud backup is turned off for the app, so app data is not copied into device
                  backups.
                </li>
                <li>Exported files are saved only where you choose; the app keeps no copy.</li>
                <li>Signing out removes the app's data from your phone (your cloud records stay in your account).</li>
              </ul>

              <h2>5. Sharing with service providers</h2>
              <p>We do not sell or rent your information. The app uses these Google services:</p>
              <ul>
                <li>Firebase Authentication: to sign you in (receives your email, name and sign-in details).</li>
                <li>Cloud Firestore: to store and sync your records (receives the information in section 1).</li>
                <li>Google Sign-In / Credential Manager: if you choose Google sign-in.</li>
                <li>Sign in with Apple (via Firebase): if offered and you choose it.</li>
                <li>
                  Google AdMob and the User Messaging Platform: to show ads and ask for ad consent where required (section 6).
                </li>
              </ul>
              <p>
                We may disclose information if required by law. These providers process data under their own privacy policies
                (see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com</a> and <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">apple.com/legal/privacy</a>).
              </p>

              <h2>6. Advertising</h2>
              <p>
                The free app shows banner ads from Google AdMob. Ad requests are made without any of your financial
                information: no amounts, descriptions, categories, account names or notification/SMS content are sent to
                AdMob. Ads are limited to a family-friendly (PG) rating and are not shown on the sign-in, lock or consent
                screens.
              </p>
              <p>
                Google AdMob itself may collect your device's advertising ID, IP address (for approximate location), ad
                interactions and diagnostic information to show and measure ads and prevent fraud, as described in Google's
                policies. Where the law requires it (for example in the EEA or UK), you are asked for consent first and can
                change your choice in Profile → Ad privacy choices. You can also reset or delete your advertising ID in
                Android settings.
              </p>

              <h2>7. Permissions</h2>
              <ul>
                <li><strong>Internet and network state:</strong> to sign in, sync your records and load ads.</li>
                <li><strong>Microphone (RECORD_AUDIO):</strong> only for voice entry, requested when you first tap the microphone.</li>
                <li><strong>Notifications (POST_NOTIFICATIONS):</strong> reminders, summaries and budget alerts. Optional.</li>
                <li><strong>Run at startup (RECEIVE_BOOT_COMPLETED):</strong> to keep reminders scheduled after the phone restarts.</li>
                <li><strong>Biometrics (USE_BIOMETRIC):</strong> only for the optional app lock.</li>
                <li><strong>Notification access:</strong> special access you grant in Android settings, only for payment notification detection. Optional.</li>
                <li><strong>Advertising ID and related ad permissions:</strong> added by Google AdMob for advertising.</li>
              </ul>

              <h2>8. Keeping and deleting data</h2>
              <ul>
                <li>Your records are kept in your account until you delete them or delete your account.</li>
                <li>You can edit or delete any record at any time.</li>
                <li>Local detection records are deleted after 90 days, when you sign out, and when you delete your account.</li>
                <li>
                  Profile → Delete account deletes your cloud records, then your login, then the app's data on your phone.
                  You can also email us to ask for deletion or refer to our{" "}
                  <a href="/delete-account.html">Account Deletion Instructions</a> page.
                </li>
                <li>
                  Google may keep data in its own routine backups for a limited time under its policies; we cannot remove
                  those copies ourselves. Information already collected by AdMob is handled under Google's policies.
                </li>
              </ul>

              <h2>9. Security</h2>
              <ul>
                <li>All connections use HTTPS; unencrypted connections are blocked by the app.</li>
                <li>Database security rules let only your signed-in account read or change your records, and check every saved record.</li>
                <li>Sensitive detection details on your phone are encrypted with a key in the Android Keystore (AES-256-GCM).</li>
                <li>
                  Optional app lock with your phone's fingerprint, face, screen lock or an app PIN, and an option to hide
                  the app's content from screenshots and the Recent apps screen.
                </li>
              </ul>
              <p>No method of storage or transmission is completely secure, so we cannot guarantee absolute security.</p>

              <h2>10. Children</h2>
              <p>
                The app is a personal finance tool intended for adults; its Google Play target audience is 18 and over. It is
                not directed at children and we do not knowingly collect children's information. If you believe a child has
                created an account, contact us and we will delete it.
              </p>

              <h2>11. Changes to this policy</h2>
              <p>
                This is version 2.0. When we change this policy materially, the app shows you the updated policy and asks you
                to acknowledge it before you continue. The version and date at the top always show the current policy.
              </p>

              <h2>12. Contact</h2>
              <p>
                Privacy questions or requests:{" "}
                <a href="mailto:nexoratechno2026@gmail.com">nexoratechno2026@gmail.com</a>
              </p>
              <p>
                Website: <a href="https://www.nexoratechno.in">https://www.nexoratechno.in</a>
              </p>

              <hr />
              <p className="text-xs text-ink-muted">
                This page shows the official Privacy Policy for Varavu Selavu (வரவு செலவு). Account deletion instructions are available at{" "}
                <a href="/delete-account.html">delete-account.html</a>.
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
