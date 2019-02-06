import { roundToNearest } from './math.util';
import { ScaleFunction } from './scale.util';

export interface AxisPoint {
  value: string;
  position: number;
}

export type AxisLabelAccessor = (value: number, index: number) => string;

export interface AxisParameters {
  tickCount?: number;
  roundTo?: number;
  labelAccessor?: AxisLabelAccessor;
  useApproximateValues?: boolean;
  isGrouped?: boolean;
}

export const prepareAxisValues = (
  scale: ScaleFunction,
  params: AxisParameters,
  seriesLength: number = 10,
): AxisPoint[] => {
  const {
    labelAccessor = String,
    isGrouped,
    roundTo = 1,
    useApproximateValues,
    tickCount = seriesLength,
  } = params;

  if (useApproximateValues) {
    return scale.ticks(tickCount).map((tick, index) => ({
      value: labelAccessor(tick, index),
      position: tick,
    }));
  }

  const axis: AxisPoint[] = new Array(tickCount);
  const [min, max] = scale.domain();
  const tickDistance = (max - min) / (tickCount - 1);

  const groupMultiplier = isGrouped
    ? (value: number) => 0.5 + value * (tickCount - 1) / tickCount
    : (value: number) => value;

  for (let i = 0; i < tickCount; i++) {
    const rawValue = min + tickDistance * i;

    axis[i] = {
      value: labelAccessor(roundToNearest(rawValue, roundTo), i),
      position: groupMultiplier(rawValue),
    };
  }

  return axis;
};

export const prepareAxisPoints = (axisValues: AxisPoint[], scale: ScaleFunction): AxisPoint[] => {
  return axisValues.map(({ position, value }) => ({
    value,
    position: scale(position),
  }));

};
