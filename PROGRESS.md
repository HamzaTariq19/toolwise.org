# Phase 3 progress

Status of each tool lives in `src/data/tools.json` (`"status": "built"` = live, indexed, in sitemap).

## Done
- Phase 1 + Phase 2 (35 top-priority tools)
- Batch 1, PDF (12): rotate, delete pages, reorder pages, extract pages, page numbers, watermark, fill form, protect, unlock, PDF to text, crop, flatten
- Batch 2, Image (15): crop, JPG↔PNG, rotate/flip, add text, watermark, blur, Base64, meme, collage, color picker, black & white, round corners, metadata viewer, remove EXIF

## Next
- Batch 3 Text (16) → Batch 4 Calculators (23) → Batch 5 Converters (14) → Batch 6 Developer (15) → Batch 7 SEO (12) → Batch 8 Student (10) → Batch 9 Everyday (10) → Batch 10 Heavy (8; ask before building the link shortener)

## How each tool is built (keep it consistent)
1. `src/tools/<slug>.astro`: UI + `<script>`. Reuse components:
   - File tools: `Dropzone`, `FileResults` + `lib/file-results.ts`, `lib/dropzone.ts`, `ImageConvert` (format converters)
   - PDF: `PdfPagesTool` + `lib/pdf-pages-tool.ts` (thumbnail grid), `PdfOptionsTool` + `lib/pdf-options-tool.ts` (one PDF + settings), `lib/pdf.ts` (`visualBox` for rotated pages, `flattenForm`)
   - Calculators: `CalcLayout`, `CurrencySelect`, `lib/calc.ts` (`live`, `payment`, `amortizeYearly`)
   - Image editing: `ImageEditor` + `lib/image-editor.ts` (live preview, `render(img, scale)`), `lib/text-draw.ts`, `lib/metadata.ts`
   - Helpers: `lib/ui.ts` (`num`, `fmt`, `money`, `copyText`, `downloadBlob`, `store`), `lib/image.ts`, `lib/random.ts`
   - Heavy libraries only via dynamic `import()` inside handlers.
2. `src/content/tools/<slug>.md`: quoted `seoTitle`/`metaDescription`, 3–5 FAQs, ~400+ word original guide.
   Avoid `: ` inside unquoted YAML values. Run `python3 scripts/check-content.py <slugs>`.
3. Set `"status": "built"` in tools.json.
4. `npx astro build` + `npx astro check` (0 errors/warnings), Playwright tests at 360 and 1280 with good and bad inputs.
5. Commit + push to `origin main` (github.com/HamzaTariq19/toolwise.org).

Health/finance calculators: the tool page template shows the estimates disclaimer automatically for those categories.
