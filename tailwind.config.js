/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "var(--bg-base)",
          surface: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
          card: "var(--bg-card)",
        },
        accent: {
          violet: "#7C5CFC",
          cyan: "#22D3EE",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#F43F5E",
        },
        border: {
          subtle: "var(--border-subtle)",
          glow: "var(--border-glow)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "violet-glow": "radial-gradient(ellipse at 50% 0%, #7C5CFC22 0%, transparent 70%)",
        "cyan-glow": "radial-gradient(ellipse at 100% 100%, #22D3EE18 0%, transparent 60%)",
      },
      boxShadow: {
        "glow-violet": "0 0 20px #7C5CFC40, 0 0 60px #7C5CFC18",
        "glow-cyan": "0 0 20px #22D3EE40",
        "card-hover": "0 8px 32px #00000060, 0 0 0 1px #7C5CFC44",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
