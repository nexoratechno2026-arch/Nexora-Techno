import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";
import { blogData } from "../data/blogData";
import { BookOpen, Clock, ArrowRight, Search, Tag } from "lucide-react";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(blogData.map((b) => b.category))];

  const filteredPosts = blogData.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />
      <ScrollToTop />
      <WhatsAppButton />

      <main className="flex-grow">
        
        {/* Blog Hero */}
        <section className="relative py-16 lg:py-24 tech-grid-bg border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/30">
              <BookOpen className="w-4 h-4" /> Articles & Tech Insights
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Nexora Techno Knowledge Base
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto mt-4 leading-relaxed">
              Guides on website development costs in Salem, AI automation for small businesses, software engineering decisions, and student IT career paths.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mt-8 relative">
              <input
                type="text"
                placeholder="Search articles on websites, AI, costs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3.5 pl-12 bg-slate-900 border border-slate-700 rounded-2xl text-white placeholder-slate-400 text-sm focus:border-indigo-500 focus:outline-none shadow-lg"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

          </div>
        </section>

        {/* Category Filters */}
        <section className="py-6 bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <span className="text-xs font-bold uppercase text-slate-400 mr-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-950 text-indigo-300 font-semibold border border-indigo-800/40">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors leading-snug">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-200">{post.author.name}</div>
                        <div className="text-[10px] text-slate-400">{post.author.role}</div>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="p-2 rounded-xl bg-slate-800 group-hover:bg-indigo-600 text-slate-300 group-hover:text-white transition-colors"
                      aria-label="Read full article"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
