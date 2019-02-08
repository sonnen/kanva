export interface XYPoint {
  x: number;
  y: number;
}

export interface ViewPoint {
  vx: number;
  vy: number;
}

export type PointAccessor<DataPoint> = (point: DataPoint, index: number, series: DataPoint[]) => XYPoint;

export enum DataDisplayType {
  POINTS,
  LINE,
  AREA,
}

export enum DataScaleType {
  LINEAR,
}

export interface DataSeries<DataPoint> {
  name: string;
  sum?: number;
  data: DataPoint[];
}
