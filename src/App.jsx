import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Home from "./pages/Home";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Internship from "./pages/Internship";
import Verification from "./pages/Verification";
import AdminInterns from "./pages/AdminInterns";

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen overflow-x-clip bg-white text-slate-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/internship" element={<Internship />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/admin-data" element={<AdminInterns />} />
        </Routes>
        <SpeedInsights />
      </div>
    </BrowserRouter>
  );
}

export default App;
