import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, getDoc, doc, updateDoc, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import TrainerLayout from "../../components/TrainerLayout";
import { Badge, Button, Tabs, EmptyState } from "../../components/ui.jsx";
import { ArrowLeft, Clock, Check, ExternalLink, MessageSquare, Star, FileText, Link2, FileIcon } from "lucide-react";
import { formatDateTime, getInitials } from "../../utils/helpers";
import toast from "react-hot-toast";

export default function Submissions() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [grading, setGrading] = useState({});
  const [saving, setSaving] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, [taskId]);

  async function fetchData() {
    setLoading(true);
    try {
      const taskDoc = await getDoc(doc(db, "tasks", taskId));
      let taskData = null;
      if (taskDoc.exists()) {
         taskData = { id: taskDoc.id, ...taskDoc.data() };
         if (taskData.module_id) {
           const modDoc = await getDoc(doc(db, "modules", taskData.module_id));
           if (modDoc.exists()) {
             taskData.modules = { ...modDoc.data() };
             if (taskData.modules.batch_id) {
               const batchDoc = await getDoc(doc(db, "batches", taskData.modules.batch_id));
               if (batchDoc.exists()) {
                 taskData.modules.batches = { name: batchDoc.data().name };
               }
             }
           }
         }
      }
      setTask(taskData);

      const subQ = query(collection(db, "submissions"), where("task_id", "==", taskId));
      const subRes = await getDocs(subQ);
      const subsRaw = subRes.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => new Date(a.submitted_at?.toDate?.() || a.submitted_at || 0) - new Date(b.submitted_at?.toDate?.() || b.submitted_at || 0));

      const subsMapped = await Promise.all(subsRaw.map(async (s) => {
         let pData = { name: s.userName || "Intern", email: "", college: "", domain: "" };
         if (s.user_id) {
           try {
             const pDoc = await getDoc(doc(db, "profiles", s.user_id));
             if (pDoc.exists()) pData = pDoc.data();
           } catch(e) {}
         }
         return { ...s, profiles: pData };
      }));

      setSubmissions(subsMapped);
      const initial = {};
      subsMapped.forEach((s) => { initial[s.id] = { grade: s.grade ?? "", feedback: s.feedback ?? "" }; });
      setGrading(initial);
    } catch(e) { console.error(e); }
    setLoading(false);
  }

  async function saveGrade(subId) {
    const { grade, feedback } = grading[subId];
    if (grade === "" || grade < 0 || grade > (task?.max_marks || 100)) {
      toast.error(`Grade must be between 0 and ${task?.max_marks || 100}`);
      return;
    }
    setSaving((p) => ({ ...p, [subId]: true }));
    try {
      await updateDoc(doc(db, "submissions", subId), { grade: Number(grade), feedback, status: "graded" });

      const sub = submissions.find((s) => s.id === subId);
      if (sub?.user_id) {
        await addDoc(collection(db, "notifications"), {
          user_id: sub.user_id,
          title: "Assignment Graded",
          message: `Your submission for "${task?.title}" has been graded: ${grade}/${task?.max_marks}`,
          type: "grade",
          is_read: false,
          created_at: serverTimestamp()
        });
      }

      toast.success("Grade saved successfully");
      fetchData();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving((p) => ({ ...p, [subId]: false }));
    }
  }

  const pending = submissions.filter((s) => s.status === "pending");
  const graded = submissions.filter((s) => s.status === "graded");
  const displaySubs = activeTab === "pending" ? pending : graded;

  const tabs = [
    { label: "Needs Grading", value: "pending", count: pending.length },
    { label: "Graded", value: "graded", count: graded.length },
  ];

  if (loading) return (
    <TrainerLayout>
      <div className="p-6 animate-pulse space-y-4 max-w-6xl mx-auto">
        <div className="h-24 bg-slate-200 rounded-xl" />
        <div className="h-64 bg-slate-200 rounded-xl" />
      </div>
    </TrainerLayout>
  );

  return (
    <TrainerLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div>
          {task?.modules?.batch_id && (
            <Link to={`/lms/trainer/batches/${task.modules.batch_id}`} className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium mb-6 transition-colors">
              <ArrowLeft size={16} /> Back to {task.modules.batches?.name || "Batch"}
            </Link>
          )}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-1">
                <FileText size={24} className="text-sky-600" />
              </div>
              <div>
                <h1 className="text-slate-900 text-3xl font-medium tracking-tight mb-2">{task?.title}</h1>
                <div className="flex items-center gap-x-4 gap-y-2 flex-wrap text-sm text-slate-600 font-medium">
                  <span>{task?.modules?.title}</span>
                  <span>•</span>
                  <span>{task?.max_marks} Total Points</span>
                  <span>•</span>
                  <span>{submissions.length} Submissions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

        {displaySubs.length === 0 ? (
          <EmptyState
            icon={activeTab === "pending" ? Clock : Check}
            title={activeTab === "pending" ? "You're all caught up!" : "No graded submissions yet"}
            description={activeTab === "pending" ? "There are no pending submissions for this task." : "Grade some pending submissions to see them here."}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {displaySubs.map((sub) => (
              <div key={sub.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                
                {/* Left side: Intern Info & Submission Link */}
                <div className="p-6 md:w-5/12 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {getInitials(sub.profiles?.name || "Intern")}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{sub.profiles?.name || "Intern"}</h3>
                      <p className="text-sm text-slate-500">{sub.profiles?.email}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Submitted Work</p>
                    {sub.submitted_url ? (
                      <a
                        href={sub.submitted_url} target="_blank" rel="noreferrer"
                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-sky-300 hover:shadow-sm transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
                          {sub.submitted_url.includes('http') && !sub.submitted_url.includes('supabase') ? (
                            <Link2 size={20} className="text-sky-600" />
                          ) : (
                            <FileIcon size={20} className="text-sky-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {sub.submitted_url.includes('http') && !sub.submitted_url.includes('supabase') ? 'External Link' : 'Submitted File'}
                          </p>
                          <p className="text-xs text-slate-500 truncate">View Attachment</p>
                        </div>
                        <ExternalLink size={16} className="text-slate-400 group-hover:text-sky-500" />
                      </a>
                    ) : (
                      <p className="text-sm text-slate-500 italic">No attachment provided</p>
                    )}
                  </div>
                  <div className="mt-auto text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock size={14} /> Turned in {formatDateTime(sub.submitted_at)}
                  </div>
                </div>

                {/* Right side: Grading Panel */}
                <div className="p-6 md:w-7/12 flex flex-col justify-center">
                  {sub.status === "graded" && (
                     <div className="flex items-center gap-3 mb-6 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-lg border border-emerald-100 w-fit">
                       <Check size={18} className="text-emerald-500" />
                       <span className="text-sm font-medium">Already Graded</span>
                     </div>
                  )}

                  <div className="space-y-5">
                    <div className="flex gap-4 items-end">
                      <div className="space-y-1.5 w-32 shrink-0">
                        <label htmlFor={`grade-${sub.id}`} className="text-slate-700 text-sm font-medium flex items-center gap-1.5">
                          <Star size={16} className="text-amber-400" /> Grade
                        </label>
                        <div className="relative">
                          <input
                            id={`grade-${sub.id}`}
                            type="number" min={0} max={task?.max_marks || 100}
                            value={grading[sub.id]?.grade ?? ""}
                            onChange={(e) => setGrading((p) => ({ ...p, [sub.id]: { ...p[sub.id], grade: e.target.value } }))}
                            placeholder="0"
                            className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-12 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-lg"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                            / {task?.max_marks}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor={`feedback-${sub.id}`} className="text-slate-700 text-sm font-medium flex items-center gap-1.5">
                        <MessageSquare size={16} className="text-slate-400" /> Private Feedback
                      </label>
                      <textarea
                        id={`feedback-${sub.id}`}
                        rows={3}
                        value={grading[sub.id]?.feedback ?? ""}
                        onChange={(e) => setGrading((p) => ({ ...p, [sub.id]: { ...p[sub.id], feedback: e.target.value } }))}
                        placeholder="Add a comment to help the intern improve..."
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={() => saveGrade(sub.id)}
                      loading={saving[sub.id]}
                      id={`save-grade-${sub.id}`}
                      variant={sub.status === "graded" ? "secondary" : "primary"}
                      className="px-6 py-2.5 rounded-xl font-medium"
                    >
                      {sub.status === "graded" ? "Update Grade" : "Return Grade"}
                    </Button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </TrainerLayout>
  );
}

