import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import WhatsAppButton from "../components/WhatsAppButton";
import { supabase } from "../supabaseClient";

function Verification() {
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const parseDurationDays = (duration) => {
    const fallbackDuration = "05/05/2026 - 25/05/2026";
    const rawDuration = duration || fallbackDuration;
    const match = rawDuration.match(/(\d{1,2}\/\d{1,2}\/\d{4})\s*-\s*(\d{1,2}\/\d{1,2}\/\d{4})/);
    if (!match) return "20 Days";

    const [, start, end] = match;
    const parseDate = (value) => {
      const [month, day, year] = value.split("/").map(Number);
      return new Date(year, month - 1, day);
    };

    const startDate = parseDate(start);
    const endDate = parseDate(end);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return "20 Days";

    const diff = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    return `${diff} Days`;
  };

  const getDisplayValue = (field, fallback = "") => {
    return field ?? fallback;
  };

  const getProgramLabel = (record) => {
    if (record?.program) return record.program;
    if (record?.department) {
      const map = { FS: "Full Stack Development", UD: "UI/UX Development", PE: "Prompt Engineering & AI/ML" };
      return map[record.department] ?? record.department;
    }
    return "Unknown Program";
  };

  const getNameLabel = (record) => {
    return (
      record?.name || record?.full_name || record?.intern_name || record?.student_name || "Unknown Intern"
    );
  };

  const getDateLabel = (record) => {
    return record?.completionDate || record?.date || record?.certificateDate || "-";
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setIsSearching(true);
    setError("");
    setResult(null);

    try {
      const searchTerm = searchId.trim().toUpperCase();
      
      // Direct query to Supabase database
      const { data, error: dbError } = await supabase
        .from("interns")
        .select("*")
        .eq("id", searchTerm)
        .single();

      if (dbError) {
          console.error("DB Error Details:", {
            code: dbError.code,
            message: dbError.message,
            details: dbError.details,
          });
          
          if (dbError.code === 'PGRST116') {
             setError(`Certificate ID "${searchTerm}" not found. Please check the ID and try again.`);
          } else if (dbError.message?.includes('CORS') || dbError.message?.includes('permission')) {
             setError("Database access error. Please contact support.");
          } else {
             setError("A server error occurred. Please try again or contact support.");
          }
      } else if (data) {
        console.log("Supabase result:", data);
        setResult(data);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Unable to connect to verification server. Please check your internet connection.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <ScrollToTop />
      <WhatsAppButton />

      <main className="flex-grow flex items-center justify-center py-20 lg:py-32">
        <div className="mx-auto max-w-2xl px-6 w-full">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold uppercase tracking-widest text-brand-300"
            >
              Secure Verification
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl"
            >
              Verify Internship <span className="text-accent-400">Completion</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-slate-400"
            >
              Enter the Certificate ID provided on the internship completion certificate to verify its authenticity.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl shadow-glow"
          >
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Certificate ID (e.g., NT26FS001)"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/50 px-6 py-5 text-center text-xl font-bold uppercase tracking-widest text-white placeholder:text-slate-600 focus:border-brand-500 focus:outline-none transition-all shadow-inner"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="flex-grow rounded-full bg-gradient-to-r from-brand-500 to-brand-300 py-4 font-bold text-slate-950 shadow-xl transition hover:brightness-110 active:scale-[0.98] disabled:opacity-70"
                >
                  {isSearching ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Verifying...
                    </span>
                  ) : (
                    "Verify Now →"
                  )}
                </button>
                {(result || error) && (
                    <button
                        type="button"
                        onClick={() => { setSearchId(""); setResult(null); setError(""); }}
                        className="px-6 rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition"
                    >
                        Reset
                    </button>
                )}
              </div>
            </form>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm font-medium text-red-400"
                >
                  <p>{error}</p>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-8 rounded-3xl border border-brand-500/30 bg-brand-500/5 p-6 backdrop-blur-md"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 mb-4 rounded-full bg-brand-500/20 text-brand-300 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Authenticity Verified</h3>
                    <p className="text-sm text-slate-400 mb-6">This document is legitimate and verified by Nexora Techno.</p>
                    
                    <div className="w-full space-y-3 pt-4 border-t border-white/10">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Intern Name</span>
                        <span className="font-semibold text-slate-950">{getNameLabel(result)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Program</span>
                        <span className="font-semibold text-slate-950">{getProgramLabel(result)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Duration</span>
                        <span className="font-semibold text-slate-950">{parseDurationDays(getDisplayValue(result.duration, "05/05/2026 - 25/05/2026"))}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Status</span>
                        <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                          {getDisplayValue(result.status, "Completed")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Date</span>
                        <span className="font-semibold text-slate-950">{getDateLabel(result)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <p className="mt-8 text-center text-sm text-slate-500">
            Having issues? <a href="/#contact" className="text-brand-300 hover:underline">Contact our support team</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Verification;
