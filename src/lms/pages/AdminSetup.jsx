import { useState } from "react";
import { Shield, Mail, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

export default function AdminSetup() {
  const { user } = useAuth();

  const [roleRequest, setRoleRequest] = useState("trainer");
  const [loading, setLoading] = useState(false);

  const handleRequestAccess = async () => {
    if (!user) {
      toast.error("You must be logged in to request access.");
      return;
    }

    setLoading(true);
    try {
      // 1. Send notification to all admins
      const adminsQ = query(collection(db, "profiles"), where("role", "==", "admin"));
      const adminsSnapshot = await getDocs(adminsQ);
      
      const notificationPromises = adminsSnapshot.docs.map(adminDoc => {
        return addDoc(collection(db, "notifications"), {
          user_id: adminDoc.id,
          title: `Role Upgrade Request`,
          message: `${user.email} has requested ${roleRequest.toUpperCase()} access.`,
          link: `/lms/admin/users`,
          is_read: false,
          created_at: new Date().toISOString()
        });
      });

      await Promise.all(notificationPromises);
      
      // 2. Open Mail client for the founder
      const subject = encodeURIComponent(`Request for ${roleRequest.toUpperCase()} access`);
      const body = encodeURIComponent(`Hello Founder,\n\nI would like to request ${roleRequest.toUpperCase()} access for my account.\n\nMy email is: ${user.email}\n\nThank you.`);
      window.location.href = `mailto:foundernexoratechno2026@gmail.com?subject=${subject}&body=${body}`;
      
      toast.success("Request sent to admins and email client opened.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-sky-600/5 blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-500/30 mb-6">
          <Shield size={32} className="text-white" />
        </div>
        <h1 className="text-slate-900 text-2xl font-bold mb-2">Staff Access Request</h1>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl mt-4">
          <p className="text-slate-600 text-sm mb-6">
            Automated role promotion is disabled for security reasons.
          </p>
          
          <div className="space-y-4 mb-6 text-left">
            <div className="bg-sky-50 rounded-xl p-5 border border-sky-100">
              <h3 className="text-sky-900 font-semibold mb-2 text-center">Need Admin or Trainer access?</h3>
              <p className="text-sky-800 text-sm mb-4 text-center">
                Select the role you need and click the button below. This will notify the admins and prepare an email to the founder.
              </p>

              <div className="mb-4">
                <label className="block text-sky-900 text-sm font-semibold mb-2">Requested Role:</label>
                <select
                  value={roleRequest}
                  onChange={(e) => setRoleRequest(e.target.value)}
                  className="w-full bg-white border border-sky-200 rounded-lg px-3 py-2.5 text-sky-900 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                >
                  <option value="trainer">Trainer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                onClick={handleRequestAccess}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg py-3 text-sm transition-all shadow-lg shadow-sky-500/30 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Bell size={18} />
                    Request Access & Email Founder
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-slate-500 text-xs mb-6 px-4">
            Make sure to include your registered email address ({user?.email || "the email you signed up with"}) in your request so we can find your account.
          </p>

          <Link
            to="/lms/login"
            className="w-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg py-2.5 text-sm transition-all"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
