export interface XYPoint<T = number> {
  x: number;
  y: T;
}

export interface ViewPoint {
  vx: number;
  vy: number;
}

export type PointAccessor<DataPoint> = (point: DataPoint, index: number, series: DataPoint[]) => XYPoint;

export enum DataScaleType {
  LINEAR,
}

export interface DataSeries<DataPoint> {
  name: string;
  sum?: number;
  data: DataPoint[];
}

export interface YValuesMatch {
  x: number;
  snapX: number;
  snapY: number;
  y: Record<string, number>;
}
