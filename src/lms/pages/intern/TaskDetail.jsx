import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, getDoc, doc, updateDoc, addDoc } from "firebase/firestore";
import LMSLayout from "../../components/LMSLayout";
import { Badge, Button } from "../../components/ui.jsx";
import {
  ArrowLeft, Calendar, Star, CheckCircle, Upload,
  Link2, Send, MessageSquare, ExternalLink, FileText,
  Clock, MoreVertical, FileIcon
} from "lucide-react";
import { formatDateTime, getDueBadge } from "../../utils/helpers";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskDetail() {
  const { taskId } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [submitUrl, setSubmitUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => { if (user) fetchData(); }, [taskId, user?.id]);

  async function fetchData() {
    setLoading(true);
    try {
      const taskDoc = await getDoc(doc(db, "tasks", taskId));
      if (taskDoc.exists()) {
        const taskData = { id: taskDoc.id, ...taskDoc.data() };
        if (taskData.module_id) {
          const modDoc = await getDoc(doc(db, "modules", taskData.module_id));
          if (modDoc.exists()) {
            taskData.modules = { ...modDoc.data() };
            if (taskData.modules.batch_id) {
               const batchDoc = await getDoc(doc(db, "batches", taskData.modules.batch_id));
               if (batchDoc.exists()) {
                 const batchDataObj = batchDoc.data();
                 taskData.modules.batches = { name: batchDataObj.name, domain: batchDataObj.domain };
               }
            }
          }
        }
        setTask(taskData);
      }

      const subQ = query(collection(db, "submissions"), where("task_id", "==", taskId), where("user_id", "==", user.uid));
      const subRes = await getDocs(subQ);
      if (!subRes.empty) {
        setSubmission({ id: subRes.docs[0].id, ...subRes.docs[0].data() });
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!submitUrl) { toast.error("Please enter a URL."); return; }

    setSubmitting(true);
    try {
      if (submission) {
        await updateDoc(doc(db, "submissions", submission.id), { submitted_url: submitUrl, submitted_at: new Date().toISOString(), status: "pending", grade: null, feedback: null });
        toast.success("Resubmitted successfully.");
      } else {
        await addDoc(collection(db, "submissions"), { task_id: taskId, user_id: user.uid, submitted_url: submitUrl, status: "pending", submitted_at: new Date().toISOString() });
        toast.success("Work turned in! 🎉");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
      setSubmitUrl("");
      fetchData();
    } catch (err) {
      toast.error(err.message || "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return (
    <LMSLayout>
      <div className="p-6 space-y-4 max-w-6xl mx-auto">
        {[1, 2].map((i) => <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse" />)}
      </div>
    </LMSLayout>
  );

  if (!task) return <LMSLayout><div className="p-6 text-slate-500">Task not found.</div></LMSLayout>;

  const due = task.due_date ? getDueBadge(task.due_date) : null;
  const isOverdue = due?.color === "red" && !submission;
  const isGraded = submission?.status === "graded";
  const isSubmitted = !!submission;

  // Derive display status
  let statusText = "Assigned";
  let statusColor = "text-sky-600";
  if (isGraded) {
    statusText = "Graded";
    statusColor = "text-emerald-600";
  } else if (isSubmitted) {
    statusText = "Turned in";
    statusColor = "text-slate-600";
  } else if (isOverdue) {
    statusText = "Missing";
    statusColor = "text-red-600";
  }

  return (
    <LMSLayout>
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <Link to="/lms/intern/tasks" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Tasks
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Task Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-1">
                <FileText size={24} className="text-sky-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-slate-900 text-3xl font-medium tracking-tight mb-2">{task.title}</h1>
                <div className="flex items-center gap-x-4 gap-y-2 flex-wrap text-sm text-slate-600 font-medium border-b border-slate-200 pb-4">
                  <span>{task.modules?.title}</span>
                  <span>•</span>
                  <span>{task.max_marks} points</span>
                  {task.due_date && (
                    <>
                      <span>•</span>
                      <span>Due {formatDateTime(task.due_date)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {task.instructions && (
              <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-a:text-sky-600 hover:prose-a:text-sky-700">
                <div className="text-slate-700 text-[15px] whitespace-pre-wrap">{task.instructions}</div>
              </div>
            )}

            {task.attachment_url && (
              <div className="mt-8">
                <h3 className="text-sm font-medium text-slate-900 mb-3">Reference Materials</h3>
                <a
                  href={task.attachment_url} target="_blank" rel="noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors max-w-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center shrink-0">
                    <FileIcon size={20} className="text-sky-600 group-hover:text-sky-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">Attachment</p>
                    <p className="text-xs text-slate-500 uppercase">View File</p>
                  </div>
                  <ExternalLink size={16} className="text-slate-400 group-hover:text-slate-600" />
                </a>
              </div>
            )}
          </div>

          {/* Right Column - Your Work */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-medium text-slate-900">Your work</h2>
                <span className={`text-sm font-medium ${statusColor}`}>{statusText}</span>
              </div>

              <div className="p-5 space-y-5">
                {/* Submitted Files/Links */}
                {isSubmitted && (
                  <div className="space-y-3">
                    <a
                      href={submission.submitted_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        {submission.submitted_url.includes('http') && !submission.submitted_url.includes('supabase') ? (
                          <Link2 size={20} className="text-slate-600" />
                        ) : (
                          <FileIcon size={20} className="text-slate-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {submission.submitted_url.includes('http') && !submission.submitted_url.includes('supabase') ? 'External Link' : 'Submitted File'}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{submission.submitted_url}</p>
                      </div>
                      <ExternalLink size={16} className="text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                )}

                {/* Graded Section */}
                {isGraded && (
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <div className="flex items-end gap-2 mb-3">
                      <span className="text-3xl font-bold text-emerald-700">{submission.grade}</span>
                      <span className="text-sm font-medium text-emerald-600/70 mb-1">/ {task.max_marks}</span>
                    </div>
                    {submission.feedback && (
                      <div className="mt-3 text-sm text-emerald-800 bg-emerald-100/50 p-3 rounded-lg">
                        <span className="font-medium block mb-1">Trainer feedback:</span>
                        {submission.feedback}
                      </div>
                    )}
                  </div>
                )}

                {/* Submission Form (Not Graded) */}
                {!isGraded && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isSubmitted && (
                      <div className="space-y-3">
                        <input
                          type="url" required value={submitUrl} onChange={(e) => setSubmitUrl(e.target.value)}
                          placeholder="Add a link (Google Drive, GitHub, etc)"
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                        />
                      </div>
                    )}

                    <div className="pt-2">
                      <Button
                        type="submit"
                        loading={submitting}
                        className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isSubmitted ? "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50" : "bg-sky-600 hover:bg-sky-700 text-white shadow-sm"
                        }`}
                        variant={isSubmitted ? "secondary" : "primary"}
                      >
                        {isSubmitted ? "Resubmit" : "Turn In"}
                      </Button>
                    </div>
                  </form>
                )}

                {/* Success Animation Overlay */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                        className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4"
                      >
                        <CheckCircle size={32} className="text-emerald-600" />
                      </motion.div>
                      <h3 className="text-lg font-bold text-slate-900">Turned in!</h3>
                      <p className="text-sm text-slate-500">Great job.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LMSLayout>
  );
}
