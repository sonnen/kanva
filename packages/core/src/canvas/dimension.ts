import { isNil } from 'lodash';

export enum DimensionType {
  RELATIVE,
  PERCENT,
  PX,
}

export interface Dimension {
  type: DimensionType;
  value: number;
}

export const MATCH_PARENT = -1;
export const WRAP_CONTENT = -2;

export type DimensionInput = string | number | undefined | null;

export const parseDimension = (value: DimensionInput): Dimension => {
  if (isNil(value)) {
    return { type: DimensionType.PX, value: 0 };
  }
  if (typeof value === 'number') {
    return value < 0
      ? { type: DimensionType.RELATIVE, value }
      : { type: DimensionType.PX, value: Math.round(value) };
  }
  const match = value.match(/^([-+]?)(\d*\.?\d+)(?:(px)|(%))$/);
  if (!match) {
    throw new Error(`Invalid dimension '${value}'. Enter a valid value, i.e. 100px or 50%.`);
  }
  const [, sign, numericValue, isPx, isPercent] = match;
  if (sign === '-') {
    throw new Error(`Invalid dimension '${value}'. Dimension can not be negative.`);
  }
  if (isPx) {
    return { type: DimensionType.PX, value: Math.round(parseFloat(numericValue)) };
  } else if (isPercent) {
    return { type: DimensionType.PERCENT, value: parseFloat(numericValue) / 100 };
  }
  throw new Error(`Invalid dimension '${value}'.`);
};

export const calcDimension = (dimension: Dimension, parentDimension: number) => {
  switch (dimension.type) {
    case DimensionType.PERCENT:
      return Math.round(parentDimension * dimension.value);
    case DimensionType.RELATIVE:
      if (dimension.value === MATCH_PARENT) {
        return parentDimension;
      }
      return undefined;
    case DimensionType.PX:
    default:
      return dimension.value;
  }
};
