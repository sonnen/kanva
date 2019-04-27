import { isNil } from 'lodash';

export enum DimensionType {
  PERCENT,
  PX,
}

export interface Dimension {
  type: DimensionType;
  value: number;
}

export type DimensionInput = string | number | undefined | null;

export const parseDimension = (value: DimensionInput): Dimension => {
  if (isNil(value)) {
    return { type: DimensionType.PX, value: 0 };
  }
  if (typeof value === 'number') {
    return { type: DimensionType.PX, value: Math.round(value) };
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
