import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, query, where, getDocs, doc, addDoc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
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
  const [bulkData, setBulkData] = useState({
    type: "Webinar",
    domain: "",
    startDate: "",
    endDate: "",
    names: "",
    defaultCollege: "",
    defaultRole: "Student",
  });
  const [isBulkGenerating, setIsBulkGenerating] = useState(false);

  // Single Issue Modal State
  const [issueModalMember, setIssueModalMember] = useState(null);
  const [issueFormData, setIssueFormData] = useState({
    projectName: "",
    regNo: "",
    college: "",
    role: "Student",
  });

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

  function openIssueModal(member) {
    const existing = certificates.find((c) => c.user_id === member.user_id);
    if (existing) { toast("Certificate already issued."); return; }

    const pRole = member.profiles?.role || "Student";
    const normalizedRole = /^(prof|faculty|staff)/i.test(pRole) ? pRole : (pRole === "intern" ? "Student" : pRole);

    setIssueFormData({
      projectName: "",
      regNo: member.profiles?.regNo || member.profiles?.reg_no || member.profiles?.register_no || "",
      college: member.profiles?.college || "",
      role: normalizedRole,
    });
    setIssueModalMember(member);
  }

  async function confirmIssueCert(e) {
    e.preventDefault();
    if (!issueModalMember) return;
    const member = issueModalMember;
    const batch = batches.find((b) => b.id === selectedBatch);

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
        projectName: issueFormData.projectName || undefined,
        regNo: issueFormData.regNo || undefined,
        college: issueFormData.college || undefined,
        role: issueFormData.role || undefined,
        type: batch?.type || (batch?.name?.toLowerCase().includes("webinar") ? "Webinar" : "Internship"),
      });

      await addDoc(collection(db, "certificates"), {
        user_id: member.user_id,
        batch_id: selectedBatch,
        cert_number: certNumber,
        pdf_url: pdfUrl,
        project_name: issueFormData.projectName || null,
        regNo: issueFormData.regNo || null,
        college: issueFormData.college || null,
        role: issueFormData.role || null,
        type: batch?.type || (batch?.name?.toLowerCase().includes("webinar") ? "Webinar" : "Internship"),
        issued_at: serverTimestamp()
      });

      // Also update intern profile with regNo / college if not set
      if (member.user_id && (issueFormData.regNo || issueFormData.college)) {
        try {
          const pRef = doc(db, "profiles", member.user_id);
          const updates = {};
          if (issueFormData.regNo) updates.regNo = issueFormData.regNo;
          if (issueFormData.college && !member.profiles?.college) updates.college = issueFormData.college;
          await setDoc(pRef, updates, { merge: true });
        } catch (err) {
          console.warn("Could not update profile", err);
        }
      }

      // Notify intern
      await addDoc(collection(db, "notifications"), {
        user_id: member.user_id,
        title: "🎓 Certificate Issued!",
        message: `Your certificate for "${batch?.name}" is ready to download.`,
        type: "certificate",
        is_read: false,
        created_at: serverTimestamp()
      });

      toast.success(`Certificate issued to ${member.profiles?.name}.`);

      // Open PDF in new tab for admin preview
      window.open(pdfUrl, "_blank");

      setIssueModalMember(null);
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
        regNo: cert?.regNo || member.profiles?.regNo || member.profiles?.reg_no || member.profiles?.register_no,
        college: cert?.college || member.profiles?.college,
        role: cert?.role || member.profiles?.role,
        type: cert?.type || batch?.type || (batch?.name?.toLowerCase().includes("webinar") ? "Webinar" : "Internship"),
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

  function parseParticipantLine(line, defaultCollege, defaultRole) {
    if (!line || !line.trim()) return null;
    const parts = line.split(/[,\t|]+/).map((p) => p.trim());
    let name = parts[0] || "";
    if (!name) return null;

    let regNo = "";
    let college = defaultCollege || "";
    let role = defaultRole || "Student";

    const isProfTitle = /^(Dr\.|Prof\.|Professor)\s/i.test(name) || /\((faculty|staff|professor|prof)\)/i.test(name);
    if (isProfTitle && role === "Student") {
      role = "Professor";
    }

    if (parts.length === 2) {
      const p1 = parts[1];
      if (/^(faculty|staff|professor|prof|assistant prof|assoc prof|student|intern)$/i.test(p1)) {
        role = p1;
      } else if (p1.toLowerCase().includes("college") || p1.toLowerCase().includes("university") || p1.toLowerCase().includes("institute") || p1.toLowerCase().includes("school")) {
        college = p1;
      } else {
        regNo = p1;
      }
    } else if (parts.length === 3) {
      const p1 = parts[1];
      const p2 = parts[2];
      if (/^(faculty|staff|professor|prof|assistant prof|assoc prof|student|intern)$/i.test(p2)) {
        role = p2;
        if (p1.toLowerCase().includes("college") || p1.toLowerCase().includes("university") || p1.toLowerCase().includes("institute") || p1.toLowerCase().includes("school")) {
          college = p1;
        } else {
          regNo = p1;
        }
      } else {
        regNo = p1;
        college = p2;
      }
    } else if (parts.length >= 4) {
      regNo = parts[1];
      college = parts[2];
      role = parts[3];
    }

    return { name, regNo, college, role };
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

    const rawLines = bulkData.names.split('\n').map(n => n.trim()).filter(n => n);
    const parsedParticipants = rawLines
      .map(line => parseParticipantLine(line, bulkData.defaultCollege, bulkData.defaultRole))
      .filter(Boolean);

    if (parsedParticipants.length === 0) {
      toast.error("No valid participants found in the list.");
      return;
    }
    
    setIsBulkGenerating(true);
    try {
      let count = 0;
      const virtualBatchId = `bulk-${Date.now()}`;
      
      for (const participant of parsedParticipants) {
        const randId = Math.random().toString(36).substring(2, 7).toUpperCase();
        const prefix = bulkData.type === 'Webinar' ? 'WEB' : 'INT';
        const certNumber = `NT-${prefix}-${randId}`;
        
        // Actually generate the PDF blob URL
        const pdfUrl = await generateCertificatePDF({
           name: participant.name,
           domain: bulkData.domain,
           batchName: bulkData.type,
           startDate: bulkData.startDate,
           endDate: finalEndDate,
           certNumber: certNumber,
           regNo: participant.regNo,
           college: participant.college,
           role: participant.role,
           type: bulkData.type,
        });

        // Trigger automatic download
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = `${participant.name.replace(/\s+/g, '_')}_Certificate.pdf`;
        a.click();
        
        await addDoc(collection(db, "certificates"), {
           user_id: `external-${Date.now()}-${count}`,
           batch_id: virtualBatchId,
           cert_number: certNumber,
           pdf_url: pdfUrl, 
           project_name: null,
           type: bulkData.type,
           regNo: participant.regNo || null,
           college: participant.college || null,
           role: participant.role || null,
           issued_at: new Date().getTime(),
           profiles: {
              name: participant.name,
              domain: bulkData.domain,
              college: participant.college || null,
              regNo: participant.regNo || null,
              role: participant.role || null,
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
      setBulkData({
        type: "Webinar",
        domain: "",
        startDate: "",
        endDate: "",
        names: "",
        defaultCollege: "",
        defaultRole: "Student",
      });
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
                              onClick={() => openIssueModal(m)}
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

      {/* Issue Single Certificate Modal */}
      {issueModalMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Award size={18} className="text-sky-500" />
                Issue Certificate
              </h2>
              <button
                type="button"
                onClick={() => setIssueModalMember(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100"
              >
                ✕
              </button>
            </div>
            <form onSubmit={confirmIssueCert} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Participant Name</label>
                <input
                  type="text"
                  disabled
                  value={issueModalMember.profiles?.name || "Intern"}
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 cursor-not-allowed"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Role / Category</label>
                  <select
                    value={issueFormData.role}
                    onChange={(e) => setIssueFormData({ ...issueFormData, role: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
                  >
                    <option value="Student">Student</option>
                    <option value="Professor">Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Faculty / Staff">Faculty / Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    {issueFormData.role.toLowerCase().includes("prof") || issueFormData.role.toLowerCase().includes("staff") || issueFormData.role.toLowerCase().includes("faculty")
                      ? "Staff ID (Optional)"
                      : "Register Number"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      issueFormData.role.toLowerCase().includes("prof") || issueFormData.role.toLowerCase().includes("staff") || issueFormData.role.toLowerCase().includes("faculty")
                        ? "e.g. STF-102"
                        : "e.g. 21UCS101"
                    }
                    value={issueFormData.regNo}
                    onChange={(e) => setIssueFormData({ ...issueFormData, regNo: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">College / University Name</label>
                <input
                  type="text"
                  placeholder="e.g. Muthayammal College of Arts and Science"
                  value={issueFormData.college}
                  onChange={(e) => setIssueFormData({ ...issueFormData, college: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Project Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. AI-Powered Web Application"
                  value={issueFormData.projectName}
                  onChange={(e) => setIssueFormData({ ...issueFormData, projectName: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <Button type="button" variant="secondary" onClick={() => setIssueModalMember(null)}>
                  Cancel
                </Button>
                <Button type="submit" loading={generating[issueModalMember.user_id]}>
                  <Award size={14} className="mr-1" /> Issue Certificate
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Generate Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh]">
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
                      <option value="Webinar">Webinar (Certificate of Participation)</option>
                      <option value="Internship">Internship (Certificate of Completion)</option>
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Course / Domain / Topic Name</label>
                  <input
                    type="text"
                    value={bulkData.domain}
                    onChange={(e) => setBulkData({...bulkData, domain: e.target.value})}
                    placeholder="e.g. How to Use AI For Career Growth"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Default College / Institution</label>
                    <input
                      type="text"
                      value={bulkData.defaultCollege}
                      onChange={(e) => setBulkData({...bulkData, defaultCollege: e.target.value})}
                      placeholder="e.g. Muthayammal College of Arts and Science"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">Applied to all participants without a specific college.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Default Role / Category</label>
                    <select
                      value={bulkData.defaultRole}
                      onChange={(e) => setBulkData({...bulkData, defaultRole: e.target.value})}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-sky-500"
                    >
                      <option value="Student">Students (Default)</option>
                      <option value="Professor">Professors</option>
                      <option value="Faculty / Staff">Faculty / Staff</option>
                    </select>
                    <p className="text-[11px] text-slate-500 mt-1">Dr. / Prof. in names will be auto-recognized as faculty.</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-slate-700">
                      Participant List (One per line)
                    </label>
                    <span className="text-[11px] text-sky-600 font-medium">
                      Format: Name, RegNo, College, Role
                    </span>
                  </div>
                  <textarea
                    value={bulkData.names}
                    onChange={(e) => setBulkData({...bulkData, names: e.target.value})}
                    placeholder={`Kavitha M, 21UCS101\nDr. S. Ramesh, Faculty\nPraveen Kumar, 21UCS105, Salem College\nJane Doe`}
                    rows={6}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-sky-500 resize-y"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    💡 Tip: You can paste columns directly from Excel or Google Sheets. Reg No and College will automatically be included on their certificates.
                  </p>
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
