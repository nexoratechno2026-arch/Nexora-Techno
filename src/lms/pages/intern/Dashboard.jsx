import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, getDoc, doc, orderBy, limit, or } from "firebase/firestore";
import LMSLayout from "../../components/LMSLayout";
import { Card, Badge, ProgressBar, StatCard, EmptyState } from "../../components/ui.jsx";
import {
  BookOpen, ClipboardList, Award, Megaphone, Calendar, CalendarCheck,
  ArrowRight, Clock, CheckCircle, TrendingUp, Star
} from "lucide-react";
import { formatDate, formatDateTime, getDueBadge, calcCompletion } from "../../utils/helpers";

export default function InternDashboard() {
  const { profile, user } = useAuth();
  const [batch, setBatch] = useState(null);
  const [modules, setModules] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (user) fetchData(); }, [user?.id]);

  async function fetchData() {
    setLoading(true);
    try {
      // Get intern's batch
      const bmemQ = query(collection(db, "batch_members"), where("user_id", "==", user.uid), limit(1));
      const bmemRes = await getDocs(bmemQ);
      if (bmemRes.empty) { setLoading(false); return; }
      
      const bmem = bmemRes.docs[0].data();
      const batchDoc = await getDoc(doc(db, "batches", bmem.batch_id));
      if (!batchDoc.exists()) { setLoading(false); return; }

      const batchData = { id: batchDoc.id, ...batchDoc.data() };
      setBatch(batchData);

      const modQ = query(collection(db, "modules"), where("batch_id", "==", batchData.id));
      const modRes = await getDocs(modQ);
      
      const sortedDocs = [...modRes.docs].sort((a, b) => (a.data().sort_order || 0) - (b.data().sort_order || 0));
      const modIds = sortedDocs.map(d => d.id);
      
      let allTasks = [];
      if (modIds.length > 0) {
        const tasksRes = await getDocs(collection(db, "tasks"));
        allTasks = tasksRes.docs
           .map(d => ({ id: d.id, ...d.data() }))
           .filter(t => modIds.includes(t.module_id));
      }

      const allModules = sortedDocs.map(d => {
        const m = { id: d.id, ...d.data() };
        m.tasks = allTasks.filter(t => t.module_id === m.id);
        return m;
      });

      setModules(allModules);
      setTasks(allTasks);

      const compQ = query(collection(db, "lesson_completions"), where("user_id", "==", user.uid));
      const compRes = await getDocs(compQ);
      setCompletions(compRes.docs.map(d => ({ id: d.id, ...d.data() })));

      const subQ = query(collection(db, "submissions"), where("user_id", "==", user.uid));
      const subRes = await getDocs(subQ);
      const subs = subRes.docs.map(d => {
        const data = d.data();
        const t = allTasks.find(task => task.id === data.task_id);
        const m = t ? allModules.find(mod => mod.id === t.module_id) : null;
        return {
          id: d.id, ...data, 
          tasks: t ? { title: t.title, max_marks: t.max_marks, due_date: t.due_date, modules: m ? { title: m.title } : null } : null
        };
      }).sort((a, b) => new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0));
      setSubmissions(subs);

      const annQ = query(
        collection(db, "announcements"), 
        or(where("batch_id", "==", batchData.id), where("batch_id", "==", null))
      );
      const annRes = await getDocs(annQ);
      const annList = annRes.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
        .slice(0, 5);
      setAnnouncements(annList);

      const attQ = query(collection(db, "attendance"), where("user_id", "==", user.uid), where("batch_id", "==", batchData.id));
      const attRes = await getDocs(attQ);
      const attList = attRes.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
        .slice(0, 30);
      setAttendance(attList);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const completedModuleIds = completions.map((c) => c.module_id);
  const completion = calcCompletion(completedModuleIds.length, modules.length);
  const pendingSubs = submissions.filter((s) => s.status === "pending");
  const gradedSubs = submissions.filter((s) => s.status === "graded");
  const presentDays = attendance.filter((a) => a.status === "present").length;

  // Upcoming tasks (not yet submitted)
  const submittedTaskIds = submissions.map((s) => s.task_id);
  const upcomingTasks = tasks
    .filter((t) => t.due_date && !submittedTaskIds.includes(t.id))
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 3);

  const greetingTime = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return (
      <LMSLayout>
        <div className="flex items-center justify-center h-full min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </LMSLayout>
    );
  }

  return (
    <LMSLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-[#0a1a30] to-[#0d1e38] border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-full opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-l from-sky-400" />
          </div>
          <div className="relative">
            <p className="text-slate-400 text-sm">{greetingTime()},</p>
            <h1 className="text-white text-2xl font-bold mt-0.5">{profile?.name?.split(" ")[0] || "Intern"} 👋</h1>
            {batch ? (
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <Badge color="sky">{batch.name}</Badge>
                <Badge color="purple">{batch.domain}</Badge>
                <span className="text-slate-500 text-xs">{formatDate(batch.start_date)} — {formatDate(batch.end_date)}</span>
              </div>
            ) : (
              <p className="text-slate-500 text-sm mt-2">You haven't been assigned to a batch yet. Please wait for your trainer.</p>
            )}
            {batch && (
              <div className="mt-4 max-w-xs">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Overall Progress</span>
                  <span>{completion}%</span>
                </div>
                <ProgressBar value={completion} showLabel={false} height="h-2" />
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={BookOpen} label="Modules" value={`${completedModuleIds.length}/${modules.length}`} color="sky" />
          <StatCard icon={ClipboardList} label="Submissions" value={submissions.length} color="purple" />
          <StatCard icon={Star} label="Graded Tasks" value={gradedSubs.length} color="green" />
          <StatCard icon={CalendarCheck} label="Days Present" value={`${presentDays}/${attendance.length}`} color="yellow" />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Upcoming deadlines */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-slate-700 font-semibold text-sm flex items-center gap-2">
                <Clock size={15} className="text-orange-400" /> Upcoming Deadlines
              </h2>
              <Link to="/lms/intern/tasks" className="text-sky-400 text-xs hover:text-sky-300 flex items-center gap-1 transition-colors">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            {upcomingTasks.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle size={28} className="text-emerald-400 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">No pending deadlines 🎉</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingTasks.map((task) => {
                  const due = getDueBadge(task.due_date);
                  return (
                    <Link
                      key={task.id}
                      to={`/lms/intern/tasks/${task.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-slate-200 hover:bg-white/6 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                        <ClipboardList size={14} className="text-orange-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-700 text-sm font-medium group-hover:text-sky-400 transition-colors truncate">{task.title}</p>
                        <p className="text-slate-500 text-xs">{task.modules?.title || "Task"}</p>
                      </div>
                      <Badge color={due.color}>{due.label}</Badge>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Announcements */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-slate-700 font-semibold text-sm flex items-center gap-2 mb-4">
              <Megaphone size={15} className="text-purple-400" /> Announcements
            </h2>
            {announcements.length === 0 ? (
              <EmptyState icon={Megaphone} title="No announcements" description="Check back later." />
            ) : (
              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-3 rounded-lg bg-white/3 border border-slate-200">
                    <p className="text-slate-700 text-sm font-medium">{ann.title}</p>
                    <p className="text-slate-500 text-xs mt-0.5 line-clamp-2">{ann.message}</p>
                    <p className="text-slate-600 text-xs mt-1">{formatDateTime(ann.created_at)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent grades */}
        {gradedSubs.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-slate-700 font-semibold text-sm flex items-center gap-2 mb-4">
              <Star size={15} className="text-yellow-400" /> Recent Grades
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {gradedSubs.slice(0, 3).map((s) => (
                <Link key={s.id} to={`/lms/intern/tasks/${s.task_id}`} className="p-3 rounded-lg bg-white/3 border border-slate-200 hover:bg-white/6 transition-all group">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-700 text-sm font-medium truncate group-hover:text-sky-400 transition-colors">{s.tasks?.title}</p>
                    <span className="text-emerald-400 font-bold text-lg ml-2">{s.grade}</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5">{s.tasks?.modules?.title} · /{s.tasks?.max_marks}</p>
                  {s.feedback && <p className="text-slate-500 text-xs mt-1.5 line-clamp-1 italic">"{s.feedback}"</p>}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </LMSLayout>
  );
}
