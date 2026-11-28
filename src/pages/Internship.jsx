import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

// [title, length, what you learn, what you build]
const TRACKS = [
  {
    group: "Web development",
    items: [
      ["Full Stack Development", "2 to 3 months", "HTML, CSS, JavaScript, React, Node.js, Express, MongoDB or SQL, logins with JWT, deploying to the cloud.", "A complete web app with sign-in and a database."],
      ["MERN Stack", "2 to 3 months", "MongoDB, Express, React and Node.js in depth: data modelling, APIs, state management, authentication.", "A multi-user web app where different people see different things."],
      ["JavaScript", "1 to 2 months", "How JavaScript really runs: the event loop, closures, async code, talking to APIs, testing with Jest.", "A live data dashboard written without a framework."],
      ["Mobile App Development", "2 to 3 months", "Kotlin, Jetpack Compose, Room database, calling APIs with Retrofit, publishing to the Play Store.", "An Android app that works offline and syncs when it's back online."],
    ],
  },
  {
    group: "AI and data",
    items: [
      ["AI with Python", "1 to 3 months", "NumPy, Pandas, scikit-learn and TensorFlow, then serving a model through FastAPI.", "A prediction API fed by its own data pipeline."],
      ["Generative AI", "1 to 2 months", "How LLMs work, embeddings, vector databases and RAG with LangChain and the OpenAI or Claude APIs.", "A chatbot that answers questions from your own documents."],
      ["Agentic AI", "1 to 2 months", "Tool calling, agent loops, memory, and multi-agent setups with LangGraph, CrewAI and MCP.", "A small team of agents that plans, writes and tests code."],
      ["Data Science with Python", "2 to 3 months", "Cleaning and exploring data, statistics, feature engineering and validating models, in Jupyter.", "A full analysis of a real transaction dataset."],
      ["Data Analytics", "1 to 2 months", "SQL (joins, CTEs, window functions), data modelling, Excel, Power BI and Tableau dashboards.", "A business dashboard that updates from live data."],
    ],
  },
  {
    group: "Security, design and marketing",
    items: [
      ["Cyber Security", "2 to 3 months", "Networking, Wireshark, Nmap, Burp Suite, the OWASP Top 10, and how to defend against them.", "A vulnerability assessment of a practice network, with fixes."],
      ["UI/UX Design", "1 to 2 months", "User research, wireframes, Figma auto-layout and components, prototypes and developer handoff.", "A case study and a clickable prototype."],
      ["Digital Marketing", "1 to 2 months", "SEO, Google Ads, Meta Ads, Google Analytics and WhatsApp campaigns.", "A marketing plan and an audit of a real campaign."],
    ],
  },
];

const ALL_TITLES = TRACKS.flatMap((g) => g.items.map(([t]) => t));

export default function Internship() {
  const [sent, setSent] = useState(false);
  const [program, setProgram] = useState(ALL_TITLES[0]);
  const formRef = useRef();

  function pick(title) {
    setProgram(title);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  }

  function submit(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(formRef.current).entries());
    const message =
      `Internship application\n\n` +
      `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\n` +
      `Track: ${d.program}\nCollege: ${d.college}\n\n${d.about || ""}`;
    window.open(`https://wa.me/919345121988?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    e.target.reset();
  }

  const collegeMsg = encodeURIComponent(
    "Hello Nexora Techno, we would like to arrange an orientation or a technical workshop for our students. Could you share the details?"
  );

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-rule">
          <div className="container-content pt-14 pb-12 sm:pt-20 sm:pb-16">
            <h1 className="heading-display text-[2.5rem] sm:text-[3.25rem] max-w-[18ch]">Internships and college workshops</h1>
            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,36rem)_1fr] lg:gap-16">
              <div className="text-lg leading-relaxed">
                <p>
                  Our internships are for engineering, science and computer application students who
                  want to build something real before they graduate. You pick a track, build a
                  project with us reviewing your code, and finish with a certificate that can be
                  checked on this website.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <a href="#apply" className="btn-primary">Apply</a>
                  <a href="#tracks" className="link font-medium">See the 12 tracks</a>
                </div>
              </div>
              <ul className="space-y-4 text-[15px] lg:border-l lg:border-rule lg:pl-8">
                <li><span className="font-semibold">1,000+ students</span> <span className="text-ink-muted">at our campus orientation sessions</span></li>
                <li><span className="font-semibold">100+ online workshops</span> <span className="text-ink-muted">run so far</span></li>
                <li><span className="font-semibold">55+ interns</span> <span className="text-ink-muted">have completed a track</span></li>
                <li className="text-ink-muted">Batches online, or in person in Salem, planned around exam timetables.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-b border-rule bg-surface">
          <div className="container-content py-14 sm:py-20 grid gap-10 lg:grid-cols-[18rem_1fr]">
            <h2 className="heading-display text-2xl sm:text-3xl">What an internship looks like</h2>
            <ol className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {[
                ["First week", "We go through the track, set up your tools and GitHub, and agree on what you'll build."],
                ["Learning sessions", "Short sessions on the concepts, then you practise on your own with help when you're stuck."],
                ["Your project", "Most of the time goes here. You push code regularly and one of us reviews it."],
                ["Finishing", "You present the project. If it's done, you get a certificate with a QR code and an ID anyone can check."],
              ].map(([title, body], i) => (
                <li key={title} className="border-t border-ink pt-4">
                  <p className="font-mono text-sm text-ink-muted">{i + 1}</p>
                  <h3 className="mt-1 font-semibold text-[17px]">{title}</h3>
                  <p className="mt-1.5 text-ink-muted leading-relaxed">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="tracks" className="border-b border-rule scroll-mt-16">
          <div className="container-content py-14 sm:py-20">
            <h2 className="heading-display text-3xl sm:text-4xl">Tracks</h2>
            <p className="mt-3 text-ink-muted max-w-[56ch]">
              Open to B.E./B.Tech, B.Sc, BCA, MCA and similar courses. If you're unsure which
              one suits you, message us and we'll help you choose.
            </p>

            <div className="mt-12 space-y-14">
              {TRACKS.map((g) => (
                <div key={g.group}>
                  <h3 className="text-sm text-ink-muted">{g.group}</h3>
                  <div className="mt-3 border-t border-ink">
                    {g.items.map(([title, length, learn, build]) => (
                      <div key={title} className="grid gap-3 border-b border-rule py-6 lg:grid-cols-[15rem_1fr_9rem] lg:gap-8">
                        <div>
                          <p className="text-lg font-semibold">{title}</p>
                          <p className="text-sm text-ink-muted">{length}</p>
                        </div>
                        <div className="text-[15px] leading-relaxed">
                          <p>{learn}</p>
                          <p className="mt-2 text-ink-muted"><span className="text-ink">You build:</span> {build}</p>
                        </div>
                        <div className="lg:text-right">
                          <button onClick={() => pick(title)} className="link text-sm font-medium">Apply for this</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-rule bg-deep text-deep-text">
          <div className="container-content py-14 sm:py-16 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-[56ch]">
              <h2 className="heading-display text-2xl sm:text-3xl">For colleges</h2>
              <p className="mt-3 text-deep-text/75 leading-relaxed">
                We run campus orientations and hands-on workshops from one to five days. Tell us
                the department, the year and how many students, and we'll send a plan.
              </p>
            </div>
            <a href={`https://wa.me/919345121988?text=${collegeMsg}`} target="_blank" rel="noopener noreferrer" className="btn-secondary !border-white/60 !text-deep-text hover:!bg-white/10 self-start">
              Ask about a workshop
            </a>
          </div>
        </section>

        <section id="apply" className="scroll-mt-16">
          <div className="container-content py-14 sm:py-20 grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-16">
            <div>
              <h2 className="heading-display text-3xl sm:text-4xl">Apply</h2>
              <p className="mt-4 text-ink-muted leading-relaxed">
                Sending this opens WhatsApp with your details filled in. We'll reply with the
                next batch dates and details.
              </p>
              <p className="mt-4 text-sm text-ink-muted">
                Already finished one? <Link to="/verify" className="link">Check your certificate</Link>.
              </p>
            </div>

            {sent ? (
              <div className="border border-rule p-8">
                <h3 className="text-xl font-semibold">Check WhatsApp</h3>
                <p className="mt-2 text-ink-muted max-w-[46ch]">
                  Your application should be open in WhatsApp. Press send there and we'll get back to you.
                </p>
                <button onClick={() => setSent(false)} className="btn-secondary mt-6 text-sm">Fill in again</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} className="grid gap-5 sm:grid-cols-2 max-w-3xl">
                <div>
                  <label htmlFor="i-name" className="form-label">Your name</label>
                  <input id="i-name" name="name" required className="form-input" autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="i-phone" className="form-label">Phone (WhatsApp)</label>
                  <input id="i-phone" name="phone" type="tel" required className="form-input" autoComplete="tel" />
                </div>
                <div>
                  <label htmlFor="i-email" className="form-label">Email</label>
                  <input id="i-email" name="email" type="email" required className="form-input" autoComplete="email" />
                </div>
                <div>
                  <label htmlFor="i-program" className="form-label">Track</label>
                  <select id="i-program" name="program" className="form-input" value={program} onChange={(e) => setProgram(e.target.value)}>
                    {ALL_TITLES.map((t) => <option key={t}>{t}</option>)}
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="i-college" className="form-label">College, course and year</label>
                  <input id="i-college" name="college" required className="form-input" placeholder="e.g. B.E. CSE, 3rd year, and your college name" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="i-about" className="form-label">Anything we should know? <span className="font-normal text-ink-muted">(optional)</span></label>
                  <textarea id="i-about" name="about" rows={4} className="form-input form-textarea" placeholder="What you already know, what you want to build, when you're free…" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn-primary">Send application</button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
