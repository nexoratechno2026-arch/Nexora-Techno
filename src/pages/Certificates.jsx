import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { auth, db } from "../firebase";
import {
  CERT_TYPES,
  newCertNumber,
  pdfForRecord,
  readRecord,
  verifyLink,
} from "../utils/certificate";

// Internal page for issuing and handing out certificates.
// Only accounts whose profile has role "admin" can use it.

const STAFF_ROLE = /(prof|faculty|staff|lecturer|teacher|hod)/i;
const ROLE_WORD = /^(faculty|staff|professor|prof|assistant professor|associate professor|student|intern|faculty \/ staff)$/i;
const INSTITUTION_WORD = /(college|university|institute|school|academy)/i;

// "Name, RegNo, College, Role" — only the name is required. With two or three
// columns we guess which is which, since people paste from all sorts of sheets.
function parseLine(line, defaults) {
  const parts = line.split(/\t|,|\|/).map((s) => s.trim()).filter(Boolean);
  if (!parts.length) return null;
  const [name, ...rest] = parts;
  const row = { name, regNo: "", college: defaults.college, role: defaults.role };

  if (rest.length >= 3) {
    [row.regNo, row.college, row.role] = rest;
  } else {
    for (const part of rest) {
      if (ROLE_WORD.test(part)) row.role = part;
      else if (INSTITUTION_WORD.test(part)) row.college = part;
      else if (!row.regNo) row.regNo = part;
      else row.college = part;
    }
  }
  if (row.role === "Student" && /^(dr\.?|prof\.?|professor)\s/i.test(name)) row.role = "Professor";
  return row;
}

function fmt(d) {
  if (!d) return "—";
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function saveBlob(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// <input type="date"> wants YYYY-MM-DD; older records hold ISO strings or timestamps.
function toInputDate(v) {
  if (!v) return "";
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);
  const d = typeof v.toDate === "function" ? v.toDate() : new Date(v);
  if (isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const fileName = (name) => `${(name || "certificate").trim().replace(/\s+/g, "_")}_Certificate.pdf`;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ─────────────────────────────────────────────────────────────────────────── */

export default function Certificates() {
  const [user, setUser] = useState(undefined); // undefined = still checking
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setIsAdmin(false);
        return;
      }
      let admin = false;
      try {
        const snap = await getDoc(doc(db, "profiles", u.uid));
        admin = snap.exists() && snap.data().role === "admin";
      } catch {
        admin = false;
      }
      setIsAdmin(admin);
      setUser(u);
    });
  }, []);

  if (user === undefined) {
    return <div className="min-h-screen bg-paper" />;
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-rule">
        <div className="container-content h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/Logo.jpeg" alt="" className="h-7 w-7 rounded-sm object-cover" />
            <span className="font-serif font-semibold text-[15px]">Nexora Techno</span>
            <span className="text-rule">/</span>
            <span className="text-sm text-ink-muted">Certificates</span>
          </Link>
          {user && (
            <div className="flex items-center gap-4 text-sm">
              <span className="hidden sm:inline text-ink-muted">{user.email}</span>
              <button onClick={() => signOut(auth)} className="btn-ghost text-sm">
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      {!user ? (
        <SignIn />
      ) : !isAdmin ? (
        <div className="container-content py-20 max-w-md">
          <h1 className="font-serif text-2xl font-semibold mb-2">No access</h1>
          <p className="text-ink-muted text-body-md">
            {user.email} isn't set up to issue certificates. Sign in with the admin account instead.
          </p>
          <button onClick={() => signOut(auth)} className="btn-secondary mt-6">
            Use another account
          </button>
        </div>
      ) : (
        <Desk />
      )}
    </div>
  );
}

/* ── Sign in ─────────────────────────────────────────────────────────────── */

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  async function forgot() {
    setError("");
    setNote("");
    if (!email.trim()) {
      setError("Type your email above first, then click “Forgot password?” again.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setNote(`If ${email.trim()} has an account, a reset link is on its way. Check spam too.`);
    } catch (err) {
      setError(err.code === "auth/invalid-email" ? "That email doesn't look right." : "Couldn't send the reset email. Try again in a minute.");
    }
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setError("That email and password didn't match.");
      setBusy(false);
    }
  }

  return (
    <div className="container-content py-20">
      <form onSubmit={submit} className="max-w-sm">
        <h1 className="font-serif text-2xl font-semibold mb-1">Sign in</h1>
        <p className="text-sm text-ink-muted mb-8">Staff only. Students can check a certificate on the <Link to="/verify" className="underline underline-offset-2">verify page</Link>.</p>

        <label className="form-label" htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="username" className="form-input mb-4" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <div className="flex items-baseline justify-between">
          <label className="form-label" htmlFor="password">Password</label>
          <button type="button" onClick={forgot} className="text-xs text-ink-muted hover:text-ink underline underline-offset-2">
            Forgot password?
          </button>
        </div>
        <input id="password" type="password" autoComplete="current-password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {error && <p className="text-sm text-red-700 mt-3">{error}</p>}
        {note && <p className="text-sm text-emerald-800 mt-3">{note}</p>}

        <button type="submit" disabled={busy} className="btn-primary mt-6 w-full justify-center disabled:opacity-60">
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

/* ── Main desk ───────────────────────────────────────────────────────────── */

const EMPTY_EVENT = {
  type: "Workshop",
  topic: "",
  startDate: "",
  endDate: "",
  college: "",
  role: "Student",
  recipients: "",
};

function Desk() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [justIssued, setJustIssued] = useState(new Set());
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadRegister().then((list) => {
      setRecords(list);
      setLoading(false);
    });
  }, []);

  function onIssued(newRecords) {
    setRecords((prev) => [...newRecords, ...prev]);
    setJustIssued(new Set(newRecords.map((r) => r.id)));
  }

  function onSaved(updated) {
    setRecords((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  }

  async function revoke(r) {
    const c = readRecord(r);
    if (!window.confirm(`Revoke ${c.certNumber} (${c.name})? It will stop verifying straight away.`)) return;
    try {
      await deleteDoc(doc(db, "certificates", r.id));
      setRecords((prev) => prev.filter((x) => x.id !== r.id));
      toast.success("Revoked");
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <main className="container-content py-10 lg:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-14 items-start">
        <IssueForm onIssued={onIssued} />
        <Register
          records={records}
          loading={loading}
          justIssued={justIssued}
          onEdit={setEditing}
          onRevoke={revoke}
        />
      </div>
      {editing && <EditDialog record={editing} onClose={() => setEditing(null)} onSaved={onSaved} />}
    </main>
  );
}

// Pull every certificate, filling in names for old LMS records that only
// stored a user_id / batch_id.
async function loadRegister() {
  const snap = await getDocs(collection(db, "certificates"));
  const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

  const cache = {};
  const fetchOnce = async (col, id) => {
    const key = `${col}/${id}`;
    if (!(key in cache)) {
      cache[key] = getDoc(doc(db, col, id))
        .then((s) => (s.exists() ? s.data() : null))
        .catch(() => null);
    }
    return cache[key];
  };

  await Promise.all(
    list.map(async (r) => {
      if (!r.profiles && r.user_id && !String(r.user_id).startsWith("external")) {
        r.profiles = (await fetchOnce("profiles", r.user_id)) || undefined;
      }
      if (!r.batches && r.batch_id && !String(r.batch_id).startsWith("bulk")) {
        r.batches = (await fetchOnce("batches", r.batch_id)) || undefined;
      }
    })
  );

  return list.sort((a, b) => (readRecord(b).issued?.getTime() || 0) - (readRecord(a).issued?.getTime() || 0));
}

/* ── Issue form ──────────────────────────────────────────────────────────── */

function IssueForm({ onIssued }) {
  const [form, setForm] = useState(EMPTY_EVENT);
  const [autoDownload, setAutoDownload] = useState(true);
  const [progress, setProgress] = useState(null); // { done, total }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const oneDay = form.type === "Webinar";

  const people = useMemo(
    () =>
      form.recipients
        .split("\n")
        .map((l) => parseLine(l, { college: form.college.trim(), role: form.role }))
        .filter(Boolean),
    [form.recipients, form.college, form.role]
  );

  function buildRecord(person, certNumber) {
    const endDate = form.endDate || form.startDate;
    const profile = {
      name: person.name,
      domain: form.topic.trim(),
      college: person.college || null,
      regNo: person.regNo || null,
      role: person.role || null,
    };
    return {
      user_id: `external-${certNumber}`,
      batch_id: `bulk-${form.type.toLowerCase()}`,
      cert_number: certNumber,
      type: form.type,
      project_name: null,
      regNo: profile.regNo,
      college: profile.college,
      role: profile.role,
      issued_at: Date.now(),
      profiles: profile,
      batches: { name: form.type, start_date: form.startDate, end_date: endDate },
    };
  }

  function check() {
    if (!form.topic.trim()) return "Add the workshop / webinar / internship title.";
    if (!form.startDate) return "Add the date.";
    if (!oneDay && !form.endDate) return "Add the end date.";
    if (form.endDate && form.endDate < form.startDate) return "End date is before the start date.";
    if (!people.length) return "Add at least one name.";
    return null;
  }

  async function preview() {
    const problem = check();
    if (problem) return toast.error(problem);
    const r = buildRecord(people[0], newCertNumber(form.type).replace(/-\w+$/, "-PREVIEW"));
    const url = await pdfForRecord(r);
    window.open(url, "_blank");
  }

  async function issue(e) {
    e.preventDefault();
    const problem = check();
    if (problem) return toast.error(problem);
    if (people.length > 1 && !window.confirm(`Issue ${people.length} certificates for “${form.topic.trim()}”?`)) return;

    setProgress({ done: 0, total: people.length });
    const issued = [];
    try {
      for (const person of people) {
        const record = buildRecord(person, newCertNumber(form.type));
        const ref = await addDoc(collection(db, "certificates"), record);
        const saved = { id: ref.id, ...record };
        issued.push(saved);
        if (autoDownload) {
          saveBlob(await pdfForRecord(saved), fileName(person.name));
          await wait(300);
        }
        setProgress({ done: issued.length, total: people.length });
      }
      toast.success(issued.length === 1 ? "Certificate issued" : `${issued.length} certificates issued`);
      setForm((f) => ({ ...f, recipients: "" }));
    } catch (err) {
      toast.error(`Stopped after ${issued.length}: ${err.message}`);
    } finally {
      if (issued.length) onIssued(issued.reverse());
      setProgress(null);
    }
  }

  const busy = progress !== null;

  return (
    <form onSubmit={issue} className="lg:sticky lg:top-8">
      <h1 className="font-serif text-[28px] leading-tight font-semibold">Issue certificates</h1>
      <p className="text-sm text-ink-muted mt-1 mb-8">
        Fill in the event once, then paste everyone who attended.
      </p>

      <fieldset className="mb-5">
        <legend className="form-label">Type</legend>
        <div className="flex border border-rule rounded-md overflow-hidden text-sm">
          {CERT_TYPES.map((t) => (
            <label
              key={t}
              className={`flex-1 text-center py-2 cursor-pointer border-r border-rule last:border-r-0 transition-colors ${
                form.type === t ? "bg-ink text-paper" : "bg-paper hover:bg-surface"
              }`}
            >
              <input type="radio" name="type" value={t} checked={form.type === t} onChange={set("type")} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
        <p className="text-xs text-ink-muted mt-1.5">
          {form.type === "Internship" ? "Prints “Certificate of Completion”." : "Prints “Certificate of Participation”."}
        </p>
      </fieldset>

      <label className="form-label" htmlFor="topic">Title</label>
      <input id="topic" className="form-input mb-5" placeholder="How to Use AI for Career Growth" value={form.topic} onChange={set("topic")} />

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div>
          <label className="form-label" htmlFor="start">{oneDay ? "Date" : "From"}</label>
          <input id="start" type="date" className="form-input" value={form.startDate} onChange={set("startDate")} />
        </div>
        <div>
          <label className="form-label" htmlFor="end">
            To {oneDay && <span className="normal-case font-normal text-ink-muted">(if longer)</span>}
          </label>
          <input id="end" type="date" className="form-input" value={form.endDate} min={form.startDate || undefined} onChange={set("endDate")} />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_130px] gap-3 mb-5">
        <div>
          <label className="form-label" htmlFor="college">College</label>
          <input id="college" className="form-input" placeholder="Used when a row has none" value={form.college} onChange={set("college")} />
        </div>
        <div>
          <label className="form-label" htmlFor="role">Attendees are</label>
          <select id="role" className="form-input" value={form.role} onChange={set("role")}>
            <option value="Student">Students</option>
            <option value="Professor">Professors</option>
            <option value="Faculty / Staff">Staff</option>
          </select>
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <label className="form-label" htmlFor="recipients">Names</label>
        <span className="text-xs text-ink-muted tabular-nums">
          {people.length ? `${people.length} ${people.length === 1 ? "person" : "people"}` : ""}
        </span>
      </div>
      <textarea
        id="recipients"
        rows={8}
        spellCheck={false}
        className="form-input form-textarea font-mono text-[13px] leading-6"
        placeholder={"Kavitha M, 24MUCS1028\nPraveen Kumar, 21UCS105, Salem College\nDr. S. Ramesh"}
        value={form.recipients}
        onChange={set("recipients")}
      />
      <p className="text-xs text-ink-muted mt-1.5 leading-relaxed">
        One per line — name, register no, college, role. Only the name is needed. Columns copied
        from Excel or Sheets work too. “Dr.” and “Prof.” are picked up as faculty.
      </p>

      {people.length > 0 && (
        <div className="mt-4 border border-rule rounded-md text-[13px] max-h-48 overflow-auto">
          {people.map((p, i) => (
            <div key={i} className="flex gap-3 px-3 py-1.5 border-b border-rule last:border-b-0">
              <span className="text-ink-muted tabular-nums w-5 shrink-0 text-right">{i + 1}</span>
              <span className="font-medium truncate">{p.name}</span>
              <span className="text-ink-muted truncate ml-auto text-right">
                {[p.regNo, p.college, STAFF_ROLE.test(p.role) ? p.role : null].filter(Boolean).join(" · ") || "—"}
              </span>
            </div>
          ))}
        </div>
      )}

      <label className="flex items-center gap-2 text-sm mt-5 cursor-pointer select-none">
        <input type="checkbox" checked={autoDownload} onChange={(e) => setAutoDownload(e.target.checked)} className="accent-ink" />
        Download the PDFs as they're made
      </label>

      <div className="flex gap-3 mt-6">
        <button type="button" onClick={preview} disabled={busy} className="btn-secondary disabled:opacity-60">
          Preview
        </button>
        <button type="submit" disabled={busy} className="btn-primary flex-1 justify-center disabled:opacity-60">
          {busy
            ? `Issuing ${progress.done + 1} of ${progress.total}…`
            : people.length > 1
            ? `Issue ${people.length} certificates`
            : "Issue certificate"}
        </button>
      </div>
    </form>
  );
}

/* ── Register ────────────────────────────────────────────────────────────── */

function Register({ records, loading, justIssued, onEdit, onRevoke }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState("All");
  const [busyId, setBusyId] = useState(null);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return records
      .map((r) => ({ raw: r, c: readRecord(r) }))
      .filter(({ c }) => type === "All" || c.type === type)
      .filter(({ c }) => !term || [c.name, c.certNumber, c.topic, c.college, c.regNo].join(" ").toLowerCase().includes(term));
  }, [records, q, type]);

  async function download(r, c) {
    setBusyId(r.id);
    try {
      saveBlob(await pdfForRecord(r), fileName(c.name));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function copyLink(c) {
    try {
      await navigator.clipboard.writeText(verifyLink(c.certNumber));
      toast.success("Link copied");
    } catch {
      window.prompt("Copy this link:", verifyLink(c.certNumber));
    }
  }

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
        <div>
          <h2 className="font-serif text-xl font-semibold">Issued</h2>
          <p className="text-sm text-ink-muted">
            {loading ? "Loading…" : `${records.length} on record`}
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select value={type} onChange={(e) => setType(e.target.value)} className="form-input w-auto py-2 text-sm">
            <option>All</option>
            {CERT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name, ID or college"
            className="form-input py-2 text-sm flex-1 sm:w-60"
          />
        </div>
      </div>

      <div className="border-t border-ink">
        {loading ? (
          <p className="py-10 text-sm text-ink-muted">Fetching certificates…</p>
        ) : rows.length === 0 ? (
          <p className="py-10 text-sm text-ink-muted">
            {records.length ? "Nothing matches that search." : "Nothing issued yet. Certificates you issue will show up here."}
          </p>
        ) : (
          <ul>
            {rows.map(({ raw, c }) => (
              <li
                key={raw.id}
                className={`grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-6 gap-y-2 py-3.5 border-b border-rule ${
                  justIssued.has(raw.id) ? "bg-accent-50/60 -mx-3 px-3" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="font-medium text-[15px] truncate">
                    {c.name || <span className="text-ink-muted">Unnamed</span>}
                    {justIssued.has(raw.id) && <span className="ml-2 text-[11px] font-semibold text-accent-700 uppercase tracking-wide">New</span>}
                  </p>
                  <p className="text-[13px] text-ink-muted truncate">
                    {c.type} · {c.topic || "—"}
                    {c.college && <> · {c.college}</>}
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    <span className="font-mono text-ink">{c.certNumber}</span>
                    <span className="mx-1.5">·</span>
                    {fmt(c.issued)}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[13px] sm:justify-end">
                  <button onClick={() => download(raw, c)} disabled={busyId === raw.id} className="text-ink hover:text-accent-700 disabled:opacity-50">
                    {busyId === raw.id ? "Making…" : "PDF"}
                  </button>
                  <button onClick={() => copyLink(c)} className="text-ink hover:text-accent-700">Copy link</button>
                  <button onClick={() => onEdit(raw)} className="text-ink hover:text-accent-700">Edit</button>
                  <button onClick={() => onRevoke(raw)} className="text-red-700 hover:text-red-900">Revoke</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ── Edit dialog ─────────────────────────────────────────────────────────── */

function EditDialog({ record, onClose, onSaved }) {
  const c = readRecord(record);
  const [f, setF] = useState({
    name: c.name,
    regNo: c.regNo,
    college: c.college,
    role: c.role || "Student",
    topic: c.topic,
    type: c.type,
    startDate: toInputDate(c.startDate),
    endDate: toInputDate(c.endDate),
  });
  const [saving, setSaving] = useState(false);
  const set = (key) => (e) => setF((p) => ({ ...p, [key]: e.target.value }));

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    const profiles = {
      ...(record.profiles || {}),
      name: f.name.trim(),
      regNo: f.regNo.trim() || null,
      college: f.college.trim() || null,
      role: f.role || null,
      domain: f.topic.trim(),
    };
    const batches = {
      ...(record.batches || {}),
      name: record.batches?.name && f.type === c.type ? record.batches.name : f.type,
      start_date: f.startDate || null,
      end_date: f.endDate || f.startDate || null,
    };
    const updates = {
      profiles,
      batches,
      type: f.type,
      regNo: profiles.regNo,
      college: profiles.college,
      role: profiles.role,
    };
    try {
      await updateDoc(doc(db, "certificates", record.id), updates);
      onSaved({ ...record, ...updates });
      toast.success("Saved");
      onClose();
    } catch (err) {
      toast.error(err.message);
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/40 flex items-start sm:items-center justify-center p-4 overflow-y-auto" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form onSubmit={save} className="bg-paper w-full max-w-lg rounded-md border border-rule shadow-elevated p-6 sm:p-7">
        <div className="flex items-baseline justify-between mb-6">
          <h3 className="font-serif text-xl font-semibold">Edit certificate</h3>
          <span className="font-mono text-xs text-ink-muted">{c.certNumber}</span>
        </div>

        <label className="form-label">Name</label>
        <input className="form-input mb-4" value={f.name} onChange={set("name")} required />

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="form-label">Register no / staff ID</label>
            <input className="form-input font-mono" value={f.regNo} onChange={set("regNo")} />
          </div>
          <div>
            <label className="form-label">Role</label>
            <select className="form-input" value={f.role} onChange={set("role")}>
              {["Student", "Professor", "Assistant Professor", "Faculty / Staff"].includes(f.role) ? null : <option>{f.role}</option>}
              <option>Student</option>
              <option>Professor</option>
              <option>Assistant Professor</option>
              <option>Faculty / Staff</option>
            </select>
          </div>
        </div>

        <label className="form-label">College</label>
        <input className="form-input mb-4" value={f.college} onChange={set("college")} />

        <label className="form-label">Title</label>
        <input className="form-input mb-4" value={f.topic} onChange={set("topic")} required />

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="form-label">Type</label>
            <select className="form-input" value={f.type} onChange={set("type")}>
              {CERT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">From</label>
            <input type="date" className="form-input" value={f.startDate || ""} onChange={set("startDate")} />
          </div>
          <div>
            <label className="form-label">To</label>
            <input type="date" className="form-input" value={f.endDate || ""} onChange={set("endDate")} />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-7">
          <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
