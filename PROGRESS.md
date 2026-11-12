# Phase 3 progress

Status of each tool lives in `src/data/tools.json` (`"status": "built"` = live, indexed, in sitemap).

## Done
- Phase 1 + Phase 2 (35 top-priority tools)
- Batch 1, PDF (12): rotate, delete pages, reorder pages, extract pages, page numbers, watermark, fill form, protect, unlock, PDF to text, crop, flatten
- Batch 2, Image (15): crop, JPG↔PNG, rotate/flip, add text, watermark, blur, Base64, meme, collage, color picker, black & white, round corners, metadata viewer, remove EXIF
- Batch 3, Text (16): character counter, case converter, remove duplicates, text compare, sort lines, extra spaces, find & replace, reverse, text to speech, speech to text, lorem ipsum, readability, word frequency, small text, line counter, slug
- Batch 4, Calculators (23): loan, car loan, savings goal, retirement, credit card payoff, debt snowball, inflation (bundled BLS CPI data), ROI, salary to hourly, discount, tip, profit margin, VAT/sales tax, calorie, body fat, ovulation, water intake, sleep, grade, date difference, fraction, scientific, random number
- Batch 5, Converters (14): length, weight, temperature, area, volume, speed, time, data size (decimal + binary), fuel economy, shoe size, clothing size, number to words, Roman numerals, number bases
- Batch 6, Developer (15): JSON→CSV, CSV→JSON, Base64, URL encode, barcode, color picker, CSS gradient, HTML/CSS/JS minifiers, regex tester, UUID, hash (MD5/SHA), timestamp, Markdown→HTML (sanitized)
- Batch 7, SEO & Social (12): meta tags, keyword density, robots.txt, sitemap, Open Graph preview, YouTube title + thumbnail checkers, X character counter + thread splitter, Instagram caption formatter, hashtag generator, UTM builder, email signature. New shared `CodeOutput.astro`.
- Batch 8, Student (10): flashcards, Pomodoro, essay word counter, equation solver (lib/equation.ts, exact fractions + steps), periodic table (src/data/elements.ts), unit circle, multiplication table (print + practice), spelling practice, quiz maker, homework planner. New shared `LocalNote.astro` (device-only storage note), `printElement()` + `esc()` in lib/ui.ts, `shuffle()` in lib/random.ts.
- Batch 9, Everyday (10): countdown timer, alarm clock, coin flip, dice roller, to-do list, notepad, calendar generator (print with @page size), world clock (lib/cities.ts), password strength checker (lib/password-strength.ts, offline estimator), screen tester. New lib/sound.ts (Web Audio alarm tones, wake lock). `printElement(el, pageCss)` now takes optional @page CSS. Password checker + generator pages render no ad slots and no ad script (`noAds` in [slug].astro / Base.astro).
- Batch 10, Heavy (7 of 8): cut audio + MP3 converter (Web Audio decode + lamejs worker, src/lib/audio.ts, src/workers/mp3.ts); trim video, compress video, video to GIF, extract audio (ffmpeg.wasm single-thread core, src/lib/ffmpeg.ts, no COOP/COEP needed); background remover (ISNet quint8 + onnxruntime-web wasm in src/workers/bg-remove.ts). Link shortener skipped.
  - scripts/vendor-assets.mjs (prebuild/predev) copies @ffmpeg/core and onnxruntime-web wasm into public/vendor/<pkg>/<version>/, splitting files over 20 MiB (Cloudflare Pages 25 MiB limit). public/vendor is gitignored.
  - public/models/isnet-general-use-q8/: committed model parts + README with source, license and how it was quantized.
  - lib/fetch-parts.ts joins split files, reports progress, caches in the Cache API ("toolwise-heavy-v1").
  - Shared: TaskProgress.astro + lib/task-progress.ts (progress with Cancel and ETA), ClipRange.astro + lib/clip-range.ts (start/end selector), FfmpegNote.astro (GPL notice + source link).

## Next
- Final full-site check, Lighthouse on 10 tool pages, final report. (Link shortener skipped at the user's request; its page stays "coming soon", noindex, out of the sitemap.)

## How each tool is built (keep it consistent)
1. `src/tools/<slug>.astro`: UI + `<script>`. Reuse components:
   - File tools: `Dropzone`, `FileResults` + `lib/file-results.ts`, `lib/dropzone.ts`, `ImageConvert` (format converters)
   - PDF: `PdfPagesTool` + `lib/pdf-pages-tool.ts` (thumbnail grid), `PdfOptionsTool` + `lib/pdf-options-tool.ts` (one PDF + settings), `lib/pdf.ts` (`visualBox` for rotated pages, `flattenForm`)
   - Calculators: `CalcLayout`, `CurrencySelect`, `Field`, `ResultPanel`, `BodyInputs`, `lib/calc.ts` (`live`, `resultsUi`, `payment`, `amortizeYearly`, `body`), `lib/expr.ts` (safe math parser)
   - Image editing: `ImageEditor` + `lib/image-editor.ts` (live preview, `render(img, scale)`), `lib/text-draw.ts`, `lib/metadata.ts`
   - Text tools: `TextTransform` + `lib/text-transform.ts` (input → live output), `lib/text-stats.ts`
   - Unit converters: `UnitConverter` + `lib/units.ts` (all factors in one table)
   - Helpers: `lib/ui.ts` (`num`, `fmt`, `money`, `copyText`, `downloadBlob`, `store`), `lib/image.ts`, `lib/random.ts`
   - Heavy libraries only via dynamic `import()` inside handlers.
2. `src/content/tools/<slug>.md`: quoted `seoTitle`/`metaDescription`, 3–5 FAQs, ~400+ word original guide.
   Avoid `: ` inside unquoted YAML values. Run `python3 scripts/check-content.py <slugs>`.
3. Set `"status": "built"` in tools.json.
4. `npx astro build` + `npx astro check` (0 errors/warnings), Playwright tests at 360 and 1280 with good and bad inputs.
5. Commit + push to `origin main` (github.com/HamzaTariq19/toolwise.org).

Health/finance calculators: the tool page template shows the estimates disclaimer automatically for those categories.

## Gotchas learned
- Astro treats backslashes in plain attribute strings as escapes: use `value={'\\d+'}` expressions for regex or JSON samples.
- Never self-close `<select … set:html>`; wrap options in `<Fragment set:html>` inside a real `<select></select>`.
- pdf-lib `form.flatten()` leaves dangling widget refs; use `flattenForm()` from lib/pdf.ts.
- Phone overflow: `.grid` defaults to `minmax(0,1fr)` (base layer), `.card` has `min-width:0`, the tool area and `.prose-tw` use `overflow-wrap:anywhere`. Test with 300-char unbroken input at 360px (scratchpad `allovf.cjs` checks every built page).
- Printing: `printElement(el)` clones el into `.print-host` and hides everything else via @media print (dark tokens reset to light).
- Read tool caches images by path: use a new filename when re-checking a screenshot.
- Show the options of media tools only after the clip's duration is known, or a typed start time gets reset by the late metadata load.
- Single-thread ffmpeg.wasm compresses 40 s of 1080p in about 70 s on a fast machine; phones are much slower, so the compress page shows a time estimate.
