import { motion } from "framer-motion";
import { ExternalLink, Sparkles, Smartphone, Globe, ShoppingBag, ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "buddies-unleashed",
    title: "Buddies Unleashed",
    subtitle: "Adventure Community Website",
    icon: "🏍️",
    category: "Community & Adventure Platform",
    image: "/projects/buddies-unleashed.png",
    imageFit: "object-cover object-top",
    link: "https://buddiesunleashed.com/",
    linkType: "website",
    linkLabel: "Visit Website",
    description:
      "Buddies Unleashed is a modern and responsive website developed for an adventure motorcycle riding community dedicated to bringing together passionate riders and explorers. The platform showcases the community's mission, upcoming rides, member information, adventure galleries, and contact details through an engaging and user-friendly interface. Designed with a bold visual identity and optimized for performance across all devices, the website strengthens the community's online presence while making it easy for riders to connect and stay informed about upcoming adventures.",
    services: [
      "Website Design",
      "Responsive Web Development",
      "UI/UX Design",
      "Community Website Development",
      "Performance Optimization",
    ],
    highlights: ["Rider Brotherhood", "Upcoming Rides Hub", "Gallery & Log Book"],
    theme: "from-red-500/20 via-slate-800/10 to-amber-500/20",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
  },
  {
    id: "varavu-selavu",
    title: "Varavu Selavu App",
    subtitle: "Personal Finance & Expense Tracker",
    icon: "💰",
    category: "Mobile Application",
    image: "/projects/varavu-selavu.png",
    imageFit: "object-contain p-8 sm:p-10",
    link: "https://play.google.com/store/apps/details?id=com.varavuselavu",
    linkType: "playstore",
    linkLabel: "Google Play Store",
    description:
      "Varavu Selavu is a smart personal finance management application developed to simplify daily income and expense tracking. The application enables users to record financial transactions, monitor spending habits, and maintain better control over their budgets through a clean and user-friendly interface. Designed for efficiency and ease of use, the app provides a practical solution for individuals looking to manage their finances anytime, anywhere.",
    services: ["Android App Development", "UI/UX Design", "Local Database Integration", "Financial Management Solution"],
    highlights: ["Google Play Published", "Secure Local Storage", "Expense Insights"],
    theme: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "home-nest",
    title: "Home Nest – E-Commerce Website",
    subtitle: "Handmade & Natural Products Brand",
    icon: "🏡",
    category: "E-Commerce Platform",
    image: "/projects/home-nest.png",
    imageFit: "object-contain p-6 sm:p-8",
    link: "https://www.home-nest.co.in/",
    linkType: "website",
    linkLabel: "Visit Store",
    description:
      "Home Nest is a modern e-commerce platform designed for a brand specializing in handmade, homemade, and natural products. The website offers a seamless shopping experience with an organized product catalog, detailed product pages, secure ordering process, and WhatsApp-based order integration. Built with responsive design principles and optimized performance, the platform enables customers to explore and purchase high-quality natural products effortlessly across desktop and mobile devices.",
    services: [
      "E-Commerce Website Development",
      "Full-Stack Web Development",
      "Responsive Design",
      "Product Management",
      "WhatsApp Integration",
      "Performance Optimization",
    ],
    highlights: ["WhatsApp Checkout Integration", "Handmade Product Catalog", "Secure Ordering"],
    theme: "from-amber-500/20 via-orange-500/10 to-yellow-500/20",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

function PortfolioSection() {
  return (
    <section id="portfolio" className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden text-white">
      {/* Background Subtle Gradient Blobs */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" /> Our Portfolio
          </span>
          <h2 className="mt-4 font-display text-4xl font-black text-white sm:text-5xl lg:text-6xl tracking-tight">
            Crafted for Impact. Built for Growth.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
            At <strong className="text-white font-semibold">Nexora Techno</strong>, we transform ideas into innovative digital solutions. From websites and mobile applications to business software, we build scalable, user-friendly, and high-performance products tailored to our clients' needs.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="mt-16 space-y-12 lg:space-y-16">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-800/60 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-blue-500/40 hover:shadow-blue-500/10"
              >
                <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
                  {/* Visual Image Container */}
                  <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 shadow-lg group-hover:border-blue-400/30 transition-all duration-500">
                      {project.image ? (
                        <div className="flex h-64 w-full items-center justify-center bg-slate-950/90 sm:h-80 lg:h-[340px]">
                          <img
                            src={project.image}
                            alt={`${project.title} Logo / Preview`}
                            className={`h-full w-full transition duration-700 group-hover:scale-105 ${project.imageFit}`}
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="flex h-64 w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 text-center sm:h-80 lg:h-[340px]">
                          <span className="text-6xl">{project.icon}</span>
                          <h4 className="mt-4 font-display text-xl font-bold text-white">{project.title}</h4>
                          <p className="mt-1 text-xs text-slate-400">{project.subtitle}</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
                      
                      {/* Top Overlay Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl bg-slate-950/80 px-3.5 py-1.5 text-xs font-bold text-white border border-white/10 backdrop-blur-md">
                        <span className="text-base">{project.icon}</span>
                        <span>{project.category}</span>
                      </div>

                      {/* Floating Link CTA */}
                      <div className="absolute bottom-4 right-4">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition duration-200 hover:bg-blue-500 hover:scale-105 active:scale-95"
                        >
                          <span>{project.linkLabel}</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className={`lg:col-span-6 flex flex-col justify-between ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{project.icon}</span>
                        <div>
                          <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                            {project.title}
                          </h3>
                          <p className="text-sm font-medium text-blue-400">{project.subtitle}</p>
                        </div>
                      </div>

                      <p className="mt-4 text-base leading-relaxed text-slate-300">
                        {project.description}
                      </p>

                      {/* Services Delivered */}
                      <div className="mt-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Services Delivered
                        </h4>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.services.map((service) => (
                            <span
                              key={service}
                              className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-8 flex items-center gap-4 pt-4 border-t border-white/10">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.02] hover:shadow-blue-500/35"
                      >
                        {project.linkType === "playstore" ? (
                          <Smartphone className="h-4 w-4" />
                        ) : project.icon === "🏡" ? (
                          <ShoppingBag className="h-4 w-4" />
                        ) : (
                          <Globe className="h-4 w-4" />
                        )}
                        <span>Open {project.title.split("–")[0].trim()}</span>
                        <ExternalLink className="h-4 w-4 opacity-75" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
