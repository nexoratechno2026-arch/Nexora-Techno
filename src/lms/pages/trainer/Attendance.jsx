import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import TrainerLayout from "../../components/TrainerLayout";
import { Badge, Button, SectionHeader, EmptyState, Select } from "../../components/ui.jsx";
import { CalendarCheck, ChevronLeft, ChevronRight, Users } from "lucide-react";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/helpers";

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getMonthDates(year, month) {
  const days = getDaysInMonth(year, month);
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(year, month, i + 1);
    return d.toISOString().slice(0, 10);
  });
}

export default function AdminAttendance() {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [members, setMembers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [pendingChanges, setPendingChanges] = useState([]);
  const [saving, setSaving] = useState(false);
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const year = now.getFullYear();
  const month = now.getMonth();
  const monthDates = getMonthDates(year, month);
  const monthName = now.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  useEffect(() => {
    getDocs(collection(db, "batches")).then((snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setBatches(data);
      if (data.length) setSelectedBatch(data[0].id);
    });
  }, []);

  useEffect(() => {
    if (selectedBatch) fetchAttendance();
  }, [selectedBatch, year, month]);

  async function fetchAttendance() {
    setLoading(true);
    const memQ = query(collection(db, "batch_members"), where("batch_id", "==", selectedBatch));
    const membersRes = await getDocs(memQ);
    
    const internsQ = query(collection(db, "profiles"), where("role", "==", "intern"));
    const internsRes = await getDocs(internsQ);
    const internsList = internsRes.docs.map(d => ({ id: d.id, ...d.data() }));

    const mappedMembers = membersRes.docs.map(d => {
      const data = d.data();
      const profile = internsList.find(i => i.id === data.user_id) || {};
      return { user_id: data.user_id, profiles: profile };
    });
    setMembers(mappedMembers);

    const attQ = query(collection(db, "attendance"), where("batch_id", "==", selectedBatch));
    const attRes = await getDocs(attQ);

    const att = {};
    attRes.docs.forEach((doc) => {
      const a = doc.data();
      if (!att[a.user_id]) att[a.user_id] = {};
      att[a.user_id][a.date] = a.status;
    });
    setAttendance(att);
    setPendingChanges([]);
    setLoading(false);
  }

  function toggleAttendance(userId, date) {
    const current = attendance[userId]?.[date] || "absent";
    const next = current === "present" ? "absent" : "present";

    setAttendance((prev) => ({
      ...prev,
      [userId]: { ...(prev[userId] || {}), [date]: next },
    }));

    setPendingChanges((prev) => {
      const existing = prev.filter(p => !(p.user_id === userId && p.date === date));
      return [...existing, { batch_id: selectedBatch, user_id: userId, date, status: next }];
    });
  }

  function markAllPresent(date) {
    const updates = members.map((m) => ({
      batch_id: selectedBatch,
      user_id: m.user_id,
      date,
      status: "present",
    }));
    
    setAttendance((prev) => {
      const next = { ...prev };
      members.forEach((m) => {
        if (!next[m.user_id]) next[m.user_id] = {};
        next[m.user_id][date] = "present";
      });
      return next;
    });

    setPendingChanges((prev) => {
      const existing = prev.filter(p => p.date !== date);
      return [...existing, ...updates];
    });
  }

  async function saveChanges() {
    if (pendingChanges.length === 0) return;
    setSaving(true);
    try {
      await Promise.all(pendingChanges.map(async (p) => {
        const attId = `${p.batch_id}_${p.user_id}_${p.date}`;
        await setDoc(doc(db, "attendance", attId), p);
      }));
      toast.success("Attendance saved successfully!");
      setPendingChanges([]);
    } catch(e) {
      toast.error("Failed to save changes.");
    }
    setSaving(false);
  }

  // Show all dates in the month instead of just last 7
  const today = new Date().toISOString().slice(0, 10);
  const daysToShow = monthDates;

  const presentCount = (userId) =>
    Object.values(attendance[userId] || {}).filter((v) => v === "present").length;

  return (
    <TrainerLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <SectionHeader title="Attendance" description="Track daily attendance for each batch" />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-full sm:w-64">
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-700 text-sm
                focus:outline-none focus:border-sky-500/50 transition-all"
              id="attendance-batch-select"
            >
              {batches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNow(new Date(year, month - 1, 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
            ><ChevronLeft size={16} /></button>
            <span className="text-slate-700 text-sm font-medium w-36 text-center">{monthName}</span>
            <button
              onClick={() => setNow(new Date(year, month + 1, 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
            ><ChevronRight size={16} /></button>
          </div>
          <div className="flex-1" />
          <button
            onClick={saveChanges}
            disabled={saving || pendingChanges.length === 0}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm shadow-sm"
          >
            {saving ? "Saving..." : `Save Changes ${pendingChanges.length > 0 ? `(${pendingChanges.length})` : ""}`}
          </button>
        </div>

        {/* Attendance Table */}
        {loading ? (
          <div className="h-64 bg-slate-100 rounded-xl animate-pulse" />
        ) : members.length === 0 ? (
          <EmptyState icon={Users} title="No interns in this batch" description="Add interns first." />
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-slate-500 font-medium px-4 py-3 sticky left-0 bg-white min-w-[160px] z-10 shadow-[1px_0_0_0_#e2e8f0]">Intern</th>
                  <th className="text-center text-slate-500 font-medium px-2 py-3 min-w-[48px] bg-slate-50">Total</th>
                  {daysToShow.map((date) => (
                    <th key={date} className="text-center px-1 py-3 min-w-[48px]">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className={`text-[10px] font-medium ${date === today ? "text-sky-500" : "text-slate-500"}`}>
                          {new Date(date).toLocaleDateString("en-IN", { weekday: "short" })}
                        </span>
                        <span className={`text-xs ${date === today ? "text-sky-500 font-bold" : "text-slate-600"}`}>
                          {new Date(date).getDate()}
                        </span>
                        <button
                          onClick={() => markAllPresent(date)}
                          className="text-[9px] text-slate-400 hover:text-emerald-500 transition-colors mt-0.5 whitespace-nowrap"
                          title="Mark all present"
                        >All ✓</button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((m) => (
                  <tr key={m.user_id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 sticky left-0 bg-white group-hover:bg-slate-50 shadow-[1px_0_0_0_#e2e8f0] z-10">
                      <p className="text-slate-700 font-medium">{m.profiles?.name || "—"}</p>
                      <p className="text-slate-500 text-xs">{m.profiles?.email}</p>
                    </td>
                    <td className="px-2 py-3 text-center bg-slate-50/50 whitespace-nowrap">
                      <span className="text-emerald-600 font-bold">{presentCount(m.user_id)}</span>
                      <span className="text-slate-500 text-xs font-medium ml-1">/ 30</span>
                    </td>
                    {daysToShow.map((date) => {
                      const status = attendance[m.user_id]?.[date];
                      const isPending = pendingChanges.some(p => p.user_id === m.user_id && p.date === date);
                      return (
                        <td key={date} className="px-1 py-3 text-center">
                          <button
                            onClick={() => toggleAttendance(m.user_id, date)}
                            title={`${status === "present" ? "Present" : "Absent"} — click to toggle`}
                            className={`w-7 h-7 rounded-full text-xs font-bold transition-all border
                              ${status === "present"
                                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-600 hover:bg-emerald-500/30"
                                : "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
                              }
                              ${isPending ? "ring-2 ring-amber-400 ring-offset-1" : ""}
                              `}
                          >
                            {status === "present" ? "P" : "A"}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {/* Daily Total Row */}
                <tr className="bg-slate-50 font-bold border-t border-slate-200">
                  <td colSpan="2" className="px-4 py-3 sticky left-0 bg-slate-50 shadow-[1px_0_0_0_#e2e8f0] z-10 text-right text-slate-600">
                    Total Present:
                  </td>
                  {daysToShow.map((date) => {
                    const count = members.filter(m => attendance[m.user_id]?.[date] === "present").length;
                    return (
                      <td key={date} className="px-1 py-3 text-center text-emerald-600 text-sm">
                        {count > 0 ? count : "-"}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-slate-200 flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 inline-block" /> Present (P)</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-red-500/10 border border-red-500/20 inline-block" /> Absent (A)</span>
              <span>Click a cell to toggle · Showing all days of {monthName}</span>
            </div>
          </div>
        )}
      </div>
    </TrainerLayout>
  );
}

