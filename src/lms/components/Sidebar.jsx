import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getInitials } from "../utils/helpers";
import {
  LayoutDashboard, Users, BookOpen, ClipboardList,
  CalendarCheck, Megaphone, Award, LogOut, Menu, X,
  GraduationCap, FileText, User, ChevronRight, Bell
} from "lucide-react";
import NotificationBell from "./NotificationBell";

const ADMIN_NAV = [
  { label: "Dashboard", to: "/lms/admin/dashboard", icon: LayoutDashboard },
  { label: "Staff & Users", to: "/lms/admin/users", icon: Users },
  { label: "Batches", to: "/lms/admin/batches", icon: Users },
  { label: "Attendance", to: "/lms/admin/attendance", icon: CalendarCheck },
  { label: "Announcements", to: "/lms/admin/announcements", icon: Megaphone },
  { label: "Certificates", to: "/lms/admin/certificates", icon: Award },
];

const INTERN_NAV = [
  { label: "Dashboard", to: "/lms/intern/dashboard", icon: LayoutDashboard },
  { label: "Courses", to: "/lms/intern/courses", icon: BookOpen },
  { label: "Tasks", to: "/lms/intern/tasks", icon: ClipboardList },
  { label: "Attendance", to: "/lms/intern/attendance", icon: CalendarCheck },
  { label: "Certificate", to: "/lms/intern/certificate", icon: Award },
  { label: "Profile", to: "/lms/intern/profile", icon: User },
];

function NavItem({ item, collapsed, onClick }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative
        ${isActive
          ? "bg-sky-500/15 text-sky-400 border border-sky-500/20"
          : "text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent"
        }`
      }
    >
      <Icon size={18} className="shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {collapsed && (
        <span className="absolute left-full ml-2 px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md
          opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-slate-700 shadow-xl transition-opacity">
          {item.label}
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar({ collapsed, onToggle }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  
  let navItems = INTERN_NAV;
  if (profile?.role === "admin") navItems = ADMIN_NAV;

  async function handleSignOut() {
    await signOut();
    navigate("/lms/login");
  }

  return (
    <aside
      className={`flex flex-col h-full bg-slate-50 border-r border-slate-200 transition-all duration-300
        ${collapsed ? "w-16" : "w-60"}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-200">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shrink-0">
          <GraduationCap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-slate-900 font-semibold text-sm leading-none truncate">Nexora LMS</p>
            <p className="text-slate-500 text-xs mt-0.5 capitalize">{profile?.role || "portal"}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* User section */}
      <div className="border-t border-slate-200 p-2">
        <div className={`flex items-center gap-3 px-2 py-2 rounded-lg ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">
            {getInitials(profile?.name || "U")}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-slate-700 text-sm font-medium truncate">{profile?.name || "User"}</p>
              <p className="text-slate-500 text-xs truncate">{profile?.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className={`mt-1 w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-red-400
            hover:bg-red-500/10 transition-all text-sm ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
