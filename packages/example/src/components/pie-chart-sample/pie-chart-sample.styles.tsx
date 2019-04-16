import { PieChartViewStyle } from '@kanva/charts';
import { Paint, rgba } from '@kanva/core';

export enum Series {
  GRID = 'grid',
  PRODUCTION = 'production',
}

export const SeriesColors = {
  [Series.GRID]: '#FF57B3',
  [Series.PRODUCTION]: '#7dff91',
};

export const labelColor = '#171717';

export const pieChartStyle: PieChartViewStyle = {
  paints: {
    [Series.GRID]: new Paint()
      .setLineWidth(1)
      .setFillStyle(SeriesColors[Series.GRID]),
    [Series.PRODUCTION]: new Paint()
      .setLineWidth(2)
      .setFillStyle(SeriesColors[Series.PRODUCTION]),
  },
};

export const pieChartStyle2: PieChartViewStyle = {
  padding: 0.02,
  innerRadius: 1,
  paints: {
    [Series.GRID]: new Paint()
      .setLineWidth(10)
      .setStrokeStyle(SeriesColors[Series.GRID])
      .setLineRounding(true),
    [Series.PRODUCTION]: new Paint()
      .setLineWidth(10)
      .setStrokeStyle(SeriesColors[Series.PRODUCTION])
      .setLineRounding(true),
  },
};

export const pieChartStyle3: PieChartViewStyle = {
  padding: 0.02,
  innerRadius: 1,
  backgroundPaint: new Paint()
    .setLineWidth(5)
    .setStrokeStyle(rgba('#FFF', .2)),
  paints: {
    [Series.PRODUCTION]: new Paint()
      .setLineWidth(10)
      .setStrokeStyle(SeriesColors[Series.PRODUCTION])
      .setLineRounding(true),
  },
};
