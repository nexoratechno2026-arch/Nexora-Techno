import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { db } from "../../firebase";
import { collection, query, where, getDocs, limit, orderBy, writeBatch, doc } from "firebase/firestore";
import { formatDateTime } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

export default function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  async function fetchNotifications() {
    if (!user) return;
    const nQ = query(collection(db, "notifications"), where("user_id", "==", user.id), orderBy("created_at", "desc"), limit(20));
    const nRes = await getDocs(nQ);
    const notifs = nRes.docs.map(d => ({ id: d.id, ...d.data() }));
    setNotifications(notifs);
  }

  async function markAllRead() {
    if (!user) return;
    const unread = notifications.filter(n => !n.is_read);
    if (unread.length === 0) return;

    const batch = writeBatch(db);
    unread.forEach(n => {
      const ref = doc(db, "notifications", n.id);
      batch.update(ref, { is_read: true });
    });
    await batch.commit();
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  }

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => { setOpen((v) => !v); if (!open) markAllRead(); }}
        className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-500
          hover:text-slate-800 hover:bg-slate-100 transition-all"
        id="notification-bell"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-sky-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-80 bg-white border border-slate-300 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <p className="text-slate-700 font-semibold text-sm">Notifications</p>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-sky-400 text-xs hover:text-sky-300 transition-colors">
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-slate-500 text-sm">
                No notifications yet
              </div>
            ) : (
              notifications.map((n) => {
                const NotificationContent = (
                  <div className={`px-4 py-3 hover:bg-slate-100 transition-colors ${n.link ? 'cursor-pointer' : 'cursor-default'} ${!n.is_read ? "bg-sky-500/5" : ""}`}>
                    <div className="flex items-start gap-2">
                      {!n.is_read && (
                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      )}
                      <div className={!n.is_read ? "" : "pl-3.5"}>
                        <p className="text-slate-700 text-sm font-medium">{n.title}</p>
                        {n.message && <p className="text-slate-500 text-xs mt-0.5">{n.message}</p>}
                        <p className="text-slate-600 text-xs mt-1">{formatDateTime(n.created_at)}</p>
                      </div>
                    </div>
                  </div>
                );

                return n.link ? (
                  <div
                    key={n.id}
                    onClick={() => {
                      setOpen(false);
                      navigate(n.link);
                    }}
                  >
                    {NotificationContent}
                  </div>
                ) : (
                  <div key={n.id}>
                    {NotificationContent}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
