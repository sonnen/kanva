import { PieChartViewStyle } from '@kanva/charts';
import { rgba } from '../../utils/color.utils';

export enum Series {
  GRID = 'grid',
  PRODUCTION = 'production',
}

export const SeriesColors = {
  [Series.GRID]: '#FF57B3',
  [Series.PRODUCTION]: '#7dff91',
};

export const LABEL_COLOR = '#171717';

export const pieChartStyle: PieChartViewStyle = {
  innerRadius: .7,
  series: {
    [Series.GRID]: {
      lineThickness: 1,
      fillColor: SeriesColors[Series.GRID],
    },
    [Series.PRODUCTION]: {
      lineThickness: 2,
      fillColor: SeriesColors[Series.PRODUCTION],
    },
  },
};

export const pieChartStyle2: PieChartViewStyle = {
  padding: 0.02,
  series: {
    [Series.GRID]: {
      lineThickness: 10,
      lineCap: 'round',
      strokeColor: SeriesColors[Series.GRID],
    },
    [Series.PRODUCTION]: {
      lineThickness: 10,
      lineCap: 'round',
      strokeColor: SeriesColors[Series.PRODUCTION],
    },
  },
};

export const pieChartStyle3: PieChartViewStyle = {
  padding: 0.02,
  strokeColor: rgba('#FFF', .2),
  lineThickness: 10,
  series: {
    [Series.PRODUCTION]: {
      lineThickness: 10,
      lineCap: 'round',
      strokeColor: SeriesColors[Series.PRODUCTION],
    },
  },
};
