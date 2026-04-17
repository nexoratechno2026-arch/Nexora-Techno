/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#040b16",
        mist: "#eaf4ff",
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9", // The Primary Blue
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e"
        },
        accent: {
          400: "#6366f1",
          500: "#4f46e5"
        }
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(10,160,232,0.22), transparent 44%), radial-gradient(circle at 84% 18%, rgba(74,222,128,0.14), transparent 38%)"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 22px 60px rgba(2,16,38,0.52)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        pulseRing: {
          "0%": { transform: "scale(0.95)", opacity: "0.45" },
          "70%, 100%": { transform: "scale(1.15)", opacity: "0" }
        },
        drift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(24px, -18px, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" }
        },
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "pulse-ring": "pulseRing 3s ease-out infinite",
        drift: "drift 16s ease-in-out infinite",
        shine: "shine 10s linear infinite"
      }
    }
  },
  plugins: []
};
