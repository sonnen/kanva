import { XYPoint } from '../chart.types';
import { findBestMatchInSortedArray, segmentizePoints } from './data.util';

describe('Data Util', () => {
  describe('#segmentizePoints()', () => {
    it('returns only one segment for continuous data', () => {
      const data: XYPoint<number | null>[] = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
        { x: 5, y: 5 },
      ];

      const result = segmentizePoints(data, null);

      expect(result.length).toEqual(1);
    });

    it('returns two segments for data with a null data gap', () => {
      const data: XYPoint<number | null>[] = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: null },
        { x: 4, y: 4 },
        { x: 5, y: 5 },
      ];

      const result = segmentizePoints(data, null);

      expect(result.length).toEqual(2);
    });

    it('returns three segments for data with two null data gaps', () => {
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

      const result = segmentizePoints(data, null);

      expect(result.length).toEqual(3);
    });

    it('handles leftmost null edge case', () => {
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

      const result = segmentizePoints(data, null);

      expect(result.length).toEqual(2);
    });

    it('handles rightmost null edge case', () => {
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

      const result = segmentizePoints(data, null);

      expect(result.length).toEqual(2);
    });

    it('returns proper data sets after breaking', () => {
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

      expect(segmentizePoints(data, null)).toEqual(expected);
    });
  });

  describe('#findBestMatchInSortedArray()', () => {
    it('correctly finds an element in an array', () => {
      const input = [-100, -99, -98, -50, -40, 0, 3, 7, 10, 22, 26, 33, 45, 77, 78, 79, 80, 81, 333];
      const matchNumber = (value: number) => (e: number) => e - value;

      for (const value of input) {
        expect(findBestMatchInSortedArray(input, matchNumber(value))).toEqual(value);
      }

      expect(findBestMatchInSortedArray(input, matchNumber(300))).toEqual(333);
      expect(findBestMatchInSortedArray(input, matchNumber(100))).toEqual(81);
      expect(findBestMatchInSortedArray(input, matchNumber(21))).toEqual(22);
      expect(findBestMatchInSortedArray(input, matchNumber(9000))).toEqual(333);
      expect(findBestMatchInSortedArray(input, matchNumber(1.5))).toEqual(3);
      expect(findBestMatchInSortedArray(input, matchNumber(-19.9999))).toEqual(0);
    });

    it('returns undefined when array is empty', () => {
      const matcher = jest.fn();
      expect(findBestMatchInSortedArray([], matcher)).toEqual(undefined);
      expect(matcher).toHaveBeenCalledTimes(0);
    });
  });
});
