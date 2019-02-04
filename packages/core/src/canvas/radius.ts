export interface Radius {
  tl: number;
  tr: number;
  bl: number;
  br: number;
}

export type RadiusInput = number | Partial<Radius> | undefined;

const zeroRadius = { tl: 0, tr: 0, br: 0, bl: 0 };

export const normalizeRadius = (radius: RadiusInput): Radius => {
  if (!radius) {
    return zeroRadius;
  } else if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    if (!radius.bl) {
      radius.bl = 0;
    }
    if (!radius.tl) {
      radius.tl = 0;
    }
    if (!radius.tr) {
      radius.tr = 0;
    }
    if (!radius.br) {
      radius.br = 0;
    }
  }
  return radius as Radius;
};
