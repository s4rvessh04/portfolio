import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

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
