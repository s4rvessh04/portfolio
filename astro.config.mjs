import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://sarveshrane.pages.dev",
	trailingSlash: "always",
	integrations: [
		sitemap(),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
