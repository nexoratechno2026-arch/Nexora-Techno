const STEPS = [
  ["We talk first.", "Who will use it, what they do today, and what has to work on day one. Usually a call or a visit."],
  ["You get a written plan.", "Scope, price and dates on one page, agreed before any code is written."],
  ["We build and show you as we go.", "You see working pages every week or so, not just at the end."],
  ["We hand it over.", "Hosting, logins and a short guide are yours. We stay a phone call away if something breaks."],
];

export default function HowWeWorkSection() {
  return (
    <section id="how-we-work" className="border-b border-rule bg-deep text-deep-text">
      <div className="container-content py-16 sm:py-24 grid gap-10 lg:grid-cols-[18rem_1fr]">
        <h2 className="heading-display text-3xl sm:text-4xl">How a project goes</h2>
        <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {STEPS.map(([title, body], i) => (
            <li key={title} className="border-t border-white/20 pt-5">
              <p className="font-mono text-sm text-gold">{i + 1}</p>
              <h3 className="mt-2 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-deep-text/70 leading-relaxed">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
