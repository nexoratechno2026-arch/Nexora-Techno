import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "SANJEEVI A",
      role: "Full Stack Intern (Certificate ID: NT26FS002)",
      organization: "Muthayammal College of Arts and Science",
      text: "The Full Stack Internship at Nexora Techno gave me practical coding experience with React and Node.js. Working on real client project components in Salem prepared me for developer interviews.",
      rating: 5
    },
    {
      name: "Varavu Selavu Client Partner",
      role: "Finance App User",
      organization: "Salem Retailer",
      text: "Nexora Techno built our cash flow tracking app with extreme speed and responsiveness. The UI is simple for daily entries and the direct WhatsApp support was excellent.",
      rating: 5
    },
    {
      name: "BAVIYADHARSHINI R",
      role: "UI/UX Intern (Certificate ID: NT26UD005)",
      organization: "Computer Science Dept",
      text: "Designing user interfaces and wireframes alongside senior engineers helped me understand real software design workflows beyond classroom theory.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            Real Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Clients & Students Say
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Genuine experiences from businesses we've built software for and students trained in our Salem development center.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{rev.role}</div>
                  <div className="text-[11px] text-slate-400">{rev.organization}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
