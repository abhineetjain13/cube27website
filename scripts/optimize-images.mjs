#!/usr/bin/env node
// @ts-check
/**
 * Generate optimized, responsive image variants from the source assets in
 * `public/`. Run with `pnpm run optimize:images` whenever a source image
 * changes. Output files are committed so the build and deploy need no image
 * tooling of their own.
 *
 * What it produces:
 *   - cube27-bg-{480,640,960,1280}.webp — downscaled hero background tiers.
 *     The full-size 1600px master stays as `cube27-bg.webp`.
 *   - cube27_logo.webp               — WebP wordmark for on-page display and
 *     the schema.org structured-data logo.
 *   - favicon.svg, icon-{192,512}.png, apple-touch-icon.png
 *                                    — square app icons, cropped to the hex
 *     mark alone so they stay legible at tab size.
 *   - images/logos/opt/{n}.webp      — trimmed partner-logo marks.
 *   - images/office/opt/life-NN.webp — downscaled culture photos.
 *
 * The heavy source masters (partner-logo PNGs, office JPGs) have been removed
 * from the repo — their optimized `opt/*.webp` are the committed assets of
 * record. `cube27_logo.png` is the exception and stays committed: it is the
 * transparent master behind the wordmark *and* all four app icons, so losing
 * it would mean none of them could be regenerated. Any step whose source file
 * is absent is skipped with a note; to re-optimize, drop the source back into
 * `public/` and re-run. Idempotent: variants derive from untouched masters, so
 * re-running never compounds compression.
 */

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  statSync,
  readdirSync,
  mkdirSync,
  existsSync,
  writeFileSync,
} from "node:fs";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

/** @param {string} file */
const kb = (file) =>
  `${(statSync(join(publicDir, file)).size / 1024).toFixed(1)} KB`;

/** Fully transparent fill, for padding icons without introducing a box. */
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/**
 * Repaint the mark's interior white details, which a background remover eats.
 *
 * The hex mark draws its hollow-cube illusion with genuinely *white* shapes:
 * the ring around the centre hexagon and one facet at the upper left. A
 * background-removal pass keys on white, so those shapes come back fully
 * transparent along with the real background — invisible on the cream page,
 * but on any dark surface the backdrop shows straight through the mark.
 *
 * Outside and inside are told apart by connectivity, not colour: flood the
 * fully-transparent pixels inward from the border, and anything transparent
 * the flood never reaches is an enclosed hole. Those get opaque white back.
 * Only alpha < 16 conducts the flood, so the mark's antialiased rim stays a
 * wall and the fill cannot leak outward.
 *
 * @param {Buffer} png A PNG buffer whose alpha may have interior holes.
 * @returns {Promise<Buffer>} PNG with interior holes repainted white.
 */
async function restoreInteriorWhite(png) {
  const { data, info } = await sharp(png)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  /** @param {number} i Pixel index. */
  const alphaAt = (i) => data[i * channels + channels - 1];

  const outside = new Uint8Array(width * height);
  /** @type {number[]} */
  const stack = [];
  for (let x = 0; x < width; x++) {
    stack.push(x, (height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    stack.push(y * width, y * width + width - 1);
  }

  while (stack.length) {
    const i = stack.pop();
    if (i === undefined) break;
    if (outside[i] || alphaAt(i) >= 16) continue;
    outside[i] = 1;
    const x = i % width;
    const y = (i - x) / width;
    if (x > 0) stack.push(i - 1);
    if (x < width - 1) stack.push(i + 1);
    if (y > 0) stack.push(i - width);
    if (y < height - 1) stack.push(i + width);
  }

  let filled = 0;
  for (let i = 0; i < width * height; i++) {
    if (outside[i] || alphaAt(i) >= 16) continue;
    const p = i * channels;
    data[p] = 255;
    data[p + 1] = 255;
    data[p + 2] = 255;
    data[p + channels - 1] = 255;
    filled++;
  }
  if (filled) {
    console.log(`  (restored ${filled}px of knocked-out interior white)`);
  }

  return sharp(data, { raw: { width, height, channels } }).png().toBuffer();
}

/**
 * Hero background: master is the 1600px cube27-bg.webp; emit smaller tiers.
 * Keep these widths in step with `SRC_SET` in `src/lib/hero-image.ts`.
 *
 * 480w serves narrow phones (iPhone SE/mini class), which previously had to
 * pull the 640w tier. Quality is deliberately lower than the 74 used before:
 * the photo is a dense cityscape that sits behind a dark gradient and an
 * overlay card, so the detail loss is invisible at render size while the
 * LCP tier drops ~15 KiB. Re-encoding compounds on the already-lossy master,
 * so do not raise this expecting the original crispness back.
 */
const BG_MASTER = "cube27-bg.webp";
const BG_WIDTHS = [480, 640, 960, 1280];
const BG_QUALITY = 50;

async function buildBackground() {
  if (!existsSync(join(publicDir, BG_MASTER))) {
    console.log(`  (skipped hero tiers — ${BG_MASTER} not found)`);
    return;
  }
  for (const width of BG_WIDTHS) {
    const out = `cube27-bg-${width}.webp`;
    await sharp(join(publicDir, BG_MASTER))
      .resize({ width })
      .webp({ quality: BG_QUALITY, effort: 6, smartSubsample: true })
      .toFile(join(publicDir, out));
    console.log(`  ${out.padEnd(22)} ${kb(out)}`);
  }
  console.log(`  ${BG_MASTER.padEnd(22)} ${kb(BG_MASTER)} (master, 1600w)`);
}

/** Logo: WebP wordmark at its intrinsic width, from the PNG master if present. */
async function buildLogo() {
  const out = "cube27_logo.webp";
  if (!existsSync(join(publicDir, "cube27_logo.png"))) {
    console.log(
      `  (skipped ${out} — cube27_logo.png not found; committed WebP kept)`,
    );
    return;
  }
  // Same interior-white repair as the icons: the on-page wordmark sits on the
  // cream canvas today, where knocked-out white is invisible, but the asset
  // is also the schema.org logo and can be rendered anywhere.
  const repaired = await restoreInteriorWhite(
    await sharp(join(publicDir, "cube27_logo.png")).png().toBuffer(),
  );
  await sharp(repaired)
    .webp({ quality: 82, effort: 6 })
    .toFile(join(publicDir, out));
  console.log(`  ${out.padEnd(22)} ${kb(out)}`);
}

/**
 * App icons: derive every square icon from the same `cube27_logo.png` master.
 *
 * Tab and home-screen icons render as small as 16px, where the full wordmark
 * is an illegible smudge — so these crop to the hex mark alone. `trim()`
 * drops any transparent or flat margin around the lockup, then the mark is
 * taken as the leading square of what remains (the hex is as tall as the
 * lockup, so height doubles as its width).
 *
 * Transparency is preserved: PNG icons stay transparent so light and dark
 * browser chrome both work, and no background box is composited in.
 */
const ICON_PNGS = [
  { out: "icon-192.png", size: 192 },
  { out: "icon-512.png", size: 512 },
  { out: "apple-touch-icon.png", size: 180 },
];

async function buildIcons() {
  const master = join(publicDir, "cube27_logo.png");
  if (!existsSync(master)) {
    console.log(
      "  (skipped app icons — cube27_logo.png not found; committed icons kept)",
    );
    return;
  }

  // Trim surrounding margin, then isolate the leading hex mark. The mark is
  // separated from the wordmark by a fully empty gutter, so scan for the
  // first blank column past the mark rather than assuming a square crop —
  // a square is slightly too wide and clips in the edge of the "C".
  const repaired = await restoreInteriorWhite(
    await sharp(master).png().toBuffer(),
  );
  const trimmed = await sharp(repaired).trim().toBuffer();
  const { data, info } = await sharp(trimmed)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  /** @param {number} x Column index in the trimmed raw buffer. */
  const isBlankColumn = (x) => {
    for (let y = 0; y < info.height; y++) {
      const i = (y * info.width + x) * info.channels;
      const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      // Transparent, or near-white left over from a flattened master.
      if (a > 16 && !(r > 235 && g > 235 && b > 235)) return false;
    }
    return true;
  };

  // Start past the bulk of the mark so an interior gap cannot match early.
  let markWidth = info.height;
  for (let x = Math.floor(info.height * 0.6); x < info.width; x++) {
    if (isBlankColumn(x)) {
      markWidth = x;
      break;
    }
  }

  const mark = await sharp(trimmed)
    .extract({ left: 0, top: 0, width: markWidth, height: info.height })
    .trim()
    .toBuffer();

  // Square the mark on a transparent canvas, padded so it is not flush to
  // the edge. The mark's gradient mesh is photographic, so `palette` quantises
  // it to keep these icons small — at icon sizes the banding is invisible.
  /** @param {number} size Output edge length in px. */
  const square = (size) => {
    const inner = Math.round(size * 0.84);
    return sharp(mark)
      .resize(inner, inner, { fit: "contain", background: TRANSPARENT })
      .extend({
        top: Math.floor((size - inner) / 2),
        bottom: Math.ceil((size - inner) / 2),
        left: Math.floor((size - inner) / 2),
        right: Math.ceil((size - inner) / 2),
        background: TRANSPARENT,
      })
      .png({ compressionLevel: 9, palette: true, quality: 90 });
  };

  for (const { out, size } of ICON_PNGS) {
    await square(size).toFile(join(publicDir, out));
    console.log(`  ${out.padEnd(22)} ${kb(out)}`);
  }

  // The favicon is an SVG wrapper embedding the mark, so the tab icon is the
  // real logo rather than the hand-drawn placeholder it replaces. It renders
  // at 16-32px, so it embeds a 64px raster — larger is wasted bytes on a
  // file that loads with every page.
  const favPng = await square(64).toBuffer();
  const favicon =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" ` +
    `role="img" aria-label="Cube27">` +
    `<image href="data:image/png;base64,${favPng.toString("base64")}" ` +
    `width="64" height="64"/></svg>\n`;
  writeFileSync(join(publicDir, "favicon.svg"), favicon);
  console.log(`  ${"favicon.svg".padEnd(22)} ${kb("favicon.svg")}`);
}

/**
 * Record each optimized logo's intrinsic size to
 * `src/content/site/logo-dimensions.json`. The marquee sets width/height per
 * image from this so lazy-loaded logos reserve their exact box before
 * decoding (no layout shift) — these marks range from 0.65 to 5.61 in aspect
 * ratio, so a single fixed size would distort them. Regenerated here so the
 * data can never drift from the committed assets.
 *
 * @param {string} outDir Directory holding the optimized `{n}.webp` logos.
 */
async function writeLogoDimensions(outDir) {
  const entries = readdirSync(outDir)
    .filter((f) => /^\d+\.webp$/i.test(f))
    .sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10));
  /** @type {Record<string, [number, number]>} */
  const dims = {};
  for (const file of entries) {
    const { width, height } = await sharp(join(outDir, file)).metadata();
    if (width && height) dims[file.replace(/\.webp$/i, "")] = [width, height];
  }
  // Emit each pair on one line so the file matches what Prettier would
  // produce — otherwise `format` and `optimize:images` fight over it.
  const body = Object.entries(dims)
    .map(([n, [w, h]]) => `  "${n}": [${w}, ${h}]`)
    .join(",\n");
  writeFileSync(
    join(publicDir, "..", "src", "content", "site", "logo-dimensions.json"),
    `{\n${body}\n}\n`,
  );
  console.log(
    `  logo-dimensions.json      ${Object.keys(dims).length} entries`,
  );
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
    const have = readdirSync(outDir).filter((f) =>
      /^\d+\.webp$/i.test(f),
    ).length;
    console.log(
      `  (skipped partner logos — no source PNGs; ${have} committed in opt/)`,
    );
    await writeLogoDimensions(outDir);
    return have;
  }
  for (const file of files) {
    const n = file.replace(/\.png$/i, "");
    const trimmed = await sharp(join(srcDir, file))
      .trim({ background: "#ffffff", threshold: 20 })
      .toBuffer();
    await sharp(trimmed)
      .extend({ top: 8, bottom: 8, left: 8, right: 8, background: "#ffffff" })
      .resize({
        width: 320,
        height: 320,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 90, effort: 6 })
      .toFile(join(outDir, `${n}.webp`));
  }
  console.log(`  images/logos/opt/*.webp   ${files.length} logos (trimmed)`);
  await writeLogoDimensions(outDir);
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
    const have = readdirSync(outDir).filter((f) =>
      /^life-\d+\.webp$/i.test(f),
    ).length;
    console.log(
      `  (skipped office photos — no source JPGs; ${have} committed in opt/)`,
    );
    return have;
  }
  let i = 0;
  for (const file of files) {
    const name = `life-${String(++i).padStart(2, "0")}.webp`;
    await sharp(join(srcDir, file))
      .rotate() // honor EXIF orientation from phone photos
      .resize({
        width: 1600,
        height: 1200,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 72, effort: 6 })
      .toFile(join(outDir, name));
  }
  console.log(`  images/office/opt/life-NN.webp  ${files.length} photos`);
  return files.length;
}

console.log("Optimizing images →");
await buildBackground();
await buildLogo();
await buildIcons();
const logoCount = await buildPartnerLogos();
const officeCount = await buildOfficePhotos();
console.log("Done.");
console.log(
  `\nCounts for components: ${logoCount} logos, ${officeCount} office photos.`,
);
