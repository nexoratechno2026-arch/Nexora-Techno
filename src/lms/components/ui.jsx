// Shared UI component library for Nexora LMS

// ─── Card ────────────────────────────────────────────────────────────────────
export function Card({ children, className = "", hover = false }) {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl ${
        hover ? "hover:border-sky-500/20 hover:bg-[#0d1d35] transition-all cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
const BADGE_COLORS = {
  sky:     "bg-sky-500/10 text-sky-400 border-sky-500/20",
  green:   "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  yellow:  "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  red:     "bg-red-500/10 text-red-400 border-red-500/20",
  orange:  "bg-orange-500/10 text-orange-400 border-orange-500/20",
  purple:  "bg-purple-500/10 text-purple-400 border-purple-500/20",
  slate:   "bg-slate-500/10 text-slate-500 border-slate-500/20",
  blue:    "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export function Badge({ children, color = "slate", className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs font-medium
        ${BADGE_COLORS[color] || BADGE_COLORS.slate} ${className}`}
    >
      {children}
    </span>
  );
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────
export function ProgressBar({ value = 0, max = 100, color = "sky", showLabel = true, height = "h-2" }) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const colorMap = {
    sky:    "bg-sky-500",
    green:  "bg-emerald-500",
    yellow: "bg-yellow-500",
    red:    "bg-red-500",
  };
  return (
    <div className="w-full">
      <div className={`w-full bg-white/5 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${height} rounded-full transition-all duration-700 ${colorMap[color] || "bg-sky-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-right text-xs text-slate-500 mt-1">{pct}%</p>
      )}
    </div>
  );
}

// ─── StatCard ────────────────────────────────────────────────────────────────
export function StatCard({ icon: Icon, label, value, sub, color = "sky", trend }) {
  const colorMap = {
    sky:    { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/10" },
    green:  { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/10" },
    yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/10" },
    red:    { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/10" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/10" },
  };
  const c = colorMap[color] || colorMap.sky;
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${c.bg} border ${c.border}`}>
        <Icon size={20} className={c.text} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wide truncate">{label}</p>
        <p className="text-slate-900 text-2xl font-bold leading-tight">{value}</p>
        {sub && <p className="text-slate-500 text-xs mt-0.5">{sub}</p>}
      </div>
      {trend !== undefined && (
        <div className={`text-xs font-medium ${trend >= 0 ? "text-emerald-400" : "text-red-400"}`}>
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
import { X } from "lucide-react";
import { useEffect } from "react";

export function Modal({ open, onClose, title, children, size = "md" }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;
  const widths = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${widths[size] || widths.md} bg-white border border-slate-300
          rounded-2xl shadow-2xl overflow-hidden animate-fadeIn`}
        style={{ animation: "fadeInScale 0.2s ease-out" }}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h2 className="text-slate-100 font-semibold text-base">{title}</h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-800 transition-colors w-7 h-7 rounded-md hover:bg-slate-100 flex items-center justify-center"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

// ─── Tabs ────────────────────────────────────────────────────────────────────
export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap
            ${active === tab.value
              ? "bg-sky-500 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-1.5 text-xs ${active === tab.value ? "text-sky-100" : "text-slate-500"}`}>
              ({tab.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── EmptyState ──────────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
          <Icon size={28} className="text-slate-500" />
        </div>
      )}
      <h3 className="text-slate-700 font-semibold text-base">{title}</h3>
      {description && <p className="text-slate-500 text-sm mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ─── Input ───────────────────────────────────────────────────────────────────
export function Input({ label, id, error, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-slate-600 text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full bg-white/5 border ${error ? "border-red-500/50" : "border-slate-300"}
          rounded-lg px-3 py-2.5 text-slate-700 placeholder-slate-500 text-sm
          focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
export function Textarea({ label, id, error, rows = 4, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-slate-600 text-sm font-medium">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`w-full bg-white/5 border ${error ? "border-red-500/50" : "border-slate-300"}
          rounded-lg px-3 py-2.5 text-slate-700 placeholder-slate-500 text-sm
          focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all resize-none ${className}`}
        {...props}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

// ─── Select ──────────────────────────────────────────────────────────────────
export function Select({ label, id, error, children, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-slate-600 text-sm font-medium">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full bg-white border ${error ? "border-red-500/50" : "border-slate-300"}
          rounded-lg px-3 py-2.5 text-slate-700 text-sm
          focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

// ─── Button ──────────────────────────────────────────────────────────────────
export function Button({ children, variant = "primary", size = "md", loading = false, className = "", ...props }) {
  const variants = {
    primary: "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20",
    secondary: "bg-white/5 hover:bg-slate-200 text-slate-700 border border-slate-300",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
    ghost: "text-slate-500 hover:text-slate-800 hover:bg-slate-100",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-sm",
  };

  return (
    <button
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading && <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
export function SectionHeader({ title, description, action }) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h1 className="text-slate-900 text-xl font-bold">{title}</h1>
        {description && <p className="text-slate-500 text-sm mt-1">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
