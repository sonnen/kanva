import { AxisViewStyle, BarChartViewStyle } from '@kanva/charts';
import { Paint, TextAlign, TextBaseline } from '@kanva/core';

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
  barWidth: '80%',
  barRadius: 3,
  paints: {
    [Series.CONSUMPTION]: new Paint()
      .setFillStyle(SeriesColors[Series.CONSUMPTION]),
    [Series.PRODUCTION]: new Paint()
      .setFillStyle(SeriesColors[Series.PRODUCTION]),
  },
};

export const xAxisStyle: AxisViewStyle = {
  labelPaint: new Paint()
    .setTextAlign(TextAlign.START)
    .setTextBaseline(TextBaseline.MIDDLE)
    .setFillStyle(labelColor),
};

export const yAxisStyle: AxisViewStyle = {
  labelPaint: new Paint()
    .setTextAlign(TextAlign.END)
    .setTextBaseline(TextBaseline.BOTTOM)
    .setFillStyle(labelColor),
};
