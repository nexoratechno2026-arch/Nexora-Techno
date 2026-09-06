import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import LMSLayout from "../../components/LMSLayout";
import { Button, Input, Textarea, EmptyState } from "../../components/ui.jsx";
import { User, Mail, Phone, School, Briefcase, Link as LinkIcon, Save, FileText, ExternalLink, Hash } from "lucide-react";
import { getInitials } from "../../utils/helpers";
import toast from "react-hot-toast";

const DOMAINS = ["Web Development", "AI & Machine Learning", "AI Automation", "Software Development", "UI/UX Design", "Digital Marketing", "Data Science", "Mobile App Development"];

export default function InternProfile() {
  const { profile, updateProfile, user } = useAuth();
  const [form, setForm] = useState({ name: "", regNo: "", phone: "", college: "", domain: "", resume: "" });
  const [saving, setSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (profile && !initialized) {
      setForm({
        name: profile.name || "",
        regNo: profile.regNo || profile.reg_no || profile.register_no || "",
        phone: profile.phone || "",
        college: profile.college || "",
        domain: profile.domain || "",
        resume: profile.resume_url || "",
      });
      setInitialized(true);
    }
  }, [profile]);

  function set(k) { return (e) => setForm((f) => ({ ...f, [k]: e.target.value })); }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.name) { toast.error("Name is required."); return; }
    setSaving(true);
    try {
      let updates = {
        name: form.name,
        regNo: form.regNo || null,
        phone: form.phone,
        college: form.college,
        domain: form.domain,
        resume_url: form.resume || null,
      };
      await updateProfile(updates);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  if (!profile) return <LMSLayout><div className="p-6 text-slate-500">Loading profile…</div></LMSLayout>;

  return (
    <LMSLayout>
      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        <div>
          <h1 className="text-slate-900 text-2xl font-bold">My Profile</h1>
          <p className="text-slate-500 text-sm mt-1">View and update your internship profile</p>
        </div>

        {/* Avatar + Email */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {getInitials(profile.name || "U")}
          </div>
          <div>
            <h2 className="text-slate-900 text-xl font-bold">{profile.name}</h2>
            <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-1">
              <Mail size={13} className="text-slate-500" /> {profile.email}
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
              <Briefcase size={12} className="text-slate-500" /> {profile.domain || "Domain not set"} · Intern
            </div>
          </div>
        </div>

        {/* Edit form */}
        <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <h2 className="text-slate-700 font-semibold text-sm border-b border-slate-200 pb-3">Edit Information</h2>

          {/* Name */}
          <div className="space-y-1">
            <label htmlFor="prof-name" className="block text-slate-600 text-sm font-medium">Full Name</label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                id="prof-name" type="text" required value={form.name} onChange={set("name")}
                className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-700 text-sm
                  focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label htmlFor="prof-phone" className="block text-slate-600 text-sm font-medium">Phone Number</label>
            <div className="relative">
              <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                id="prof-phone" type="tel" value={form.phone} onChange={set("phone")}
                placeholder="+91 98765 43210"
                className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-700 text-sm
                  focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
              />
            </div>
          </div>

          {/* College */}
          <div className="space-y-1">
            <label htmlFor="prof-college" className="block text-slate-600 text-sm font-medium">College / University</label>
            <div className="relative">
              <School size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                id="prof-college" type="text" value={form.college} onChange={set("college")}
                placeholder="Anna University, Chennai"
                className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-700 text-sm
                  focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
              />
            </div>
          </div>

          {/* Register Number */}
          <div className="space-y-1">
            <label htmlFor="prof-regno" className="block text-slate-600 text-sm font-medium">Register Number / Roll Number</label>
            <div className="relative">
              <Hash size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                id="prof-regno" type="text" value={form.regNo} onChange={set("regNo")}
                placeholder="e.g. 731521104001 or 21UCS101"
                className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-700 text-sm
                  focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
              />
            </div>
          </div>

          {/* Domain */}
          <div className="space-y-1">
            <label htmlFor="prof-domain" className="block text-slate-600 text-sm font-medium">Domain of Interest</label>
            <div className="relative">
              <Briefcase size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <select
                id="prof-domain" value={form.domain} onChange={set("domain")}
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
            <label htmlFor="prof-resume" className="block text-slate-600 text-sm font-medium">Resume Link (Google Drive, LinkedIn, etc.)</label>
            {profile.resume_url && (
              <a href={profile.resume_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors mb-2">
                <FileText size={12} /> Current Resume <ExternalLink size={11} />
              </a>
            )}
            <div className="relative">
              <LinkIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                id="prof-resume" type="url" value={form.resume} onChange={set("resume")}
                placeholder="https://drive.google.com/..."
                className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-700 text-sm
                  focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" loading={saving} id="save-profile-btn">
              <Save size={15} /> Save Changes
            </Button>
          </div>
        </form>
      </div>
    </LMSLayout>
  );
}
