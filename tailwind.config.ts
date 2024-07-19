import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "red_custom": "hsl(14,86%,42%)",
        "green_custom": "hsl(159,69%,38%)",
        "rose-50": "hsl(20,50%,98%)",
        "rose-100": "hsl(13,31%,94%)",
        "rose-300": "hsl(14,25%,72%)",
        "rose-400": "hsl(7,20%,60%)",
        "rose-500": "hsl(12,20%,44%)",
        "rose-900": "hsl(14,65%,9%)",
      }
    }
  },
  plugins: [],
};
export default config;
