/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper:   "#FFFFFF",
        surface: "#F5F4F0",
        ink:     "#12161C",
        "ink-muted": "#565C64",
        rule:    "#E3E1DB",
        gold:    "#B8914A",

        deep:    "#0B192C",
        "deep-text": "#F3F1EA",

        accent: {
          // Navy, taken from the logo and certificate.
          50:  "#EEF2F7",
          100: "#DCE4EF",
          200: "#B9C8DD",
          300: "#8BA3C4",
          400: "#5878A3",
          500: "#2F5384",
          600: "#1B3A64",
          700: "#0B192C",
          800: "#0B192C",
          900: "#0B192C",
        },
      },

      fontFamily: {
        serif:   ["Familjen Grotesk", "IBM Plex Sans", "sans-serif"],
        display: ["Familjen Grotesk", "IBM Plex Sans", "sans-serif"],
        sans:    ["IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono:    ["IBM Plex Mono", "ui-monospace", "monospace"],
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
        "sm": "2px",
        DEFAULT: "3px",
        "md": "4px",
        "lg": "4px",
        "xl": "6px",
        "2xl": "8px",
        "3xl": "10px",
      },

      boxShadow: {
        subtle:  "none",
        card:    "0 1px 2px rgba(0,0,0,0.05)",
        elevated:"0 6px 24px rgba(11,25,44,0.12)",
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
