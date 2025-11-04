// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}", // <- añade lib para que Tailwind lea tus clases en medusa-data.ts
  ],
  theme: {
    extend: {
      /* =========================
       *  COLORES (compat + extras)
       * ========================= */
      colors: {
        // CSS vars con alpha dinámico
        "by-bg": "rgb(var(--color-bg-deep) / <alpha-value>)",
        "by-card": "rgb(var(--color-bg-card) / <alpha-value>)",
        "by-text-subtle": "rgb(var(--color-text-subtle) / <alpha-value>)",
        "by-accent": "rgb(var(--color-accent) / <alpha-value>)",

        // línea de borde sutil
        "by-line": "#1b1c1d",

        // tonos metálicos opcionales
        "by-metal": "#d0d2d6",
        "by-metalDim": "#9ca3af",
      },

      /* Sombras coherentes con dark premium */
      boxShadow: {
        deep: "0 10px 40px rgba(0, 0, 0, 0.8)",
        "glow-sm": "0 0 10px rgba(236, 31, 120, 0.30)",
        "glow-lg": "0 0 40px rgba(236, 31, 120, 0.60)",
        glow: "0 0 80px rgba(255,255,255,0.05)",
        innerSoft:
          "inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 30px rgba(0,0,0,0.40)",
      },

      /* Fondos (rejilla y radial de acento) */
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)",
        "accent-gradient":
          "linear-gradient(90deg, rgb(var(--color-accent)) 0%, #ff0070 100%)",
        "accent-radial":
          "radial-gradient(60% 60% at 50% 0%, rgba(236,31,120,0.12), transparent 60%)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },

      /* Bordes */
      borderRadius: {
        lg: "var(--radius)",
        "2xl": "calc(var(--radius) + 6px)",
        "3xl": "2rem",
        xl2: "1.25rem",
        xl3: "1.5rem",
      },

      /* Animaciones útiles */
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        shimmer: {
          "0%": { backgroundPosition: "-468px 0" },
          "100%": { backgroundPosition: "468px 0" },
        },
      },
      animation: {
        "fade-in": "fade-in .25s ease-out both",
        shimmer: "shimmer 1.25s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
