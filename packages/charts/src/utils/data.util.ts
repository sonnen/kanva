import { XYPoint } from '../chart.types';

// @TODO: Name it properly
export const filterByAndBreakIntoDataSegments = (data: XYPoint<any>[], filterBy = null) => {
  const dataSegments: XYPoint[][] = [];

  let firstIndex = null;
  let lastIndex = null;

  for (let i = 0, l = data.length; i < l; i++) {
    if (firstIndex === null && data[i].y !== filterBy) {
      firstIndex = i;
    } else if (firstIndex !== null && lastIndex === null && data[i].y === filterBy) {
      lastIndex = i;
    } else if (i === l - 1) {
      lastIndex = i + 1;
    }

    if (firstIndex !== null && lastIndex !== null) {
      dataSegments.push(data.slice(firstIndex, lastIndex));
      firstIndex = lastIndex = null;
    }
  }

  if (dataSegments.length === 0) {
    dataSegments.push(data);
  }

  return dataSegments;
};
