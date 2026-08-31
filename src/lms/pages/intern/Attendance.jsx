import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import LMSLayout from "../../components/LMSLayout";
import { Badge, EmptyState } from "../../components/ui.jsx";
import { CalendarCheck, ChevronLeft, ChevronRight } from "lucide-react";

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function InternAttendance() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState({});
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ present: 0, absent: 0, total: 0 });
  const [batchId, setBatchId] = useState(null);

  const year = now.getFullYear();
  const month = now.getMonth();

  useEffect(() => {
    async function getBatch() {
      const bmemQ = query(collection(db, "batch_members"), where("user_id", "==", user.uid), limit(1));
      const bmemRes = await getDocs(bmemQ);
      if (!bmemRes.empty) {
        setBatchId(bmemRes.docs[0].data().batch_id);
      }
    }
    if (user) getBatch();
  }, [user]);

  useEffect(() => {
    if (batchId) fetchAttendance();
  }, [batchId, year, month]);

  async function fetchAttendance() {
    setLoading(true);
    const attQ = query(collection(db, "attendance"), where("user_id", "==", user.uid), where("batch_id", "==", batchId));
    const attRes = await getDocs(attQ);

    const map = {};
    let present = 0, absent = 0;
    attRes.docs.forEach((d) => {
      const a = d.data();
      map[a.date] = a.status;
      if (a.status === "present") present++;
      else absent++;
    });
    setAttendance(map);
    setSummary({ present, absent, total: 30 });
    setLoading(false);
  }

  // Build calendar grid
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const calendarCells = [];

  // Empty cells before first day
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }

  const today = new Date().toISOString().slice(0, 10);

  function dateKey(d) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  const pct = Math.min(100, Math.round((summary.present / 30) * 100));

  return (
    <LMSLayout>
      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        <div>
          <h1 className="text-slate-900 text-2xl font-bold">My Attendance</h1>
          <p className="text-slate-500 text-sm mt-1">Your attendance record</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{summary.present}</p>
            <p className="text-slate-500 text-xs mt-1">Present</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-slate-400">30</p>
            <p className="text-slate-500 text-xs mt-1">Total Class Days</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${pct >= 75 ? "text-sky-400" : "text-orange-400"}`}>{pct}%</p>
            <p className="text-slate-500 text-xs mt-1">Attendance</p>
          </div>
        </div>

        {/* Attendance bar */}
        {summary.total > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Attendance Rate</span>
              <span className={pct >= 75 ? "text-emerald-400" : "text-orange-400"}>{pct}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${pct >= 75 ? "bg-emerald-500" : "bg-orange-500"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            {pct < 75 && <p className="text-orange-400 text-xs mt-2">⚠️ Attendance below 75%. Please attend regularly.</p>}
          </div>
        )}

        {/* Calendar */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {/* Month nav */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
            <button
              onClick={() => setNow(new Date(year, month - 1, 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
            ><ChevronLeft size={16} /></button>
            <h2 className="text-slate-700 font-semibold text-sm">{MONTH_NAMES[month]} {year}</h2>
            <button
              onClick={() => setNow(new Date(year, month + 1, 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
            ><ChevronRight size={16} /></button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 border-b border-slate-200">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-center text-slate-500 text-xs font-medium py-3">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-px bg-white/3 p-3">
            {calendarCells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;
              const key = dateKey(day);
              const status = attendance[key];
              const isToday = key === today;
              const isFuture = key > today;

              return (
                <div
                  key={key}
                  className={`aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium transition-all
                    ${isToday ? "ring-2 ring-sky-500" : ""}
                    ${status === "present"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : status === "absent"
                      ? "bg-red-500/10 text-red-400"
                      : isFuture
                      ? "text-slate-600"
                      : "text-slate-500"
                    }`}
                >
                  <span>{day}</span>
                  {status === "present" && <div className="w-1 h-1 rounded-full bg-emerald-400 mt-0.5" />}
                  {status === "absent" && <div className="w-1 h-1 rounded-full bg-red-400 mt-0.5" />}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="px-5 py-3 border-t border-slate-200 flex items-center gap-5 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40" /> Present
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-red-500/10 border border-red-500/20" /> Absent
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-transparent border border-slate-600" /> Not marked
            </span>
          </div>
        </div>

        {!batchId && !loading && (
          <EmptyState icon={CalendarCheck} title="No batch assigned" description="Attendance will appear after you're enrolled in a batch." />
        )}
      </div>
    </LMSLayout>
  );
}
