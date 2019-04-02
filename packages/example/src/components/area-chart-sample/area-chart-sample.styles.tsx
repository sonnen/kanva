import {
  AreaChartViewStyle,
  AxisViewStyle,
  ChartGridViewStyle,
  DataDisplayType,
  LineChartViewStyle,
} from '@kanva/charts';
import { rgba, TextAlign, TextBaseline } from '@kanva/core';

export enum Series {
  CONSUMPTION = 'consumption',
  PRODUCTION = 'production',
  DIRECT_USAGE = 'directUsage',
  BATTERY_STATE = 'battery',
  HEATER_POWER = 'heaterPower',
}

export const SeriesColors = {
  [Series.CONSUMPTION]: '#4CCFEF',
  [Series.PRODUCTION]: '#FFC843',
  [Series.DIRECT_USAGE]: '#56FFA2',
  [Series.BATTERY_STATE]: '#FF57B3',
  [Series.HEATER_POWER]: '#EEEEEE',
};

export const labelColor = '#FFFFFF';
export const baseTickCount = 9;

export const SeriesStyles = {
  [Series.CONSUMPTION]: {
    type: DataDisplayType.LINE_STAIRS,
    lineWidth: 1,
    strokeStyle: SeriesColors[Series.CONSUMPTION],
  } as AreaChartViewStyle,
  [Series.PRODUCTION]: {
    type: DataDisplayType.POINTS,
    lineWidth: 2,
    fillStyle: SeriesColors[Series.PRODUCTION],
  } as AreaChartViewStyle,
  [Series.DIRECT_USAGE]: {
    type: DataDisplayType.AREA,
    lineWidth: 1,
    strokeStyle: SeriesColors[Series.DIRECT_USAGE],
    fillStyle: rgba(SeriesColors[Series.DIRECT_USAGE], .7),
  } as AreaChartViewStyle,
  [Series.BATTERY_STATE]: {
    type: DataDisplayType.LINE,
    lineWidth: 1,
    strokeStyle: SeriesColors[Series.BATTERY_STATE],
  } as AreaChartViewStyle,
  [Series.HEATER_POWER]: {
    lineWidth: 8,
    backgroundLineWidth: 4,
    radius: 4,
    backgroundRadius: 8,
    fillStyle: SeriesColors[Series.HEATER_POWER],
    backgroundFillStyle: '#AAA',
  } as LineChartViewStyle,
};

export const xAxisStyle: AxisViewStyle = {
  fillStyle: labelColor,
  textAlign: TextAlign.START,
  textBaseline: TextBaseline.MIDDLE,
};

export const yAxisStyle: AxisViewStyle = {
  fillStyle: labelColor,
  textAlign: TextAlign.END,
  textBaseline: TextBaseline.BOTTOM,
};

export const chartGridStyle: ChartGridViewStyle = {
  strokeStyle: rgba('#FFF', .2),
  lineWidth: 1,
};
