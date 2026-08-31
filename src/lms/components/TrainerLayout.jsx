import { useState } from "react";
import { Menu, X } from "lucide-react";
import TrainerSidebar from "./TrainerSidebar";
import NotificationBell from "./NotificationBell";
import { useAuth } from "../context/AuthContext";
import { getInitials } from "../utils/helpers";
import { Link } from "react-router-dom";

export default function TrainerLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { profile } = useAuth();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex shadow-2xl z-20">
        <TrainerSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((v) => !v)} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 h-full shadow-2xl">
            <TrainerSidebar collapsed={false} onToggle={() => {}} />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-3 text-slate-400 hover:text-white bg-slate-800/50 p-1.5 rounded-lg"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Bar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-slate-600 hover:text-indigo-600 transition-colors p-2 -ml-2 rounded-lg hover:bg-indigo-50"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            {/* Desktop collapse toggle */}
            <button
              className="hidden md:flex text-slate-400 hover:text-indigo-600 transition-colors w-9 h-9 rounded-xl hover:bg-indigo-50 items-center justify-center border border-transparent hover:border-indigo-100"
              onClick={() => setSidebarCollapsed((v) => !v)}
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            
            <h1 className="text-slate-800 font-bold hidden sm:block text-lg tracking-tight">Trainer Workspace</h1>
          </div>

          <div className="flex items-center gap-3">
            <NotificationBell />
            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>
            <Link
              to="/lms/trainer/dashboard"
              className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full hover:bg-slate-100 transition-all group border border-transparent hover:border-slate-200"
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 text-sm font-bold shadow-inner">
                {getInitials(profile?.name || "T")}
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-slate-700 text-sm font-semibold leading-none group-hover:text-indigo-600 transition-colors">
                  {profile?.name?.split(" ")[0] || "Trainer"}
                </span>
                <span className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold mt-1 leading-none">
                  Instructor
                </span>
              </div>
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
