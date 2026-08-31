import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import LMSLayout from "../../components/LMSLayout";
import { Badge, Tabs, EmptyState } from "../../components/ui.jsx";
import { ClipboardList, Clock, CheckCircle, Star, ArrowRight } from "lucide-react";
import { formatDateTime, getDueBadge } from "../../utils/helpers";

export default function Tasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (user) fetchData(); }, [user?.id]);

  async function fetchData() {
    setLoading(true);
    try {
      const bmemQ = query(collection(db, "batch_members"), where("user_id", "==", user.uid), limit(1));
      const bmemRes = await getDocs(bmemQ);
      if (bmemRes.empty) { setLoading(false); return; }
      const batchMember = bmemRes.docs[0].data();

      const modQ = query(collection(db, "modules"), where("batch_id", "==", batchMember.batch_id));
      const modRes = await getDocs(modQ);
      const modules = modRes.docs.map(d => ({ id: d.id, ...d.data() }));
      const moduleIds = modules.map((m) => m.id);

      let allTasks = [];
      if (moduleIds.length > 0) {
        const tasksRes = await getDocs(query(collection(db, "tasks"), orderBy("due_date")));
        allTasks = tasksRes.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(t => moduleIds.includes(t.module_id))
          .map(t => {
            const m = modules.find(mod => mod.id === t.module_id);
            return { ...t, modules: m ? { title: m.title } : null };
          });
      }

      const subQ = query(collection(db, "submissions"), where("user_id", "==", user.uid));
      const subRes = await getDocs(subQ);
      const subs = subRes.docs.map(d => ({ id: d.id, ...d.data() }));

      setTasks(allTasks);
      setSubmissions(subs);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  const getSubForTask = (taskId) => submissions.find((s) => s.task_id === taskId);

  const pending = tasks.filter((t) => !getSubForTask(t.id));
  const submitted = tasks.filter((t) => getSubForTask(t.id)?.status === "pending");
  const graded = tasks.filter((t) => getSubForTask(t.id)?.status === "graded");

  const filterMap = { all: tasks, pending, submitted, graded };
  const display = filterMap[activeTab] || tasks;

  const tabs = [
    { label: "All", value: "all", count: tasks.length },
    { label: "Pending", value: "pending", count: pending.length },
    { label: "Submitted", value: "submitted", count: submitted.length },
    { label: "Graded", value: "graded", count: graded.length },
  ];

  return (
    <LMSLayout>
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-slate-900 text-2xl font-bold">Tasks & Assignments</h1>
          <p className="text-slate-500 text-sm mt-1">All your assignments across modules</p>
        </div>

        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse" />)}
          </div>
        ) : display.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title={`No ${activeTab === "all" ? "" : activeTab} tasks`}
            description={activeTab === "pending" ? "Great job — all tasks submitted!" : "Tasks will appear here."}
          />
        ) : (
          <div className="space-y-3">
            {display.map((task) => {
              const sub = getSubForTask(task.id);
              const due = task.due_date ? getDueBadge(task.due_date) : null;
              return (
                <Link
                  key={task.id}
                  to={`/lms/intern/tasks/${task.id}`}
                  className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl
                    hover:border-sky-500/20 hover:bg-[#0d1e38] transition-all group"
                >
                  {/* Status icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                    ${sub?.status === "graded" ? "bg-emerald-500/10" : sub ? "bg-yellow-500/10" : "bg-sky-500/10"}`}>
                    {sub?.status === "graded"
                      ? <Star size={18} className="text-emerald-400" />
                      : sub
                      ? <Clock size={18} className="text-yellow-400" />
                      : <ClipboardList size={18} className="text-sky-400" />
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-slate-700 text-sm font-semibold group-hover:text-sky-400 transition-colors truncate">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-slate-500 text-xs">{task.modules?.title}</span>
                      {task.max_marks && <span className="text-slate-600 text-xs">· {task.max_marks} marks</span>}
                      {task.due_date && <span className="text-slate-600 text-xs">· Due {formatDateTime(task.due_date)}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {due && <Badge color={due.color}>{due.label}</Badge>}
                    {sub?.status === "graded" && (
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold">{sub.grade}</span>
                        <span className="text-slate-500 text-xs">/{task.max_marks}</span>
                      </div>
                    )}
                    {!sub && <Badge color="sky">Submit</Badge>}
                    {sub?.status === "pending" && <Badge color="yellow">Pending</Badge>}
                    <ArrowRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </LMSLayout>
  );
}
