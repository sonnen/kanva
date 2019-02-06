import { ScaleContinuousNumeric, scaleLinear } from 'd3-scale';
import { DataScaleType } from '../chart.types';

export interface ScaleFunction {
  (input: number): number;

  ticks(count: number): number[];

  domain(): number[];

  domain(values: any[]): this;

  range(): number[];

  range(values: number[]): this;
}

export const getContinuousNumericScale = (scaleType: DataScaleType): ScaleContinuousNumeric<number, number> => {
  switch (scaleType) {
    case DataScaleType.LINEAR:
    default:
      return scaleLinear();
  }
};
