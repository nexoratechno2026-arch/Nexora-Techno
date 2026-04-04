import { motion } from "framer-motion";

function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919345121988"
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay: 0.1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      className="fixed right-4 z-50 inline-flex items-center justify-center rounded-full bg-[#25D366] p-3 text-sm font-medium text-white shadow-[0_20px_40px_rgba(37,211,102,0.35)] sm:bottom-6 sm:right-6 sm:gap-2 sm:px-4 sm:py-3"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current" aria-hidden="true">
        <path d="M12 2.1a9.8 9.8 0 0 0-8.42 14.8L2 22l5.22-1.54A9.88 9.88 0 1 0 12 2.1Zm0 18.03a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.91.93-3.01-.2-.31A8.25 8.25 0 1 1 12 20.13Zm4.53-6.15c-.25-.13-1.47-.73-1.7-.81-.22-.08-.39-.12-.55.13-.16.24-.64.8-.78.96-.14.16-.28.18-.53.06-.24-.13-1.03-.38-1.96-1.22-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.5l.38-.44c.12-.14.16-.24.24-.4.08-.15.04-.29-.02-.41-.06-.12-.55-1.32-.75-1.8-.2-.47-.4-.41-.55-.41h-.47c-.16 0-.41.06-.62.29-.21.23-.81.79-.81 1.92s.83 2.22.95 2.37c.11.15 1.63 2.48 3.95 3.49.55.24.98.38 1.31.49.56.17 1.07.15 1.47.09.45-.06 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.29Z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp Us</span>
    </motion.a>
  );
}

export default WhatsAppButton;
