const FAQS = [
  {
    q: "How much does a website cost?",
    a: "It depends on what it has to do. A simple business site is a very different job from software with logins and a database, so we price each one after we understand it. You get the number in writing before we start.",
  },
  {
    q: "How long does it take?",
    a: "A business website usually takes two to three weeks. Custom software takes longer, and we agree the dates with you up front.",
  },
  {
    q: "We have our own way of doing things. Can you build around it?",
    a: "Yes, that's most of our work. Billing tools, client portals, stock registers: if a ready-made product doesn't fit how you work, we build one that does.",
  },
  {
    q: "Do you work with clients outside Salem?",
    a: "Yes, across Tamil Nadu and beyond. Calls, WhatsApp and shared documents cover most of it.",
  },
  {
    q: "How do internships work?",
    a: "They run for one to three months. You follow a track, build a project, get your code reviewed, and finish with a certificate that can be checked online.",
  },
  {
    q: "Do you run workshops at colleges?",
    a: "Yes, one to five days, on campus. We plan the content around the department and the students' year.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="border-b border-rule">
      <div className="container-content py-16 sm:py-24 grid gap-10 lg:grid-cols-[18rem_1fr]">
        <h2 className="heading-display text-3xl sm:text-4xl">Questions people ask us</h2>
        <div className="border-t border-ink">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-semibold text-[17px] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="mt-0.5 font-mono text-lg leading-none text-ink-muted group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
              </summary>
              <p className="pb-6 -mt-1 max-w-[62ch] text-ink-muted leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
