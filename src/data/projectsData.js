export const projectsData = [
  {
    id: "codexpertai",
    name: "CodeXpertAI",
    category: "AI Developer Platform & EdTech SaaS",
    shortDescription: "Production-grade developer platform synchronizing hands-on sandboxed coding execution and real-time AI-guided mock interviews.",
    image: "/projects/codexpertai.png",
    logoImage: "/projects/codexpertai-logo.png",
    technologies: [
      "React 18",
      "TypeScript 5",
      "Vite 6",
      "Monaco Editor",
      "Google Gemini AI",
      "Firebase Suite",
      "Cloud Functions v2",
      "Sandboxed Execution"
    ],
    problem: "Traditional developer learning platforms isolate algorithmic practice from interview rehearsals, leaving engineers unprepared for live technical evaluations, high-pressure problem solving, and dynamic technical follow-ups.",
    solution: "Developed entirely by the engineering team at Nexora Techno, CodeXpertAI seamlessly synchronizes hands-on coding execution and interactive AI interview evaluations with isolated multi-language sandboxed execution and real-time conversational evaluation.",
    features: [
      "CodeLab: Monaco Editor with isolated execution for Python, JavaScript, TypeScript, Java, C++, Go, and ANSI SQL",
      "Dual-stage evaluation: visible sample tests for debugging ('Run') and private automated test suites for evaluation ('Submit')",
      "Algorithmic catalog covering 14 CS domains (Data Structures, Algorithms, SQL, System Design)",
      "InterviewAI: Real-time conversational mock interviews covering 5 disciplines (Technical Concepts, Live Coding, System Architecture, SQL & Databases, STAR Behavioral)",
      "Dynamic conversational follow-up questioning adapting to candidate responses in real time",
      "Post-session evidence-grounded performance diagnostic reports detailing strengths, weaknesses, and revision roadmaps",
      "Unified Skill Intelligence: 5-tier product-wide skill levels correlating code submission benchmarks with interview performance",
      "Deterministic daily challenges, streaks, and personalized study plans"
    ],
    pillars: [
      {
        name: "CodeLab",
        tagline: "Algorithmic Practice & Sandboxed Execution",
        points: [
          "Monaco Editor with multi-language syntax highlighting",
          "Containerized execution for Python, JS, TS, Java, C++, Go, and SQL",
          "Dual-stage test evaluation with anti-cheat test suites",
          "14 Computer Science algorithmic domains"
        ]
      },
      {
        name: "InterviewAI",
        tagline: "AI-Guided Technical Mock Interviews",
        points: [
          "Real-time conversational mock interviews across 5 disciplines",
          "Adaptive follow-up questioning based on candidate responses",
          "Evidence-grounded post-session diagnostic reports",
          "Speech-to-Text & Text-to-Speech multi-modal interaction"
        ]
      },
      {
        name: "Unified Skill Intelligence",
        tagline: "Skill Benchmarks & Career Roadmap",
        points: [
          "5-tier skill progression (Beginner to Expert)",
          "Correlated metrics between code and interview performance",
          "Deterministic daily coding challenges and streak tracking",
          "Personalized diagnostic study plans"
        ]
      }
    ],
    techBreakdown: [
      { tier: "User Interface & Client", stack: "React 18, TypeScript 5, Vite 6, React Router DOM 6, Monaco Editor, Lucide React, Modular CSS" },
      { tier: "Backend & Cloud Infrastructure", stack: "Firebase Suite (Authentication, Cloud Firestore, Cloud Functions v2, Hosting), Google Cloud Platform" },
      { tier: "AI & Conversational Engine", stack: "Generative AI LLM Orchestration (Google Gemini / OpenAI APIs), Web Audio API, Web Speech API" },
      { tier: "Code Execution Engine", stack: "Sandboxed Execution Engine with strict resource isolation (CPU & Memory limits, anti-cheat test suites)" },
      { tier: "Testing & Quality Assurance", stack: "Vitest, React Testing Library, JSDOM, Strict TypeScript Typechecking (209 unit tests)" },
      { tier: "Search & Discovery Engine", stack: "SEOHead Dynamic Meta Management, Schema.org JSON-LD, Robots.txt, Sitemap.xml, LLMs.txt" }
    ],
    result: "Production-grade developer platform engineered from the ground up by Nexora Techno, used by engineering students and candidates preparing for top tech roles.",
    liveUrl: "https://nexoratechno-code.web.app",
    badge: "Flagship Product",
    status: "Live Platform"
  },
  {
    id: "varavu-selavu",
    name: "Varavu Selavu",
    category: "Financial Software & Custom App",
    shortDescription: "Income & Expense Management Application built for individuals and small business owners to track daily cashflow easily.",
    image: "/projects/varavu-selavu.png",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Local Storage / Cloud Sync"],
    problem: "Small business owners and individuals struggle with keeping track of daily cash transactions, credit entries, and monthly expense summaries using traditional paper notebooks or complex accounting tools.",
    solution: "Developed a clean, intuitive bilingual (Tamil/English support ready) financial tracker application that lets users record transactions instantly, categorize expenses, and generate clean visual monthly reports.",
    features: [
      "Quick credit & debit transaction entry interface",
      "Visual monthly cashflow graphs and category pie charts",
      "Custom date range filtering and export capabilities",
      "Fast lightweight mobile-first UI designed for quick access on the go"
    ],
    result: "Helps users manage daily operational cash flow effortlessly with zero accounting training needed.",
    liveUrl: "#",
    badge: "Real Project"
  },
  {
    id: "buddies-unleashed",
    name: "Buddies Unleashed",
    category: "Motorcycle Riding Community Platform",
    shortDescription: "Centralized digital platform representing the motorcycle riding community, ride activities, safety guidelines, and rider connections.",
    image: "/projects/buddies-unleashed.png",
    logoImage: "/projects/buddies-unleashed-logo.png",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Community Web Platform"],
    problem: "Buddies Unleashed needed a centralized digital platform to represent its motorcycle riding community, communicate rides and activities, educate riders about safety and discipline, and make it easier for new riders to connect with the community.",
    solution: "Nexora Techno developed a modern community website that brings together the clan's identity, riding philosophy, upcoming activities, safety guidelines, rider information, expedition memories and contact channels into one accessible platform.",
    features: [
      "Clan identity & riding philosophy showcase",
      "Upcoming rides & community activities hub",
      "Rider safety guidelines & discipline education portal",
      "Expedition memory galleries & rider connection channels"
    ],
    result: "Established a unified digital platform connecting motorcycle riders and communicating safety guidelines and expedition memories.",
    liveUrl: "https://www.buddiesunleashed.com",
    badge: "Real Project"
  },
  {
    id: "home-nest",
    name: "Home Nest",
    category: "E-Commerce & Homemade Products",
    shortDescription: "E-commerce platform designed to showcase and sell artisan homemade goods with smooth product catalogs and order options.",
    image: "/projects/home-nest.png",
    technologies: ["React", "Tailwind CSS", "WhatsApp Business Integration", "Razorpay / UPI"],
    problem: "Artisan and homemade product creators faced difficulties reaching local and regional buyers online without paying exorbitant marketplace commissions.",
    solution: "Designed and launched Home Nest, an elegant storefront optimized for homemade products with direct WhatsApp ordering, UPI payment support, and crisp visual branding.",
    features: [
      "Curated product catalog with high-resolution gallery view",
      "Instant WhatsApp order dispatch with pre-filled items",
      "Direct UPI & digital payment gateway integration",
      "Mobile-first responsive shopping experience"
    ],
    result: "Enabled artisan producers to accept online orders directly with zero commission overhead.",
    liveUrl: "https://www.home-nest.co.in",
    badge: "Real Project"
  }
];
