import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

const PRINCIPLES = [
  ["You talk to the people building it.", "No account manager in the middle passing messages back and forth."],
  ["We agree the scope before we write code.", "So the price and the dates don't move halfway through."],
  ["You own what we build.", "Code, hosting, domain and logins are in your name, with a short handover guide."],
  ["We're down the road.", "We're in Salem. If it's easier to sit together and sort something out, we can."],
];

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-rule">
          <div className="container-content pt-14 pb-12 sm:pt-20 sm:pb-16">
            <h1 className="heading-display text-[2.5rem] sm:text-[3.25rem] max-w-[20ch]">About Nexora Techno</h1>
            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-16 text-lg leading-relaxed">
              <p>
                We're a small software company in Salem. We build websites, online stores and
                custom software for local businesses and institutions, and we run internships
                and workshops for engineering students.
              </p>
              <p className="text-ink-muted">
                The two halves help each other. Interns learn on real projects instead of
                practice exercises, and the habits we teach them (writing things down, testing
                properly, explaining clearly) are the ones we hold ourselves to on client work.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-rule">
          <div className="container-content py-14 sm:py-20 grid gap-10 lg:grid-cols-[18rem_1fr]">
            <h2 className="heading-display text-2xl sm:text-3xl">How we work with clients</h2>
            <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {PRINCIPLES.map(([title, body]) => (
                <li key={title} className="border-t border-ink pt-4">
                  <h3 className="font-semibold text-[17px]">{title}</h3>
                  <p className="mt-1.5 text-ink-muted leading-relaxed">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-rule bg-surface">
          <div className="container-content py-14 sm:py-20 grid gap-10 lg:grid-cols-[18rem_1fr]">
            <h2 className="heading-display text-2xl sm:text-3xl">Who runs it</h2>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <img
                src="/Kapil Js.png"
                alt="Kapil JS"
                loading="lazy"
                className="w-32 h-32 sm:w-40 sm:h-40 object-cover object-top border border-rule bg-white"
              />
              <div className="max-w-[52ch]">
                <p className="text-xl font-semibold">Kapil JS</p>
                <p className="text-ink-muted">Founder &amp; CEO</p>
                <p className="mt-4 leading-relaxed">
                  Kapil started Nexora Techno and is involved in every client project and every
                  intern batch. If you get in touch, there's a good chance you'll be talking to him.
                </p>
                <a href="https://www.linkedin.com/in/kapil-js-99a37130a" target="_blank" rel="noopener noreferrer" className="link mt-4 inline-block text-sm">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-rule">
          <div className="container-content py-14 sm:py-20 grid gap-10 lg:grid-cols-[18rem_1fr]">
            <h2 className="heading-display text-2xl sm:text-3xl">Our own product</h2>
            <div className="max-w-[62ch]">
              <p className="text-lg leading-relaxed">
                Between client projects we build <strong className="font-semibold">CodeXpertAI</strong>,
                a site for practising coding problems and mock technical interviews with an AI
                interviewer that asks follow-up questions.
              </p>
              <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                <a href="https://nexoratechno-code.web.app" target="_blank" rel="noopener noreferrer" className="link font-medium">Try CodeXpertAI</a>
                <Link to="/projects#codexpertai" className="link">How it works</Link>
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="container-content py-14 sm:py-20 grid gap-10 lg:grid-cols-[18rem_1fr]">
            <h2 className="heading-display text-2xl sm:text-3xl">Company details</h2>
            <dl className="grid gap-6 sm:grid-cols-2 text-[15px]">
              <div>
                <dt className="text-sm text-ink-muted">Registered name</dt>
                <dd className="mt-1">Nexora Techno, MSME registered enterprise</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">Address</dt>
                <dd className="mt-1">241, East Permanur, Anna Park Backside, Salem 636007, Tamil Nadu</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">Phone</dt>
                <dd className="mt-1"><a href="tel:+919345121988" className="hover:underline">+91 93451 21988</a></dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">Email</dt>
                <dd className="mt-1 break-all"><a href="mailto:nexoratechno2026@gmail.com" className="hover:underline">nexoratechno2026@gmail.com</a></dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
