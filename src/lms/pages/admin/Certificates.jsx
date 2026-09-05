import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, doc, addDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import LMSLayout from "../../components/LMSLayout";
import { Badge, Button, SectionHeader, EmptyState, Select } from "../../components/ui.jsx";
import { Award, Download, Plus, CheckCircle, Users, Trash2 } from "lucide-react";
import { formatDate, generateCertNumber } from "../../utils/helpers";
import { generateCertificatePDF } from "../../utils/generateCertificate";
import toast from "react-hot-toast";

export default function AdminCertificates() {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [members, setMembers] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [generating, setGenerating] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Bulk Generation State
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkData, setBulkData] = useState({ type: "Webinar", domain: "", startDate: "", endDate: "", names: "" });
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);

  useEffect(() => {
    getDocs(collection(db, "batches")).then((snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setBatches(data);
      if (data.length) setSelectedBatch(data[0].id);
    });
  }, []);

  useEffect(() => {
    if (selectedBatch) fetchData();
  }, [selectedBatch]);

  async function fetchData() {
    setLoading(true);
    const batch = batches.find((b) => b.id === selectedBatch);
    const mQ = query(collection(db, "batch_members"), where("batch_id", "==", selectedBatch));
    const membersRes = await getDocs(mQ);
    
    const internsQ = query(collection(db, "profiles"), where("role", "==", "intern"));
    const internsRes = await getDocs(internsQ);
    const internsList = internsRes.docs.map(d => ({ id: d.id, ...d.data() }));

    const mappedMembers = membersRes.docs.map(d => {
      const data = d.data();
      const profile = internsList.find(i => i.id === data.user_id) || {};
      return { user_id: data.user_id, profiles: profile };
    });
    setMembers(mappedMembers);

    const cQ = query(collection(db, "certificates"), where("batch_id", "==", selectedBatch));
    const certsRes = await getDocs(cQ);
    setCertificates(certsRes.docs.map(d => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  async function issueCert(member) {
    const batch = batches.find((b) => b.id === selectedBatch);
    const existing = certificates.find((c) => c.user_id === member.user_id);
    if (existing) { toast("Certificate already issued."); return; }

    const projectName = window.prompt("Enter the Project Name for this intern:");
    if (projectName === null) return; // User cancelled

    setGenerating((p) => ({ ...p, [member.user_id]: true }));
    try {
      const certNumber = generateCertNumber(member.user_id, selectedBatch);
      const pdfUrl = await generateCertificatePDF({
        name: member.profiles?.name || "Intern",
        domain: member.profiles?.domain || batch?.domain || "Technology",
        batchName: batch?.name || "Internship",
        startDate: batch?.start_date,
        endDate: batch?.end_date,
        certNumber,
        projectName: projectName || undefined,
      });

      await addDoc(collection(db, "certificates"), {
        user_id: member.user_id,
        batch_id: selectedBatch,
        cert_number: certNumber,
        pdf_url: pdfUrl,
        project_name: projectName || null,
        issued_at: serverTimestamp()
      });

      // Notify intern
      await addDoc(collection(db, "notifications"), {
        user_id: member.user_id,
        title: "🎓 Certificate Issued!",
        message: `Your internship completion certificate for "${batch?.name}" is ready to download.`,
        type: "certificate",
        is_read: false,
        created_at: serverTimestamp()
      });

      toast.success(`Certificate issued to ${member.profiles?.name}.`);

      // Open PDF in new tab for admin preview
      window.open(pdfUrl, "_blank");

      fetchData();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGenerating((p) => ({ ...p, [member.user_id]: false }));
    }
  }

  async function downloadCert(member) {
    const cert = certificates.find((c) => c.user_id === member.user_id);
    const batch = batches.find((b) => b.id === selectedBatch);
    setGenerating((p) => ({ ...p, [member.user_id]: true }));
    try {
      const pdfUrl = await generateCertificatePDF({
        name: member.profiles?.name || "Intern",
        domain: member.profiles?.domain || batch?.domain || "Technology",
        batchName: batch?.name || "Internship",
        startDate: batch?.start_date,
        endDate: batch?.end_date,
        certNumber: cert?.cert_number || "N/A",
        projectName: cert?.project_name || undefined,
      });
      window.open(pdfUrl, "_blank");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGenerating((p) => ({ ...p, [member.user_id]: false }));
    }
  }

  async function revokeCert(userId) {
    if (!window.confirm("Revoke this certificate?")) return;
    try {
      const q = query(collection(db, "certificates"), where("user_id", "==", userId), where("batch_id", "==", selectedBatch));
      const snaps = await getDocs(q);
      for (const d of snaps.docs) {
        await deleteDoc(d.ref);
      }
      toast.success("Certificate revoked.");
      fetchData();
    } catch(e) {}
  }

  const handleBulkGenerate = async (e) => {
    e.preventDefault();
    if (!bulkData.domain || !bulkData.names.trim() || !bulkData.startDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // For Webinar, if endDate is empty, default it to startDate
    const finalEndDate = (bulkData.type === 'Webinar' && !bulkData.endDate) ? bulkData.startDate : bulkData.endDate;
    if (bulkData.type === 'Internship' && !bulkData.endDate) {
       toast.error("Please provide both start and end dates for Internships.");
       return;
    }
    
    setIsBulkGenerating(true);
    try {
      const nameList = bulkData.names.split('\n').map(n => n.trim()).filter(n => n);
      let count = 0;
      
      const virtualBatchId = `bulk-${Date.now()}`;
      
      for (const personName of nameList) {
        const randId = Math.random().toString(36).substring(2, 7).toUpperCase();
        const prefix = bulkData.type === 'Webinar' ? 'WEB' : 'INT';
        const certNumber = `NT-${prefix}-${randId}`;
        
        // Actually generate the PDF blob URL
        const pdfUrl = await generateCertificatePDF({
           name: personName,
           domain: bulkData.domain,
           batchName: bulkData.type,
           startDate: bulkData.startDate,
           endDate: finalEndDate,
           certNumber: certNumber,
        });

        // Trigger automatic download
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = `${personName.replace(/\\s+/g, '_')}_Certificate.pdf`;
        a.click();
        
        await addDoc(collection(db, "certificates"), {
           user_id: `external-${Date.now()}-${count}`,
           batch_id: virtualBatchId,
           cert_number: certNumber,
           pdf_url: pdfUrl, 
           project_name: null,
           issued_at: new Date().getTime(),
           profiles: {
              name: personName,
              domain: bulkData.domain
           },
           batches: {
              name: bulkData.type,
              start_date: bulkData.startDate,
              end_date: finalEndDate
           }
        });
        count++;
      }
      
      toast.success(`Successfully generated and saved ${count} certificates!`);
      setShowBulkModal(false);
      setBulkData({ type: "Webinar", domain: "", startDate: "", endDate: "", names: "" });
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to bulk generate certificates.");
    } finally {
      setIsBulkGenerating(false);
    }
  };

  const hasCert = (userId) => certificates.some((c) => c.user_id === userId);
  const getCert = (userId) => certificates.find((c) => c.user_id === userId);

  return (
    <LMSLayout>
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        <SectionHeader
          title="Certificates"
          description="Issue and manage internship completion certificates"
        />

        {/* Batch selector & Bulk Gen Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-72">
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-700 text-sm
                focus:outline-none focus:border-sky-500/50 transition-all"
              id="cert-batch-select"
            >
              {batches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <Button onClick={() => setShowBulkModal(true)}><Plus size={16} className="mr-2" /> Bulk Generate</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">Enrolled</p>
            <p className="text-slate-900 text-2xl font-bold mt-1">{members.length}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">Certificates Issued</p>
            <p className="text-emerald-400 text-2xl font-bold mt-1">{certificates.length}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">Pending</p>
            <p className="text-yellow-400 text-2xl font-bold mt-1">{members.length - certificates.length}</p>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="h-64 bg-white/5 rounded-xl animate-pulse" />
        ) : members.length === 0 ? (
          <EmptyState icon={Users} title="No interns in this batch" description="Add interns to issue certificates." />
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-slate-500 font-medium px-5 py-3">Intern</th>
                  <th className="text-left text-slate-500 font-medium px-5 py-3 hidden sm:table-cell">Domain</th>
                  <th className="text-left text-slate-500 font-medium px-5 py-3 hidden md:table-cell">Cert ID</th>
                  <th className="text-left text-slate-500 font-medium px-5 py-3 hidden lg:table-cell">Issued</th>
                  <th className="text-center text-slate-500 font-medium px-5 py-3">Status</th>
                  <th className="text-center text-slate-500 font-medium px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {members.map((m) => {
                  const cert = getCert(m.user_id);
                  const issued = hasCert(m.user_id);
                  return (
                    <tr key={m.user_id} className="hover:bg-white/2 transition-colors">
                      <td className="px-5 py-3">
                        <p className="text-slate-700 font-medium">{m.profiles?.name || "—"}</p>
                        <p className="text-slate-500 text-xs">{m.profiles?.email}</p>
                      </td>
                      <td className="px-5 py-3 hidden sm:table-cell">
                        <Badge color="sky">{m.profiles?.domain || "—"}</Badge>
                      </td>
                      <td className="px-5 py-3 text-slate-500 text-xs font-mono hidden md:table-cell">
                        {cert?.cert_number || "—"}
                      </td>
                      <td className="px-5 py-3 text-slate-500 text-xs hidden lg:table-cell">
                        {cert ? formatDate(cert.issued_at) : "—"}
                      </td>
                      <td className="px-5 py-3 text-center">
                        {issued ? (
                          <Badge color="green"><CheckCircle size={11} className="mr-1" />Issued</Badge>
                        ) : (
                          <Badge color="yellow">Pending</Badge>
                        )}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {!issued ? (
                            <Button
                              size="sm"
                              onClick={() => issueCert(m)}
                              loading={generating[m.user_id]}
                              id={`issue-cert-${m.user_id}`}
                            >
                              <Award size={13} /> Issue
                            </Button>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => downloadCert(m)}
                                loading={generating[m.user_id]}
                                id={`download-cert-${m.user_id}`}
                              >
                                <Download size={13} /> Download
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => revokeCert(m.user_id)}
                                id={`revoke-cert-${m.user_id}`}
                              >
                                <Trash2 size={12} />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Bulk Generate Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Users size={18} className="text-sky-500" />
                Bulk Generate Certificates
              </h2>
              <button onClick={() => setShowBulkModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100">
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="bulk-gen-form" onSubmit={handleBulkGenerate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                    <select
                      value={bulkData.type}
                      onChange={(e) => setBulkData({...bulkData, type: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
                    >
                      <option value="Webinar">Webinar</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  {bulkData.type === "Webinar" ? (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={bulkData.startDate}
                        onChange={(e) => setBulkData({...bulkData, startDate: e.target.value, endDate: e.target.value})}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
                        required
                      />
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">From Date</label>
                        <input
                          type="date"
                          value={bulkData.startDate}
                          onChange={(e) => setBulkData({...bulkData, startDate: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">To Date</label>
                        <input
                          type="date"
                          value={bulkData.endDate}
                          onChange={(e) => setBulkData({...bulkData, endDate: e.target.value})}
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
                          required
                        />
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Course / Domain Name</label>
                  <input
                    type="text"
                    value={bulkData.domain}
                    onChange={(e) => setBulkData({...bulkData, domain: e.target.value})}
                    placeholder="e.g. How to Use AI For Career Growth"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">List of Names (One per line)</label>
                  <textarea
                    value={bulkData.names}
                    onChange={(e) => setBulkData({...bulkData, names: e.target.value})}
                    placeholder="Kavitha M&#10;John Doe&#10;Jane Smith"
                    rows={6}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500 resize-y"
                    required
                  />
                </div>
              </form>
            </div>
            
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => setShowBulkModal(false)}>
                Cancel
              </Button>
              <Button form="bulk-gen-form" type="submit" loading={isBulkGenerating}>
                Generate & Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </LMSLayout>
  );
}
