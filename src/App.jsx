import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";

// Marketing site pages
import Home from "./pages/Home";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Internship from "./pages/Internship";
import Verification from "./pages/Verification";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";

const Certificates = lazy(() => import("./pages/Certificates"));

const Blank = () => <div className="min-h-screen bg-paper" />;

// Marketing page wrapper — applies the editorial paper background
const MarketingPage = ({ children }) => (
  <div className="min-h-screen bg-paper text-ink overflow-x-clip">
    {children}
  </div>
);

function ScrollToTopHandler() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        const headerOffset = 72;
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
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#151515",
            border: "1px solid #D8D6D0",
            fontSize: "14px",
            borderRadius: "8px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          },
          success: { iconTheme: { primary: "#4F46E5", secondary: "#ffffff" } },
          error:   { iconTheme: { primary: "#DC2626", secondary: "#ffffff" } },
        }}
      />
      <Suspense fallback={<Blank />}>
        <Routes>
          {/* ── Marketing site ─────────────────────────────────────────────── */}
          <Route path="/" element={<MarketingPage><ScrollToTopHandler /><Home /></MarketingPage>} />
          <Route path="/services" element={<MarketingPage><ScrollToTopHandler /><Services /></MarketingPage>} />
          <Route path="/services/:serviceId" element={<MarketingPage><ScrollToTopHandler /><ServiceDetail /></MarketingPage>} />
          <Route path="/projects" element={<MarketingPage><ScrollToTopHandler /><Projects /></MarketingPage>} />
          <Route path="/about" element={<MarketingPage><ScrollToTopHandler /><About /></MarketingPage>} />
          <Route path="/internship" element={<MarketingPage><ScrollToTopHandler /><Internship /></MarketingPage>} />
          <Route path="/edtech" element={<MarketingPage><ScrollToTopHandler /><Internship /></MarketingPage>} />
          <Route path="/verify" element={<MarketingPage><ScrollToTopHandler /><Verification /></MarketingPage>} />
          <Route path="/verification" element={<MarketingPage><ScrollToTopHandler /><Verification /></MarketingPage>} />
          <Route path="/blog" element={<MarketingPage><ScrollToTopHandler /><Blog /></MarketingPage>} />
          <Route path="/blog/:blogId" element={<MarketingPage><ScrollToTopHandler /><BlogPost /></MarketingPage>} />
          <Route path="/contact" element={<MarketingPage><ScrollToTopHandler /><Contact /></MarketingPage>} />
          <Route path="/terms" element={<MarketingPage><ScrollToTopHandler /><TermsOfService /></MarketingPage>} />
          <Route path="/privacy" element={<MarketingPage><ScrollToTopHandler /><PrivacyPolicy /></MarketingPage>} />

          {/* Internal: issue and hand out certificates */}
          <Route path="/certificates" element={<Certificates />} />

          {/* The old LMS lived here */}
          <Route path="/lms/*" element={<Navigate to="/certificates" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
