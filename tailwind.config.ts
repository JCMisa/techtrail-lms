/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
// const { withUt } = require("uploadthing/tw");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1e1e1e",
        foreground: "#ffffff",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        dark: {
          DEFAULT: "#1e1e1e",
          100: "#252525",
          200: "#2d2d30",
          300: "#3e3e42",
          foreground: "hsl(var(--primary-foreground))",
        },
        light: {
          DEFAULT: "#ffffff",
          100: "#EBD3F8",
          foreground: "hsl(var(--primary-foreground))",
        },
        primary: {
          DEFAULT: "#0098ff",
          100: "#007acc",
          200: "#0065a9",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#7A1CAC",
          100: "#AD49E1",
          200: "#2E073F",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "#1e1e1e",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        img1: 'url("/course-bg-1.jpg")',
        img2: 'url("/course-bg-2.avif")',
        img3: 'url("/course-bg-3.jpg")',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
