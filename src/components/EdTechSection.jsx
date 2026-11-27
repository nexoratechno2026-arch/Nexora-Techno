import { Link } from "react-router-dom";

const TRACKS = [
  ["Full stack web development", "HTML, CSS, JavaScript, React, Node.js", "1 to 3 months"],
  ["Python full stack", "Python, FastAPI, databases, APIs", "1 to 2 months"],
  ["Prompt engineering and AI", "Working with AI APIs and building assistants", "1 to 2 months"],
  ["UI/UX design", "Figma, wireframes, design systems", "1 month"],
];

export default function EdTechSection() {
  return (
    <section id="edtech" className="border-b border-rule">
      <div className="container-content py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="heading-display text-3xl sm:text-4xl">For students and colleges</h2>
            <p className="mt-5 text-lg text-ink-muted leading-relaxed">
              Interns work on a real project from the first week, with one of us reviewing
              their code. At the end you get a certificate with a QR code that any employer
              can check on this website.
            </p>
            <p className="mt-4 text-ink-muted leading-relaxed">
              We also come to colleges for one to five day workshops. Tell us the
              department and the year, and we'll plan the sessions around them.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link to="/internship" className="btn-primary">Apply for an internship</Link>
              <a
                href="https://wa.me/919345121988?text=Hi%20Nexora%20Techno%2C%20we%20would%20like%20to%20enquire%20about%20a%20college%20workshop"
                target="_blank"
                rel="noopener noreferrer"
                className="link font-medium"
              >
                Ask about a workshop
              </a>
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              Got a certificate from us? <Link to="/verify" className="link">Check it here</Link>.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-ink-muted">Internship tracks</h3>
            <table className="mt-3 w-full text-left border-t border-ink">
              <tbody>
                {TRACKS.map(([name, covers, length]) => (
                  <tr key={name} className="border-b border-rule align-top">
                    <td className="py-4 pr-4">
                      <p className="font-semibold">{name}</p>
                      <p className="text-sm text-ink-muted mt-0.5">{covers}</p>
                    </td>
                    <td className="py-4 text-sm text-ink-muted whitespace-nowrap text-right">{length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
