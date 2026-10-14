type RGB = [number, number, number];

/**
 * Generate distinct colors with approximately equal WCAG relative luminance.
 *
 * @param n Number of colors to generate.
 * @param targetLuminance Target WCAG relative luminance, from 0 to 1.
 * @returns An array of hexadecimal colors.
 */
export function GenerateColors(
  n: number,
  targetLuminance = 0.5
): string[] {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("n must be a non-negative integer");
  }

  if (
    !Number.isFinite(targetLuminance) ||
    targetLuminance < 0 ||
    targetLuminance > 1
  ) {
    throw new Error("targetLuminance must be between 0 and 1");
  }

  if (n === 0) return [];

  // Black and white are the only colors at these luminance extremes.
  if (targetLuminance === 0) {
    return Array(n).fill("#000000");
  }

  if (targetLuminance === 1) {
    return Array(n).fill("#ffffff");
  }

  const colors: string[] = [];

  for (let i = 0; i < n; i++) {
    const hue = (i * 360) / n;
    colors.push(
      findColorWithLuminance(hue, targetLuminance)
    );
  }

  return colors;
}

/**
 * Find the HSL color with the specified hue and saturation
 * whose relative luminance is closest to the target.
 *
 * If the target is unreachable at full saturation, the closest
 * achievable color is returned.
 */
function findColorWithLuminance(
  hue: number,
  targetLuminance: number
): string {
  const saturation = 100;

  let low = 0;
  let high = 100;

  let bestRgb: RGB = hslToRgb(hue, saturation, 50);
  let bestError = Math.abs(
    relativeLuminance(...bestRgb) - targetLuminance
  );

  // Check both endpoints in case the target is unreachable.
  for (const lightness of [0, 100]) {
    const rgb = hslToRgb(hue, saturation, lightness);
    const error = Math.abs(
      relativeLuminance(...rgb) - targetLuminance
    );

    if (error < bestError) {
      bestRgb = rgb;
      bestError = error;
    }
  }

  // Binary search for the closest luminance.
  for (let j = 0; j < 24; j++) {
    const lightness = (low + high) / 2;
    const rgb = hslToRgb(hue, saturation, lightness);
    const luminance = relativeLuminance(...rgb);
    const error = Math.abs(luminance - targetLuminance);

    if (error < bestError) {
      bestRgb = rgb;
      bestError = error;
    }

    if (error === 0) {
      break;
    }

    if (luminance < targetLuminance) {
      low = lightness;
    } else {
      high = lightness;
    }
  }

  return rgbToHex(...bestRgb);
}

/**
 * Convert HSL to RGB.
 * H: 0–360, S: 0–100, L: 0–100.
 * RGB channels: 0–255.
 */
function hslToRgb(
  h: number,
  s: number,
  l: number
): RGB {
  h = ((h % 360) + 360) % 360;
  h /= 360;
  s /= 100;
  l /= 100;

  const a = s * Math.min(l, 1 - l);

  const f = (n: number): number => {
    const k = (n + h * 12) % 12;
    const color =
      l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));

    return Math.round(255 * color);
  };

  return [f(0), f(8), f(4)];
}

/**
 * Convert an sRGB channel to linear RGB.
 */
function linearize(channel: number): number {
  const c = channel / 255;

  return c <= 0.04045
    ? c / 12.92
    : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Calculate WCAG relative luminance from sRGB channels.
 */
function relativeLuminance(
  r: number,
  g: number,
  b: number
): number {
  return (
    2* 0.2126 * linearize(r) +
    (2* 0.7152 - 1) * linearize(g) +
    2* 0.0722 * linearize(b)
  );
}

/**
 * Convert RGB to a hexadecimal color.
 */
function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("")
  );
}
