import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          id="scroll-to-top-btn"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollTop}
          aria-label="Scroll to top"
          className="fixed bottom-20 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-brand-300/30 bg-brand-500/20 text-brand-300 shadow-[0_8px_24px_rgba(10,160,232,0.3)] backdrop-blur-sm transition hover:bg-brand-500/30 sm:bottom-20 sm:right-16"
          style={{ bottom: "max(5.5rem, calc(env(safe-area-inset-bottom) + 5rem))" }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;
