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
      // 1. Upload PDF to Supabase Storage
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${Math.random()}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resume')
        .upload(filePath, resumeFile);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resume')
        .getPublicUrl(filePath);

      // 3. Save Record to Database with the URL
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      
      const { error: dbError } = await supabase
        .from("internship_applications")
        .insert([{ ...data, portfolio: publicUrl }]); // Re-using portfolio field as Resume URL

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
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-semibold uppercase tracking-widest text-brand-300">Career Opportunities</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Start Your Journey <br /> <span className="text-accent-400">At Nexora Techno</span></motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">Join our dynamic team and work on real-world projects. We're looking for passionate learners ready to build the future.</motion.p>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, idx) => (
              <motion.div key={program.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-brand-300/30 hover:bg-white/[0.06]">
                <h3 className="text-xl font-semibold text-white">{program.title}</h3>
                <p className="mt-1 text-xs font-medium text-accent-400 uppercase tracking-wider">{program.duration}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{program.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 mb-32 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold text-white uppercase tracking-tighter">Why Intern With Us?</h2>
              <div className="mt-8 space-y-6 text-slate-400">
                <p>Join a network of professional developers and gain hands-on experience on live client projects. No coffee runs — just code.</p>
                <div className="grid gap-3">
                    {["Real-world projects", "Mentorship from experts", "Remote flexible options", "Verified Certification"].map(val => (
                        <div key={val} className="flex gap-3 items-center text-sm font-semibold text-white">
                            <span className="h-2 w-2 rounded-full bg-brand-500"></span> {val}
                        </div>
                    ))}
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">Apply Now</h3>
              <p className="text-sm text-slate-400 mb-8">Ready to grow? Attach your PDF resume and fill your details.</p>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <input type="text" name="name" required placeholder="Full Name" className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white outline-none focus:border-brand-500" />
                    <input type="email" name="email" required placeholder="Email Address" className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white outline-none focus:border-brand-500" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <input type="tel" name="phone" required placeholder="Phone number" className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white outline-none focus:border-brand-500" />
                    <select name="program" required className="w-full rounded-2xl border border-white/10 bg-[#07142a] px-5 py-4 text-sm text-slate-300 outline-none focus:border-brand-500">
                        <option value="">Select program...</option>
                        <option value="full-stack">Full Stack Development</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="prompt-engineering">Prompt Engineering</option>
                        <option value="logo-creation">Logo Creation & Design</option>
                    </select>
                </div>
                
                <div className="space-y-4 rounded-3xl bg-slate-900/50 p-6 border border-white/5">
                   <p className="text-xs font-black text-slate-500 uppercase tracking-widest pl-2">Attachment: Resume (PDF Only)</p>
                   <input 
                     type="file" 
                     accept=".pdf" 
                     onChange={(e) => setResumeFile(e.target.files[0])}
                     className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-500 file:text-slate-950 hover:file:bg-brand-300 transition"
                     required
                   />
                </div>

                <textarea name="about" required rows="4" placeholder="Briefly tell us about your goals" className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-white outline-none focus:border-brand-500" />

                <button type="submit" disabled={formStatus === "loading" || formStatus === "success"} className="w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-300 py-5 font-black text-slate-950 uppercase tracking-widest shadow-xl shadow-brand-500/20 active:scale-95 disabled:opacity-50 transition transform">
                   {formStatus === "loading" ? "UPLOADING TO CLOUD..." : formStatus === "success" ? "APPLICATION SENT!" : "SUBMIT APPLICATION →"}
                </button>
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
