import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { blogData } from "../data/blogData";

const CATEGORIES = ["All", ...Array.from(new Set(blogData.map((b) => b.category)))];

export default function Blog() {
  const [selectedCat, setSelectedCat] = useState("All");

  const filtered = selectedCat === "All"
    ? blogData
    : blogData.filter((b) => b.category === selectedCat);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-paper border-b border-rule">
          <div className="container-content py-12 sm:py-16">
            <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-ink transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink">Blog</span>
            </nav>
            <p className="eyebrow mb-3">Writing</p>
            <h1 className="heading-display text-display-md text-ink mb-4">
              Blog
            </h1>
            <p className="text-body-md text-ink-muted max-w-[52ch]">
              Articles on web development, technology, business software, and practical
              IT education. Written by the Nexora editorial team.
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="bg-surface border-b border-rule">
          <div className="container-content py-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide mr-2">
                Filter:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors border ${
                    selectedCat === cat
                      ? "bg-accent-600 text-white border-accent-600"
                      : "bg-paper border-rule text-ink-muted hover:text-ink hover:border-ink-muted"
                  }`}
                  aria-pressed={selectedCat === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Article list */}
        <section className="bg-paper">
          <div className="container-content py-10">
            {filtered.length === 0 ? (
              <p className="text-sm text-ink-muted py-10 text-center">
                No articles in this category.
              </p>
            ) : (
              <div className="space-y-0 border border-rule rounded-lg overflow-hidden">
                {filtered.map((post, idx) => (
                  <div key={post.id}>
                    {idx > 0 && <div className="h-px bg-rule" />}
                    <Link
                      to={`/blog/${post.slug || post.id}`}
                      className="flex items-start gap-5 sm:gap-6 p-5 sm:p-6 bg-paper hover:bg-surface transition-colors group"
                    >
                      <span className="font-mono text-xs text-ink-muted w-6 flex-shrink-0 pt-1 hidden sm:block">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-mono text-ink-muted border border-rule rounded px-1.5 py-0.5 bg-surface">
                            {post.category}
                          </span>
                          <span className="text-[10px] text-ink-muted">{post.readTime}</span>
                        </div>
                        <h2 className="font-serif font-semibold text-lg text-ink group-hover:text-accent-600 transition-colors leading-snug mb-1.5">
                          {post.title}
                        </h2>
                        <p className="text-[13px] text-ink-muted leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                        <p className="mt-2 text-[11px] text-ink-muted">
                          {post.author?.name || "Nexora Editorial Team"}
                        </p>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="text-rule group-hover:text-accent-600 flex-shrink-0 transition-colors self-center"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
