// Course rows for the GPA calculator: rendered at build time (default rows) and in the browser.
export const GRADES: [string, number][] = [['A+', 4.0], ['A', 4.0], ['A-', 3.7], ['B+', 3.3], ['B', 3.0], ['B-', 2.7], ['C+', 2.3], ['C', 2.0], ['C-', 1.7], ['D+', 1.3], ['D', 1.0], ['D-', 0.7], ['F', 0]];
export type Row = { name: string; grade: string; credits: string };
export const DEFAULT_ROWS: Row[] = [{ name: '', grade: 'A', credits: '3' }, { name: '', grade: 'B+', credits: '3' }, { name: '', grade: 'A-', credits: '4' }, { name: '', grade: '', credits: '' }];
export const rowsHtml = (rows: Row[]) => rows.map((r, i) => `
      <li class="grid grid-cols-[1fr_6.5rem] gap-2 rounded-[10px] border border-line p-2 sm:grid-cols-[1fr_6.5rem_5.5rem_2.75rem] sm:border-0 sm:p-0" data-i="${i}">
        <input class="input col-span-2 sm:col-span-1" placeholder="Course ${i + 1}" aria-label="Course ${i + 1} name" data-f="name" value="${r.name.replace(/"/g, '&quot;')}" />
        <select class="select" aria-label="Course ${i + 1} grade" data-f="grade">
          <option value="">Grade</option>${GRADES.map(([g]) => `<option ${g === r.grade ? 'selected' : ''}>${g}</option>`).join('')}
        </select>
        <div class="flex gap-2 sm:contents">
          <input class="input tabular" inputmode="decimal" placeholder="Credits" aria-label="Course ${i + 1} credits" data-f="credits" value="${r.credits}" />
          <button type="button" class="btn btn-ghost h-11 w-11 flex-none !p-0" data-del aria-label="Remove course ${i + 1}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
        </div>
      </li>`).join('');;
