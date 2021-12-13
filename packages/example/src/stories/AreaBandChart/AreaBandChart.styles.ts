import {
  AreaChartViewStyle,
  AxisViewStyle,
  ChartGridViewStyle,
  DataDisplayType,
  ChartZoomViewStyle,
} from '@kanva/charts';
import { Paint, Rect, rgba, TextAlign, TextBaseline } from '@kanva/core';

const labelColor = '#333333';

const xAxis: AxisViewStyle = {
  labelPaint: new Paint()
    .setFillStyle(labelColor)
    .setTextAlign(TextAlign.RIGHT)
    .setTextBaseline(TextBaseline.MIDDLE),
  wrapLabelsOnEdge: true,
};
const yAxis: AxisViewStyle = {
  labelPaint: new Paint()
    .setFillStyle(labelColor)
    .setTextAlign(TextAlign.CENTER)
    .setTextBaseline(TextBaseline.TOP),
  wrapLabelsOnEdge: true,
};

const chartGrid: ChartGridViewStyle = {
  paint: new Paint()
    .setStrokeStyle(rgba('#FFF', .2))
    .setLineWidth(1),
  centerPaint: new Paint()
    .setStrokeStyle(rgba('#FFF', .2))
    .setLineWidth(3),
};

const series: Record<string, AreaChartViewStyle> = {
  'Series 1': {
    type: DataDisplayType.BAND,
    paint: new Paint()
      .setStrokeStyle('#4a3865')
      .setFillStyle('rgba(74,56,101,0.7)')
      .setLineWidth(1.5),
  },
};

export const zoomArea: ChartZoomViewStyle = {
  paint: new Paint()
    .setFillStyle(rgba('#00b5dd', .3))
    .setStrokeStyle('#00b5dd'),
  borders: new Rect({ left: 2, right: 2, top: 0, bottom: 0 }),
};

export const styles = {
  xAxis,
  yAxis,
  series,
  chartGrid,
  zoomArea,
};
