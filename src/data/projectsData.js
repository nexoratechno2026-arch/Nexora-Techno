// Projects shown on /projects. Facts only; if it isn't true, it doesn't go here.

export const projectsData = [
  {
    id: "codexpertai",
    name: "CodeXpertAI",
    kind: "Our own product",
    image: "/projects/codexpertai.png",
    url: "https://nexoratechno-code.web.app",
    summary:
      "A place to practise coding problems and sit mock technical interviews. The interviewer is an AI that listens to your answer and asks follow-up questions, the way a real panel would.",
    why:
      "Most practice sites keep coding problems and interview practice apart. In a real interview you have to do both at once: write the code and explain it while someone questions you.",
    details: [
      "Code editor that runs Python, JavaScript, TypeScript, Java, C++, Go and SQL in a sandbox",
      "Sample tests while you work, hidden tests when you submit",
      "Problems across 14 topics, from arrays to system design",
      "Spoken mock interviews in five formats: concepts, live coding, system design, SQL, and behavioural (STAR)",
      "A written report after each interview on what went well and what to revise",
    ],
    stack: "React, TypeScript, Vite, Monaco Editor, Firebase, Cloud Functions, Gemini API",
  },
  {
    id: "home-nest",
    name: "Home Nest",
    kind: "Online store",
    image: "/projects/home-nest.png",
    logo: true,
    url: "https://www.home-nest.co.in",
    summary:
      "An online shop for homemade and artisan products. Customers browse the catalogue and order on WhatsApp or pay by UPI.",
    why:
      "The makers didn't want to give a cut of every sale to a marketplace, but they also needed something better than sending photos one by one on WhatsApp.",
    details: [
      "Product catalogue with photo galleries",
      "Order on WhatsApp with the cart already filled in",
      "UPI and online payments",
      "Built for phones first, since that's where the customers are",
    ],
    stack: "React, Tailwind CSS, WhatsApp, Razorpay / UPI",
  },
  {
    id: "buddies-unleashed",
    name: "Buddies Unleashed",
    kind: "Community website",
    image: "/projects/buddies-unleashed.png",
    url: "https://www.buddiesunleashed.com",
    summary:
      "The website for a motorcycle riding group in Tamil Nadu. Upcoming rides, safety rules, photos from past trips, and how to join.",
    why:
      "The group needed one place to share upcoming rides, teach safety and riding discipline, and make it easy for new riders to get in touch.",
    details: [
      "The group's story and riding philosophy",
      "Upcoming rides and events",
      "Safety and riding discipline guidelines",
      "Galleries from past expeditions",
    ],
    stack: "React, Tailwind CSS",
  },
  {
    id: "varavu-selavu",
    name: "Varavu Selavu",
    kind: "Android app",
    image: "/projects/varavu-selavu.png",
    logo: true,
    url: null,
    summary:
      "An income and expense tracker. You can speak an entry in Tamil and the app puts it in the right category for you.",
    why:
      "Plenty of people still keep accounts in a paper notebook because typing every expense into an app is a chore. Speaking it is quicker.",
    details: [
      "Tamil voice input for entries",
      "Automatic categories using the Gemini API",
      "Monthly summaries",
      "Entries stored on the device with Room",
    ],
    stack: "Kotlin, Jetpack Compose, Room, Gemini API",
  },
];
