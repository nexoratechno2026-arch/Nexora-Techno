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
      <div className="relative min-h-screen overflow-x-clip overflow-y-hidden bg-gradient-to-br from-[#040c18] via-[#07172e] to-[#030a15] text-white">
        <div className="absolute inset-x-0 top-0 -z-10 h-[46rem] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.035),transparent)] pointer-events-none" />
        <div className="absolute left-[-10rem] top-20 -z-10 h-[24rem] w-[24rem] rounded-full bg-brand-500/10 blur-2xl pointer-events-none" />
        <div className="absolute right-[-12rem] top-10 -z-10 h-[25rem] w-[25rem] rounded-full bg-accent-500/7 blur-2xl pointer-events-none" />

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
