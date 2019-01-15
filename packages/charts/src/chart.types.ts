export interface XYPoint {
  x: number;
  y: number;
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

export interface DataSeries {
  data: XYPoint[];
}

export interface DataSeriesStyle {
  type: DataDisplayType;
  strokeColor?: string;
  lineThickness?: number;
  fillColor?: string;
}
