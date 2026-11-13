// Grade rows and result for the grade calculator: rendered at build time (defaults) and in the browser.
import { num, fmt } from './ui';
export type Row = { name: string; score: string; weight: string };
export const DEFAULT_GRADES: Row[] = [{ name: 'Homework', score: '92', weight: '20' }, { name: 'Midterm', score: '78', weight: '30' }, { name: 'Project', score: '88', weight: '20' }];
export const letter = (p: number) => (p >= 93 ? 'A' : p >= 90 ? 'A−' : p >= 87 ? 'B+' : p >= 83 ? 'B' : p >= 80 ? 'B−' : p >= 77 ? 'C+' : p >= 73 ? 'C' : p >= 70 ? 'C−' : p >= 67 ? 'D+' : p >= 60 ? 'D' : 'F');
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
export const gradeRowsHtml = (rows: Row[]) => rows.map((r, i) => `<li class="grid grid-cols-[1fr_1fr_2.75rem] items-end gap-2 rounded-[10px] border border-line p-2 sm:grid-cols-[1fr_6rem_6rem_2.75rem] sm:border-0 sm:p-0" data-i="${i}">
      <input class="input col-span-3 sm:col-span-1" placeholder="Name (optional)" aria-label="Row ${i + 1} name" data-f="name" value="${esc(r.name)}" />
      <label class="block"><span class="mb-1 block text-xs font-semibold text-muted sm:sr-only">Score %</span><input class="input tabular" inputmode="decimal" placeholder="Score %" aria-label="Row ${i + 1} score percent" data-f="score" value="${esc(r.score)}" /></label>
      <label class="block"><span class="mb-1 block text-xs font-semibold text-muted sm:sr-only">Weight %</span><input class="input tabular" inputmode="decimal" placeholder="Weight %" aria-label="Row ${i + 1} weight percent" data-f="weight" value="${esc(r.weight)}" /></label>
      <button type="button" class="btn btn-ghost h-11 w-11 !p-0" data-del aria-label="Remove row ${i + 1}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></li>`).join('');
export type GradeResult = { cur: string; curnote: string; need: string; neednote: string; msg: string };
export function gradeResult(rows: Row[], finalW: string, targetS: string): GradeResult {
  const r: GradeResult = { cur: '–', curnote: '', need: '–', neednote: '', msg: '' };
  let sw = 0, w = 0;
  for (const [i, row] of rows.entries()) {
    if (!row.score.trim() && !row.weight.trim()) continue;
    const s = num(row.score), wt = num(row.weight);
    if (!(s >= 0) || !(wt > 0)) return { ...r, msg: `Enter a score and a weight for row ${i + 1}.`, cur: '', need: '' };
    sw += s * wt; w += wt;
  }
  const fw = num(finalW) || 0, target = num(targetS);
  if (w + fw > 100.001) r.msg = `The weights add up to ${fmt(w + fw)}%. They should total 100% or less.`;
  if (!w) return { ...r, curnote: 'Add a score and its weight.' };
  const cur = sw / w;
  r.cur = `${fmt(cur, 1)}%`; r.curnote = `${letter(cur)} · based on ${fmt(w)}% of the course`;
  if (fw > 0 && target >= 0) {
    const need = (target * (w + fw) - sw) / fw;
    r.need = `${fmt(Math.max(0, need), 1)}%`;
    r.neednote = need > 100 ? `Even 100% on the final would give ${fmt((sw + 100 * fw) / (w + fw), 1)}% overall, so ${target}% is out of reach.` : need <= 0 ? `You will reach ${target}% even with 0% on the final.` : `to finish with ${target}% overall (${letter(target)}).`;
  } else r.neednote = 'Enter the final exam weight and your target.';
  return r;
}
