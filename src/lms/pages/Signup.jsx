import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GraduationCap, Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(k) {
    return (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      await signUp({ email: form.email, password: form.password, name: form.name });
      toast.success("Account created! Please check your email to confirm.");
      navigate("/lms/onboarding");
    } catch (err) {
      toast.error(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  }

  const strength = form.password.length >= 12 ? "Strong" : form.password.length >= 8 ? "Medium" : form.password.length > 0 ? "Weak" : "";
  const strengthColor = strength === "Strong" ? "text-emerald-400" : strength === "Medium" ? "text-yellow-400" : "text-red-400";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-sky-600/5 blur-[120px]" />
      </div>
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "radial-gradient(rgba(14,165,233,0.15) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-500/30 mb-4">
            <GraduationCap size={28} className="text-slate-900" />
          </div>
          <h1 className="text-slate-900 text-2xl font-bold">Create account</h1>
          <p className="text-slate-500 text-sm mt-1">Join Nexora Techno Internship Portal</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <label htmlFor="signup-name" className="block text-slate-600 text-sm font-medium">Full name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="signup-name" type="text" required value={form.name} onChange={set("name")}
                  placeholder="Raj Kumar"
                  className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-700
                    placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="signup-email" className="block text-slate-600 text-sm font-medium">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="signup-email" type="email" required value={form.email} onChange={set("email")}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-700
                    placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label htmlFor="signup-password" className="block text-slate-600 text-sm font-medium">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="signup-password" type={showPass ? "text" : "password"} required value={form.password} onChange={set("password")}
                  placeholder="Min. 8 characters"
                  className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-10 py-2.5 text-slate-700
                    placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
                />
                <button type="button" onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {strength && <p className={`text-xs ${strengthColor}`}>Strength: {strength}</p>}
            </div>

            {/* Confirm */}
            <div className="space-y-1">
              <label htmlFor="signup-confirm" className="block text-slate-600 text-sm font-medium">Confirm password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  id="signup-confirm" type="password" required value={form.confirm} onChange={set("confirm")}
                  placeholder="Repeat password"
                  className="w-full bg-white/5 border border-slate-300 rounded-lg pl-9 pr-3 py-2.5 text-slate-700
                    placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit" disabled={loading} id="signup-btn"
              className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white
                font-semibold rounded-lg py-2.5 text-sm transition-all shadow-lg shadow-sky-500/25
                disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <> Create account <ArrowRight size={16} /></>
              }
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-sm mt-5">
          Already have an account?{" "}
          <Link to="/lms/login" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
