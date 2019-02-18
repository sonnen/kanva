import { findLastIndex } from 'lodash';

export interface Color {
  r: number;
  g: number;
  b: number;
  a?: number;
}

// tslint:disable-next-line:max-line-length
const colorRegex = /^(?:#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2}))|(?:#([0-9a-f])([0-9a-f])([0-9a-f]))|(?:rgb\((\d+),\s*(\d+),\s*(\d+)\))|(?:rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\))$/i;

export const parseColor = (colorString: string | undefined): typeof colorString extends undefined
  ? undefined
  : Color | undefined => {
  if (!colorString) {
    return undefined;
  }
  const colorMatch = colorString.match(colorRegex);
  if (!colorMatch) {
    return undefined;
  }

  // First 6 (index 1-6) matches are only for hex color codes
  const isHex = findLastIndex(colorMatch, Boolean) <= 6;

  const [, rString, gString, bString, aString] = colorMatch.filter(Boolean);

  const radix = isHex ? 16 : 10;
  const parse = (s: string) => parseInt(s.length === 1 ? s + s : s, radix);

  return {
    r: parse(rString),
    g: parse(gString),
    b: parse(bString),
    a: aString ? parseFloat(aString) : undefined,
  };
};

export const rgba = (color: string, alpha: number): string => {
  const c = parseColor(color)!;
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
};

export const luminance = (c: Color): number => (0.299 * c.r + 0.587 * c.g + 0.114 * c.b) / 255;

export const isBright = (color: Color) => luminance(color) > 0.5;
