// Service pages. Keep the wording plain: say what we do and how, skip the adjectives.

export const servicesData = [
  {
    id: "website-development",
    title: "Websites",
    category: "Web",
    shortDescription: "Business websites that load quickly, work on phones, and that you can update yourself.",
    problem:
      "A lot of local businesses either have no website, or one that was made years ago, is slow on a phone, and nobody knows how to change. People look you up, can't find the basics, and call someone else.",
    solution:
      "We build a site around the few things your customers actually come for: what you do, where you are, prices or a catalogue if you have one, and a quick way to call or WhatsApp you. Then we show you how to edit it.",
    features: [
      { title: "Works on phones first", description: "Most of your visitors are on mobile, so that's where we design and test." },
      { title: "Fast", description: "Small pages, compressed images, no heavy page builders." },
      { title: "Easy to contact you", description: "Call, WhatsApp and enquiry form, placed where people look for them." },
      { title: "Set up for Google", description: "Proper titles, descriptions and business details so search engines can read the site." },
      { title: "You can edit it", description: "Change text, photos and prices without calling us every time." },
    ],
    technologies: ["React", "Tailwind CSS", "Vite", "Node.js"],
    process: ["A call about your business", "Page list and rough layout", "Design and build", "Your review and changes", "Launch on your domain", "Support after launch"],
    relevantProjects: ["buddies-unleashed", "home-nest"],
    faq: [
      { question: "How long does a website take?", answer: "A normal business site takes one to two weeks once we have your content. Bigger sites with custom features take three to four." },
      { question: "Will it work on mobile?", answer: "Yes. We design for phones first and check it on real devices before launch." },
      { question: "Can you handle the domain and hosting?", answer: "Yes. We can register the domain, set up hosting and SSL, and create business email addresses for you. Everything is in your name." },
    ],
  },
  {
    id: "software-development",
    title: "Custom software",
    category: "Software",
    shortDescription: "Billing, stock, bookings and client portals, built around the way your business already runs.",
    problem:
      "Many businesses run on a mix of Excel sheets, notebooks and WhatsApp groups. It works until it doesn't: data gets lost, two people update the same thing, and nobody can see the full picture.",
    solution:
      "We sit with the people who will use the software, write down what they do each day, and build a tool that does exactly that. Nothing extra you'll have to pay for or learn.",
    features: [
      { title: "Built around your process", description: "Your steps, your approval rules, your terms. Not a generic template." },
      { title: "Different access for different people", description: "Staff see what they need; owners see everything." },
      { title: "Reports you'll use", description: "Daily sales, stock levels, attendance, whatever you check most." },
      { title: "Connects to what you have", description: "Payment gateways, SMS and WhatsApp, and existing databases." },
    ],
    technologies: ["React", "Node.js", "Python", "MySQL", "MongoDB", "REST APIs"],
    process: ["Watch how the work is done today", "Write down what the first version must do", "Build in short rounds you can try", "Move your existing data across", "Train your staff", "Support and changes"],
    relevantProjects: ["codexpertai", "varavu-selavu"],
    faq: [
      { question: "Why not just use ready-made software?", answer: "If something off the shelf fits, use it, and we'll tell you so. Custom software makes sense when your process is different, or the per-user subscriptions add up." },
      { question: "Can it connect to our existing database or accounting system?", answer: "Usually, yes. We'll check what you use and tell you what's possible before we start." },
    ],
  },
  {
    id: "ecommerce-development",
    title: "Online stores",
    category: "Web",
    shortDescription: "A shop with your catalogue, WhatsApp ordering and UPI payments, that you manage yourself.",
    problem:
      "Selling through Instagram DMs and WhatsApp works for a while, but orders get missed, stock goes out of sync, and customers can't browse everything you have.",
    solution:
      "We build a store with your products, prices and photos, connect UPI and card payments, and keep WhatsApp ordering for customers who prefer it. You get a simple admin page to add products and see orders.",
    features: [
      { title: "Catalogue", description: "Categories, search, photos and product variants like size or colour." },
      { title: "Payments", description: "UPI, cards and net banking through Razorpay or a similar gateway." },
      { title: "WhatsApp orders", description: "Customers can send their cart to you on WhatsApp if they'd rather." },
      { title: "Admin page", description: "Add products, change prices, track orders and stock." },
    ],
    technologies: ["React", "Node.js", "MongoDB", "Razorpay", "WhatsApp Business API"],
    process: ["Products, pricing and delivery rules", "Store layout", "Build and payment setup", "Add your products", "Test orders end to end", "Launch"],
    relevantProjects: ["home-nest"],
    faq: [
      { question: "Which payment gateways do you support?", answer: "Razorpay, PayU, PhonePe and Paytm, or a simple UPI QR if you'd rather avoid gateway fees." },
      { question: "Can I add products myself later?", answer: "Yes. You get an admin page for products, prices and orders. No coding needed." },
    ],
  },
  {
    id: "ai-automation",
    title: "Automation and AI",
    category: "Automation",
    shortDescription: "Using AI for the boring, repetitive parts of the job, where it actually saves time.",
    problem:
      "Your team answers the same ten questions every day, types figures from invoices into a sheet, and chases people for follow-ups. It's slow, and mistakes creep in.",
    solution:
      "We look for the tasks that are repetitive and rule-based, and hand those to an AI model or a simple workflow. A person still checks anything important.",
    features: [
      { title: "Answering common questions", description: "A website or WhatsApp assistant that handles routine enquiries and passes the rest to you." },
      { title: "Reading documents", description: "Pulling figures from invoices, receipts and forms into a sheet or database." },
      { title: "Follow-ups", description: "Sorting new enquiries and sending reminders automatically." },
    ],
    technologies: ["OpenAI / Anthropic APIs", "n8n", "Python", "Node.js", "Webhooks"],
    process: ["List the repetitive tasks", "Pick one to try first", "Build and test on real examples", "Run it alongside your team", "Extend if it works"],
    relevantProjects: ["codexpertai", "varavu-selavu"],
    faq: [
      { question: "Is this expensive for a small business?", answer: "Usually not. AI APIs are pay-per-use, and tools like n8n are free to self-host. We'll estimate running costs before you commit." },
      { question: "Can AI reply on WhatsApp for us?", answer: "Yes. It can answer common questions and take bookings, and hand over to a person when it should." },
    ],
  },
  {
    id: "business-automation",
    title: "Connecting your tools",
    category: "Automation",
    shortDescription: "Forms, Google Sheets, WhatsApp and email passing data to each other, so nobody copies it by hand.",
    problem:
      "Enquiries arrive on the website, someone copies them into a sheet, someone else messages the customer. Every hand-off is a chance to forget something.",
    solution:
      "We connect the tools you already use so the data moves on its own: a form entry lands in your sheet, the customer gets a confirmation, and your team gets a WhatsApp alert.",
    features: [
      { title: "Notifications", description: "Booking confirmations, payment reminders and status updates on WhatsApp or SMS." },
      { title: "Enquiries into your sheet or CRM", description: "Every lead saved in one place, automatically." },
      { title: "Billing and stock", description: "Invoices generated and low-stock alerts sent when a sale is made." },
      { title: "Daily summaries", description: "A short report on sales or enrolments sent to your phone each morning." },
    ],
    technologies: ["n8n", "Node.js", "Python", "Google Sheets API", "WhatsApp Cloud API"],
    process: ["Map where data comes from and goes", "Connect the first two tools", "Test with real entries", "Add the rest"],
    relevantProjects: ["varavu-selavu"],
    faq: [
      { question: "Can you automate our existing Google Sheets?", answer: "Yes. Sheets connect easily to WhatsApp, email and most other tools." },
    ],
  },
  {
    id: "web-app-development",
    title: "Web and mobile apps",
    category: "Software",
    shortDescription: "Apps with user accounts and a proper backend, for your customers or your staff. Android apps in Kotlin.",
    problem:
      "Some ideas need more than a website: people logging in, saving their own data, getting updates. That needs a real application behind it.",
    solution:
      "We build the app and the server it talks to. For most business apps a web app that installs from the browser (a PWA) is enough; when you need a native Android app, we build that in Kotlin.",
    features: [
      { title: "Accounts and roles", description: "Secure sign-in, and different access for different users." },
      { title: "Installs from the browser", description: "A PWA works on phone and desktop without going through an app store." },
      { title: "Works on poor connections", description: "Key screens keep working when the network is slow." },
      { title: "Native Android when needed", description: "Kotlin and Jetpack Compose, like our Varavu Selavu app." },
    ],
    technologies: ["React", "Node.js", "Kotlin", "Jetpack Compose", "Firebase", "MongoDB"],
    process: ["What users need to do", "Screens and data", "Build in rounds", "Test with real users", "Release"],
    relevantProjects: ["codexpertai", "varavu-selavu"],
    faq: [
      { question: "Is a PWA better than a native app?", answer: "For most business apps it's cheaper and faster to ship, and works on both Android and iPhone. If you need deep phone features or the Play Store, go native." },
    ],
  },
  {
    id: "seo",
    title: "Getting found on Google",
    category: "Marketing",
    shortDescription: "Page structure, Google Business Profile and local search setup.",
    problem:
      "If someone in Salem searches for what you sell and you don't show up, you've lost them before they knew you existed.",
    solution:
      "We fix the technical basics on your site, set up and fill out your Google Business Profile, and make sure your name, address and phone number match everywhere.",
    features: [
      { title: "Technical fixes", description: "Titles, descriptions, headings, speed and structured data." },
      { title: "Google Business Profile", description: "Photos, hours, categories and posts, so you show on Maps." },
      { title: "Search Console", description: "Set up so you can see what people search to find you." },
    ],
    technologies: ["Google Search Console", "Google Analytics 4", "Structured data", "Lighthouse"],
    process: ["Check where you stand", "Fix the site", "Set up the Business Profile", "Review after a month"],
    relevantProjects: ["home-nest", "buddies-unleashed"],
    faq: [
      { question: "How soon will we see results?", answer: "Local changes usually start to show in four to eight weeks. Nobody can promise a ranking, and you should be wary of anyone who does." },
    ],
  },
  {
    id: "full-stack-development",
    title: "Full stack development",
    category: "Software",
    shortDescription: "The whole application, database to screen, built by one team.",
    problem:
      "When the frontend, backend and database are built by different people who never talk, things break at the joins.",
    solution:
      "One small team builds the database, the server and the interface together, so changes in one place don't surprise the others.",
    features: [
      { title: "Database design", description: "Tables and relationships planned before code." },
      { title: "APIs", description: "Clean, documented endpoints your other tools can use." },
      { title: "Interface", description: "React frontends that are quick and easy to use." },
      { title: "Taking over old code", description: "We can review an existing app, fix what's slow, and keep building on it." },
    ],
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "MongoDB", "Docker"],
    process: ["Requirements", "Data model", "Build", "Test", "Deploy", "Maintain"],
    relevantProjects: ["codexpertai"],
    faq: [
      { question: "Which stack do you use?", answer: "Mostly React and Node.js with PostgreSQL or MongoDB. If you already have a stack, we'll usually stick with it." },
      { question: "Can you take over an existing app?", answer: "Yes. We'll read the code first and tell you honestly what state it's in." },
    ],
  },
  {
    id: "ui-ux-design",
    title: "Design",
    category: "Design",
    shortDescription: "Wireframes and clickable Figma prototypes, before or instead of building.",
    problem:
      "Building straight away without a plan is how you end up paying to rebuild screens twice.",
    solution:
      "We sketch the screens, make a clickable prototype in Figma, and test it with a few real users before anyone writes code.",
    features: [
      { title: "Wireframes", description: "Quick layouts to agree on what goes where." },
      { title: "Clickable prototypes", description: "Something you can tap through on your phone and show others." },
      { title: "Design system", description: "Colours, type and components written down so the product stays consistent." },
    ],
    technologies: ["Figma", "Adobe XD"],
    process: ["Understand users", "Wireframes", "Visual design", "Prototype", "Test and adjust", "Hand over files"],
    relevantProjects: ["codexpertai", "home-nest"],
    faq: [
      { question: "Do we get the Figma files?", answer: "Yes, all of them." },
      { question: "Can you redesign something we already have?", answer: "Yes. We'll review what's there first and keep what works." },
    ],
  },
  {
    id: "digital-marketing",
    title: "Ads and campaigns",
    category: "Marketing",
    shortDescription: "Google, Meta and WhatsApp campaigns with clear targeting and honest reporting.",
    problem:
      "Boosting posts without a plan spends money and brings likes, not customers.",
    solution:
      "We set a small budget, target the right area and audience, send people to a page built for that ad, and report what it cost per enquiry.",
    features: [
      { title: "Google Ads", description: "Show up when people search for what you sell." },
      { title: "Meta Ads", description: "Facebook and Instagram, targeted by area and interest." },
      { title: "WhatsApp campaigns", description: "Updates and offers to customers who opted in." },
      { title: "Plain reports", description: "Spend, enquiries and cost per enquiry. That's it." },
    ],
    technologies: ["Google Ads", "Meta Ads Manager", "WhatsApp Business API", "Google Analytics 4"],
    process: ["Goal and budget", "Audience and area", "Ad and landing page", "Run and watch", "Adjust weekly"],
    relevantProjects: ["home-nest", "buddies-unleashed"],
    faq: [
      { question: "What's the minimum budget?", answer: "You can start with around ₹300 to ₹500 a day and increase it once you see what works." },
      { question: "Where do the leads go?", answer: "Straight to your WhatsApp or email, or into a shared sheet." },
    ],
  },
];
