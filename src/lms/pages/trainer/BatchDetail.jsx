import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, getDoc, doc, updateDoc, addDoc, deleteDoc, orderBy, serverTimestamp } from "firebase/firestore";
import TrainerLayout from "../../components/TrainerLayout";
import {
  Card, Badge, Modal, Input, Textarea, Select, Button, SectionHeader, EmptyState, Tabs
} from "../../components/ui.jsx";
import {
  ArrowLeft, Plus, BookOpen, ClipboardList, Users, Pencil, Trash2,
  GripVertical, Link2, FileText, Video, UserPlus, X, ChevronDown, ChevronRight, ExternalLink
} from "lucide-react";
import { formatDate, getDueBadge } from "../../utils/helpers";
import toast from "react-hot-toast";

const RESOURCE_TYPES = ["Video", "PDF", "Link", "Document"];
const EMPTY_MODULE = { title: "", description: "", sort_order: 0 };
const EMPTY_TASK = { title: "", instructions: "", due_date: "", max_marks: 100, module_id: "" };

export default function BatchDetail() {
  const { batchId } = useParams();
  const [batch, setBatch] = useState(null);
  const [members, setMembers] = useState([]);
  const [allInterns, setAllInterns] = useState([]);
  const [modules, setModules] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("modules");
  const [loading, setLoading] = useState(true);

  // Module modal
  const [moduleModal, setModuleModal] = useState(false);
  const [editModule, setEditModule] = useState(null);
  const [moduleForm, setModuleForm] = useState(EMPTY_MODULE);
  const [resourceUrls, setResourceUrls] = useState([{ type: "Link", url: "", label: "" }]);

  // Task modal
  const [taskModal, setTaskModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [taskForm, setTaskForm] = useState(EMPTY_TASK);

  // Intern modal
  const [internModal, setInternModal] = useState(false);

  const [saving, setSaving] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);

  useEffect(() => { fetchAll(); }, [batchId]);

  async function fetchAll() {
    setLoading(true);
    try {
      const batchDoc = await getDoc(doc(db, "batches", batchId));
      setBatch(batchDoc.exists() ? { id: batchDoc.id, ...batchDoc.data() } : null);

      const internsQ = query(collection(db, "profiles"), where("role", "==", "intern"));
      const internsRes = await getDocs(internsQ);
      const internsList = internsRes.docs.map(d => ({ id: d.id, ...d.data() }));
      setAllInterns(internsList);

      const memQ = query(collection(db, "batch_members"), where("batch_id", "==", batchId));
      const membersRes = await getDocs(memQ);
      setMembers(membersRes.docs.map(d => {
         const data = d.data();
         const profile = internsList.find(i => i.id === data.user_id) || {};
         return { user_id: data.user_id, profiles: profile };
      }));

      const modQ = query(collection(db, "modules"), where("batch_id", "==", batchId));
      const modulesRes = await getDocs(modQ);
      const modsList = modulesRes.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
      setModules(modsList);

      if (modsList.length > 0) {
        const modIds = modsList.map(m => m.id);
        const tasksQ = query(collection(db, "tasks"), orderBy("created_at"));
        const tasksRes = await getDocs(tasksQ);
        const taskData = tasksRes.docs
           .map(d => ({ id: d.id, ...d.data() }))
           .filter(t => modIds.includes(t.module_id));
        setTasks(taskData);
      } else {
        setTasks([]);
      }
    } catch(e) { console.error(e); }
    setLoading(false);
  }

  // ─── Module CRUD ───────────────────────────────────────────────────────────
  function openCreateModule() {
    setEditModule(null);
    setModuleForm({ ...EMPTY_MODULE, sort_order: modules.length });
    setResourceUrls([{ type: "Link", url: "", label: "" }]);
    setModuleModal(true);
  }

  function openEditModule(mod) {
    setEditModule(mod);
    setModuleForm({ title: mod.title, description: mod.description || "", sort_order: mod.sort_order });
    setResourceUrls(mod.resource_urls?.length ? mod.resource_urls : [{ type: "Link", url: "", label: "" }]);
    setModuleModal(true);
  }

  async function saveModule(e) {
    e.preventDefault();
    if (!moduleForm.title) { toast.error("Module title required."); return; }
    setSaving(true);
    const payload = { ...moduleForm, batch_id: batchId, resource_urls: resourceUrls.filter((r) => r.url) };
    try {
      if (editModule) {
        await updateDoc(doc(db, "modules", editModule.id), payload);
        toast.success("Module updated.");
      } else {
        payload.created_at = serverTimestamp();
        await addDoc(collection(db, "modules"), payload);
        toast.success("Module created.");
      }
      setModuleModal(false);
      fetchAll();
    } catch (err) { toast.error(err.message); }
    finally { setSaving(false); }
  }

  async function deleteModule(id) {
    if (!window.confirm("Delete this module? All tasks inside will be removed.")) return;
    await deleteDoc(doc(db, "modules", id));
    toast.success("Module deleted.");
    fetchAll();
  }

  // ─── Task CRUD ─────────────────────────────────────────────────────────────
  function openCreateTask(moduleId) {
    setEditTask(null);
    setTaskForm({ ...EMPTY_TASK, module_id: moduleId });
    setTaskModal(true);
  }

  function openEditTask(task) {
    setEditTask(task);
    setTaskForm({ title: task.title, instructions: task.instructions || "", due_date: task.due_date ? task.due_date.slice(0, 16) : "", max_marks: task.max_marks, module_id: task.module_id });
    setTaskModal(true);
  }

  async function saveTask(e) {
    e.preventDefault();
    if (!taskForm.title || !taskForm.module_id) { toast.error("Task title and module required."); return; }
    setSaving(true);
    try {
      if (editTask) {
        await updateDoc(doc(db, "tasks", editTask.id), taskForm);
        toast.success("Task updated.");
      } else {
        await addDoc(collection(db, "tasks"), { ...taskForm, created_at: serverTimestamp() });
        toast.success("Task created.");
      }
      setTaskModal(false);
      fetchAll();
    } catch (err) { toast.error(err.message); }
    finally { setSaving(false); }
  }

  async function deleteTask(id) {
    if (!window.confirm("Delete this task?")) return;
    await deleteDoc(doc(db, "tasks", id));
    toast.success("Task deleted.");
    fetchAll();
  }

  // ─── Intern Management ────────────────────────────────────────────────────
  const memberIds = members.map((m) => m.user_id);
  const nonMembers = allInterns.filter((i) => !memberIds.includes(i.id));

  async function addIntern(userId) {
    try {
      await addDoc(collection(db, "batch_members"), { batch_id: batchId, user_id: userId });
      toast.success("Intern added."); 
      fetchAll();
    } catch(e) {
      toast.error(e.message);
    }
  }

  async function removeIntern(userId) {
    if (!window.confirm("Remove this intern from the batch?")) return;
    try {
      const q = query(collection(db, "batch_members"), where("batch_id", "==", batchId), where("user_id", "==", userId));
      const snaps = await getDocs(q);
      for (const d of snaps.docs) {
        await deleteDoc(d.ref);
      }
      toast.success("Intern removed.");
      fetchAll();
    } catch(e) { toast.error(e.message); }
  }

  function setMf(k) { return (e) => setModuleForm((f) => ({ ...f, [k]: e.target.value })); }
  function setTf(k) { return (e) => setTaskForm((f) => ({ ...f, [k]: e.target.value })); }
  function updateResource(i, field, val) {
    setResourceUrls((prev) => { const n = [...prev]; n[i] = { ...n[i], [field]: val }; return n; });
  }

  if (loading) {
    return (
      <TrainerLayout>
        <div className="p-6 space-y-4">
          <div className="h-24 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-64 bg-white/5 rounded-xl animate-pulse" />
        </div>
      </TrainerLayout>
    );
  }

  if (!batch) {
    return <TrainerLayout><div className="p-6 text-slate-500">Batch not found.</div></TrainerLayout>;
  }

  const moduleTaskCount = (moduleId) => tasks.filter((t) => t.module_id === moduleId).length;

  return (
    <TrainerLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Back + Header */}
        <div>
          <Link to="/lms/trainer/batches" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm mb-4 transition-colors">
            <ArrowLeft size={14} /> Back to Batches
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-slate-900 text-2xl font-bold">{batch.name}</h1>
                <Badge color="sky">{batch.domain}</Badge>
              </div>
              <p className="text-slate-500 text-sm">{formatDate(batch.start_date)} — {formatDate(batch.end_date)}</p>
              {batch.description && <p className="text-slate-500 text-sm mt-1">{batch.description}</p>}
            </div>
            <Button onClick={() => setInternModal(true)} variant="secondary" id="add-intern-btn">
              <UserPlus size={15} /> Add Interns
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[
            { label: "Modules & Tasks", value: "modules", count: modules.length },
            { label: "Enrolled Interns", value: "interns", count: members.length },
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />

        {/* Modules tab */}
        {activeTab === "modules" && (
          <div className="space-y-3">
            <div className="flex justify-end">
              <Button onClick={openCreateModule} id="create-module-btn"><Plus size={15} /> Add Module</Button>
            </div>
            {modules.length === 0 ? (
              <EmptyState icon={BookOpen} title="No modules yet" description="Add your first module to this batch." action={<Button onClick={openCreateModule}><Plus size={15} /> Add Module</Button>} />
            ) : (
              modules.map((mod) => (
                <div key={mod.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  {/* Module header */}
                  <div
                    className="flex items-center gap-3 p-4 cursor-pointer hover:bg-white/3 transition-colors"
                    onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                  >
                    <GripVertical size={16} className="text-slate-600 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className="text-sky-400" />
                        <h3 className="text-slate-700 font-semibold text-sm">{mod.title}</h3>
                        <span className="text-slate-500 text-xs">({moduleTaskCount(mod.id)} tasks)</span>
                      </div>
                      {mod.description && <p className="text-slate-500 text-xs mt-0.5">{mod.description}</p>}
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={(e) => { e.stopPropagation(); openEditModule(mod); }} className="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-sky-400 hover:bg-sky-500/10 transition-all"><Pencil size={12} /></button>
                      <button onClick={(e) => { e.stopPropagation(); deleteModule(mod.id); }} className="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={12} /></button>
                      {expandedModule === mod.id ? <ChevronDown size={16} className="text-slate-500" /> : <ChevronRight size={16} className="text-slate-500" />}
                    </div>
                  </div>

                  {/* Expanded: resources + tasks */}
                  {expandedModule === mod.id && (
                    <div className="border-t border-slate-200">
                      {/* Resources */}
                      {mod.resource_urls?.length > 0 && (
                        <div className="px-4 py-3 bg-white/2 border-b border-slate-200">
                          <p className="text-xs text-slate-500 font-medium mb-2">Resources</p>
                          <div className="flex flex-wrap gap-2">
                            {mod.resource_urls.filter((r) => r.url).map((r, i) => (
                              <a key={i} href={r.url} target="_blank" rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 bg-sky-500/10 border border-sky-500/15 rounded-md px-2 py-1 transition-colors">
                                <Link2 size={11} /> {r.label || r.type} <ExternalLink size={10} />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tasks */}
                      <div className="px-4 py-3">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs text-slate-500 font-medium">Tasks</p>
                          <button
                            onClick={() => openCreateTask(mod.id)}
                            className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
                          >
                            <Plus size={12} /> Add task
                          </button>
                        </div>
                        {tasks.filter((t) => t.module_id === mod.id).length === 0 ? (
                          <p className="text-slate-600 text-xs">No tasks yet.</p>
                        ) : (
                          <div className="space-y-2">
                            {tasks.filter((t) => t.module_id === mod.id).map((task) => {
                              const due = task.due_date ? getDueBadge(task.due_date) : null;
                              return (
                                <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-slate-200 group">
                                  <ClipboardList size={13} className="text-slate-500 shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-slate-700 text-sm font-medium truncate">{task.title}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-slate-500 text-xs">{task.max_marks} marks</span>
                                      {due && <Badge color={due.color} className="text-[10px] py-0">{due.label}</Badge>}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link to={`/lms/trainer/tasks/${task.id}/submissions`} className="text-xs text-slate-500 hover:text-sky-400 px-2 py-1 rounded-md hover:bg-sky-500/10 transition-all">Reviews</Link>
                                    <button onClick={() => openEditTask(task)} className="w-6 h-6 rounded-md flex items-center justify-center text-slate-500 hover:text-sky-400 hover:bg-sky-500/10 transition-all"><Pencil size={11} /></button>
                                    <button onClick={() => deleteTask(task.id)} className="w-6 h-6 rounded-md flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={11} /></button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Interns tab */}
        {activeTab === "interns" && (
          <div className="space-y-3">
            {members.length === 0 ? (
              <EmptyState icon={Users} title="No interns enrolled" description="Add interns to this batch." action={<Button onClick={() => setInternModal(true)}><UserPlus size={15} /> Add Interns</Button>} />
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left text-slate-500 font-medium px-5 py-3">Name</th>
                        <th className="text-left text-slate-500 font-medium px-5 py-3 hidden sm:table-cell">Email</th>
                        <th className="text-left text-slate-500 font-medium px-5 py-3 hidden md:table-cell">Domain</th>
                        <th className="text-left text-slate-500 font-medium px-5 py-3 hidden lg:table-cell">College</th>
                        <th className="px-5 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {members.map((m) => (
                        <tr key={m.user_id} className="hover:bg-white/2 transition-colors">
                          <td className="px-5 py-3">
                            <Link to={`/lms/trainer/interns/${m.user_id}`} className="text-slate-700 hover:text-sky-400 font-medium transition-colors">
                              {m.profiles?.name || "—"}
                            </Link>
                          </td>
                          <td className="px-5 py-3 text-slate-500 hidden sm:table-cell">{m.profiles?.email || "—"}</td>
                          <td className="px-5 py-3 hidden md:table-cell"><Badge color="sky">{m.profiles?.domain || "—"}</Badge></td>
                          <td className="px-5 py-3 text-slate-500 hidden lg:table-cell">{m.profiles?.college || "—"}</td>
                          <td className="px-5 py-3">
                            <button onClick={() => removeIntern(m.user_id)} className="text-slate-500 hover:text-red-400 transition-colors"><X size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Module Modal */}
      <Modal open={moduleModal} onClose={() => setModuleModal(false)} title={editModule ? "Edit Module" : "Create Module"} size="lg">
        <form onSubmit={saveModule} className="space-y-4">
          <Input id="mod-title" label="Module Title *" value={moduleForm.title} onChange={setMf("title")} placeholder="Introduction to React" required />
          <Textarea id="mod-desc" label="Description" value={moduleForm.description} onChange={setMf("description")} placeholder="What interns will learn…" rows={2} />
          <Input id="mod-order" label="Order" type="number" value={moduleForm.sort_order} onChange={setMf("sort_order")} />

          {/* Resources */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-600 text-sm font-medium">Resources</p>
              <button type="button" onClick={() => setResourceUrls((p) => [...p, { type: "Link", url: "", label: "" }])} className="text-xs text-sky-400 hover:text-sky-300 transition-colors">+ Add</button>
            </div>
            <div className="space-y-2">
              {resourceUrls.map((r, i) => (
                <div key={i} className="flex items-center gap-2">
                  <select value={r.type} onChange={(e) => updateResource(i, "type", e.target.value)} className="bg-white border border-slate-300 rounded-lg px-2 py-2 text-slate-700 text-xs focus:outline-none w-24 shrink-0">
                    {RESOURCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <input value={r.label} onChange={(e) => updateResource(i, "label", e.target.value)} placeholder="Label" className="bg-white/5 border border-slate-300 rounded-lg px-2 py-2 text-slate-700 placeholder-slate-500 text-xs focus:outline-none flex-1" />
                  <input value={r.url} onChange={(e) => updateResource(i, "url", e.target.value)} placeholder="URL" className="bg-white/5 border border-slate-300 rounded-lg px-2 py-2 text-slate-700 placeholder-slate-500 text-xs focus:outline-none flex-1" />
                  {resourceUrls.length > 1 && (
                    <button type="button" onClick={() => setResourceUrls((p) => p.filter((_, j) => j !== i))} className="text-slate-500 hover:text-red-400 transition-colors"><X size={14} /></button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModuleModal(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>{editModule ? "Save" : "Create Module"}</Button>
          </div>
        </form>
      </Modal>

      {/* Task Modal */}
      <Modal open={taskModal} onClose={() => setTaskModal(false)} title={editTask ? "Edit Task" : "Create Task"} size="md">
        <form onSubmit={saveTask} className="space-y-4">
          <Input id="task-title" label="Task Title *" value={taskForm.title} onChange={setTf("title")} placeholder="Build a REST API" required />
          <Textarea id="task-instructions" label="Instructions" value={taskForm.instructions} onChange={setTf("instructions")} placeholder="Detailed task instructions…" rows={4} />
          <div className="grid grid-cols-2 gap-3">
            <Input id="task-due" label="Due Date" type="datetime-local" value={taskForm.due_date} onChange={setTf("due_date")} />
            <Input id="task-marks" label="Max Marks" type="number" value={taskForm.max_marks} onChange={setTf("max_marks")} min={1} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setTaskModal(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>{editTask ? "Save" : "Create Task"}</Button>
          </div>
        </form>
      </Modal>

      {/* Add Intern Modal */}
      <Modal open={internModal} onClose={() => setInternModal(false)} title="Add Interns to Batch" size="md">
        {nonMembers.length === 0 ? (
          <EmptyState icon={Users} title="All interns enrolled" description="Every intern is already in this batch." />
        ) : (
          <div className="space-y-2">
            {nonMembers.map((intern) => (
              <div key={intern.id} className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-slate-200 hover:bg-slate-100 transition-colors">
                <div>
                  <p className="text-slate-700 text-sm font-medium">{intern.name}</p>
                  <p className="text-slate-500 text-xs">{intern.email} · {intern.domain}</p>
                </div>
                <Button size="sm" onClick={() => addIntern(intern.id)} id={`add-intern-${intern.id}`}>Add</Button>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </TrainerLayout>
  );
}

