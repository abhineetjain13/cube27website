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
 *   - cube27_logo.webp               — WebP wordmark for on-page display and
 *     the schema.org structured-data logo.
 *   - images/logos/opt/{n}.webp      — trimmed partner-logo marks.
 *   - images/office/opt/life-NN.webp — downscaled culture photos.
 *
 * The heavy source masters (original logo PNGs, office JPGs, logo PNG) have
 * been removed from the repo — the optimized `opt/*.webp` and `cube27_logo.webp`
 * are the committed assets of record. Any step whose source file is absent is
 * skipped with a note; to re-optimize, drop the source back into `public/` and
 * re-run. Idempotent: variants derive from untouched masters, so re-running
 * never compounds compression.
 */

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { statSync, readdirSync, mkdirSync, existsSync } from "node:fs";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

/** @param {string} file */
const kb = (file) => `${(statSync(join(publicDir, file)).size / 1024).toFixed(1)} KB`;

/** Hero background: master is the 1600px cube27-bg.webp; emit smaller tiers. */
const BG_MASTER = "cube27-bg.webp";
const BG_WIDTHS = [640, 960, 1280];

async function buildBackground() {
  if (!existsSync(join(publicDir, BG_MASTER))) {
    console.log(`  (skipped hero tiers — ${BG_MASTER} not found)`);
    return;
  }
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

/** Logo: WebP wordmark at its intrinsic width, from the PNG master if present. */
async function buildLogo() {
  const out = "cube27_logo.webp";
  if (!existsSync(join(publicDir, "cube27_logo.png"))) {
    console.log(`  (skipped ${out} — cube27_logo.png not found; committed WebP kept)`);
    return;
  }
  await sharp(join(publicDir, "cube27_logo.png"))
    .webp({ quality: 82, effort: 6 })
    .toFile(join(publicDir, out));
  console.log(`  ${out.padEnd(22)} ${kb(out)}`);
}

/**
 * Partner logos: numbered PNGs in images/logos/. Trim the baked-in white
 * margin so each mark fills its frame (the marquee renders them card-less on
 * the page background), then emit a WebP per logo. Output:
 * images/logos/opt/{n}.webp.
 */
async function buildPartnerLogos() {
  const srcDir = join(publicDir, "images", "logos");
  const outDir = join(srcDir, "opt");
  mkdirSync(outDir, { recursive: true });
  const files = readdirSync(srcDir).filter((f) => /^\d+\.png$/i.test(f));
  if (files.length === 0) {
    const have = readdirSync(outDir).filter((f) => /^\d+\.webp$/i.test(f)).length;
    console.log(`  (skipped partner logos — no source PNGs; ${have} committed in opt/)`);
    return have;
  }
  for (const file of files) {
    const n = file.replace(/\.png$/i, "");
    const trimmed = await sharp(join(srcDir, file))
      .trim({ background: "#ffffff", threshold: 20 })
      .toBuffer();
    await sharp(trimmed)
      .extend({ top: 8, bottom: 8, left: 8, right: 8, background: "#ffffff" })
      .resize({ width: 320, height: 320, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(join(outDir, `${n}.webp`));
  }
  console.log(`  images/logos/opt/*.webp   ${files.length} logos (trimmed)`);
  return files.length;
}

/**
 * Office / culture photos: arbitrarily-named, often multi-MB JPGs. Downscale
 * to a display-friendly WebP and give them stable, ordered names so the
 * "Life at Cube27" slideshow can map over a simple numeric range. Output:
 * images/office/opt/life-NN.webp (1-based, sorted by original filename).
 */
async function buildOfficePhotos() {
  const srcDir = join(publicDir, "images", "office");
  const outDir = join(srcDir, "opt");
  mkdirSync(outDir, { recursive: true });
  const files = readdirSync(srcDir)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, "en"));
  if (files.length === 0) {
    const have = readdirSync(outDir).filter((f) => /^life-\d+\.webp$/i.test(f)).length;
    console.log(`  (skipped office photos — no source JPGs; ${have} committed in opt/)`);
    return have;
  }
  let i = 0;
  for (const file of files) {
    const name = `life-${String(++i).padStart(2, "0")}.webp`;
    await sharp(join(srcDir, file))
      .rotate() // honor EXIF orientation from phone photos
      .resize({ width: 1600, height: 1200, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(join(outDir, name));
  }
  console.log(`  images/office/opt/life-NN.webp  ${files.length} photos`);
  return files.length;
}

console.log("Optimizing images →");
await buildBackground();
await buildLogo();
const logoCount = await buildPartnerLogos();
const officeCount = await buildOfficePhotos();
console.log("Done.");
console.log(`\nCounts for components: ${logoCount} logos, ${officeCount} office photos.`);
