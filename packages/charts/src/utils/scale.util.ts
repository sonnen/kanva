import { ScaleContinuousNumeric, scaleLinear } from 'd3-scale';
import { DataScaleType } from '../chart.types';

export const getContinuousNumericScale = (scaleType: DataScaleType): ScaleContinuousNumeric<number, number> => {
  switch (scaleType) {
    case DataScaleType.LINEAR:
    default:
      return scaleLinear();
  }
};
