import { XYPoint } from '../chart.types';

export const isXYArray = (data: any): data is XYPoint[] =>
  Array.isArray(data) && (data.length === 0 || (data[0].x !== undefined && data[0].y !== undefined));

export const mergeXY = (x: number[], y: number[]): XYPoint[] => {
  const result = new Array(x.length);
  for (let i = 0, l = x.length; i < l; i++) {
    result[i] = { x: x[i], y: y[i] };
  }
  return result;
};
