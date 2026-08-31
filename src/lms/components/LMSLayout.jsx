import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import NotificationBell from "./NotificationBell";
import { useAuth } from "../context/AuthContext";
import { getInitials } from "../utils/helpers";
import { Link } from "react-router-dom";

export default function LMSLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { profile } = useAuth();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((v) => !v)} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-50 w-60 h-full">
            <Sidebar collapsed={false} onToggle={() => {}} />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-3 text-slate-500 hover:text-slate-900"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-slate-500 hover:text-slate-900 transition-colors"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>

            {/* Desktop collapse toggle */}
            <button
              className="hidden md:flex text-slate-500 hover:text-slate-900 transition-colors w-8 h-8 rounded-lg hover:bg-slate-100 items-center justify-center"
              onClick={() => setSidebarCollapsed((v) => !v)}
              aria-label="Toggle sidebar"
            >
              <Menu size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <NotificationBell />
            <Link
              to={profile?.role === "admin" ? "/lms/admin/dashboard" : profile?.role === "trainer" ? "/lms/trainer/dashboard" : "/lms/intern/profile"}
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-100 transition-all group"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                {getInitials(profile?.name || "U")}
              </div>
              <span className="text-slate-600 text-sm hidden sm:block group-hover:text-white transition-colors">
                {profile?.name?.split(" ")[0] || "User"}
              </span>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
