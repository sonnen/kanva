import { AxisViewStyle, BarChartViewStyle } from '@kanva/charts';
import { TextAlign, TextBaseline } from '@kanva/core';

export enum Series {
  CONSUMPTION = 'consumption',
  PRODUCTION = 'production',
}

export const SeriesColors = {
  [Series.CONSUMPTION]: '#FF57B3',
  [Series.PRODUCTION]: '#7dff91',
};

export const LABEL_COLOR = '#FFF';

export const barChartStyle: BarChartViewStyle = {
  barWidth: .8,
  barRadius: 3,
  series: {
    [Series.CONSUMPTION]: {
      fillColor: SeriesColors[Series.CONSUMPTION],
    },
    [Series.PRODUCTION]: {
      fillColor: SeriesColors[Series.PRODUCTION],
    },
  },
};

export const xAxisStyle: AxisViewStyle = {
  textColor: LABEL_COLOR,
  textAlign: TextAlign.CENTER,
  textBaseline: TextBaseline.MIDDLE,
};

export const yAxisStyle: AxisViewStyle = {
  textColor: LABEL_COLOR,
  textAlign: TextAlign.END,
  textBaseline: TextBaseline.BOTTOM,
};
