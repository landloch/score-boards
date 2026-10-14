/**
 * Generate n distinct colors with approximately equal WCAG relative luminance.
 *
 * @param n Number of colors to generate.
 * @param luminance Target relative luminance (0–1).
 * @returns Array of hexadecimal colors.
 */
function generateColors(n: number, luminance = 0.5): string[] {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n must be a non-negative integer");
  }

  if (luminance < 0 || luminance > 1) {
    throw new Error("luminance must be between 0 and 1");
  }

  if (n === 0) return [];

  const colors: string[] = [];

  for (let i = 0; i < n; i++) {
    const hue = (i * 360) / n;

    // Find an HSL color with the requested relative luminance.
    let low = 0;
    let high = 100;
    let best = "";

    for (let j = 0; j < 24; j++) {
      const lightness = (low + high) / 2;
      const rgb = hslToRgb(hue, 100, lightness);
      const y = relativeLuminance(...rgb);

      if (y < luminance) {
        low = lightness;
      } else {
        high = lightness;
      }

      best = rgbToHex(...rgb);
    }

    colors.push(best);
  }

  return colors;
}

/** Convert HSL to RGB (channels in the range 0–255). */
function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  h /= 360;
  s /= 100;
  l /= 100;

  const a = s * Math.min(l, 1 - l);

  const f = (n: number): number => {
    const k = (n + h * 12) % 12;
    const color = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * color);
  };

  return [f(0), f(8), f(4)];
}

/** Convert an sRGB channel (0–255) to linear RGB. */
function linearize(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045
    ? c / 12.92
    : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** Calculate WCAG relative luminance from RGB channels. */
function relativeLuminance(
  r: number,
  g: number,
  b: number
): number {
  return (
    0.2126 * linearize(r) +
    0.7152 * linearize(g) +
    0.0722 * linearize(b)
  );
}

/** Convert RGB channels to a hexadecimal color. */
function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("")
  );
}
