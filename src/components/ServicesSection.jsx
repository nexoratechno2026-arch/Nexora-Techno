import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { servicesData } from "../data/servicesData";
import { 
  Globe, 
  Code2, 
  Bot, 
  ShoppingBag, 
  Zap, 
  Smartphone, 
  TrendingUp, 
  ArrowRight 
} from "lucide-react";

export default function ServicesSection() {
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "Globe": return <Globe className="w-6 h-6 text-indigo-600" />;
      case "Code2": return <Code2 className="w-6 h-6 text-indigo-600" />;
      case "Bot": return <Bot className="w-6 h-6 text-indigo-600" />;
      case "ShoppingBag": return <ShoppingBag className="w-6 h-6 text-indigo-600" />;
      case "Zap": return <Zap className="w-6 h-6 text-indigo-600" />;
      case "Smartphone": return <Smartphone className="w-6 h-6 text-indigo-600" />;
      case "TrendingUp": return <TrendingUp className="w-6 h-6 text-indigo-600" />;
      default: return <Globe className="w-6 h-6 text-indigo-600" />;
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-3">
            Core Engineering Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Software & Technology Solutions Designed for Business Growth
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            From modern responsive web applications to AI workflow automation, we build custom solutions around real business requirements.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(79,70,229,0.1)" }}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  {React.cloneElement(getIconComponent(service.icon), {
                    className: "w-7 h-7 group-hover:text-white transition-colors"
                  })}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  to={`/services/${service.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors group/link"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
