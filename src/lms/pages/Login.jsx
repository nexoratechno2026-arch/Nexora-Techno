import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await signIn({ email, password });
      // Fetch profile to decide redirect
      setTimeout(() => {
        // profile will be loaded by AuthContext; redirect handled by ProtectedRoute
        const toPath = from || null;
        navigate(toPath || "/lms/intern/dashboard");
      }, 800);
    } catch (err) {
      toast.error(err.message || "Login failed. Check your credentials.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-sky-600/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-blue-600/8 blur-[100px]" />
      </div>
      {/* Grid dots */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(14,165,233,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-500/30 mb-4">
            <GraduationCap size={28} className="text-slate-900" />
          </div>
          <h1 className="text-slate-900 text-2xl font-bold">Nexora LMS</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="lms-email" className="block text-slate-600 text-sm font-medium">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="lms-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-700
                    placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1
                    focus:ring-sky-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="lms-password" className="block text-slate-600 text-sm font-medium">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="lms-password"
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-10 py-2.5 text-slate-700
                    placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1
                    focus:ring-sky-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              id="lms-login-btn"
              className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white
                font-semibold rounded-lg py-2.5 text-sm transition-all shadow-lg shadow-sky-500/25
                disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Sign in <ArrowRight size={16} /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-4">
          <Link to="/" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
            ← Back to Nexora Techno
          </Link>
        </p>
      </div>
    </div>
  );
}
