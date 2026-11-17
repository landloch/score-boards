export function GenerateColors(number: number, saturation = 100, lightness = 50) {
  let colors: string[] = [];
  let hueStep = 360 / number;

  for (let i = 0; i < number; i++) {
      colors.push(hslToRgb(i * hueStep, saturation, lightness));
  }

  return colors;
}

function hslToRgb(hue: number, saturation: number, lightness: number): string {
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;
  let r = l, g = l, b = l;
  if (s != 0) {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }
  let hex = '#' + Math.round(r * 255).toString(16).padStart(2, "0")
    + Math.round(g * 255).toString(16).padStart(2, "0")
    + Math.round(b * 255).toString(16).padStart(2, "0");
  return hex.toUpperCase();
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
