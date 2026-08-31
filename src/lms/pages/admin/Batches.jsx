import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, orderBy, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import LMSLayout from "../../components/LMSLayout";
import { Card, Badge, Modal, Input, Textarea, Select, Button, SectionHeader, EmptyState } from "../../components/ui.jsx";
import { Plus, BookOpen, Calendar, Users, ArrowRight, Pencil, Trash2, Search } from "lucide-react";
import { formatDate } from "../../utils/helpers";
import toast from "react-hot-toast";

const DOMAINS = ["Web Development", "AI & Machine Learning", "AI Automation", "Software Development", "UI/UX Design", "Digital Marketing", "Data Science", "Mobile App Development"];
const DOMAIN_COLORS = { "Web Development": "sky", "AI & Machine Learning": "purple", "AI Automation": "purple", "Software Development": "blue", "UI/UX Design": "orange", "Digital Marketing": "green", "Data Science": "yellow", "Mobile App Development": "orange" };

const EMPTY_FORM = { name: "", domain: "", description: "", start_date: "", end_date: "" };

export default function Batches() {
  const [batches, setBatches] = useState([]);
  const [memberCounts, setMemberCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBatch, setEditBatch] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchBatches(); }, []);

  async function fetchBatches() {
    setLoading(true);
    try {
      const q = query(collection(db, "batches"), orderBy("created_at", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      
      setBatches(data);
      const counts = {};
      await Promise.all(data.map(async (b) => {
        const memQ = query(collection(db, "batch_members"), where("batch_id", "==", b.id));
        const memSnap = await getDocs(memQ);
        counts[b.id] = memSnap.size;
      }));
      setMemberCounts(counts);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  function openCreate() {
    setEditBatch(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(batch) {
    setEditBatch(batch);
    setForm({ name: batch.name, domain: batch.domain, description: batch.description || "", start_date: batch.start_date || "", end_date: batch.end_date || "" });
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.name || !form.domain || !form.start_date || !form.end_date) { toast.error("Fill all required fields."); return; }
    setSaving(true);
    try {
      if (editBatch) {
        await updateDoc(doc(db, "batches", editBatch.id), form);
        toast.success("Batch updated.");
      } else {
        await addDoc(collection(db, "batches"), { ...form, created_at: serverTimestamp() });
        toast.success("Batch created.");
      }
      setModalOpen(false);
      fetchBatches();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this batch? All its modules and tasks will be removed.")) return;
    try {
      await deleteDoc(doc(db, "batches", id));
      toast.success("Batch deleted."); 
      fetchBatches();
    } catch (error) {
      toast.error(error.message);
    }
  }

  const filtered = batches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.domain.toLowerCase().includes(search.toLowerCase())
  );

  function set(k) { return (e) => setForm((f) => ({ ...f, [k]: e.target.value })); }

  return (
    <LMSLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <SectionHeader
          title="Batches"
          description="Manage all internship batches and cohorts"
          action={
            <Button onClick={openCreate} id="create-batch-btn">
              <Plus size={16} /> New Batch
            </Button>
          }
        />

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search batches…"
            className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-slate-700
              placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/50 transition-all"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl h-48 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title={search ? "No batches found" : "No batches yet"}
            description={search ? "Try a different search term." : "Create your first internship batch to get started."}
            action={!search && <Button onClick={openCreate}><Plus size={15} /> Create Batch</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((batch) => (
              <div key={batch.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-sky-500/20 transition-all group flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <Badge color={DOMAIN_COLORS[batch.domain] || "sky"}>{batch.domain}</Badge>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEdit(batch)}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-sky-400 hover:bg-sky-500/10 transition-all"
                      aria-label="Edit batch"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => handleDelete(batch.id)}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      aria-label="Delete batch"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                <h3 className="text-slate-900 font-semibold text-base mb-1">{batch.name}</h3>
                {batch.description && (
                  <p className="text-slate-500 text-xs mb-3 line-clamp-2">{batch.description}</p>
                )}
                <div className="mt-auto space-y-2 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Calendar size={12} />
                    {formatDate(batch.start_date)} — {formatDate(batch.end_date)}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Users size={12} />
                    {memberCounts[batch.id] || 0} interns enrolled
                  </div>
                </div>
                <Link
                  to={`/lms/admin/batches/${batch.id}`}
                  className="mt-4 flex items-center justify-center gap-2 text-sky-400 hover:text-sky-300 text-sm font-medium
                    py-2 rounded-lg border border-sky-500/20 hover:bg-sky-500/5 transition-all"
                >
                  Manage batch <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editBatch ? "Edit Batch" : "Create New Batch"} size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <Input id="batch-name" label="Batch Name *" value={form.name} onChange={set("name")} placeholder="Web Dev Batch 2026 - July" required />
          <Select id="batch-domain" label="Domain *" value={form.domain} onChange={set("domain")} required>
            <option value="">Select domain</option>
            {DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
          </Select>
          <Textarea id="batch-desc" label="Description" value={form.description} onChange={set("description")} placeholder="Brief description of the batch…" rows={3} />
          <div className="grid grid-cols-2 gap-3">
            <Input id="batch-start" label="Start Date *" type="date" value={form.start_date} onChange={set("start_date")} required />
            <Input id="batch-end" label="End Date *" type="date" value={form.end_date} onChange={set("end_date")} required />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>{editBatch ? "Save Changes" : "Create Batch"}</Button>
          </div>
        </form>
      </Modal>
    </LMSLayout>
  );
}
