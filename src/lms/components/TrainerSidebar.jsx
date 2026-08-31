import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getInitials } from "../utils/helpers";
import {
  LayoutDashboard, Users, CalendarCheck, LogOut,
  Briefcase
} from "lucide-react";

const TRAINER_NAV = [
  { label: "Dashboard", to: "/lms/trainer/dashboard", icon: LayoutDashboard },
  { label: "Batches", to: "/lms/trainer/batches", icon: Users },
  { label: "Attendance", to: "/lms/trainer/attendance", icon: CalendarCheck },
];

function NavItem({ item, collapsed, onClick }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative
        ${isActive
          ? "bg-indigo-500/10 text-indigo-400 shadow-[inset_2px_0_0_0_#818cf8]"
          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
        }`
      }
    >
      <Icon size={20} className={`shrink-0 ${!collapsed ? "ml-1" : "mx-auto"}`} />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {collapsed && (
        <span className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-slate-200 text-xs rounded-md
          opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl transition-opacity">
          {item.label}
        </span>
      )}
    </NavLink>
  );
}

export default function TrainerSidebar({ collapsed, onToggle }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/lms/login");
  }

  return (
    <aside
      className={`flex flex-col h-full bg-[#0b1120] border-r border-slate-800/60 transition-all duration-300
        ${collapsed ? "w-[72px]" : "w-64"}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-800/60 shrink-0">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 ${collapsed ? "mx-auto" : ""}`}>
          <Briefcase size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden flex-1">
            <p className="text-white font-bold tracking-wide text-sm leading-none truncate">Trainer Portal</p>
            <p className="text-indigo-400 text-xs mt-1 font-medium">Nexora LMS</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
        {TRAINER_NAV.map((item) => (
          <NavItem key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* User section */}
      <div className="border-t border-slate-800/60 p-3 bg-slate-900/30">
        <div className={`flex items-center gap-3 px-2 py-2 rounded-xl ${collapsed ? "justify-center" : ""}`}>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
            <span className="text-indigo-400 font-bold text-sm">
              {getInitials(profile?.name || "T")}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-slate-200 text-sm font-semibold truncate">{profile?.name || "Trainer"}</p>
              <p className="text-slate-500 text-xs truncate">{profile?.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className={`mt-2 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400
            hover:bg-red-500/10 transition-all text-sm font-medium ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={18} className={`shrink-0 ${!collapsed ? "ml-1" : ""}`} />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
