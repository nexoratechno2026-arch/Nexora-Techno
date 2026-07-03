import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Internship from "./pages/Internship";
import Verification from "./pages/Verification";
import AdminInterns from "./pages/AdminInterns";

function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = 96;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-x-clip bg-white text-slate-900">
        <HashScrollHandler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/admin-data" element={<AdminInterns />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
