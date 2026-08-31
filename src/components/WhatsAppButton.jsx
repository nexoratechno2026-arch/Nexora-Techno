import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const handleClick = () => {
    const text = encodeURIComponent("Hi Nexora Techno, I would like to discuss a website/software project.");
    window.open(`https://wa.me/919345121988?text=${text}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-xl shadow-emerald-500/30 transition-all hover:scale-110 flex items-center justify-center group"
    >
      <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold pl-0 group-hover:pl-2">
        Talk to a Developer
      </span>
    </button>
  );
}
