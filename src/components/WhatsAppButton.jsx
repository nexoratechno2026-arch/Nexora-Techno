import React from "react";

export default function WhatsAppButton() {
  const handleClick = () => {
    const text = encodeURIComponent(
      "Hi Nexora Techno, I would like to discuss a project."
    );
    window.open(`https://wa.me/919345121988?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Chat with Nexora Techno on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-0 overflow-hidden bg-[#25D366] hover:bg-[#20BA59] text-white rounded-full shadow-card transition-colors group"
      style={{ padding: "12px 14px" }}
    >
      {/* WhatsApp SVG icon */}
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 flex-shrink-0"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.397 5.608L0 24l6.618-1.347C8.214 23.537 10.072 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.807 0-3.487-.476-4.942-1.309l-.354-.21-3.666.747.793-3.569-.232-.368A9.785 9.785 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
      </svg>
      {/* Label appears on hover via max-width transition */}
      <span
        className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[160px] transition-all duration-300 ease-out text-xs font-semibold pl-0 group-hover:pl-2"
        aria-hidden="true"
      >
        WhatsApp us
      </span>
    </button>
  );
}
