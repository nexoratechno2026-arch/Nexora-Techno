import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToTop from "../components/ScrollToTop";
import { blogData } from "../data/blogData";

// Minimal markdown-like rendering for the existing blog content format
function renderContent(content) {
  if (!content) return null;

  return content
    .split("\n")
    .reduce((acc, line, i, arr) => {
      // H3
      if (line.startsWith("### ")) {
        acc.push(<h3 key={i}>{line.replace("### ", "")}</h3>);
      }
      // H4
      else if (line.startsWith("#### ")) {
        acc.push(<h4 key={i}>{line.replace("#### ", "")}</h4>);
      }
      // HR
      else if (line.trim() === "---") {
        acc.push(<hr key={i} />);
      }
      // Table (skip — handled as plain text)
      else if (line.startsWith("| ")) {
        // Basic table support
        const cells = line.split("|").filter(Boolean).map((c) => c.trim());
        if (cells.length) {
          acc.push(
            <div key={i} className="overflow-x-auto">
              <table>
                <tbody>
                  <tr>
                    {cells.map((c, ci) => (
                      <td key={ci}><strong>{c}</strong></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
      }
      // Bullet list item
      else if (line.startsWith("* ") || line.startsWith("- ")) {
        const text = line.replace(/^[\*\-] /, "");
        // Inline bold: **text**
        const rendered = text.replace(/\*\*(.*?)\*\*/g, (_, t) => `<strong>${t}</strong>`);
        acc.push(<li key={i} dangerouslySetInnerHTML={{ __html: rendered }} />);
      }
      // Numbered list
      else if (/^\d+\. /.test(line)) {
        const text = line.replace(/^\d+\. /, "");
        const rendered = text.replace(/\*\*(.*?)\*\*/g, (_, t) => `<strong>${t}</strong>`);
        acc.push(<li key={i} dangerouslySetInnerHTML={{ __html: rendered }} />);
      }
      // Empty line = paragraph break (skip)
      else if (line.trim() === "") {
        // skip empty
      }
      // Normal paragraph
      else {
        const rendered = line
          .replace(/\*\*(.*?)\*\*/g, (_, t) => `<strong>${t}</strong>`)
          .replace(/\*(.*?)\*/g, (_, t) => `<em>${t}</em>`)
          .replace(/`(.*?)`/g, (_, t) => `<code>${t}</code>`)
          .replace(/\[(.*?)\]\((.*?)\)/g, (_, text, url) =>
            `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
          );
        acc.push(<p key={i} dangerouslySetInnerHTML={{ __html: rendered }} />);
      }

      return acc;
    }, []);
}

export default function BlogPost() {
  const { blogId } = useParams();

  const post = blogData.find((b) => b.slug === blogId || b.id === blogId);
  const related = blogData.filter((b) => b.id !== post?.id).slice(0, 3);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="container-content py-20 text-center">
          <p className="eyebrow mb-3">404</p>
          <h1 className="heading-display text-display-md text-ink mb-4">Article not found</h1>
          <Link to="/blog" className="btn-primary">Back to blog</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>

        {/* Article header */}
        <header className="bg-paper border-b border-rule">
          <div className="container-content py-10 sm:py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-ink transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/blog" className="hover:text-ink transition-colors">Blog</Link>
              <span aria-hidden="true">/</span>
              <span className="text-ink line-clamp-1 max-w-[24ch]">{post.title}</span>
            </nav>

            <div className="max-w-reading">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[10px] font-mono text-ink-muted border border-rule rounded px-2 py-0.5 bg-surface">
                  {post.category}
                </span>
                <span className="text-[10px] text-ink-muted">{post.readTime}</span>
              </div>

              <h1 className="heading-display text-[1.75rem] sm:text-[2.25rem] text-ink mb-4 leading-snug">
                {post.title}
              </h1>

              <p className="text-body-lg text-ink-muted leading-relaxed mb-5">
                {post.excerpt}
              </p>

              <p className="text-[12px] text-ink-muted">
                {post.author?.name || "Nexora Editorial Team"} · Nexora Techno
              </p>
            </div>
          </div>
        </header>

        {/* Article body */}
        <section className="bg-paper border-b border-rule">
          <div className="container-content py-10 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

              {/* Main content */}
              <article className="article-body max-w-reading" aria-label={post.title}>
                {renderContent(post.content)}
              </article>

              {/* Sidebar */}
              <aside className="space-y-6" aria-label="Article sidebar">
                {/* Contact prompt */}
                <div className="p-5 rounded border border-rule bg-surface">
                  <p className="font-serif font-semibold text-base text-ink mb-2">
                    Have a question or project in mind?
                  </p>
                  <p className="text-[12px] text-ink-muted mb-4 leading-relaxed">
                    We are happy to discuss. No obligation, no sales pitch.
                  </p>
                  <a
                    href={`https://wa.me/919345121988?text=${encodeURIComponent(`Hi Nexora, I read "${post.title}" and have a question`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs w-full flex items-center justify-center"
                    aria-label="WhatsApp Nexora Techno (opens WhatsApp)"
                  >
                    WhatsApp us
                  </a>
                  <Link to="/contact" className="mt-2 btn-ghost text-xs flex items-center justify-center">
                    Send an enquiry →
                  </Link>
                </div>

                {/* Related */}
                {related.length > 0 && (
                  <div>
                    <h2 className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider mb-3">
                      Related articles
                    </h2>
                    <div className="space-y-3">
                      {related.map((r) => (
                        <Link
                          key={r.id}
                          to={`/blog/${r.slug || r.id}`}
                          className="block p-3 rounded border border-rule bg-paper hover:bg-surface transition-colors group"
                        >
                          <span className="text-[10px] font-mono text-ink-muted mb-1 block">
                            {r.category}
                          </span>
                          <p className="text-[13px] font-medium text-ink group-hover:text-accent-600 transition-colors leading-snug line-clamp-2">
                            {r.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>

        {/* Back to blog */}
        <section className="bg-surface border-t border-rule">
          <div className="container-content py-8 flex items-center justify-between">
            <Link to="/blog" className="btn-ghost text-sm">
              ← All articles
            </Link>
            <Link to="/contact" className="btn-secondary text-sm">
              Discuss a project
            </Link>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
}
