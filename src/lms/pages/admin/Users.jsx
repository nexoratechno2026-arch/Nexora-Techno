import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, query, getDocs, orderBy, updateDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import LMSLayout from "../../components/LMSLayout";
import { Badge, Button, SectionHeader, EmptyState } from "../../components/ui.jsx";
import { Users as UsersIcon, Shield, Briefcase, GraduationCap } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/helpers";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const q = query(collection(db, "profiles"), orderBy("created_at", "desc"));
      const snapshot = await getDocs(q);
      setUsers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch(e) {
      console.error(e);
    }
    setLoading(false);
  }

  async function handleRoleChange(userId, newRole) {
    if (!window.confirm(`Change this user's role to ${newRole}?`)) return;
    
    try {
      await updateDoc(doc(db, "profiles", userId), { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success(`User promoted to ${newRole}`);
      // Notify them
      await addDoc(collection(db, "notifications"), {
        user_id: userId,
        title: "Role Updated",
        message: `Your role has been updated to ${newRole} by an admin.`,
        is_read: false,
        created_at: serverTimestamp()
      });
    } catch(error) {
      toast.error(error.message);
    }
  }

  const getRoleIcon = (role) => {
    if (role === "admin") return <Shield size={14} />;
    if (role === "trainer") return <Briefcase size={14} />;
    return <GraduationCap size={14} />;
  };

  const getRoleColor = (role) => {
    if (role === "admin") return "purple";
    if (role === "trainer") return "sky";
    return "slate";
  };

  return (
    <LMSLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <SectionHeader 
          title="User & Staff Management" 
          description="View all registered users and promote them to Trainer or Admin roles." 
        />

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : users.length === 0 ? (
          <EmptyState icon={UsersIcon} title="No users found" description="No one has registered yet." />
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                  <tr>
                    <th className="px-5 py-4">User</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Joined</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <Link to={`/lms/admin/interns/${u.id}`} className="font-semibold text-slate-900 hover:text-sky-500 transition-colors">
                            {u.name || "Unknown"}
                          </Link>
                          <span className="text-xs text-slate-500">{u.email}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <Badge color={getRoleColor(u.role)} className="flex items-center gap-1.5 w-max capitalize">
                          {getRoleIcon(u.role)} {u.role || "None"}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 text-slate-500 text-xs">
                        {formatDate(u.created_at)}
                      </td>
                      <td className="px-5 py-4 text-right space-x-2">
                        {u.role !== "admin" && (
                          <button 
                            onClick={() => handleRoleChange(u.id, "admin")}
                            className="text-xs font-medium text-purple-500 hover:text-purple-600 bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded transition-colors"
                          >
                            Make Admin
                          </button>
                        )}
                        {u.role !== "trainer" && (
                          <button 
                            onClick={() => handleRoleChange(u.id, "trainer")}
                            className="text-xs font-medium text-sky-500 hover:text-sky-600 bg-sky-50 hover:bg-sky-100 px-2 py-1 rounded transition-colors"
                          >
                            Make Trainer
                          </button>
                        )}
                        {u.role !== "intern" && (
                          <button 
                            onClick={() => handleRoleChange(u.id, "intern")}
                            className="text-xs font-medium text-slate-500 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors"
                          >
                            Make Intern
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </LMSLayout>
  );
}
