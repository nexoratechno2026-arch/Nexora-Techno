import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import WhatsAppButton from "../components/WhatsAppButton";
import { supabase } from "../supabaseClient";

function Internship() {
  const [formStatus, setFormStatus] = useState("idle");
  const [resumeFile, setResumeFile] = useState(null);
  const formRef = useRef();

  const programs = [
    { title: "Full Stack Development", duration: "15 Days", description: "Fast-track your skills in frontend and backend development with hands-on project building." },
    { title: "Digital Marketing", duration: "15 Days", description: "Master SEO, social media strategy, and data-driven marketing to grow online presence." },
    { title: "Prompt Engineering", duration: "15 Days", description: "Learn to design, optimize, and implement effective prompts for Large Language Models." },
    { title: "Logo Creation & Design", duration: "15 Days", description: "Focus on branding, visual identity, and professional logo design using industry-standard tools." },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
        alert("Please select a PDF resume!");
        return;
    }
    setFormStatus("loading");

    try {
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${Math.random()}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resume')
        .upload(filePath, resumeFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('resume')
        .getPublicUrl(filePath);

      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      
      const { error: dbError } = await supabase
        .from("internship_applications")
        .insert([{ ...data, portfolio: publicUrl }]);

      if (dbError) throw dbError;

      setFormStatus("success");
      e.target.reset();
      setResumeFile(null);
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(`Upload failed: ${error.message}`);
      setFormStatus("error");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#040c18]">
      <Navbar />
      <ScrollToTop />
      <WhatsAppButton />

      <main className="flex-grow pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-300">Industry Transition Program</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl lg:text-7xl uppercase tracking-tighter">
                Premium <span className="text-accent-400">Internship</span> <br /> Training
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mx-auto mt-8 max-w-2xl text-xl text-slate-400">Join our dynamic team and work on real-world projects. We have mentored **50+ students** this year alone!</motion.p>
          </div>

          <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, idx) => (
              <motion.div key={program.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="rounded-3xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm transition hover:border-brand-300/30 hover:bg-white/[0.06] group shadow-inner">
                <div className="flex justify-between items-start mb-6">
                    <span className="text-2xl opacity-50 group-hover:opacity-100 transition">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-brand-300 transition-colors uppercase leading-tight">{program.title}</h3>
                <p className="mt-2 text-[10px] font-black text-accent-400 uppercase tracking-widest">{program.duration}</p>
                <p className="mt-6 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">{program.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 mb-32 grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-bold text-white uppercase tracking-tighter">Why Intern <br /> At <span className="text-brand-300 italic">Nexora Techno?</span></h2>
              <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-lg font-medium">We deliver enterprise-level mentorship for students eager to launch their digital careers. Join the **50+ graduates** who have already transitioned successfully.</p>
              
              <div className="mt-12 space-y-8">
                {[
                  { title: "Real-World Projects", icon: "🛠️", desc: "No theory-only sessions. You will work on actual client solutions that go live!" },
                  { title: "Certified Recognition", icon: "🎓", desc: "Gain a verified internship certificate that adds heavy weight to your resume." },
                  { title: "Career Fast-Track", icon: "⚡", desc: "Our 15-day intensive curriculum is equal to 3 months of regular training." },
                  { title: "Life-Time Network", icon: "🤝", desc: "Join our community of developers and designers for long-term support." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-6 group">
                    <div className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-2xl group-hover:scale-110 group-hover:bg-brand-500/20 transition-all">
                        {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors uppercase tracking-widest">{item.title}</h4>
                      <p className="mt-1 text-sm text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="rounded-[3rem] border border-white/10 bg-white/[0.04] p-10 shadow-glow relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 p-8">
                  <div className="h-16 w-16 bg-brand-500/10 rounded-full animate-pulse border border-brand-500/20"></div>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight uppercase">Secure Your Spot</h3>
              <p className="mt-2 text-slate-400 font-medium">Batch starting soon. Apply today with your PDF resume.</p>

              <form ref={formRef} onSubmit={handleSubmit} className="mt-12 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                    <input type="text" name="name" required placeholder="Full Name" className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-sm text-white outline-none focus:border-brand-500 transition-all font-medium" />
                    <input type="email" name="email" required placeholder="Email Address" className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-sm text-white outline-none focus:border-brand-500 transition-all font-medium" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                    <input type="tel" name="phone" required placeholder="WhatsApp Number" className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-sm text-white outline-none focus:border-brand-500 transition-all font-medium" />
                    <select name="program" required className="w-full rounded-2xl border border-white/10 bg-[#07142a] px-6 py-4 text-sm text-slate-300 outline-none focus:border-brand-500 transition-all font-medium">
                        <option value="">Program Select...</option>
                        <option value="full-stack">Full Stack Development</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="prompt-engineering">Prompt Engineering</option>
                        <option value="logo-creation">Logo Creation & Design</option>
                    </select>
                </div>
                
                <div className="space-y-4 rounded-[2rem] bg-slate-900/60 p-8 border border-white/10 hover:border-brand-500/30 transition-all">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-2">Resume Attachment (PDF REQUIRED)</p>
                   <input 
                     type="file" 
                     accept=".pdf" 
                     onChange={(e) => setResumeFile(e.target.files[0])}
                     className="w-full text-xs text-slate-400 file:mr-6 file:py-3 file:px-8 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:bg-brand-500 file:text-slate-950 hover:file:bg-brand-300 transition-all"
                     required
                   />
                </div>

                <textarea name="about" required rows="4" placeholder="Tell us your goal for this internship" className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-sm text-white outline-none focus:border-brand-500 transition-all font-medium" />

                <button type="submit" disabled={formStatus === "loading" || formStatus === "success"} className="w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300 py-6 font-black text-slate-950 uppercase tracking-widest shadow-2xl shadow-brand-500/40 active:scale-95 disabled:opacity-50 transition transform flex items-center justify-center gap-3">
                   {formStatus === "loading" ? "UPLOADING TO CLOUD..." : formStatus === "success" ? "APPLICATION SENT!" : "SUBMIT APPLICATION →"}
                </button>
                <p className="text-center text-[10px] text-slate-500 font-bold uppercase py-2">Join **50+ student** leaders at Nexora Techno</p>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Internship;
