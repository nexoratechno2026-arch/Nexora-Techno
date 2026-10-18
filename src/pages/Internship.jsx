import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import WhatsAppButton from "../components/WhatsAppButton";
import StudentImpactSection from "../components/StudentImpactSection";
import { ArrowRight, Send } from "lucide-react";

export default function Internship() {
  const [formStatus, setFormStatus] = useState("idle");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeCourse, setActiveCourse] = useState("AI with Python");
  const formRef = useRef();

  const categories = [
    { id: "all", label: "All Tracks (12)" },
    { id: "fullstack", label: "Web & Full Stack (4)" },
    { id: "ai", label: "AI & Machine Learning (3)" },
    { id: "data", label: "Data & Analytics (2)" },
    { id: "creative", label: "Design & Marketing (2)" },
    { id: "security", label: "Security & Systems (1)" }
  ];

  const courses = [
    {
      id: "ai-python",
      number: "01",
      code: "NT-AIP-01",
      category: "ai",
      title: "AI with Python",
      level: "Core Machine Learning",
      duration: "1–3 Months",
      eligibility: "B.E/B.Tech, B.Sc CS/IT, BCA & Engineering Students",
      tagline: "Build, evaluate, and deploy predictive ML models and neural architectures using modern Python.",
      tech: ["Python 3.12", "NumPy", "Pandas", "Scikit-Learn", "TensorFlow", "FastAPI"],
      curriculum: [
        "Vectorized Data Operations & Feature Engineering (NumPy & Pandas)",
        "Supervised & Unsupervised Machine Learning Algorithms",
        "Neural Network Foundations & Deep Learning Inference",
        "FastAPI Microservice Deployment for Real-Time Model Inference"
      ],
      capstone: "Production-ready predictive intelligence API with automated data pipeline."
    },
    {
      id: "javascript",
      number: "02",
      code: "NT-JS-02",
      category: "fullstack",
      title: "JavaScript",
      level: "Deep Language Architecture",
      duration: "1–2 Months",
      eligibility: "Computer Science Students & Aspiring Frontend Engineers",
      tagline: "Master JavaScript under the hood: closures, prototypes, asynchronous runtime, and DOM architecture.",
      tech: ["JavaScript (ES2024)", "TypeScript Basics", "Async / Await", "Web APIs", "Jest", "Vite"],
      curriculum: [
        "Execution Context, Event Loop, Microtask Queues & Memory Lifecycle",
        "Functional Patterns, Higher-Order Functions & Immutability",
        "Asynchronous Data Streaming, Fetch & WebSocket Communication",
        "Modular Architecture, Bundle Optimization & Unit Testing with Jest"
      ],
      capstone: "High-performance reactive data dashboard built from scratch with zero framework overhead."
    },
    {
      id: "mern-stack",
      number: "03",
      code: "NT-MERN-03",
      category: "fullstack",
      title: "MERN Stack",
      level: "Full-Stack Web Engineering",
      duration: "2–3 Months",
      eligibility: "Students wanting complete full-stack web engineering capability",
      tagline: "Architect scalable full-stack web applications from schema design to single-page applications and cloud deployment.",
      tech: ["MongoDB", "Express.js", "React 19", "Node.js", "Tailwind CSS", "JWT Auth"],
      curriculum: [
        "NoSQL Database Modeling, Aggregation Pipelines & Indexing (MongoDB)",
        "RESTful API Architecture, Middleware & Security Hardening (Express/Node)",
        "React Component Lifecycle, Custom Hooks & Global State Management",
        "Authentication with JWT, File Pipelines & Production Cloud Deployment"
      ],
      capstone: "Full-featured multi-tenant SaaS application with role-based access control."
    },
    {
      id: "mobile-app",
      number: "04",
      code: "NT-MOB-04",
      category: "fullstack",
      title: "Mobile App Development",
      level: "Native & Modern Mobile",
      duration: "2–3 Months",
      eligibility: "Students interested in Android & multi-platform mobile engineering",
      tagline: "Build native Android applications with Kotlin and modern declarative UI using Jetpack Compose.",
      tech: ["Android SDK", "Kotlin", "Jetpack Compose", "MVVM", "Room DB", "Retrofit"],
      curriculum: [
        "Modern Kotlin Language Essentials, Coroutines & Flow Mechanics",
        "Declarative Mobile UI Engineering with Jetpack Compose",
        "Offline-First Architecture with SQLite / Room Database",
        "REST API Network Integration, Background Services & Play Store Guidelines"
      ],
      capstone: "Offline-first mobile application featuring room caching and cloud sync."
    },
    {
      id: "data-science",
      number: "05",
      code: "NT-DSP-05",
      category: "data",
      title: "Data Science with Python",
      level: "Applied Data Science",
      duration: "2–3 Months",
      eligibility: "Math, Stats, Data Science & Computer Science Students",
      tagline: "Extract actionable signals from complex datasets through exploratory data analysis and hypothesis testing.",
      tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "Scikit-Learn", "Jupyter"],
      curriculum: [
        "Exploratory Data Analysis (EDA) & Data Cleaning at Scale",
        "Statistical Inference, Distributions, Correlation & Hypothesis Testing",
        "Feature Engineering, Dimensionality Reduction & Pipeline Automation",
        "Model Validation, Cross-Validation & Metric Evaluation Metrics"
      ],
      capstone: "End-to-end data science study analyzing real-world transactional datasets."
    },
    {
      id: "data-analytics",
      number: "06",
      code: "NT-DA-06",
      category: "data",
      title: "Data Analytics",
      level: "Business Intelligence & SQL",
      duration: "1–2 Months",
      eligibility: "BCA, B.Sc, B.Com, B.E. & Students interested in Analytics careers",
      tagline: "Turn raw transactional data into high-impact executive dashboards and automated business reports.",
      tech: ["Advanced SQL", "Power BI", "Tableau", "Excel Modeling", "Data Modeling"],
      curriculum: [
        "Relational Database Querying: Window Functions, CTEs & Complex Joins",
        "Data Warehousing Concepts, Star Schemas & ETL Pipeline Basics",
        "Interactive KPI Dashboard Architecture in Power BI & Tableau",
        "Cohort Retention, Funnel Conversion & Business Metric Analytics"
      ],
      capstone: "Executive business intelligence reporting suite with automated live data feeds."
    },
    {
      id: "cyber-security",
      number: "07",
      code: "NT-SEC-07",
      category: "security",
      title: "Cyber Security",
      level: "Defensive & Application Security",
      duration: "2–3 Months",
      eligibility: "IT, CS, Networking & Security Enthusiasts",
      tagline: "Learn defensive security, vulnerability scanning, network traffic analysis, and OWASP Top 10 remediation.",
      tech: ["Kali Linux", "Wireshark", "Burp Suite", "OWASP Top 10", "Network Protocols", "Nmap"],
      curriculum: [
        "TCP/IP Networking Deep Dive, Packet Inspection & Wireshark Diagnostics",
        "Web Application Vulnerabilities (SQL Injection, XSS, CSRF) & Exploits",
        "Reconnaissance, Port Scanning & Network Vulnerability Auditing",
        "Defensive Hardening, Cryptographic Basics & Incident Response Runbooks"
      ],
      capstone: "Full vulnerability assessment report and security patch audit on simulated infrastructure."
    },
    {
      id: "generative-ai",
      number: "08",
      code: "NT-GENAI-08",
      category: "ai",
      title: "Generative AI",
      level: "LLMs, RAG & Vector Systems",
      duration: "1–2 Months",
      eligibility: "Students familiar with Python wanting to build modern AI software",
      tagline: "Build production applications powered by Large Language Models, embeddings, and vector databases.",
      tech: ["LangChain", "OpenAI / Claude APIs", "ChromaDB", "Vector Embeddings", "RAG Pipelines"],
      curriculum: [
        "Transformer Architecture Foundations, Tokenization & Context Windows",
        "Retrieval-Augmented Generation (RAG) Architecture & Vector Embeddings",
        "Semantic Search, Chunking Strategies & Vector Database Indexing",
        "Evaluation Frameworks, Hallucination Mitigation & Production Guardrails"
      ],
      capstone: "Enterprise RAG question-answering system over private document libraries."
    },
    {
      id: "agentic-ai",
      number: "09",
      code: "NT-AGAI-09",
      category: "ai",
      title: "Agentic AI",
      level: "Autonomous Multi-Agent Systems",
      duration: "1–2 Months",
      eligibility: "Advanced Python/AI Students, Developers & Researchers",
      tagline: "Engineer autonomous AI agents with reasoning loops, tool-calling capabilities, and multi-agent coordination.",
      tech: ["LangGraph", "CrewAI", "MCP Protocols", "Function Calling", "Agent Workflows"],
      curriculum: [
        "ReAct Loop (Reasoning + Acting) & Autonomous State Graph Mechanics",
        "Function Calling, Tool Invocation & Database Integration",
        "Multi-Agent Orchestration, Role Assignment & Hierarchical Consensus",
        "Memory Systems (Short-term, Long-term & Episodic) for AI Agents"
      ],
      capstone: "Autonomous software development agent team that drafts specs, writes code, and tests output."
    },
    {
      id: "full-stack",
      number: "10",
      code: "NT-FSD-10",
      category: "fullstack",
      title: "Full Stack Development",
      level: "Comprehensive Web Stack",
      duration: "2–3 Months",
      eligibility: "Engineering, MCA, BCA & CS/IT Students",
      tagline: "Master full stack web development: modern HTML5/CSS, React frontend, Node.js API backends, and databases.",
      tech: ["HTML5 / CSS3", "JavaScript", "React", "Node.js", "Express", "MongoDB / SQL"],
      curriculum: [
        "Responsive Web Engineering with Modern CSS, Tailwind & JavaScript",
        "React Component Lifecycle, Custom Hooks, State Management & Routing",
        "Backend Server Engineering with Node.js, Express & REST APIs",
        "Database Architecture (NoSQL/SQL), User Auth (JWT) & Cloud Deployment"
      ],
      capstone: "Complete production-ready web application with user authentication and database persistence."
    },
    {
      id: "ui-ux",
      number: "11",
      code: "NT-UIUX-11",
      category: "creative",
      title: "UI/UX Designing",
      level: "Product Design & Prototyping",
      duration: "1–2 Months",
      eligibility: "Design Enthusiasts, CS Students & Aspiring Product Designers",
      tagline: "Learn user research, wireframing, component design systems, and interactive clickable prototypes in Figma.",
      tech: ["Figma", "User Research", "Wireframing", "Design Systems", "Prototyping", "Usability Testing"],
      curriculum: [
        "User Journey Mapping, Information Architecture & Low-Fidelity Wireframes",
        "Visual Design Principles: Typography Tokens, Color Theory & Spacing",
        "Mastering Figma: Auto-Layout, Component Libraries & Design Tokens",
        "High-Fidelity Clickable Mobile & Web Prototyping and Developer Hand-off"
      ],
      capstone: "Complete Figma product design case study and clickable interactive prototype."
    },
    {
      id: "digital-marketing",
      number: "12",
      code: "NT-DM-12",
      category: "creative",
      title: "Digital Marketing",
      level: "Growth & Performance Marketing",
      duration: "1–2 Months",
      eligibility: "Students, Business Owners & Aspiring Growth Marketers",
      tagline: "Master SEO, Google Search Ads, Meta lead generation, social media management, and performance marketing funnels.",
      tech: ["Google Ads", "Meta Ads", "SEO & Keywords", "Google Analytics 4", "Canva", "WhatsApp Funnels"],
      curriculum: [
        "Search Engine Optimization (SEO): Keyword Research, On-Page & Local SEO",
        "Google Search & Display Advertising: Setup, Bidding Strategy & Ad Copy",
        "Meta Ads Manager: Audience Targeting, Ad Creatives & Lead Generation",
        "Conversion Tracking, Performance Metrics & WhatsApp Sales Funnels"
      ],
      capstone: "Live digital marketing strategy and lead generation campaign audit."
    }
  ];

  const filteredCourses = selectedCategory === "all"
    ? courses
    : courses.filter((c) => c.category === selectedCategory);

  const handleApplyClick = (courseTitle) => {
    setActiveCourse(courseTitle);
    const element = document.getElementById("apply-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      
      const message = `*New Nexora Techno Internship Application*
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Program: ${data.program}
College: ${data.college}
Goals: ${data.about}`;

      const text = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/919345121988?text=${text}`;

      window.open(whatsappUrl, "_blank");

      setFormStatus("success");
      e.target.reset();
    } catch {
      setFormStatus("success");
      e.target.reset();
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col font-sans">
      <Navbar />
      <ScrollToTop />
      <WhatsAppButton />

      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="border-b border-rule bg-paper">
          <div className="container-content py-14 sm:py-18 text-center">
            <p className="eyebrow mb-4">For students and colleges</p>

            <h1 className="heading-display text-display-md text-ink mx-auto max-w-[28ch]">
              Practical technology internships and workshops.
            </h1>

            <p className="text-body-lg text-ink-muted max-w-[52ch] mx-auto mt-5 leading-relaxed">
              Project-based internship tracks and college workshops for engineering students.
              Build something real, finish with a verifiable certificate.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#courses-catalog"
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-base inline-block"
              >
                Explore 12 Internship Courses
              </motion.a>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/verification"
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-xl text-base transition-colors inline-block"
                >
                  Verify Issued Credentials
                </Link>
              </motion.div>
            </div>

            {/* Quick stats banner */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-14 pt-8 border-t border-rule grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
            >
              <div className="p-3 rounded-lg hover:bg-surface/60 transition-colors">
                <p className="text-2xl sm:text-3xl font-black text-ink font-mono">1,000+</p>
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mt-1">Students Oriented</p>
              </div>
              <div className="p-3 rounded-lg hover:bg-surface/60 transition-colors">
                <p className="text-2xl sm:text-3xl font-black text-ink font-mono">100+</p>
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mt-1">Online Workshops</p>
              </div>
              <div className="p-3 rounded-lg hover:bg-surface/60 transition-colors">
                <p className="text-2xl sm:text-3xl font-black text-ink font-mono">12</p>
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mt-1">Specialized Tracks</p>
              </div>
              <div className="p-3 rounded-lg hover:bg-surface/60 transition-colors">
                <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">100%</p>
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mt-1">Verifiable Records</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Impact Section */}
        <StudentImpactSection />

        {/* 9 Courses Catalog */}
        <section id="courses-catalog" className="py-20 lg:py-28 bg-slate-950 border-b border-slate-800 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Curriculum Catalog
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Official Internship Tracks
                </h2>
                <p className="text-slate-400 text-base mt-2 max-w-xl">
                  Select your track to review syllabus modules, tech stack, and practical capstone deliverables.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                      selectedCategory === cat.id
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                        : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/90 hover:border-indigo-500/40 p-7 flex flex-col justify-between transition-all card-lift relative overflow-hidden"
                >
                  <div>
                    {/* Header: Track code + level */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-900/50 px-2.5 py-1 rounded-md">
                        {course.code}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1.5">
                      {course.number}. {course.title}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-300 mb-3">
                      {course.level}
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed mb-5">
                      {course.tagline}
                    </p>

                    {/* Tech Badges */}
                    <div className="mb-5">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Stack & Tools:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {course.tech.map((t, idx) => (
                          <span key={idx} className="tech-tag text-[11px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Curriculum Modules */}
                    <div className="mb-6 space-y-2">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Syllabus Highlights:
                      </p>
                      {course.curriculum.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="font-mono text-indigo-400 font-bold shrink-0">·</span>
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Capstone Box */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs mb-6">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                        Capstone Deliverable
                      </span>
                      <p className="text-slate-300 leading-snug">
                        {course.capstone}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-4 border-t border-slate-800">
                    <button
                      onClick={() => handleApplyClick(course.title)}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-center text-xs transition-colors block shadow-md shadow-indigo-600/20"
                    >
                      Apply for {course.title}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Certificate Credential Verification Banner */}
        <section className="py-16 bg-slate-900/50 border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
              
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
                  Verifiable Credential Index
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Earn an Official Nexora Techno Internship Certificate
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Every intern who completes their project milestones receives a unique certificate ID. Recruiter and college verification is instantaneous through our public verification portal.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  to="/verification"
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 text-sm transition-all"
                >
                  <span>Verification Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="apply-form" className="py-20 lg:py-28 bg-slate-950 border-t border-slate-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Context & Guarantees */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Internship Enrollment
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Apply for your internship cohort.
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
                    Submit your details to secure a seat in our upcoming batch. Our team in Salem will contact you directly to discuss batch timings, prerequisite materials, and orientation.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {[
                    {
                      title: "Practical, Project-Driven Learning",
                      desc: "Build genuine applications from day one with modern developer tools and GitHub workflows."
                    },
                    {
                      title: "Direct Mentor Support",
                      desc: "Regular code reviews and 1-on-1 guidance from software engineers who build for real clients."
                    },
                    {
                      title: "Flexible Online & Salem Offline Batches",
                      desc: "Classes and mentoring sessions scheduled around college and semester exam timetables."
                    },
                    {
                      title: "Online Verifiable Certificate",
                      desc: "Every graduate receives an official completion certificate with a verifiable ID on our public portal."
                    }
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                      <div>
                        <span className="text-white font-semibold text-sm block">{point.title}</span>
                        <span className="text-slate-400 text-xs leading-relaxed">{point.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-300">Need guidance choosing a track?</p>
                  <p>
                    Chat directly with our course coordinators on WhatsApp:{" "}
                    <a
                      href="https://wa.me/919345121988"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-medium underline"
                    >
                      +91 93451 21988
                    </a>
                  </p>
                </div>
              </div>

              {/* Right Column: Reframed Application Form */}
              <div className="lg:col-span-7">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                  
                  <div className="mb-6 pb-4 border-b border-slate-800">
                    <h3 className="text-xl font-bold text-white">Student Application Form</h3>
                    <p className="text-slate-400 text-xs mt-1">
                      Fill out the form below. Applications are reviewed on a rolling basis.
                    </p>
                  </div>

                  {formStatus === "success" ? (
                    <div className="text-center py-10 space-y-4">
                      <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                        <span className="text-2xl font-bold">✓</span>
                      </div>
                      <h4 className="text-xl font-bold text-white">Application Received</h4>
                      <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                        Your application has been received. Our team will contact you via WhatsApp / Email with orientation details.
                      </p>
                      <button
                        onClick={() => setFormStatus("idle")}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition-colors"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Your name"
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                            WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="Your 10-digit number"
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                            Selected Course *
                          </label>
                          <select
                            name="program"
                            required
                            defaultValue={activeCourse}
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                          >
                            <option value="1. AI with Python">1. AI with Python (NT-AIP-01)</option>
                            <option value="2. JavaScript">2. JavaScript (NT-JS-02)</option>
                            <option value="3. MERN Stack">3. MERN Stack (NT-MERN-03)</option>
                            <option value="4. Mobile App Development">4. Mobile App Development (NT-MOB-04)</option>
                            <option value="5. Data Science with Python">5. Data Science with Python (NT-DSP-05)</option>
                            <option value="6. Data Analytics">6. Data Analytics (NT-DA-06)</option>
                            <option value="7. Cyber Security">7. Cyber Security (NT-SEC-07)</option>
                            <option value="8. Generative AI">8. Generative AI (NT-GENAI-08)</option>
                            <option value="9. Agentic AI">9. Agentic AI (NT-AGAI-09)</option>
                            <option value="10. Full Stack Development">10. Full Stack Development (NT-FSD-10)</option>
                            <option value="11. UI/UX Designing">11. UI/UX Designing (NT-UIUX-11)</option>
                            <option value="12. Digital Marketing">12. Digital Marketing (NT-DM-12)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                          College & Degree (Optional)
                        </label>
                        <input
                          type="text"
                          name="college"
                          placeholder="Your college, degree & year (e.g. College Name, B.E / B.Sc)"
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                          Learning Goals & Interests *
                        </label>
                        <textarea
                          name="about"
                          rows="3"
                          required
                          placeholder="Tell us what technologies you want to learn or what project you would like to build..."
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-indigo-500 focus:outline-none resize-none transition-colors"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === "loading"}
                        className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-sm"
                      >
                        <Send className="w-4 h-4" />
                        <span>{formStatus === "loading" ? "Submitting Application..." : "Submit Application via WhatsApp"}</span>
                      </button>

                      <p className="text-center text-[11px] text-slate-500 pt-1">
                        We respect your privacy. Your information is only used for internship coordination.
                      </p>

                    </form>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
