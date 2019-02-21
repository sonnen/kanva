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

    if (firstIndex !== undefined && lastIndex !== undefined) {
      dataSegments.push(data.slice(firstIndex, lastIndex) as any as XYPoint<Out>[]);
      firstIndex = lastIndex = undefined;
    }
  }

  if (dataSegments.length === 0) {
    dataSegments.push(data as any as XYPoint<Out>[]);
  }

  return dataSegments;
};
