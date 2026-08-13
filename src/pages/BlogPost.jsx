import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";
import { blogData } from "../data/blogData";
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, MessageSquare } from "lucide-react";

export default function BlogPost() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const post = blogData.find((b) => b.slug === blogId || b.id === blogId) || blogData[0];
  const otherPosts = blogData.filter((b) => b.id !== post.id).slice(0, 3);

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Read this article on Nexora Techno: ${post.title} https://www.nexoratechno.in/blog/${post.slug}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <Navbar />
      <ScrollToTop />
      <WhatsAppButton />

      <main className="flex-grow py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back link */}
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </button>

          {/* Article Header */}
          <header className="space-y-4 mb-10 pb-8 border-b border-slate-800">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              {post.category}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {post.excerpt}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="font-bold text-white text-sm">{post.author.name}</div>
                  <div>{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </span>
                <button
                  onClick={handleWhatsAppShare}
                  className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1.5 hover:bg-emerald-900 transition-colors font-medium"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Share
                </button>
              </div>
            </div>
          </header>

          {/* Article Content Render */}
          <article className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-base prose-li:text-slate-300 prose-strong:text-white prose-table:text-sm prose-td:p-3 prose-th:p-3 prose-th:bg-slate-900 prose-tr:border-slate-800 space-y-6">
            <div 
              className="text-slate-300 space-y-6 leading-relaxed text-base"
              dangerouslySetInnerHTML={{ 
                __html: post.content.replace(/\n\n/g, '<br/><br/>').replace(/### (.*?)\n/g, '<h3 className="text-xl font-bold text-white mt-6 mb-2">$1</h3>') 
              }} 
            />
          </article>

          {/* CTA Box */}
          <div className="mt-14 p-8 rounded-3xl bg-slate-900 border border-indigo-500/30 text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">Have questions about website or software development?</h3>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Get a direct consultation with our lead developers in Salem.
            </p>
            <a
              href="https://wa.me/919345121988?text=Hi%20Nexora%20Techno,%20I%20read%20your%20article%20and%20want%20to%20discuss%20a%20project"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-colors shadow-lg"
            >
              <span>Talk to a Developer on WhatsApp</span>
            </a>
          </div>

          {/* Related Articles */}
          {otherPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {otherPosts.map((op) => (
                  <Link
                    key={op.id}
                    to={`/blog/${op.slug}`}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1">{op.category}</div>
                      <h4 className="font-bold text-white text-sm line-clamp-2 mb-2">{op.title}</h4>
                    </div>
                    <div className="text-[11px] text-slate-400">{op.readTime}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
