/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Outfit", ...defaultTheme.fontFamily.sans],
				display: ["Syne", ...defaultTheme.fontFamily.sans],
			},
			fontSize: {
				"display-xl": ["clamp(2rem, 10vw, 9rem)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
				"display-lg": ["clamp(1.5rem, 6vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
				"display-md": ["clamp(1.1rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
				"micro": ["0.65rem", { lineHeight: "1.4", letterSpacing: "0.15em" }],
			},
			colors: {
				bg: "#000000",
				fg: "#ffffff",
			},
			animation: {
				"reveal-up": "revealUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				"reveal-in": "revealIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				"line-grow": "lineGrow 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				float: "float 6s ease-in-out infinite",
				blink: "blink 1s step-end infinite",
			},
			keyframes: {
				revealUp: {
					"0%": { opacity: "0", transform: "translateY(60px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				revealIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				lineGrow: {
					"0%": { transform: "scaleX(0)" },
					"100%": { transform: "scaleX(1)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-6px)" },
				},
				blink: {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0" },
				},
			},
		},
	},
	plugins: [],
};
