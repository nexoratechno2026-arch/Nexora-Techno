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
            <h1 className="heading-display text-display-md text-ink mb-2">
              Terms &amp; Conditions — Varavu Selavu (வரவு செலவு)
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
              <h2>1. Introduction</h2>
              <p>
                Varavu Selavu (&quot;the app&quot;, &quot;we&quot;) is a personal income and expense tracking app. It helps
                you record money you receive and spend, organise it into categories, and see budgets and reports, in English
                or Tamil.
              </p>
              <p>
                The app is a record-keeping tool. It does not move money, connect to your bank, make payments, or give
                financial, tax or investment advice.
              </p>
              <p>
                By creating an account or signing in, you agree to these Terms &amp; Conditions and acknowledge our{" "}
                <Link to="/privacy">Privacy Policy</Link>.
              </p>

              <h2>2. Account registration</h2>
              <p>You need an account to use the app. You can sign in with:</p>
              <ul>
                <li>Email and password (we send a verification email).</li>
                <li>Google Sign-In.</li>
                <li>Sign in with Apple, where it is offered in your version of the app.</li>
              </ul>
              <p>
                Sign-in is provided by Firebase Authentication (Google). Your password is sent only to Firebase; the app
                never stores it. One account can have more than one sign-in method linked to it; accounts are never merged
                automatically.
              </p>
              <p>
                You are responsible for keeping your sign-in details and your phone secure, for the accuracy of the
                information you enter, and for any activity in your account. The optional app lock (your phone's
                fingerprint, face, screen lock or an app PIN) adds protection on this phone.
              </p>

              <h2>3. App features</h2>
              <ul>
                <li>Manual entry of income and expenses, with categories, notes, dates and an optional bank account.</li>
                <li>
                  Voice entry: you speak a transaction, your phone's speech recognition turns it into text, and you check
                  it before anything is saved.
                </li>
                <li>
                  Payment notification detection: reads notifications from supported payment apps (Google Pay, PhonePe,
                  Paytm, BHIM) to record completed payments. It is switched on in the app by default but works only after
                  you grant Notification access in Android settings, and you can switch it off.
                </li>
                <li>
                  Expense and income categories, with suggestions based on the payee's name that you can change at any time.
                </li>
                <li>
                  Reports, charts, monthly budgets with alerts, recurring entries, reminders and export to PDF, Excel or CSV.
                </li>
                <li>
                  Tracking of more than one bank account (by bank, a nickname and the last four digits only) and transfers
                  between them.
                </li>
              </ul>

              <h2>4. Limitations of automatic detection</h2>
              <p>Automatic detection is a convenience and is not guaranteed to be complete or correct:</p>
              <ul>
                <li>
                  Notification detection works only when the payment app actually shows a notification, and only for
                  supported apps and wording. Hidden, silenced, truncated or changed notifications may be missed.
                </li>
                <li>Not every payment produces a readable notification or SMS.</li>
                <li>
                  Amounts, directions, payees and categories may be read or classified incorrectly. Unclear payments are
                  sent to you for review instead of being saved.
                </li>
                <li>
                  Android, the phone maker's battery settings or the payment app can stop detection without the app knowing.
                </li>
              </ul>

              <h2>5. Your responsibilities</h2>
              <p>
                Please review your transaction history regularly and correct or delete any wrong entries. Balances, budgets
                and reports are only as accurate as the records in the app. Do not rely on the app as your only record of
                your finances.
              </p>
              <p>
                Do not enter full account numbers, card numbers, PINs, UPI PINs, OTPs or banking passwords anywhere in the app.
              </p>

              <h2>6. Privacy and permissions</h2>
              <p>
                Payment notification detection is switched on in the app by default, but Android lets the app read
                notifications only after you grant Notification access yourself in Android settings; until then nothing is
                read. These permissions are used only for the detection described above and are requested according to
                Android and Google Play policies. Accepting these Terms does not grant any permission. You can switch
                detection off in Profile → Automatic Transaction Tracking, or revoke the permission in Android settings, at
                any time.
              </p>
              <p>
                How we handle your information is explained in the{" "}
                <Link to="/privacy">Privacy Policy</Link>, which forms part of these Terms.
              </p>

              <h2>7. Data storage and security</h2>
              <p>
                Your records are stored in your own area of Google Cloud Firestore and cached on your phone so the app works
                offline. Database security rules allow only your signed-in account to read or change your records. Data is
                sent over encrypted connections (HTTPS). Details are in the Privacy Policy.
              </p>
              <p>
                No system is completely secure. We take the reasonable measures described in the Privacy Policy but cannot
                guarantee that data can never be lost or accessed without permission.
              </p>

              <h2>8. Ads</h2>
              <p>
                The app is free and supported by banner ads from Google AdMob. Ads are not shown on the sign-in, lock or
                consent screens. Your transactions, amounts, descriptions, account names and message contents are never
                given to the ad service.
              </p>
              <p>
                We may offer a paid ad-free version in future. It is not available now; if it becomes available, these Terms
                will be updated to describe it.
              </p>

              <h2>9. Service limitations</h2>
              <p>
                The app depends on services we don't control, including Firebase (Google), Google Sign-In, Sign in with
                Apple, Google AdMob, your phone's speech recognition service, and the payment apps and banks whose messages
                it reads. Features may be interrupted, changed or unavailable because of these services, your network, your
                device or updates. The app is provided &quot;as is&quot;, and to the extent permitted by law we are not
                liable for losses arising from missed, incorrect or delayed records.
              </p>

              <h2>10. Account deletion</h2>
              <p>
                You can delete individual records at any time. To delete your account, open Profile → Delete account and
                confirm your identity. The app then deletes your records from the cloud (transactions, budgets, recurring
                entries, bank accounts, transfers, settings, savings goal, category corrections and your acceptance record),
                then deletes your login, then clears the app's data from your phone. If the records can't be deleted (for
                example, offline), your login is kept so you can try again. You can also email us to ask for deletion or
                refer to our <a href="/delete-account.html">Account Deletion page</a>.
              </p>

              <h2>11. Changes to these Terms</h2>
              <p>
                We may update these Terms. Each version has a number (this is version 2.0). When we make a material change,
                the app shows you the updated Terms and asks you to read and accept them before you continue. Your existing
                records are kept. If you don't accept, you can sign out or delete your account.
              </p>

              <h2>12. Contact</h2>
              <p>
                Questions about these Terms:{" "}
                <a href="mailto:nexoratechno2026@gmail.com">nexoratechno2026@gmail.com</a>
              </p>
              <p>
                Website: <a href="https://www.nexoratechno.in">https://www.nexoratechno.in</a>
              </p>

              <hr />
              <p className="text-xs text-ink-muted">
                This page shows the official Terms &amp; Conditions for Varavu Selavu (வரவு செலவு). Account deletion instructions:{" "}
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

export default TermsOfService;
