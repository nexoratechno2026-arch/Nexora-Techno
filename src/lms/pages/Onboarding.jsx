import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GraduationCap, Phone, School, Briefcase, Link as LinkIcon, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const DOMAINS = [
  "Web Development",
  "AI & Machine Learning",
  "AI Automation",
  "Software Development",
  "UI/UX Design",
  "Digital Marketing",
  "Data Science",
  "Mobile App Development",
];

export default function Onboarding() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ college: "", phone: "", domain: "", year: "", resume: "" });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  function set(k) {
    return (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.college || !form.domain) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    try {
      await updateProfile({
        college: form.college,
        phone: form.phone,
        domain: form.domain,
        resume_url: form.resume || null,
      });
      setStep(2);
      setTimeout(() => navigate("/lms/intern/dashboard"), 1500);
    } catch (err) {
      toast.error(err.message || "Failed to save profile.");
    } finally {
      setLoading(false);
    }
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">
            <CheckCircle size={40} className="text-emerald-400" />
          </div>
          <h2 className="text-slate-900 text-2xl font-bold">You&apos;re all set!</h2>
          <p className="text-slate-500 mt-2">Redirecting to your dashboard…</p>
          <div className="mt-4 w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-sky-600/5 blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(14,165,233,0.15) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-500/30 mb-4">
            <GraduationCap size={28} className="text-slate-900" />
          </div>
          <h1 className="text-slate-900 text-2xl font-bold">Complete your profile</h1>
          <p className="text-slate-500 text-sm mt-1">Help us personalize your internship experience</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* College */}
            <div className="space-y-1">
              <label htmlFor="ob-college" className="block text-slate-600 text-sm font-medium">
                College / University <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <School size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="ob-college" type="text" required value={form.college} onChange={set("college")}
                  placeholder="Anna University, Chennai"
                  className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-700
                    placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
                />
              </div>
            </div>

            {/* Year */}
            <div className="space-y-1">
              <label htmlFor="ob-year" className="block text-slate-600 text-sm font-medium">Year of Study</label>
              <select
                id="ob-year" value={form.year} onChange={set("year")}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-700 text-sm
                  focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
              >
                <option value="">Select year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Graduated">Graduated</option>
              </select>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label htmlFor="ob-phone" className="block text-slate-600 text-sm font-medium">Phone number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="ob-phone" type="tel" value={form.phone} onChange={set("phone")}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-700
                    placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
                />
              </div>
            </div>

            {/* Domain */}
            <div className="space-y-1">
              <label htmlFor="ob-domain" className="block text-slate-600 text-sm font-medium">
                Domain of Interest <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <select
                  id="ob-domain" required value={form.domain} onChange={set("domain")}
                  className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-700 text-sm
                    focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
                >
                  <option value="">Select domain</option>
                  {DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* Resume Link */}
            <div className="space-y-1">
              <label htmlFor="ob-resume" className="block text-slate-600 text-sm font-medium">Resume Link (Google Drive, LinkedIn, etc.)</label>
              <div className="relative">
                <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="ob-resume" type="url" value={form.resume} onChange={set("resume")}
                  placeholder="https://drive.google.com/..."
                  className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-700
                    placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit" disabled={loading} id="onboarding-submit"
              className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white
                font-semibold rounded-lg py-2.5 text-sm transition-all shadow-lg shadow-sky-500/25
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : "Save & Continue"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
