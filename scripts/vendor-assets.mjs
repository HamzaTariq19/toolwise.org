// Copies heavy browser runtimes from node_modules into public/vendor before each build.
// Files over Cloudflare Pages' 25 MiB limit are split into parts and joined again in the browser.
import { readFileSync, mkdirSync, writeFileSync, existsSync, rmSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';

const root = join(dirname(new URL(import.meta.url).pathname), '..');
const PART = 20 * 1024 * 1024; // 20 MiB parts
const pkgDir = (pkg) => join(root, 'node_modules', pkg);
const ver = (pkg) => JSON.parse(readFileSync(join(pkgDir(pkg), 'package.json'), 'utf8')).version;

function put(src, destDir, name, split = false) {
  mkdirSync(destDir, { recursive: true });
  const buf = readFileSync(src);
  if (!split || buf.length <= PART) { writeFileSync(join(destDir, name), buf); return 1; }
  let n = 0;
  for (let o = 0; o < buf.length; o += PART) writeFileSync(join(destDir, `${name}.part${++n}`), buf.subarray(o, o + PART));
  writeFileSync(join(destDir, `${name}.parts.json`), JSON.stringify({ parts: n, size: buf.length }));
  return n;
}

const out = join(root, 'public', 'vendor');
if (existsSync(out)) rmSync(out, { recursive: true });

const ff = ver('@ffmpeg/core'), ffDir = join(pkgDir('@ffmpeg/core'), 'dist', 'esm');
put(join(ffDir, 'ffmpeg-core.js'), join(out, 'ffmpeg', ff), 'ffmpeg-core.js');
const parts = put(join(ffDir, 'ffmpeg-core.wasm'), join(out, 'ffmpeg', ff), 'ffmpeg-core.wasm', true);

const ort = ver('onnxruntime-web'), ortDir = join(pkgDir('onnxruntime-web'), 'dist');
for (const f of ['ort-wasm-simd-threaded.wasm', 'ort-wasm-simd-threaded.mjs']) put(join(ortDir, f), join(out, 'ort', ort), f);

writeFileSync(join(root, 'src', 'data', 'vendor.json'), JSON.stringify({ ffmpeg: { version: ff, parts, size: statSync(join(ffDir, 'ffmpeg-core.wasm')).size }, ort: { version: ort, size: statSync(join(ortDir, 'ort-wasm-simd-threaded.wasm')).size } }, null, 2) + '\n');
console.log(`vendor: ffmpeg ${ff} (${parts} parts), onnxruntime-web ${ort}`);
