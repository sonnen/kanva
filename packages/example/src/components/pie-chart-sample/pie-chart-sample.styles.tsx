import { PieChartViewStyle } from '@kanva/charts';
import { rgba } from '@kanva/core';

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
  innerRadius: .7,
  series: {
    [Series.GRID]: {
      lineWidth: 1,
      fillStyle: SeriesColors[Series.GRID],
    },
    [Series.PRODUCTION]: {
      lineWidth: 2,
      fillStyle: SeriesColors[Series.PRODUCTION],
    },
  },
};

export const pieChartStyle2: PieChartViewStyle = {
  padding: 0.02,
  lineRounding: true,
  series: {
    [Series.GRID]: {
      lineWidth: 10,
      strokeStyle: SeriesColors[Series.GRID],
    },
    [Series.PRODUCTION]: {
      lineWidth: 10,
      strokeStyle: SeriesColors[Series.PRODUCTION],
    },
  },
};

export const pieChartStyle3: PieChartViewStyle = {
  padding: 0.02,
  strokeStyle: rgba('#FFF', .2),
  lineWidth: 5,
  lineRounding: true,
  series: {
    [Series.PRODUCTION]: {
      lineWidth: 10,
      strokeStyle: SeriesColors[Series.PRODUCTION],
    },
  },
};
