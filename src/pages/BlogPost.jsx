import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
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

        <header className="border-b border-rule">
          <div className="container-content pt-10 pb-10 sm:pt-14 sm:pb-12">
            <p className="text-sm text-ink-muted">
              <Link to="/blog" className="hover:text-ink">Blog</Link>
              <span className="mx-2">/</span>
              {post.category} · {post.readTime}
            </p>
            <h1 className="mt-6 heading-display text-[2rem] sm:text-[2.75rem] leading-tight max-w-[24ch]">{post.title}</h1>
            <p className="mt-4 max-w-reading text-lg text-ink-muted leading-relaxed">{post.excerpt}</p>
          </div>
        </header>

        {/* Article body */}
        <section className="border-b border-rule">
          <div className="container-content py-10 sm:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">

              {/* Main content */}
              <article className="article-body max-w-reading" aria-label={post.title}>
                {renderContent(post.content)}
              </article>

              <aside className="space-y-10 text-[15px]" aria-label="More">
                <div className="border-t border-ink pt-4">
                  <p className="font-semibold">Questions about this?</p>
                  <p className="mt-1.5 text-ink-muted">Message us. We're happy to answer, even if you're not hiring us.</p>
                  <a
                    href={`https://wa.me/919345121988?text=${encodeURIComponent(`Hi Nexora, I read "${post.title}" and have a question`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link mt-3 inline-block font-medium"
                  >
                    WhatsApp us
                  </a>
                </div>
                {related.length > 0 && (
                  <div className="border-t border-ink pt-4">
                    <p className="font-semibold">Also on the blog</p>
                    <ul className="mt-2">
                      {related.map((r) => (
                        <li key={r.id} className="border-b border-rule">
                          <Link to={`/blog/${r.slug || r.id}`} className="block py-3 hover:underline underline-offset-4">{r.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>

        <div className="container-content py-8">
          <Link to="/blog" className="link text-sm">All posts</Link>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
