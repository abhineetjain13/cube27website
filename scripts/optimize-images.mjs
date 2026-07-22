#!/usr/bin/env node
// @ts-check
/**
 * Generate optimized, responsive image variants from the source assets in
 * `public/`. Run with `pnpm run optimize:images` whenever a source image
 * changes. Output files are committed so the build and deploy need no image
 * tooling of their own.
 *
 * What it produces:
 *   - cube27-bg-{640,960,1280}.webp  — downscaled hero background tiers.
 *     The full-size 1600px master stays as `cube27-bg.webp`.
 *   - cube27_logo.webp               — WebP twin of the PNG wordmark, used
 *     for on-page display. The PNG is kept as a <picture> fallback and for
 *     JSON-LD structured data (schema.org logo).
 *
 * Idempotent: variants are always derived from the untouched masters, so
 * re-running never compounds compression.
 */

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { statSync } from "node:fs";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

/** @param {string} file */
const kb = (file) => `${(statSync(join(publicDir, file)).size / 1024).toFixed(1)} KB`;

/** Hero background: master is the 1600px cube27-bg.webp; emit smaller tiers. */
const BG_MASTER = "cube27-bg.webp";
const BG_WIDTHS = [640, 960, 1280];

async function buildBackground() {
  for (const width of BG_WIDTHS) {
    const out = `cube27-bg-${width}.webp`;
    await sharp(join(publicDir, BG_MASTER))
      .resize({ width })
      .webp({ quality: 74, effort: 6 })
      .toFile(join(publicDir, out));
    console.log(`  ${out.padEnd(22)} ${kb(out)}`);
  }
  console.log(`  ${BG_MASTER.padEnd(22)} ${kb(BG_MASTER)} (master, 1600w)`);
}

/** Logo: WebP twin of the PNG wordmark at its intrinsic width. */
async function buildLogo() {
  const out = "cube27_logo.webp";
  await sharp(join(publicDir, "cube27_logo.png"))
    .webp({ quality: 82, effort: 6 })
    .toFile(join(publicDir, out));
  console.log(`  ${out.padEnd(22)} ${kb(out)}  (png fallback: ${kb("cube27_logo.png")})`);
}

console.log("Optimizing images →");
await buildBackground();
await buildLogo();
console.log("Done.");
