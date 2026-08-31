import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, limit, getDoc, doc } from "firebase/firestore";
import LMSLayout from "../../components/LMSLayout";
import { Badge, Button, ProgressBar, EmptyState } from "../../components/ui.jsx";
import { Award, Download, Lock, CheckCircle, GraduationCap, Calendar, Hash } from "lucide-react";
import { formatDate, generateCertNumber, calcCompletion } from "../../utils/helpers";
import { generateCertificatePDF } from "../../utils/generateCertificate";
import toast from "react-hot-toast";

export default function InternCertificate() {
  const { user, profile } = useAuth();
  const [batch, setBatch] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [modules, setModules] = useState([]);
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => { if (user) fetchData(); }, [user?.id]);

  async function fetchData() {
    setLoading(true);
    try {
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
      const mods = modRes.docs.map(d => ({ id: d.id, ...d.data() }));

      const compQ = query(collection(db, "lesson_completions"), where("user_id", "==", user.uid));
      const compRes = await getDocs(compQ);
      const comps = compRes.docs.map(d => ({ id: d.id, ...d.data() }));

      const certQ = query(collection(db, "certificates"), where("user_id", "==", user.uid), where("batch_id", "==", batchData.id), limit(1));
      const certRes = await getDocs(certQ);
      const certData = certRes.empty ? null : { id: certRes.docs[0].id, ...certRes.docs[0].data() };

      setModules(mods);
      setCompletions(comps);
      setCertificate(certData);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  const completion = calcCompletion(completions.length, modules.length);
  const isEligible = certificate !== null;

  async function handleDownload() {
    if (!certificate || !batch) return;
    setDownloading(true);
    try {
      const pdfUrl = await generateCertificatePDF({
        name: profile?.name || "Intern",
        domain: profile?.domain || batch.domain || "Technology",
        batchName: batch.name,
        startDate: batch.start_date,
        endDate: batch.end_date,
        certNumber: certificate.cert_number,
        projectName: certificate.project_name || undefined,
      });
      window.open(pdfUrl, "_blank");
    } catch (err) {
      toast.error("Failed to generate certificate.");
    } finally {
      setDownloading(false);
    }
  }

  if (loading) return (
    <LMSLayout>
      <div className="p-6"><div className="h-64 bg-white/5 rounded-xl animate-pulse" /></div>
    </LMSLayout>
  );

  return (
    <LMSLayout>
      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        <div>
          <h1 className="text-slate-900 text-2xl font-bold">My Certificate</h1>
          <p className="text-slate-500 text-sm mt-1">Your internship completion certificate</p>
        </div>

        {!batch ? (
          <EmptyState icon={GraduationCap} title="No batch assigned" description="You'll receive a certificate upon completing your internship batch." />
        ) : (
          <>
            {/* Progress card */}
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-700 font-semibold text-sm">Course Progress</p>
                <span className={`text-lg font-bold ${completion === 100 ? "text-emerald-400" : "text-sky-400"}`}>{completion}%</span>
              </div>
              <ProgressBar
                value={completions.length}
                max={modules.length}
                color={completion === 100 ? "green" : "sky"}
                showLabel={false}
                height="h-3"
              />
              <p className="text-slate-500 text-xs mt-2">
                {completions.length} of {modules.length} modules completed
                {completion === 100 && " ✅"}
              </p>
            </div>

            {/* Certificate card */}
            {isEligible ? (
              <div className="relative overflow-hidden bg-gradient-to-br from-[#0a1e38] to-[#071628] border border-sky-500/20 rounded-2xl p-6">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-48 h-48 opacity-5 pointer-events-none">
                  <Award size={192} className="text-sky-400" />
                </div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
                      <Award size={24} className="text-slate-900" />
                    </div>
                    <div>
                      <p className="text-sky-400 font-bold">Certificate of Completion</p>
                      <p className="text-slate-500 text-xs">Nexora Techno Internship Program</p>
                    </div>
                  </div>

                  <h2 className="text-slate-900 text-xl font-bold mb-1">{profile?.name}</h2>
                  <p className="text-slate-600 text-sm">has successfully completed</p>
                  <p className="text-sky-400 font-semibold text-base mt-1">{profile?.domain || batch.domain}</p>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Calendar size={13} className="text-slate-500" />
                      {formatDate(batch.start_date)} — {formatDate(batch.end_date)}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Hash size={13} className="text-slate-500" />
                      <span className="font-mono">{certificate.cert_number}</span>
                    </div>
                  </div>

                  {certificate.issued_at && (
                    <p className="text-slate-500 text-xs mt-2">Issued on {formatDate(certificate.issued_at)}</p>
                  )}

                  <Button
                    onClick={handleDownload}
                    loading={downloading}
                    className="mt-5 w-full"
                    id="download-certificate-btn"
                  >
                    <Download size={16} /> Download Certificate PDF
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Lock size={28} className="text-slate-500" />
                </div>
                <h2 className="text-slate-700 font-semibold text-base">Certificate Locked</h2>
                <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">
                  Your certificate will be issued by your trainer after you complete all modules and the internship period ends.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-slate-200">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${completion === 100 ? "bg-emerald-500/15" : "bg-white/5"}`}>
                      {completion === 100 ? <CheckCircle size={14} className="text-emerald-400" /> : <span className="text-slate-500 text-xs">1</span>}
                    </div>
                    <span className={`text-sm ${completion === 100 ? "text-emerald-400" : "text-slate-500"}`}>
                      Complete all modules ({completion}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-slate-200">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                      <span className="text-slate-500 text-xs">2</span>
                    </div>
                    <span className="text-slate-500 text-sm">Wait for trainer approval</span>
                  </div>
                </div>
              </div>
            )}

            {/* Batch info */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-3">Batch Details</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-slate-500 text-xs">Batch</span><p className="text-slate-700 font-medium mt-0.5">{batch.name}</p></div>
                <div><span className="text-slate-500 text-xs">Domain</span><p className="text-slate-700 font-medium mt-0.5">{batch.domain}</p></div>
                <div><span className="text-slate-500 text-xs">Start</span><p className="text-slate-700 font-medium mt-0.5">{formatDate(batch.start_date)}</p></div>
                <div><span className="text-slate-500 text-xs">End</span><p className="text-slate-700 font-medium mt-0.5">{formatDate(batch.end_date)}</p></div>
              </div>
            </div>
          </>
        )}
      </div>
    </LMSLayout>
  );
}
