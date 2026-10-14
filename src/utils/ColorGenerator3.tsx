const TARGET_LUMINANCE = 0.5;
const GOLDEN_ANGLE = 137.50776405003785;

type RGB = {
  red: number;
  green: number;
  blue: number;
};

function hslToRgb(hue: number, lightness: number): RGB {
  const chroma = 1 - Math.abs(2 * lightness - 1);
  const hueSegment = hue / 60;
  const secondary = chroma * (1 - Math.abs((hueSegment % 2) - 1));
  let red = 0;
  let green = 0;
  let blue = 0;

  if (hueSegment < 1) {
    red = chroma;
    green = secondary;
  } else if (hueSegment < 2) {
    red = secondary;
    green = chroma;
  } else if (hueSegment < 3) {
    green = chroma;
    blue = secondary;
  } else if (hueSegment < 4) {
    green = secondary;
    blue = chroma;
  } else if (hueSegment < 5) {
    red = secondary;
    blue = chroma;
  } else {
    red = chroma;
    blue = secondary;
  }

  const offset = lightness - chroma / 2;
  return {
    red: red + offset,
    green: green + offset,
    blue: blue + offset,
  };
}

function linearize(channel: number): number {
  return channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance({ red, green, blue }: RGB): number {
  return (
    0.2126 * linearize(red) +
    0.7152 * linearize(green) +
    0.0722 * linearize(blue)
  );
}

function toHex({ red, green, blue }: RGB): string {
  const channels: [number, number, number] = [
    Math.round(red * 255),
    Math.round(green * 255),
    Math.round(blue * 255),
  ];
  const toHexChannel = (channel: number) =>
    channel.toString(16).padStart(2, "0");
  let closestHex = "";
  let closestDifference = Number.POSITIVE_INFINITY;

  for (let redOffset = -1; redOffset <= 1; redOffset += 1) {
    for (let greenOffset = -1; greenOffset <= 1; greenOffset += 1) {
      for (let blueOffset = -1; blueOffset <= 1; blueOffset += 1) {
        const redChannel = Math.min(255, Math.max(0, channels[0] + redOffset));
        const greenChannel = Math.min(
          255,
          Math.max(0, channels[1] + greenOffset),
        );
        const blueChannel = Math.min(
          255,
          Math.max(0, channels[2] + blueOffset),
        );
        const candidate = {
          red: redChannel / 255,
          green: greenChannel / 255,
          blue: blueChannel / 255,
        };
        const difference = Math.abs(
          relativeLuminance(candidate) - TARGET_LUMINANCE,
        );

        if (difference < closestDifference) {
          closestDifference = difference;
          closestHex = `#${toHexChannel(redChannel)}${toHexChannel(greenChannel)}${toHexChannel(blueChannel)}`;
        }
      }
    }
  }

  return closestHex;
}

/**
 * Generate distinct colors with the same target WCAG relative luminance.
 * Hexadecimal channel rounding can cause small luminance differences.
 */
export function generateDistinctColors(count: number): string[] {
  if (!Number.isSafeInteger(count) || count < 0) {
    throw new RangeError("count must be a non-negative safe integer");
  }

  const colors: string[] = [];
  const seen = new Set<string>();

  for (let index = 0; colors.length < count; index += 1) {
    const hue = (index * GOLDEN_ANGLE) % 360;
    let low = 0;
    let high = 1;

    for (let iteration = 0; iteration < 24; iteration += 1) {
      const lightness = (low + high) / 2;
      if (relativeLuminance(hslToRgb(hue, lightness)) < TARGET_LUMINANCE) {
        low = lightness;
      } else {
        high = lightness;
      }
    }

    const color = toHex(hslToRgb(hue, (low + high) / 2));
    if (!seen.has(color)) {
      seen.add(color);
      colors.push(color);
    }
  }

  return colors;
}
