// Draw multi-line text on a canvas with optional outline and background box.
export interface TextStyle { weight?: number | string; font: string; size: number; color: string; outline?: string; outlineWidth?: number; box?: string; align: CanvasTextAlign; lineHeight?: number }

export function drawTextBlock(g: CanvasRenderingContext2D, text: string, x: number, y: number, st: TextStyle, maxWidth?: number) {
  g.save();
  g.font = `${st.weight ?? 400} ${st.size}px ${st.font}`;
  g.textAlign = st.align; g.textBaseline = 'middle';
  const lines = wrap(g, text, maxWidth);
  const lh = st.size * (st.lineHeight ?? 1.18), total = lh * lines.length;
  const widest = Math.max(0, ...lines.map((l) => g.measureText(l).width));
  if (st.box) {
    const pad = st.size * 0.35, bx = st.align === 'center' ? x - widest / 2 : st.align === 'right' ? x - widest : x;
    g.fillStyle = st.box; g.beginPath();
    const r = st.size * 0.2, X = bx - pad, Y = y - total / 2 - pad * 0.6, W = widest + pad * 2, H = total + pad * 1.2;
    g.moveTo(X + r, Y); g.arcTo(X + W, Y, X + W, Y + H, r); g.arcTo(X + W, Y + H, X, Y + H, r); g.arcTo(X, Y + H, X, Y, r); g.arcTo(X, Y, X + W, Y, r); g.fill();
  }
  lines.forEach((l, i) => {
    const ly = y - total / 2 + lh * (i + 0.5);
    if (st.outline && st.outlineWidth) { g.lineJoin = 'round'; g.miterLimit = 2; g.strokeStyle = st.outline; g.lineWidth = st.outlineWidth; g.strokeText(l, x, ly); }
    g.fillStyle = st.color; g.fillText(l, x, ly);
  });
  g.restore();
  return { width: widest, height: total };
}

/** Split into lines on newlines, then wrap words to maxWidth */
export function wrap(g: CanvasRenderingContext2D, text: string, maxWidth?: number): string[] {
  const out: string[] = [];
  for (const para of text.split('\n')) {
    if (!maxWidth) { out.push(para); continue; }
    let line = '';
    for (const word of para.split(/\s+/)) {
      const test = line ? `${line} ${word}` : word;
      if (g.measureText(test).width > maxWidth && line) { out.push(line); line = word; } else line = test;
    }
    out.push(line);
  }
  return out;
}
