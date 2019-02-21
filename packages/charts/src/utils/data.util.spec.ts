import { XYPoint } from '../chart.types';
import { filterByAndBreakIntoDataSegments } from './data.util';

describe('Data Util', () => {
  it('should return only one segment for continuous data', () => {
    const data: XYPoint<number | null>[] = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
      { x: 5, y: 5 },
    ];

    const result = filterByAndBreakIntoDataSegments(data);

    expect(result.length).toEqual(1);
  });

  it('should return two segments for data with a null data gap', () => {
    const data: XYPoint<number | null>[] = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: null },
      { x: 4, y: 4 },
      { x: 5, y: 5 },
    ];

    const result = filterByAndBreakIntoDataSegments(data);

    expect(result.length).toEqual(2);
  });

  it('should return three segments for data with two null data gaps', () => {
    const data: XYPoint<number | null>[] = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: null },
      { x: 4, y: 4 },
      { x: 5, y: 5 },
      { x: 6, y: null },
      { x: 7, y: 7 },
      { x: 8, y: 8 },
    ];

    const result = filterByAndBreakIntoDataSegments(data);

    expect(result.length).toEqual(3);
  });

  it('should handle leftmost null edge case', () => {
    const data: XYPoint<number | null>[] = [
      { x: 1, y: null },
      { x: 2, y: null },
      { x: 3, y: null },
      { x: 4, y: 4 },
      { x: 5, y: 5 },
      { x: 6, y: null },
      { x: 7, y: 7 },
      { x: 8, y: 8 },
    ];

    const result = filterByAndBreakIntoDataSegments(data);

    expect(result.length).toEqual(2);
  });

  it('should handle rightmost null edge case', () => {
    const data: XYPoint<number | null>[] = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: null },
      { x: 4, y: 4 },
      { x: 5, y: 5 },
      { x: 6, y: null },
      { x: 7, y: null },
      { x: 8, y: null },
    ];

    const result = filterByAndBreakIntoDataSegments(data);

    expect(result.length).toEqual(2);
  });

  it('should return proper data sets after breaking', () => {
    const data: XYPoint<number | null>[] = [
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: null },
      { x: 4, y: 4 },
      { x: 5, y: 5 },
      { x: 6, y: null },
      { x: 7, y: null },
      { x: 8, y: null },
      { x: 9, y: 9 },
      { x: 10, y: 10 },
      { x: 11, y: 11 },
      { x: 12, y: 12 },
      { x: 13, y: 13 },
      { x: 14, y: 14 },
      { x: 15, y: null },
      { x: 16, y: null },
      { x: 17, y: 17 },
      { x: 18, y: 18 },
    ];

    const expected = [
      [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ],
      [
        { x: 4, y: 4 },
        { x: 5, y: 5 },
      ],
      [
        { x: 9, y: 9 },
        { x: 10, y: 10 },
        { x: 11, y: 11 },
        { x: 12, y: 12 },
        { x: 13, y: 13 },
        { x: 14, y: 14 },
      ],
      [
        { x: 17, y: 17 },
        { x: 18, y: 18 },
      ],
    ];

    expect(filterByAndBreakIntoDataSegments(data)).toEqual(expected);
  });
});
