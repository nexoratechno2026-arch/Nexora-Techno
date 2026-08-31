// Shared helper utilities for the LMS

/**
 * Format a date string or Date object to readable format
 */
export function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format a datetime with time
 */
export function formatDateTime(date) {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get days until a due date (negative = overdue)
 */
export function daysUntil(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
  return diff;
}

/**
 * Get a due date badge info based on days remaining
 */
export function getDueBadge(dueDate) {
  const days = daysUntil(dueDate);
  if (days < 0) return { label: `${Math.abs(days)}d overdue`, color: "red" };
  if (days === 0) return { label: "Due today", color: "orange" };
  if (days <= 2) return { label: `${days}d left`, color: "yellow" };
  return { label: `${days}d left`, color: "sky" };
}

/**
 * Generate a unique certificate number
 */
export function generateCertNumber(userId, batchId) {
  const timestamp = Date.now().toString(36).toUpperCase();
  const uid = userId.slice(0, 4).toUpperCase();
  const bid = batchId.slice(0, 4).toUpperCase();
  return `NXT-${uid}-${bid}-${timestamp}`;
}

/**
 * Calculate completion percentage
 */
export function calcCompletion(completed, total) {
  if (!total) return 0;
  return Math.round((completed / total) * 100);
}


/**
 * Get initials from a name string
 */
export function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Get status color classes for submission status
 */
export function statusColor(status) {
  const map = {
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    graded: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    present: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    absent: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return map[status] || "bg-slate-500/10 text-slate-500 border-slate-500/20";
}

/**
 * Truncate text to max length
 */
export function truncate(str, max = 80) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max) + "…" : str;
}
