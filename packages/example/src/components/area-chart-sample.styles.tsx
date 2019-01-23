import { AreaChartViewStyle, AxisViewStyle, DataDisplayType } from '@kanva/charts';
import { TextAlign, TextBaseline } from '@kanva/core';
import { rgba } from '../utils/color.utils';

export enum Series {
  CONSUMPTION = 'consumption',
  PRODUCTION = 'production',
  DIRECT_USAGE = 'directUsage',
  BATTERY_STATE = 'battery',
}

export const SeriesColors = {
  [Series.CONSUMPTION]: '#4CCFEF',
  [Series.PRODUCTION]: '#FFC843',
  [Series.DIRECT_USAGE]: '#56FFA2',
  [Series.BATTERY_STATE]: '#FF57B3',
};

export const LABEL_COLOR = '#FFFFFF';

export const SeriesStyles: Record<Series, AreaChartViewStyle> = {
  [Series.CONSUMPTION]: {
    type: DataDisplayType.LINE,
    lineThickness: 1,
    strokeColor: SeriesColors[Series.CONSUMPTION],
  },
  [Series.PRODUCTION]: {
    type: DataDisplayType.POINTS,
    lineThickness: 2,
    fillColor: SeriesColors[Series.PRODUCTION],
  },
  [Series.DIRECT_USAGE]: {
    type: DataDisplayType.AREA,
    lineThickness: 1,
    strokeColor: SeriesColors[Series.DIRECT_USAGE],
    fillColor: rgba(SeriesColors[Series.DIRECT_USAGE], .5),
  },
  [Series.BATTERY_STATE]: {
    type: DataDisplayType.LINE,
    lineThickness: 1,
    strokeColor: SeriesColors[Series.BATTERY_STATE],
  },
};

export const xAxisStyle: AxisViewStyle = {
  textColor: LABEL_COLOR,
  textAlign: TextAlign.START,
  textBaseline: TextBaseline.MIDDLE,
};

export const yAxisStyle: AxisViewStyle = {
  textColor: LABEL_COLOR,
  textAlign: TextAlign.END,
  textBaseline: TextBaseline.BOTTOM,
};
