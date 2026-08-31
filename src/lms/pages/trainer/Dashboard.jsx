import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import TrainerLayout from "../../components/TrainerLayout";
import { StatCard, Card, Badge, ProgressBar, EmptyState } from "../../components/ui.jsx";
import {
  Users, BookOpen, ClipboardList, Award, TrendingUp,
  AlertTriangle, Clock, CheckCircle, ArrowRight, BarChart2
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { formatDate, calcCompletion } from "../../utils/helpers";

const COLORS = ["#0ea5e9", "#6366f1", "#10b981", "#f59e0b", "#ef4444"];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ interns: 0, batches: 0, pending: 0, completionAvg: 0 });
  const [batches, setBatches] = useState([]);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [atRisk, setAtRisk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completionData, setCompletionData] = useState([]);
  const [domainData, setDomainData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const batchRes = await getDocs(collection(db, "batches"));
      const batchList = batchRes.docs.map(d => ({ id: d.id, ...d.data() }));

      const internsQ = query(collection(db, "profiles"), where("role", "==", "intern"));
      const internRes = await getDocs(internsQ);
      const internList = internRes.docs.map(d => ({ id: d.id, ...d.data() }));

      const pendingQ = query(collection(db, "submissions"), where("status", "==", "pending"));
      const pendingRes = await getDocs(pendingQ);
      const pendingRaw = pendingRes.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0))
        .slice(0, 8);

      const tasksRes = await getDocs(collection(db, "tasks"));
      const tasksList = tasksRes.docs.map(d => ({ id: d.id, ...d.data() }));

      const pendingList = pendingRaw.map(p => {
         const profile = internList.find(i => i.id === p.user_id) || {};
         const task = tasksList.find(t => t.id === p.task_id) || {};
         return { ...p, profiles: { name: profile.name }, tasks: { title: task.title } };
      });

      const attQ = query(collection(db, "attendance"), where("status", "==", "present"));
      const attRes = await getDocs(attQ);
      const attendanceList = attRes.docs.map(d => d.data());

      const memRes = await getDocs(collection(db, "batch_members"));
      const membersList = memRes.docs.map(d => d.data());

      setBatches(batchList);
      setRecentSubmissions(pendingList);

      // Domain distribution for pie chart
      const domainCount = {};
      internList.forEach((i) => {
        domainCount[i.domain || "Unknown"] = (domainCount[i.domain || "Unknown"] || 0) + 1;
      });
      setDomainData(Object.entries(domainCount).map(([name, value]) => ({ name, value })));

      // Real Completion per batch based on 30-day attendance limit
      const compData = batchList.slice(0, 6).map((b) => {
        const presentCount = attendanceList.filter((a) => a.batch_id === b.id).length;
        const internCount = membersList.filter((m) => m.batch_id === b.id).length;
        const maxDays = internCount * 30;
        const completion = maxDays === 0 ? 0 : Math.min(100, Math.round((presentCount / maxDays) * 100));
        
        return {
          name: b.name.length > 12 ? b.name.slice(0, 12) + "…" : b.name,
          completion,
        };
      });
      setCompletionData(compData);

      setStats({
        interns: internList.length,
        batches: batchList.length,
        pending: pendingList.length,
        completionAvg: compData.length
          ? Math.round(compData.reduce((a, b) => a + b.completion, 0) / compData.length)
          : 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-[#0d1d35] border border-slate-300 rounded-lg px-3 py-2 text-xs">
          <p className="text-slate-100 font-medium">{label}</p>
          <p className="text-sky-400">{payload[0].value}% completion</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <TrainerLayout>
        <div className="flex items-center justify-center h-full min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </TrainerLayout>
    );
  }

  return (
    <TrainerLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-slate-900 text-2xl font-bold">Trainer Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Overview of all internship programs</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Total Interns" value={stats.interns} color="sky" />
          <StatCard icon={BookOpen} label="Active Batches" value={stats.batches} color="purple" />
          <StatCard icon={ClipboardList} label="Pending Reviews" value={stats.pending} color="yellow" />
          <StatCard icon={TrendingUp} label="Avg. Completion" value={`${stats.completionAvg}%`} color="green" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Bar chart */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <BarChart2 size={16} className="text-sky-400" />
              <h2 className="text-slate-700 font-semibold text-sm">Batch Completion Rate</h2>
            </div>
            {completionData.length === 0 ? (
              <EmptyState icon={BarChart2} title="No batch data yet" description="Create batches to see completion stats." />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={completionData} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="completion" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Donut chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <Users size={16} className="text-purple-400" />
              <h2 className="text-slate-700 font-semibold text-sm">Interns by Domain</h2>
            </div>
            {domainData.length === 0 ? (
              <EmptyState icon={Users} title="No interns yet" description="Interns will appear here after signup." />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={domainData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {domainData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0d1d35", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Batches */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-slate-700 font-semibold text-sm">Recent Batches</h2>
              <Link to="/lms/trainer/batches" className="text-sky-400 text-xs hover:text-sky-300 flex items-center gap-1 transition-colors">
                View all <ArrowRight size={12} />
              </Link>
            </div>
            {batches.length === 0 ? (
              <EmptyState icon={BookOpen} title="No batches yet" description="Create your first batch to get started." />
            ) : (
              <div className="space-y-3">
                {batches.slice(0, 4).map((b) => (
                  <Link
                    key={b.id}
                    to={`/lms/trainer/batches/${b.id}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/3 hover:bg-white/6 border border-slate-200 transition-all group"
                  >
                    <div>
                      <p className="text-slate-700 text-sm font-medium group-hover:text-sky-400 transition-colors">{b.name}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{formatDate(b.start_date)} — {formatDate(b.end_date)}</p>
                    </div>
                    <Badge color="sky">{b.domain}</Badge>
                  </Link>
                ))}
              </div>
            )}
          </Card>

          {/* Pending Submissions */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-slate-700 font-semibold text-sm flex items-center gap-2">
                <Clock size={14} className="text-yellow-400" />
                Pending Reviews
                {recentSubmissions.length > 0 && (
                  <span className="bg-yellow-500/15 text-yellow-400 text-xs px-1.5 py-0.5 rounded-full border border-yellow-500/20">
                    {recentSubmissions.length}
                  </span>
                )}
              </h2>
            </div>
            {recentSubmissions.length === 0 ? (
              <EmptyState icon={CheckCircle} title="All caught up!" description="No submissions waiting for review." />
            ) : (
              <div className="space-y-2">
                {recentSubmissions.slice(0, 5).map((s) => (
                  <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-slate-200">
                    <div className="w-7 h-7 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                      <ClipboardList size={13} className="text-yellow-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-700 text-sm truncate">{s.profiles?.name || "Intern"}</p>
                      <p className="text-slate-500 text-xs truncate">{s.tasks?.title || "Task"}</p>
                    </div>
                    <Badge color="yellow">Pending</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </TrainerLayout>
  );
}

