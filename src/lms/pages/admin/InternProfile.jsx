import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, getDoc, orderBy, updateDoc, addDoc, doc, limit, serverTimestamp } from "firebase/firestore";
import LMSLayout from "../../components/LMSLayout";
import { Badge, Button, Card, ProgressBar } from "../../components/ui.jsx";
import { ArrowLeft, User, Mail, Phone, School, Briefcase, FileText, ExternalLink, ClipboardList, CalendarCheck, Hash } from "lucide-react";
import { formatDate, formatDateTime, getInitials } from "../../utils/helpers";
import toast from "react-hot-toast";

export default function InternProfile() {
  const { internId } = useParams();
  const [profile, setProfile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingRole, setUpdatingRole] = useState(false);

  useEffect(() => { fetchData(); }, [internId]);

  async function fetchData() {
    setLoading(true);
    try {
      const profileDoc = await getDoc(doc(db, "profiles", internId));
      let pData = null;
      if (profileDoc.exists()) pData = { id: profileDoc.id, ...profileDoc.data() };

      const subQ = query(collection(db, "submissions"), where("user_id", "==", internId), orderBy("submitted_at", "desc"));
      const subRes = await getDocs(subQ);
      
      const attQ = query(collection(db, "attendance"), where("user_id", "==", internId), orderBy("date", "desc"), limit(30));
      const attRes = await getDocs(attQ);

      const subRaw = subRes.docs.map(d => ({ id: d.id, ...d.data() }));

      const subMapped = await Promise.all(subRaw.map(async (s) => {
         let tData = { title: s.taskTitle || "Task", max_marks: 100, modules: { title: "Module" } };
         if (s.task_id && !s.taskTitle) {
            try {
              const tDoc = await getDoc(doc(db, "tasks", s.task_id));
              if (tDoc.exists()) {
                const td = tDoc.data();
                tData.title = td.title;
                tData.max_marks = td.max_marks || 100;
                if (td.module_id) {
                   const mDoc = await getDoc(doc(db, "modules", td.module_id));
                   if (mDoc.exists()) tData.modules = { title: mDoc.data().title };
                }
              }
            } catch (e) {}
         }
         return { ...s, tasks: tData };
      }));

      setProfile(pData);
      setSubmissions(subMapped);
      setAttendance(attRes.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  if (loading) return <LMSLayout><div className="p-6 space-y-4"><div className="h-40 bg-white/5 rounded-xl animate-pulse" /></div></LMSLayout>;
  if (!profile) return <LMSLayout><div className="p-6 text-slate-500">User not found.</div></LMSLayout>;

  async function handleRoleChange(newRole) {
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    setUpdatingRole(true);
    try {
      await updateDoc(doc(db, "profiles", profile.id), { role: newRole });
      setProfile({ ...profile, role: newRole });
      await addDoc(collection(db, "notifications"), {
         user_id: profile.id,
         title: "Role Updated",
         message: `Your role has been updated to ${newRole}.`,
         is_read: false,
         created_at: serverTimestamp()
      });
      toast.success(`Role updated to ${newRole}`);
    } catch(error) {
      toast.error(error.message);
    }
    setUpdatingRole(false);
  }

  const presentDays = attendance.filter((a) => a.status === "present").length;
  const gradedSubs = submissions.filter((s) => s.status === "graded");
  const avgGrade = gradedSubs.length
    ? Math.round(gradedSubs.reduce((sum, s) => sum + (s.grade / s.tasks?.max_marks) * 100, 0) / gradedSubs.length)
    : null;

  return (
    <LMSLayout>
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <Link to={-1} className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm mb-2 transition-colors">
          <ArrowLeft size={14} /> Back
        </Link>

        {/* Profile card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-start gap-5 flex-wrap">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {getInitials(profile.name)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-slate-900 text-2xl font-bold">{profile.name}</h1>
                <Badge color="sky">{profile.domain || "—"}</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Mail size={14} className="text-slate-500" /> {profile.email}
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Phone size={14} className="text-slate-500" /> {profile.phone}
                  </div>
                )}
                {profile.college && (
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <School size={14} className="text-slate-500" /> {profile.college}
                  </div>
                )}
                {(profile.regNo || profile.reg_no) && (
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Hash size={14} className="text-slate-500" /> Reg: {profile.regNo || profile.reg_no}
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <User size={14} className="text-slate-500" /> Joined {formatDate(profile.created_at)}
                </div>
              </div>
              {profile.resume_url && (
                <a
                  href={profile.resume_url} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-sm text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <FileText size={14} /> View Resume <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Role Management (Admin only action) */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="text-slate-700 font-semibold text-sm mb-4">Role Management</h2>
          <div className="flex gap-3">
            <Button
              variant={profile.role === "intern" ? "primary" : "outline"}
              onClick={() => handleRoleChange("intern")}
              disabled={updatingRole || profile.role === "intern"}
            >
              Intern
            </Button>
            <Button
              variant={profile.role === "trainer" ? "primary" : "outline"}
              onClick={() => handleRoleChange("trainer")}
              disabled={updatingRole || profile.role === "trainer"}
            >
              Trainer
            </Button>
            <Button
              variant={profile.role === "admin" ? "primary" : "outline"}
              onClick={() => handleRoleChange("admin")}
              disabled={updatingRole || profile.role === "admin"}
            >
              Admin
            </Button>
          </div>
          <p className="text-slate-500 text-xs mt-3">
            Changing a user's role will immediately affect their access and permissions across the system.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-slate-900">{submissions.length}</p>
            <p className="text-slate-500 text-xs mt-1">Submissions</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{gradedSubs.length}</p>
            <p className="text-slate-500 text-xs mt-1">Graded</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-sky-400">{avgGrade !== null ? `${avgGrade}%` : "—"}</p>
            <p className="text-slate-500 text-xs mt-1">Avg. Score</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-400">{presentDays}/{attendance.length}</p>
            <p className="text-slate-500 text-xs mt-1">Days Present</p>
          </div>
        </div>

        {/* Submission history */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="text-slate-700 font-semibold text-sm flex items-center gap-2">
              <ClipboardList size={15} className="text-sky-400" /> Submission History
            </h2>
          </div>
          {submissions.length === 0 ? (
            <div className="px-5 py-8 text-center text-slate-500 text-sm">No submissions yet.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {submissions.map((s) => (
                <div key={s.id} className="flex items-center gap-4 px-5 py-3 hover:bg-white/2 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 text-sm font-medium truncate">{s.tasks?.title || "Task"}</p>
                    <p className="text-slate-500 text-xs">{s.tasks?.modules?.title} · {formatDateTime(s.submitted_at)}</p>
                  </div>
                  <Badge color={s.status === "graded" ? "green" : "yellow"}>
                    {s.status === "graded" ? `${s.grade}/${s.tasks?.max_marks}` : "Pending"}
                  </Badge>
                  {s.submitted_url && (
                    <a href={s.submitted_url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-sky-400 transition-colors">
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </LMSLayout>
  );
}
