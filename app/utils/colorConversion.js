export const hslToRgb = (h, s, l) => {
  let r;
  let g;
  let b;

  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    const hue2rgb = function hue2rgb(p, q, t) {
      let t1 = t;
      if (t1 < 0) t1 += 1;
      if (t1 > 1) t1 -= 1;
      if (t1 < 1 / 6) return p + (q - p) * 6 * t1;
      if (t1 < 1 / 2) return q;
      if (t1 < 2 / 3) return p + (q - p) * (2 / 3 - t1) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};
