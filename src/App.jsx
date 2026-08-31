import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";

// Marketing site pages
import Home from "./pages/Home";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Internship from "./pages/Internship";
import Verification from "./pages/Verification";
import AdminInterns from "./pages/AdminInterns";
import ServiceDetail from "./pages/ServiceDetail";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";

// LMS Auth & context
import { AuthProvider } from "./lms/context/AuthContext";
import ProtectedRoute from "./lms/components/ProtectedRoute";

// LMS pages (lazy loaded for performance)
const Login        = lazy(() => import("./lms/pages/Login"));
const Onboarding   = lazy(() => import("./lms/pages/Onboarding"));
const AdminSetup   = lazy(() => import("./lms/pages/AdminSetup"));

const AdminDashboard    = lazy(() => import("./lms/pages/admin/Dashboard"));
const AdminBatches      = lazy(() => import("./lms/pages/admin/Batches"));
const AdminBatchDetail  = lazy(() => import("./lms/pages/admin/BatchDetail"));
const AdminSubmissions  = lazy(() => import("./lms/pages/admin/Submissions"));
const AdminAttendance   = lazy(() => import("./lms/pages/admin/Attendance"));
const AdminAnnouncements= lazy(() => import("./lms/pages/admin/Announcements"));
const AdminCertificates = lazy(() => import("./lms/pages/admin/Certificates"));
const AdminInternProfile= lazy(() => import("./lms/pages/admin/InternProfile"));
const AdminUsers        = lazy(() => import("./lms/pages/admin/Users"));

const TrainerDashboard   = lazy(() => import("./lms/pages/trainer/Dashboard"));
const TrainerBatches     = lazy(() => import("./lms/pages/trainer/Batches"));
const TrainerBatchDetail = lazy(() => import("./lms/pages/trainer/BatchDetail"));
const TrainerSubmissions = lazy(() => import("./lms/pages/trainer/Submissions"));
const TrainerAttendance  = lazy(() => import("./lms/pages/trainer/Attendance"));

const InternDashboard   = lazy(() => import("./lms/pages/intern/Dashboard"));
const InternCourses     = lazy(() => import("./lms/pages/intern/Courses"));
const InternTasks       = lazy(() => import("./lms/pages/intern/Tasks"));
const InternTaskDetail  = lazy(() => import("./lms/pages/intern/TaskDetail"));
const InternAttendance  = lazy(() => import("./lms/pages/intern/Attendance"));
const InternCertificate = lazy(() => import("./lms/pages/intern/Certificate"));
const InternProfile     = lazy(() => import("./lms/pages/intern/Profile"));

const LMSFallback = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function ScrollToTopHandler() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith('/lms')) {
      document.body.classList.remove('bg-ink');
      document.body.classList.add('bg-slate-50');
    } else {
      document.body.classList.remove('bg-slate-50');
      document.body.classList.add('bg-ink');
    }

    if (location.hash) {
      const id = location.hash.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        const headerOffset = 96;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: "#0a1628", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.08)", fontSize: "14px" },
            success: { iconTheme: { primary: "#10b981", secondary: "#0a1628" } },
            error:   { iconTheme: { primary: "#ef4444", secondary: "#0a1628" } },
          }}
        />
        <Suspense fallback={<LMSFallback />}>
          <Routes>
            {/* ── Marketing site ─────────────────────────────────────────────── */}
            <Route path="/" element={<div className="relative min-h-screen overflow-x-clip bg-white text-slate-900 font-sans"><ScrollToTopHandler /><Home /></div>} />
            <Route path="/services/:serviceId" element={<div className="overflow-x-clip"><ScrollToTopHandler /><ServiceDetail /></div>} />
            <Route path="/projects"  element={<><ScrollToTopHandler /><Projects /></>} />
            <Route path="/about"     element={<><ScrollToTopHandler /><About /></>} />
            <Route path="/internship" element={<><ScrollToTopHandler /><Internship /></>} />
            <Route path="/verify"    element={<><ScrollToTopHandler /><Verification /></>} />
            <Route path="/admin-data" element={<><ScrollToTopHandler /><AdminInterns /></>} />
            <Route path="/blog"      element={<><ScrollToTopHandler /><Blog /></>} />
            <Route path="/blog/:blogId" element={<><ScrollToTopHandler /><BlogPost /></>} />
            <Route path="/contact"   element={<><ScrollToTopHandler /><Contact /></>} />
            <Route path="/terms"     element={<><ScrollToTopHandler /><TermsOfService /></>} />
            <Route path="/privacy"   element={<><ScrollToTopHandler /><PrivacyPolicy /></>} />

            {/* ── LMS Auth ───────────────────────────────────────────────────── */}
            <Route path="/lms/login"      element={<Login />} />
            <Route path="/lms/admin-setup" element={<AdminSetup />} />
            <Route
              path="/lms/onboarding"
              element={<ProtectedRoute><Onboarding /></ProtectedRoute>}
            />

            {/* ── Admin ──────────────────────────────────────────────────────── */}
            <Route path="/lms/admin/dashboard"
              element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>}
            />
            <Route path="/lms/admin/batches"
              element={<ProtectedRoute requiredRole="admin"><AdminBatches /></ProtectedRoute>}
            />
            <Route path="/lms/admin/batches/:batchId"
              element={<ProtectedRoute requiredRole="admin"><AdminBatchDetail /></ProtectedRoute>}
            />
            <Route path="/lms/admin/tasks/:taskId/submissions"
              element={<ProtectedRoute requiredRole="admin"><AdminSubmissions /></ProtectedRoute>}
            />
            <Route path="/lms/admin/attendance"
              element={<ProtectedRoute requiredRole="admin"><AdminAttendance /></ProtectedRoute>}
            />
            <Route path="/lms/admin/announcements"
              element={<ProtectedRoute requiredRole="admin"><AdminAnnouncements /></ProtectedRoute>}
            />
            <Route path="/lms/admin/certificates"
              element={<ProtectedRoute requiredRole="admin"><AdminCertificates /></ProtectedRoute>}
            />
            <Route path="/lms/admin/interns/:internId"
              element={<ProtectedRoute requiredRole="admin"><AdminInternProfile /></ProtectedRoute>}
            />
            <Route path="/lms/admin/users"
              element={<ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>}
            />

            {/* ── Trainer ────────────────────────────────────────────────────── */}
            <Route path="/lms/trainer/dashboard"
              element={<ProtectedRoute requiredRole="trainer"><TrainerDashboard /></ProtectedRoute>}
            />
            <Route path="/lms/trainer/batches"
              element={<ProtectedRoute requiredRole="trainer"><TrainerBatches /></ProtectedRoute>}
            />
            <Route path="/lms/trainer/batches/:batchId"
              element={<ProtectedRoute requiredRole="trainer"><TrainerBatchDetail /></ProtectedRoute>}
            />
            <Route path="/lms/trainer/tasks/:taskId/submissions"
              element={<ProtectedRoute requiredRole="trainer"><TrainerSubmissions /></ProtectedRoute>}
            />
            <Route path="/lms/trainer/attendance"
              element={<ProtectedRoute requiredRole="trainer"><TrainerAttendance /></ProtectedRoute>}
            />

            {/* ── Intern ─────────────────────────────────────────────────────── */}
            <Route path="/lms/intern/dashboard"
              element={<ProtectedRoute requiredRole="intern"><InternDashboard /></ProtectedRoute>}
            />
            <Route path="/lms/intern/courses"
              element={<ProtectedRoute requiredRole="intern"><InternCourses /></ProtectedRoute>}
            />
            <Route path="/lms/intern/tasks"
              element={<ProtectedRoute requiredRole="intern"><InternTasks /></ProtectedRoute>}
            />
            <Route path="/lms/intern/tasks/:taskId"
              element={<ProtectedRoute requiredRole="intern"><InternTaskDetail /></ProtectedRoute>}
            />
            <Route path="/lms/intern/attendance"
              element={<ProtectedRoute requiredRole="intern"><InternAttendance /></ProtectedRoute>}
            />
            <Route path="/lms/intern/certificate"
              element={<ProtectedRoute requiredRole="intern"><InternCertificate /></ProtectedRoute>}
            />
            <Route path="/lms/intern/profile"
              element={<ProtectedRoute requiredRole="intern"><InternProfile /></ProtectedRoute>}
            />

            {/* Default LMS redirect */}
            <Route path="/lms" element={<Login />} />
            <Route path="/lms/*" element={<Login />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
