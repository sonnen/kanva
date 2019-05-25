import { XYPoint } from '../chart.types';

// @TODO: Try better typing
export const segmentizePoints = <In, Filter, Out = In extends Filter ? never : In>(
  data: XYPoint<In>[],
  filterBy: Filter,
): XYPoint<Out>[][] => {
  const dataSegments: XYPoint<Out>[][] = [];

  let firstIndex: number | undefined;
  let lastIndex: number | undefined;

  for (let i = 0, l = data.length; i < l; i++) {
    if (firstIndex === undefined && data[i].y !== (filterBy as any)) {
      firstIndex = i;
    } else if (firstIndex !== undefined && lastIndex === undefined && data[i].y === (filterBy as any)) {
      lastIndex = i;
    } else if (i === l - 1) {
      lastIndex = i + 1;
    }

    if (firstIndex !== undefined && lastIndex !== undefined && firstIndex !== lastIndex) {
      dataSegments.push(data.slice(firstIndex, lastIndex) as any as XYPoint<Out>[]);
      firstIndex = lastIndex = undefined;
    }
  }

  if (dataSegments.length === 0) {
    dataSegments.push(data as any as XYPoint<Out>[]);
  }

  return dataSegments;
};

export const findBestMatchInSortedArray = <T>(
  array: T[],
  matcher: (element: T, index: number) => number,
): T | undefined => {
  if (!array || !array.length) {
    return undefined;
  }
  let nearestMatchDistance: number = Infinity;
  let nearestMatch: T | undefined;
  for (let l = 0, r = array.length - 1; l <= r;) {
    const i = Math.floor((l + r) / 2);
    const distance = matcher(array[i], i);

    if (Math.abs(distance) < Math.abs(nearestMatchDistance)) {
      nearestMatchDistance = distance;
      nearestMatch = array[i];
    }

    if (distance === 0 || l >= r) {
      break;
    } else if (distance > 0) {
      r = i - 1;
    } else {
      l = i + 1;
    }
  }
  return nearestMatch;
};
