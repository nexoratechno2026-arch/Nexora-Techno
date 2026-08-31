import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, doc, orderBy, addDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import LMSLayout from "../../components/LMSLayout";
import { Card, Badge, Modal, Button, SectionHeader, EmptyState, Input, Textarea, Select } from "../../components/ui.jsx";
import { Megaphone, Plus, Trash2, Globe, BookOpen } from "lucide-react";
import { formatDateTime } from "../../utils/helpers";
import toast from "react-hot-toast";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [batches, setBatches] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", message: "", batch_id: "" });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const bRes = await getDocs(collection(db, "batches"));
      const batchesList = bRes.docs.map(d => ({ id: d.id, ...d.data() }));
      setBatches(batchesList);

      const aQ = query(collection(db, "announcements"), orderBy("created_at", "desc"));
      const aRes = await getDocs(aQ);
      
      const annList = aRes.docs.map(d => {
        const data = d.data();
        let bName = null;
        if (data.batch_id) {
          bName = batchesList.find(b => b.id === data.batch_id)?.name;
        }
        return { id: d.id, ...data, batches: bName ? { name: bName } : null };
      });
      setAnnouncements(annList);
    } catch(e) { console.error(e); }
    setLoading(false);
  }

  function set(k) { return (e) => setForm((f) => ({ ...f, [k]: e.target.value })); }

  async function handlePost(e) {
    e.preventDefault();
    if (!form.title || !form.message) { toast.error("Title and message required."); return; }
    setSaving(true);
    try {
      const payload = { title: form.title, message: form.message, batch_id: form.batch_id || null, created_at: serverTimestamp() };
      await addDoc(collection(db, "announcements"), payload);
      
      let userIds = [];
      if (form.batch_id) {
        const mQ = query(collection(db, "batch_members"), where("batch_id", "==", form.batch_id));
        const members = await getDocs(mQ);
        userIds = members.docs.map(d => d.data().user_id);
      } else {
        const pQ = query(collection(db, "profiles"), where("role", "==", "intern"));
        const interns = await getDocs(pQ);
        userIds = interns.docs.map(d => d.id);
      }

      if (userIds.length > 0) {
        await Promise.all(userIds.map(uid => addDoc(collection(db, "notifications"), {
          user_id: uid,
          title: `📢 ${form.title}`,
          message: form.message.slice(0, 120),
          type: "announcement",
          is_read: false,
          created_at: serverTimestamp()
        })));
      }

      toast.success("Announcement posted.");
      setModalOpen(false);
      setForm({ title: "", message: "", batch_id: "" });
      fetchData();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await deleteDoc(doc(db, "announcements", id));
      toast.success("Announcement deleted.");
      fetchData();
    } catch(e) {}
  }

  return (
    <LMSLayout>
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <SectionHeader
          title="Announcements"
          description="Post updates and notices to interns"
          action={<Button onClick={() => setModalOpen(true)} id="post-announcement-btn"><Plus size={16} /> Post Announcement</Button>}
        />

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-28 bg-white/5 rounded-xl animate-pulse" />)}
          </div>
        ) : announcements.length === 0 ? (
          <EmptyState
            icon={Megaphone}
            title="No announcements yet"
            description="Post your first announcement to keep interns informed."
            action={<Button onClick={() => setModalOpen(true)}><Plus size={15} /> Post Now</Button>}
          />
        ) : (
          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-white/10 transition-all group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-slate-700 font-semibold">{ann.title}</h3>
                      {ann.batch_id ? (
                        <Badge color="sky"><BookOpen size={10} className="mr-1" />{ann.batches?.name || "Batch"}</Badge>
                      ) : (
                        <Badge color="purple"><Globe size={10} className="mr-1" />All Interns</Badge>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{ann.message}</p>
                    <p className="text-slate-600 text-xs mt-2">{formatDateTime(ann.created_at)}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(ann.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all w-7 h-7 rounded-md flex items-center justify-center hover:bg-red-500/10 shrink-0"
                    aria-label="Delete announcement"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Post Announcement" size="md">
        <form onSubmit={handlePost} className="space-y-4">
          <Input id="ann-title" label="Title *" value={form.title} onChange={set("title")} placeholder="Important update…" required />
          <Textarea id="ann-message" label="Message *" value={form.message} onChange={set("message")} placeholder="Write your announcement here…" rows={4} required />
          <Select id="ann-batch" label="Target Audience" value={form.batch_id} onChange={set("batch_id")}>
            <option value="">All Interns (broadcast)</option>
            {batches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </Select>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={saving}><Megaphone size={15} /> Post</Button>
          </div>
        </form>
      </Modal>
    </LMSLayout>
  );
}
