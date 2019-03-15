export const precision = (a: number): number => {
  if (!isFinite(a)) {
    return 0;
  }
  let e = 1;
  let p = 0;
  while (Math.round(a * e) / e !== a) {
    e *= 10;
    p++;
  }
  return p;
};

export const roundToNearest = (value: number, nearest: number) => {
  return Math.round(value / nearest) * nearest;
};

export const floorToNearest = (value: number, nearest: number) => {
  return Math.floor(value / nearest) * nearest;
};
