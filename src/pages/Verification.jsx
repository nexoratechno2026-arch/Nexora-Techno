import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { db } from "../firebase";
import { pdfForRecord, readRecord } from "../utils/certificate";

// Issued before the Firestore records were cleaned up; kept so the printed QR
// on this certificate still resolves if the lookup fails.
const KNOWN = {
  "NT-WEB-JDXU6": {
    cert_number: "NT-WEB-JDXU6",
    type: "Webinar",
    issued_at: "2026-09-05",
    profiles: {
      name: "Kavitha",
      regNo: "24MUCS1028",
      college: "MUTHAYAMMAL COLLEGE OF ARTS AND SCIENCE(AUTONOMOUS), RASIPURAM",
      role: "STUDENT",
      domain: "How to Use AI For Career Growth",
    },
    batches: { name: "Webinar", start_date: "2026-09-05", end_date: "2026-09-05" },
  },
};

const STAFF_ROLE = /(prof|faculty|staff|lecturer|teacher|hod)/i;

function longDate(d) {
  if (!d) return null;
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function period(c) {
  const from = longDate(c.startDate);
  const to = longDate(c.endDate);
  if (!from) return null;
  if (!to || from === to) return from;
  return `${from} – ${to}`;
}

async function lookup(id) {
  const res = await getDocs(query(collection(db, "certificates"), where("cert_number", "==", id)));
  if (res.empty) return null;
  const d = res.docs[0];
  const r = { id: d.id, ...d.data() };
  // Older records only point at the intern's profile and batch.
  if (!r.profiles && r.user_id) {
    const p = await getDoc(doc(db, "profiles", r.user_id)).catch(() => null);
    if (p?.exists()) r.profiles = p.data();
  }
  if (!r.batches && r.batch_id) {
    const b = await getDoc(doc(db, "batches", r.batch_id)).catch(() => null);
    if (b?.exists()) r.batches = b.data();
  }
  return r;
}

export default function Verification() {
  const [input, setInput] = useState("");
  const [state, setState] = useState({ status: "idle" }); // idle | loading | found | missing | offline
  const [downloading, setDownloading] = useState(false);

  async function verify(raw) {
    const id = raw.trim().toUpperCase();
    if (!id) return;
    setState({ status: "loading", id });
    const params = new URLSearchParams(window.location.search);
    if (params.get("certId") !== id) {
      window.history.replaceState(null, "", `/verify?certId=${encodeURIComponent(id)}`);
    }
    try {
      const record = (await lookup(id)) || KNOWN[id];
      setState(record ? { status: "found", id, record } : { status: "missing", id });
    } catch {
      setState(KNOWN[id] ? { status: "found", id, record: KNOWN[id] } : { status: "offline", id });
    }
  }

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const id = p.get("certId") || p.get("id") || p.get("cert");
    if (id) {
      setInput(id);
      verify(id);
    }
  }, []);

  async function download() {
    setDownloading(true);
    try {
      window.open(await pdfForRecord(state.record), "_blank");
    } finally {
      setDownloading(false);
    }
  }

  const c = state.status === "found" ? readRecord(state.record) : null;
  const isStaff = c && STAFF_ROLE.test(c.role);

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Navbar />
      <WhatsAppButton />

      <main className="flex-grow">
        <section className="container-content py-16 sm:py-20">
          <div className="max-w-xl">
            <h1 className="heading-display text-display-sm sm:text-display-md text-ink">
              Check a certificate
            </h1>
            <p className="text-body-md text-ink-muted mt-3 max-w-[52ch]">
              Every certificate we issue has an ID printed at the bottom left, next to the QR code.
              Enter it here to see the record we hold for it.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                verify(input);
              }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <label htmlFor="cert-id" className="sr-only">Certificate ID</label>
              <input
                id="cert-id"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="NT-WEB-JDXU6"
                autoComplete="off"
                spellCheck={false}
                className="form-input font-mono uppercase tracking-wide text-base flex-1"
              />
              <button type="submit" disabled={state.status === "loading"} className="btn-primary justify-center disabled:opacity-60">
                {state.status === "loading" ? "Checking…" : "Check"}
              </button>
            </form>

            <div className="mt-10" aria-live="polite">
              {state.status === "missing" && (
                <div className="border-l-2 border-red-700 pl-4">
                  <p className="font-medium">No certificate with the ID {state.id}</p>
                  <p className="text-sm text-ink-muted mt-1">
                    Check for mix-ups like 0 and O, or 1 and I. If it still doesn't show up,{" "}
                    <a href="/contact" className="underline underline-offset-2">get in touch</a> and we'll look into it.
                  </p>
                </div>
              )}

              {state.status === "offline" && (
                <div className="border-l-2 border-amber-600 pl-4">
                  <p className="font-medium">Couldn't reach our records</p>
                  <p className="text-sm text-ink-muted mt-1">Check your connection and try again.</p>
                </div>
              )}

              {c && (
                <article className="border border-rule rounded-md bg-white">
                  <div className="px-5 sm:px-6 py-4 border-b border-rule flex items-center gap-2.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-700 shrink-0" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <p className="text-sm">
                      <span className="font-semibold">Genuine.</span>{" "}
                      <span className="text-ink-muted">Issued by Nexora Techno.</span>
                    </p>
                  </div>

                  <div className="px-5 sm:px-6 py-6">
                    <p className="text-label-xs uppercase text-ink-muted">
                      Certificate of {c.type === "Internship" ? "Completion" : "Participation"}
                    </p>
                    <h2 className="font-serif text-2xl sm:text-[28px] font-semibold mt-1.5 leading-tight">
                      {c.name || "—"}
                    </h2>
                    {c.college && <p className="text-sm text-ink-muted mt-1">{c.college}</p>}

                    <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                      <Item label={c.type === "Internship" ? "Programme" : c.type}>{c.topic || "—"}</Item>
                      {period(c) && <Item label="Held on">{period(c)}</Item>}
                      {c.regNo && <Item label={isStaff ? "Staff ID" : "Register no."} mono>{c.regNo}</Item>}
                      {isStaff && <Item label="Role">{c.role}</Item>}
                      <Item label="Certificate ID" mono>{c.certNumber}</Item>
                      {longDate(c.issued) && <Item label="Issued">{longDate(c.issued)}</Item>}
                    </dl>
                  </div>

                  <div className="px-5 sm:px-6 py-4 border-t border-rule bg-surface/60 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-ink-muted">If the details don't match the paper copy, it isn't ours.</p>
                    <button onClick={download} disabled={downloading} className="btn-secondary text-sm disabled:opacity-60">
                      {downloading ? "Preparing…" : "Download PDF"}
                    </button>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Item({ label, children, mono }) {
  return (
    <div>
      <dt className="text-ink-muted text-xs">{label}</dt>
      <dd className={`mt-0.5 font-medium ${mono ? "font-mono text-[13px]" : ""}`}>{children}</dd>
    </div>
  );
}
