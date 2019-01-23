export interface XYPoint {
  x: number;
  y: number;
}

export interface ViewPoint {
  vx: number;
  vy: number;
}

export interface AxisPoint {
  value: string;
  position: number;
}

export type PointAccessor = <DataPoint>(point: DataPoint, index: number, series: DataPoint[]) => XYPoint;
export type AxisLabelAccessor = (value: number, index: number) => string;

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
  data: DataPoint[];
}
