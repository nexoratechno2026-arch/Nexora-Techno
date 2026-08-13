import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import WhatsAppButton from "../components/WhatsAppButton";
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Code, 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  FileCheck,
  Send
} from "lucide-react";
import { supabase } from "../supabaseClient";

export default function Internship() {
  const [formStatus, setFormStatus] = useState("idle");
  const [resumeFile, setResumeFile] = useState(null);
  const formRef = useRef();

  const programs = [
    {
      id: "full-stack",
      code: "FS",
      title: "Full Stack Development",
      duration: "4 Weeks / 8 Weeks",
      eligibility: "B.Sc. CS/IT, BCA, B.E./B.Tech Students & Recent Graduates",
      tech: ["HTML5", "CSS3 / Tailwind", "JavaScript (ES6+)", "React", "Node.js", "MySQL / MongoDB"],
      outcomes: [
        "Build 2 production-ready web applications",
        "Master Git version control & GitHub workflows",
        "Understand REST API design & database queries",
        "Receive QR-verifiable internship certificate"
      ]
    },
    {
      id: "ai-ml",
      code: "PE",
      title: "Prompt Engineering & AI/ML",
      duration: "4 Weeks / 8 Weeks",
      eligibility: "Computer Science, AI/ML, Data Science & Tech Enthusiasts",
      tech: ["Python", "OpenAI / Anthropic APIs", "n8n Workflow Tools", "JSON Data Pipelines", "Prompt Guardrails"],
      outcomes: [
        "Build custom AI chatbots and document automation bots",
        "Learn prompt engineering principles & LLM evaluation",
        "Integrate AI models into web applications",
        "Receive QR-verifiable internship certificate"
      ]
    },
    {
      id: "ui-ux",
      code: "UD",
      title: "UI/UX & Web Interface Design",
      duration: "4 Weeks",
      eligibility: "Creative students interested in product design & web interfaces",
      tech: ["Figma", "UI Design Systems", "Responsive Layouts", "HTML/CSS Basics", "Accessibility"],
      outcomes: [
        "Create responsive mobile & desktop wireframes",
        "Design intuitive user navigation & design tokens",
        "Build a personal design portfolio",
        "Receive QR-verifiable internship certificate"
      ]
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      let publicUrl = "";
      if (resumeFile && supabase) {
        const fileExt = resumeFile.name.split('.').pop();
        const fileName = `${Math.random()}_${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('resume')
          .upload(fileName, resumeFile);

        if (!uploadError) {
          const { data } = supabase.storage.from('resume').getPublicUrl(fileName);
          publicUrl = data?.publicUrl || "";
        }
      }

      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      
      if (supabase) {
        await supabase.from("internship_applications").insert([{ ...data, portfolio: publicUrl }]);
      }

      setFormStatus("success");
      e.target.reset();
      setResumeFile(null);
    } catch (error) {
      setFormStatus("success");
      e.target.reset();
      setResumeFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />
      <ScrollToTop />
      <WhatsAppButton />

      <main className="flex-grow">
        
        {/* Internship Hero */}
        <section className="relative py-16 lg:py-24 tech-grid-bg border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-500/30">
              <GraduationCap className="w-4 h-4" /> Nexora Student Academy — Salem, TN
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Learn. Build. Get Real Industry Experience.
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto mt-4 leading-relaxed">
              Gain practical engineering experience through IT internships, live project code reviews, and technology-focused hands-on mentorship in Salem.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#apply-form"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-base"
              >
                <span>Apply for Internship</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <Link
                to="/verify"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-2xl flex items-center justify-center gap-2 text-base"
              >
                <FileCheck className="w-5 h-5 text-indigo-400" />
                <span>Certificate Verification Portal</span>
              </Link>
            </div>

          </div>
        </section>

        {/* Available Programs */}
        <section className="py-20 bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-500/30">
                Cohorts & Tracks
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Currently Available Internship Programs
              </h2>
              <p className="text-slate-400 text-base mt-2">
                Designed specifically for computer science, engineering, and IT students wanting production skills.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {programs.map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-950 rounded-3xl p-8 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                        Track Code: {p.code}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {p.duration}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-xs text-slate-400 mb-6 font-medium">
                      Eligibility: {p.eligibility}
                    </p>

                    <div className="mb-6">
                      <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                        Technologies Mastered:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech.map((t, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                        Key Outcomes:
                      </div>
                      <div className="space-y-2">
                        {p.outcomes.map((o, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{o}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-900">
                    <a
                      href="#apply-form"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-center text-sm transition-colors block"
                    >
                      Apply for {p.title}
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Certificate Credential Feature */}
        <section className="py-16 bg-slate-950 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
              
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                  <ShieldCheck className="w-4 h-4" /> QR-Verifiable Credential
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Earn an Official Nexora Techno Internship Certificate
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Every student who successfully completes their project track receives a verifiable certificate indexed on our public verification portal with unique intern credential IDs.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  to="/verify"
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg flex items-center gap-2 text-sm"
                >
                  <span>Verify Existing Certificate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="apply-form" className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
              
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-white">
                  Apply for Internship Cohort
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Fill in your details below. Our HR team in Salem will review your application and send confirmation.
                </p>
              </div>

              {formStatus === "success" ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Application Submitted Successfully!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Our HR team will reach out to you via WhatsApp / Email with orientation details.
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">WhatsApp Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Internship Program Track *</label>
                      <select
                        name="program"
                        required
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="full-stack">Full Stack Development (FS)</option>
                        <option value="prompt-engineering-ai-ml">Prompt Engineering & AI/ML (PE)</option>
                        <option value="ui-ux">UI/UX Development (UD)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">College Name & Degree</label>
                    <input
                      type="text"
                      name="college"
                      placeholder="e.g. Muthayammal College of Arts and Science - Final Year B.Sc. CS"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Attachment: Resume (PDF optional)</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setResumeFile(e.target.files[0])}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Brief Goals / Experience</label>
                    <textarea
                      name="about"
                      rows="3"
                      required
                      placeholder="Tell us what programming languages you have studied and what you want to learn..."
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-emerald-500 focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-base"
                  >
                    <Send className="w-5 h-5" />
                    <span>{formStatus === "loading" ? "Submitting Application..." : "Submit Internship Application"}</span>
                  </button>

                </form>
              )}

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
