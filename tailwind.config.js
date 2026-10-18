/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // ── Editorial paper palette (marketing pages) ──────────────
        paper:   "#F7F6F2",   // warm off-white background
        surface: "#F0EFEB",   // secondary surfaces / alternating sections
        ink:     "#151515",   // primary text, headings
        "ink-muted": "#66635F", // body text, captions
        rule:    "#D8D6D0",   // borders, dividers

        // ── Dark section palette (footer, CTA blocks) ──────────────
        deep:    "#101827",   // deep section background
        "deep-text": "#F5F5F0", // text on deep sections

        // ── Indigo accent ──────────────────────────────────────────
        accent: {
          50:  "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",  // Primary CTA
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },

        // ── Legacy aliases (for LMS pages untouched) ──────────────
        brand: {
          500: "#4F46E5",
          600: "#4338CA",
        },
      },

      fontFamily: {
        serif:   ["Lora", "Georgia", "ui-serif", "serif"],           // Editorial headings
        sans:    ["Inter", "ui-sans-serif", "system-ui", "sans-serif"], // Body, labels, UI
        mono:    ["JetBrains Mono", "Fira Code", "ui-monospace", "monospace"], // Tech/code
        display: ["Lora", "Georgia", "ui-serif", "serif"],            // Large headlines
      },

      fontSize: {
        "display-lg": ["3.5rem",  { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["2.5rem",  { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-sm": ["2rem",    { lineHeight: "1.2",  letterSpacing: "-0.015em" }],
        "body-lg":    ["1.0625rem", { lineHeight: "1.7" }],
        "body-md":    ["0.9375rem", { lineHeight: "1.65" }],
        "label-sm":   ["0.75rem", { lineHeight: "1.4",  letterSpacing: "0.06em" }],
        "label-xs":   ["0.6875rem",{ lineHeight: "1.4",  letterSpacing: "0.08em" }],
      },

      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },

      maxWidth: {
        content:  "1200px",
        reading:  "68ch",
        narrow:   "48ch",
      },

      borderRadius: {
        "sm": "4px",
        DEFAULT: "6px",
        "md": "8px",
        "lg": "12px",
        "xl": "16px",
      },

      boxShadow: {
        subtle:  "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        card:    "0 4px 16px rgba(0,0,0,0.08)",
        elevated:"0 8px 32px rgba(0,0,0,0.10)",
        // Legacy for LMS pages
        glow:    "0 0 0 1px rgba(255,255,255,0.08), 0 22px 60px rgba(2,16,38,0.52)",
      },

      keyframes: {
        // Minimal, purposeful animations only
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%":   { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },

      animation: {
        "fade-in":  "fade-in 0.35s ease-out both",
        "slide-in": "slide-in 0.3s ease-out both",
      },

      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};
