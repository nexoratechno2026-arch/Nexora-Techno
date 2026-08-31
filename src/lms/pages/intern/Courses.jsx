import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, limit, orderBy, deleteDoc, addDoc } from "firebase/firestore";
import LMSLayout from "../../components/LMSLayout";
import { Badge, ProgressBar, EmptyState } from "../../components/ui.jsx";
import {
  BookOpen, CheckCircle, ChevronDown, ChevronRight, Link2,
  FileText, Video, ExternalLink, Lock, ClipboardList
} from "lucide-react";
import toast from "react-hot-toast";

export default function Courses() {
  const { user } = useAuth();
  const [modules, setModules] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState({});

  useEffect(() => { if (user) fetchData(); }, [user?.id]);

  async function fetchData() {
    setLoading(true);
    try {
      const bmemQ = query(collection(db, "batch_members"), where("user_id", "==", user.uid), limit(1));
      const bmemRes = await getDocs(bmemQ);
      if (bmemRes.empty) { setLoading(false); return; }

      const batchId = bmemRes.docs[0].data().batch_id;

      const modQ = query(collection(db, "modules"), where("batch_id", "==", batchId));
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

      const allMods = sortedDocs.map(d => {
        const m = { id: d.id, ...d.data() };
        m.tasks = allTasks.filter(t => t.module_id === m.id);
        return m;
      });

      const compQ = query(collection(db, "lesson_completions"), where("user_id", "==", user.uid));
      const compRes = await getDocs(compQ);
      const comps = compRes.docs.map(d => ({ id: d.id, ...d.data() }));

      setModules(allMods);
      setCompletions(comps);
      setTasks(allTasks);

      if (allMods.length > 0 && !expanded) setExpanded(allMods[0].id);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  const isCompleted = (moduleId) => completions.some((c) => c.module_id === moduleId);

  async function toggleCompletion(moduleId) {
    const done = isCompleted(moduleId);
    setMarking((p) => ({ ...p, [moduleId]: true }));
    try {
      if (done) {
        const compQ = query(collection(db, "lesson_completions"), where("user_id", "==", user.uid), where("module_id", "==", moduleId));
        const res = await getDocs(compQ);
        for (const doc of res.docs) {
          await deleteDoc(doc.ref);
        }
      } else {
        await addDoc(collection(db, "lesson_completions"), { user_id: user.uid, module_id: moduleId });
      }
      await fetchData();
    } catch (err) {
      toast.error("Failed to update completion.");
    } finally {
      setMarking((p) => ({ ...p, [moduleId]: false }));
    }
  }

  const completedCount = completions.length;
  const total = modules.length;
  const completion = total ? Math.round((completedCount / total) * 100) : 0;

  const ResourceIcon = ({ type }) => {
    const map = { Video: Video, PDF: FileText, Document: FileText, Link: Link2 };
    const Icon = map[type] || Link2;
    return <Icon size={12} />;
  };

  return (
    <LMSLayout>
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-slate-900 text-2xl font-bold">My Courses</h1>
            <p className="text-slate-500 text-sm mt-1">Your learning modules and resources</p>
          </div>
          {total > 0 && (
            <div className="text-right">
              <p className="text-slate-500 text-xs">{completedCount} of {total} completed</p>
              <p className="text-sky-400 font-bold text-xl">{completion}%</p>
            </div>
          )}
        </div>

        {total > 0 && (
          <ProgressBar value={completedCount} max={total} showLabel={false} height="h-2.5" />
        )}

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />)}
          </div>
        ) : modules.length === 0 ? (
          <EmptyState icon={BookOpen} title="No courses yet" description="Your trainer hasn't added any modules yet. Check back soon." />
        ) : (
          <div className="space-y-3">
            {modules.map((mod, idx) => {
              const done = isCompleted(mod.id);
              const isOpen = expanded === mod.id;
              const modTasks = tasks.filter((t) => t.module_id === mod.id);

              return (
                <div
                  key={mod.id}
                  className={`bg-white border rounded-xl overflow-hidden transition-all
                    ${done ? "border-emerald-500/20" : isOpen ? "border-sky-500/20" : "border-slate-200"}`}
                >
                  {/* Header */}
                  <div
                    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/3 transition-colors"
                    onClick={() => setExpanded(isOpen ? null : mod.id)}
                  >
                    {/* Step number */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold
                      ${done ? "bg-emerald-500/15 text-emerald-400" : "bg-sky-500/10 text-sky-400"}`}>
                      {done ? <CheckCircle size={18} /> : idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm truncate ${done ? "text-emerald-400" : "text-slate-700"}`}>
                        {mod.title}
                      </h3>
                      {mod.description && <p className="text-slate-500 text-xs mt-0.5 truncate">{mod.description}</p>}
                      <div className="flex items-center gap-3 mt-1">
                        {mod.resource_urls?.filter((r) => r.url).length > 0 && (
                          <span className="text-slate-500 text-xs">{mod.resource_urls.filter((r) => r.url).length} resources</span>
                        )}
                        {modTasks.length > 0 && (
                          <span className="text-slate-500 text-xs">{modTasks.length} tasks</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {done ? (
                        <Badge color="green">Completed</Badge>
                      ) : (
                        <Badge color="slate">In Progress</Badge>
                      )}
                      {isOpen ? <ChevronDown size={16} className="text-slate-500" /> : <ChevronRight size={16} className="text-slate-500" />}
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isOpen && (
                    <div className="border-t border-slate-200">
                      {/* Description */}
                      {mod.description && (
                        <div className="px-5 py-3 bg-white/2">
                          <p className="text-slate-600 text-sm">{mod.description}</p>
                        </div>
                      )}

                      {/* Resources */}
                      {mod.resource_urls?.filter((r) => r.url).length > 0 && (
                        <div className="px-5 py-4 border-b border-slate-200">
                          <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-3">Resources</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {mod.resource_urls.filter((r) => r.url).map((r, i) => (
                              <a
                                key={i} href={r.url} target="_blank" rel="noreferrer"
                                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/3 border border-slate-200
                                  hover:border-sky-500/20 hover:bg-sky-500/5 transition-all group"
                              >
                                <div className="w-7 h-7 rounded-md bg-sky-500/10 flex items-center justify-center shrink-0">
                                  <ResourceIcon type={r.type} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-slate-700 text-xs font-medium truncate group-hover:text-sky-400 transition-colors">
                                    {r.label || r.type}
                                  </p>
                                  <p className="text-slate-500 text-[10px] truncate">{r.type}</p>
                                </div>
                                <ExternalLink size={11} className="text-slate-500 shrink-0" />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tasks for this module */}
                      {modTasks.length > 0 && (
                        <div className="px-5 py-4 border-b border-slate-200">
                          <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-3">Tasks</p>
                          <div className="space-y-2">
                            {modTasks.map((task) => (
                              <Link
                                key={task.id}
                                to={`/lms/intern/tasks/${task.id}`}
                                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/3 border border-slate-200
                                  hover:border-sky-500/20 hover:bg-sky-500/5 transition-all group"
                              >
                                <ClipboardList size={13} className="text-slate-500 shrink-0" />
                                <span className="text-slate-700 text-sm group-hover:text-sky-400 transition-colors truncate">{task.title}</span>
                                <span className="text-slate-500 text-xs ml-auto shrink-0">{task.max_marks} marks</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Mark complete button */}
                      <div className="px-5 py-3 flex justify-end">
                        <button
                          onClick={() => toggleCompletion(mod.id)}
                          disabled={marking[mod.id]}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                            ${done
                              ? "bg-white/5 text-slate-500 hover:bg-white/8"
                              : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20"
                            } disabled:opacity-50`}
                        >
                          {marking[mod.id]
                            ? <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            : <CheckCircle size={15} />
                          }
                          {done ? "Mark as Incomplete" : "Mark as Completed"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </LMSLayout>
  );
}
