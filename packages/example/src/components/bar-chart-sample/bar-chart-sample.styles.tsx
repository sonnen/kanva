import { AxisViewStyle, BarChartViewStyle } from '@kanva/charts';
import { TextAlign, TextBaseline } from '@kanva/core';

export enum Series {
  CONSUMPTION = 'consumption',
  PRODUCTION = 'production',
}

export const SeriesColors = {
  [Series.CONSUMPTION]: '#FF57B3',
  [Series.PRODUCTION]: '#7DFF91',
};

export const labelColor = '#FFF';

export const barChartStyle: BarChartViewStyle = {
  barWidth: .8,
  barRadius: 3,
  series: {
    [Series.CONSUMPTION]: {
      fillStyle: SeriesColors[Series.CONSUMPTION],
    },
    [Series.PRODUCTION]: {
      fillStyle: SeriesColors[Series.PRODUCTION],
    },
  },
};

export const xAxisStyle: AxisViewStyle = {
  fillStyle: labelColor,
  textAlign: TextAlign.CENTER,
  textBaseline: TextBaseline.MIDDLE,
};

export const yAxisStyle: AxisViewStyle = {
  fillStyle: labelColor,
  textAlign: TextAlign.END,
  textBaseline: TextBaseline.BOTTOM,
};
