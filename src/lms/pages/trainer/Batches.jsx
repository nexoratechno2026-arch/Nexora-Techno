import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import TrainerLayout from "../../components/TrainerLayout";
import { Card, Badge, SectionHeader, EmptyState } from "../../components/ui.jsx";
import { BookOpen, Calendar, Users, ArrowRight, Search } from "lucide-react";
import { formatDate } from "../../utils/helpers";

const DOMAINS = ["Web Development", "AI & Machine Learning", "AI Automation", "Software Development", "UI/UX Design", "Digital Marketing", "Data Science", "Mobile App Development"];
const DOMAIN_COLORS = { "Web Development": "sky", "AI & Machine Learning": "purple", "AI Automation": "purple", "Software Development": "blue", "UI/UX Design": "orange", "Digital Marketing": "green", "Data Science": "yellow", "Mobile App Development": "orange" };

export default function Batches() {
  const [batches, setBatches] = useState([]);
  const [memberCounts, setMemberCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchBatches(); }, []);

  async function fetchBatches() {
    setLoading(true);
    try {
      const q = query(collection(db, "batches"), orderBy("created_at", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setBatches(data);

      const counts = {};
      await Promise.all(data.map(async (b) => {
        const memQ = query(collection(db, "batch_members"), where("batch_id", "==", b.id));
        const countSnap = await getDocs(memQ);
        counts[b.id] = countSnap.size;
      }));
      setMemberCounts(counts);
    } catch(e) { console.error(e); }
    setLoading(false);
  }

  const filtered = batches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TrainerLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <SectionHeader
          title="Batches"
          description="View your assigned internship batches and cohorts"
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
            title={search ? "No batches found" : "No batches available"}
            description={search ? "Try a different search term." : "There are currently no active batches."}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((batch) => (
              <div key={batch.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-sky-500/20 transition-all group flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <Badge color={DOMAIN_COLORS[batch.domain] || "sky"}>{batch.domain}</Badge>
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
                  to={`/lms/trainer/batches/${batch.id}`}
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
    </TrainerLayout>
  );
}
