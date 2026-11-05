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
