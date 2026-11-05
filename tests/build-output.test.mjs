import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
const pkg = JSON.parse(await readFile("package.json", "utf8"));

test("analytics: exactly one Cloudflare beacon and no Google tags", () => {
	const beacons =
		html.match(/static\.cloudflareinsights\.com\/beacon\.min\.js/g) ?? [];
	assert.equal(beacons.length, 1);
	assert.doesNotMatch(html, /googletagmanager|gtag\(|GTM-/);
});

test("analytics: Partytown is not a dependency", () => {
	assert.equal("@astrojs/partytown" in (pkg.dependencies ?? {}), false);
});

test("assets: portrait is the WebP, never the PNG", () => {
	assert.match(html, /\/profile\.webp/);
	assert.doesNotMatch(html, /\/profile\.png/);
});

test("assets: og-card is a 1200x630 PNG", async () => {
	const og = await readFile("public/og-card.png");
	assert.equal(og.subarray(1, 4).toString("ascii"), "PNG");
	assert.equal(og.readUInt32BE(16), 1200);
	assert.equal(og.readUInt32BE(20), 630);
});

test("assets: favicon uses the Signal palette", async () => {
	const favicon = await readFile("public/favicon.svg", "utf8");
	assert.match(favicon, /#070908/i);
	assert.match(favicon, /#b8ff3d/i);
});

test("tokens: Signal palette is defined", async () => {
	const css = await readFile("src/styles/global.css", "utf8");
	assert.match(css, /--canvas:\s*#070908/i);
	assert.match(css, /--accent:\s*#b8ff3d/i);
	assert.match(css, /--accent:\s*#3d6b00/i);
});

test("tokens: the old rainbow identity is gone", async () => {
	const css = await readFile("src/styles/global.css", "utf8");
	assert.doesNotMatch(css, /#7928ca|#ff0080|--gradient-preview-start/);
});

test("motion: reduced motion and no-js are handled", async () => {
	const css = await readFile("src/styles/global.css", "utf8");
	assert.match(css, /prefers-reduced-motion:\s*reduce/);
	assert.match(css, /\.js \.reveal/);
});

test("layout: no-js fallback is present", () => {
	assert.match(html, /<html[^>]+class="no-js"/);
	assert.match(html, /classList\.replace\(\s*["']no-js["']\s*,\s*["']js["']\s*\)/);
});

test("layout: theme-color matches Signal", () => {
	assert.match(html, /name="theme-color" content="#070908"/);
	assert.match(html, /name="theme-color" content="#f4f3ec"/);
});

test("layout: Cloudflare beacon is production-only and single", () => {
	const beacons =
		html.match(/static\.cloudflareinsights\.com\/beacon\.min\.js/g) ?? [];
	assert.equal(beacons.length, 1);
});

test("hero: decode target and benchmarks are present", () => {
	assert.match(html, /data-decode="SARVESH RANE"/);
	assert.ok(html.includes("1,185"));
	assert.ok(html.includes("~15"));
	assert.ok(html.includes("10k+"));
	assert.match(html, /hero-telemetry/);
});

test("hero: the old typing loop is gone", () => {
	assert.doesNotMatch(html, /typing-text/);
});

test("motion: anime.js is gone and client JS stays small", async () => {
	assert.equal("animejs" in (pkg.dependencies ?? {}), false);
	const files = await readdir("dist/_astro");
	let bytes = 0;
	for (const file of files.filter((f) => f.endsWith(".js"))) {
		bytes += (await stat(`dist/_astro/${file}`)).size;
	}
	assert.ok(bytes < 20_000, `client JS is ${bytes} bytes`);
});

test("sections: numbered Signal labels are present", () => {
	assert.ok(html.includes("// 01 — selected work"));
	assert.ok(html.includes("// 02 — experience"));
	assert.ok(html.includes("// 03 — stack"));
});

test("sections: project and skill hooks are present", () => {
	assert.match(html, /project-row/);
	assert.match(html, /project-index/);
	assert.match(html, /skill-card/);
});

test("about and footer: Signal hooks are present", () => {
	assert.ok(html.includes("// 04 — about"));
	assert.match(html, /class="cta-band/);
	assert.match(html, /class="footer-link/);
});
