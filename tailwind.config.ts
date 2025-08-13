import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: "#F5C80D",
  			secondary: "#004AAD",
  		},
		fontFamily: {
			poppins: ["Inter", "sans-serif"],
		},
		boxShadow: {
			nav: '0 4px 10px rgba(0, 0, 0, 0.15)',
			card: '0 0 20px 5px rgba(0, 0, 0, 1)',
		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
