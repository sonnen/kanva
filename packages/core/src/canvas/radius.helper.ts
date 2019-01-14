import { Radius } from './canvas.types';

export const normalizeRadius = (radius: number | Partial<Radius>): Radius => {
  if (typeof radius === 'number') {
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
