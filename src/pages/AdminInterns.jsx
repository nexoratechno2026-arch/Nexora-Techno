import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../supabaseClient";
import internsData from "../data/interns.json";

function AdminInterns() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ user: "", pass: "" });
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("interns");
  
  const [newIntern, setNewIntern] = useState({
    id: "",
    name: "",
    program: "Full Stack Development",
    duration: "05/05/2026 - 25/05/2026",
    status: "Completed",
    completionDate: "2026-05-25",
  });


  const [internList, setInternList] = useState([]);
  const [applicationList, setApplicationList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Security: No persistent login. Always ask for password on refresh.
  useEffect(() => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const { data: interns } = await supabase.from("interns").select("*");
      if (interns) setInternList(interns);

      const { data: apps } = await supabase.from("internship_applications").select("*");
      if (apps) setApplicationList(apps);

      const { data: contacts } = await supabase.from("contact_messages").select("*");
      if (contacts) setContactList(contacts);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const envUser = import.meta.env.VITE_ADMIN_USER || "admin";
    const envPass = import.meta.env.VITE_ADMIN_PASS || "nexora2026";

    if (loginData.user === envUser && loginData.pass === envPass) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
      setError("");
      fetchAllData();
    } else {
      setError("Unauthorized access attempt.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuth");
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.from("interns").insert([newIntern]);
      if (error) throw error;
      setMessage("Success: Record saved! ✅");
      setNewIntern({
        id: "",
        name: "",
        program: "Full Stack Development",
        duration: "05/05/2026 - 25/05/2026",
        status: "Completed",
        completionDate: "2026-05-25",
      });

      fetchAllData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkImport = async () => {
    if (window.confirm(`Import ${internsData.length} interns from JSON? This will add all records to Supabase.`)) {
      setLoading(true);
      setMessage("");

      try {
        // Prepare data
        const formattedData = internsData.map(intern => ({
          id: intern.id,
          name: intern.name,
          department: intern.department,
          program: getDepartmentProgram(intern.department),
          status: "Completed",
          completionDate: "2026-05-25",
          duration: "05/05/2026 - 25/05/2026",
        }));

        // Insert in batches
        const batchSize = 100;
        for (let i = 0; i < formattedData.length; i += batchSize) {
          const batch = formattedData.slice(i, i + batchSize);
          const { error } = await supabase.from("interns").insert(batch);
          if (error) throw error;
        }

        setMessage(`✅ Successfully imported ${internsData.length} interns!`);
        fetchAllData();
      } catch (err) {
        setMessage(`❌ Import error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdateAllDurations = async () => {
    if (!window.confirm("Update all intern records to 05/05/2026 - 25/05/2026 (20 days)?")) return;
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase
        .from("interns")
        .update({
          duration: "05/05/2026 - 25/05/2026",
          completionDate: "2026-05-25",
          status: "Completed",
        })
        .neq("id", "");

      if (error) throw error;
      setMessage(`✅ Updated ${data?.length ?? "all"} interns to 20 days`);
      fetchAllData();
    } catch (err) {
      setMessage(`❌ Duration update failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getDepartmentProgram = (dept) => {
    const map = {
      "FS": "Full Stack Development",
      "UD": "UI/UX Development",
      "PE": "Prompt Engineering & AI/ML",
    };
    return map[dept] || "Full Stack Development";
  };

  const downloadCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(obj => Object.values(obj).join(","));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#040c18] text-white">
        <div className="w-full max-w-md rounded-[3rem] border border-white/10 bg-white/[0.03] p-8 md:p-12 shadow-2xl backdrop-blur-2xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black tracking-tighter">Nexora <span className="text-blue-400">Admin</span></h1>
            <p className="text-slate-400 mt-2 text-sm">Security Verification Required</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Manager ID" value={loginData.user} onChange={(e) => setLoginData({ ...loginData, user: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-blue-500" required />
            <input type="password" placeholder="Access Key" value={loginData.pass} onChange={(e) => setLoginData({ ...loginData, pass: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-blue-500" required />
            {error && <p className="text-center text-xs text-red-500 font-bold">{error}</p>}
            <button type="submit" className="w-full rounded-full bg-blue-500 py-4 font-black text-slate-950 uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition">Authorize Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#040c18] text-white">
      <Navbar />
      <main className="flex-grow py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6 text-white">
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">NEXORA COMMAND</h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={fetchAllData} className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-bold hover:bg-white/10 transition">Refresh View</button>
              <button onClick={handleUpdateAllDurations} disabled={loading} className="px-6 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-bold hover:bg-emerald-500/20 transition disabled:opacity-50">Set 20-Day Duration</button>
              <button onClick={handleLogout} className="px-6 py-2.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold hover:bg-red-500/20">Logout</button>
            </div>
          </div>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
            {['interns', 'applications', 'contact'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/20' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
                {tab === 'interns' ? 'Students' : tab === 'applications' ? 'Career Apps' : 'Messages'}
              </button>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_2.5fr]">
            <div className="space-y-6">
              {activeTab === 'interns' && (
                <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8">
                  <h3 className="text-xl font-bold mb-6">New Certificate</h3>
                  <form onSubmit={handleAdd} className="space-y-3">
                    <input type="text" placeholder="ID (e.g. NT2026)" value={newIntern.id} onChange={(e) => setNewIntern({ ...newIntern, id: e.target.value.toUpperCase() })} className="w-full rounded-xl bg-black/40 border border-white/10 p-3.5 text-sm outline-none focus:border-blue-500" required />
                    <input type="text" placeholder="Full Student Name" value={newIntern.name} onChange={(e) => setNewIntern({ ...newIntern, name: e.target.value })} className="w-full rounded-xl bg-black/40 border border-white/10 p-3.5 text-sm outline-none focus:border-blue-500" required />
                    <select value={newIntern.program} onChange={(e) => setNewIntern({ ...newIntern, program: e.target.value })} className="w-full rounded-xl bg-[#07142a] border border-white/10 p-3.5 text-sm outline-none focus:border-blue-500">
                      <option value="Full Stack Development">Full Stack Development (FS)</option>
                      <option value="UI/UX Development">UI/UX Development (UD)</option>
                      <option value="Prompt Engineering & AI/ML">Prompt Engineering & AI/ML (PE)</option>
                    </select>

                    <input type="date" value={newIntern.completionDate} onChange={(e) => setNewIntern({ ...newIntern, completionDate: e.target.value })} className="w-full rounded-xl bg-black/40 border border-white/10 p-3.5 text-sm outline-none focus:border-blue-500" required />
                    <button type="submit" disabled={loading} className="w-full py-4 rounded-full bg-blue-500 text-slate-950 font-black uppercase text-xs tracking-widest hover:scale-105 transition disabled:opacity-50">Save To Cloud</button>
                  </form>
                  {activeTab === 'interns' && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <p className="text-xs text-slate-400 mb-4 italic">Or bulk import all {internsData.length} interns from JSON</p>
                      <button onClick={handleBulkImport} disabled={loading} className="w-full py-4 rounded-full bg-green-600 text-white font-black uppercase text-xs tracking-widest hover:scale-105 transition disabled:opacity-50">🚀 Bulk Import JSON</button>
                    </div>
                  )}
                </div>
              )}
              {message && (
                <div className={`rounded-[2rem] border p-6 text-center text-sm font-bold ${message.includes('✅') ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-red-500/30 bg-red-500/10 text-red-400'}`}>
                  {message}
                </div>
              )}
              <div className="rounded-[2.5rem] border border-blue-500/10 bg-blue-500/5 p-8 text-center">
                <p className="text-xs text-slate-400 mb-6 italic">Export live data to Excel (CSV)</p>
                <button onClick={() => downloadCSV(activeTab === 'interns' ? internList : activeTab === 'applications' ? applicationList : contactList, activeTab)} className="w-full py-4 rounded-full border border-blue-400/20 bg-blue-400/10 text-blue-300 font-bold hover:bg-blue-400/20 transition-all">Download EXCEL</button>
              </div>
            </div>

            <div className="rounded-[3rem] border border-white/10 bg-black/40 p-8 min-h-[500px] max-h-[800px] overflow-y-auto shadow-inner">
               <h3 className="text-2xl font-black mb-8 uppercase italic border-b border-white/5 pb-4">Cloud Feed</h3>
               <div className="space-y-4">
                  {activeTab === 'interns' && internList.map(item => (
                    <div key={item.id} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex justify-between items-center hover:bg-white/[0.06] transition text-white">
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-[10px] text-slate-500 font-black uppercase">{item.id} • {item.program}</p>
                      </div>
                      <p className="text-xs font-black text-blue-400">{item.completionDate}</p>
                    </div>
                  ))}
                  {activeTab === 'applications' && applicationList.map(app => (
                    <div key={app.id} className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 text-white">
                      <div className="flex justify-between mb-4">
                         <h4 className="text-xl font-bold">{app.name}</h4>
                         <span className="text-[10px] text-slate-500 font-black text-right">{app.program}</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-400 mb-4">
                         <p>📧 {app.email}</p>
                         <p>📞 {app.phone}</p>
                      </div>
                      <p className="bg-black/40 p-4 rounded-xl text-sm italic text-slate-300 mb-4">"{app.about}"</p>
                      <a href={app.portfolio} target="_blank" className="text-[10px] font-black text-blue-300 uppercase hover:underline">View Resume PDF →</a>
                    </div>
                  ))}
                  {activeTab === 'contact' && contactList.map(msg => (
                    <div key={msg.id} className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 text-white">
                      <div className="flex justify-between mb-2">
                        <h4 className="text-xl font-bold">{msg.name}</h4>
                        <span className="text-[10px] text-blue-400 font-black">{msg.service || 'Inquiry'}</span>
                      </div>
                      <p className="text-sm text-slate-300 bg-black/20 p-4 rounded-xl mb-4 italic">"{msg.message}"</p>
                      <p className="text-[10px] text-slate-500">Email: {msg.email}</p>
                    </div>
                  ))}
                  {((activeTab === 'interns' && internList.length === 0) || (activeTab === 'applications' && applicationList.length === 0) || (activeTab === 'contact' && contactList.length === 0)) && !loading && (
                    <p className="text-center text-slate-500 italic py-20">No data found yet.</p>
                  )}
               </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminInterns;
