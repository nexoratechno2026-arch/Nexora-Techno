import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { blogData } from "../data/blogData";

export default function Blog() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-rule">
          <div className="container-content pt-14 pb-12 sm:pt-20 sm:pb-16">
            <h1 className="heading-display text-[2.5rem] sm:text-[3.25rem]">Blog</h1>
            <p className="mt-4 max-w-[52ch] text-lg text-ink-muted leading-relaxed">
              Notes on websites, software and learning to code, mostly answering questions
              people ask us.
            </p>
          </div>
        </section>

        <section className="container-content py-10 sm:py-14">
          <ul className="max-w-3xl border-t border-ink">
            {blogData.map((post) => (
              <li key={post.id} className="border-b border-rule">
                <Link to={`/blog/${post.slug || post.id}`} className="group block py-7">
                  <p className="text-sm text-ink-muted">{post.category} · {post.readTime}</p>
                  <h2 className="mt-1.5 text-xl sm:text-2xl font-semibold leading-snug group-hover:underline decoration-gold decoration-2 underline-offset-4">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-ink-muted leading-relaxed">{post.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
