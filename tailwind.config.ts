import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito)', 'sans-serif'],
        display: ['var(--font-fredoka)', 'sans-serif'],
      },
      colors: {
        english: 'var(--english)',
        maths: 'var(--maths)',
        science: 'var(--science)',
        coding: 'var(--coding)',
        music: 'var(--music)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'playful': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'playful-lg': '0 12px 40px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 20px rgba(74, 144, 226, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
