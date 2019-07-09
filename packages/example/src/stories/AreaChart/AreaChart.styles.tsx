import { AreaChartViewStyle, AxisViewStyle, ChartGridViewStyle, DataDisplayType } from '@kanva/charts';
import { Paint, rgba, TextAlign, TextBaseline } from '@kanva/core';

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
    type: DataDisplayType.AREA,
    paint: new Paint()
      .setStrokeStyle('#4a3865')
      .setFillStyle('rgba(74,56,101,0.7)')
      .setLineWidth(1.5),
  },
  'Series 2': {
    type: DataDisplayType.AREA,
    paint: new Paint()
      .setStrokeStyle('#ad274c')
      .setFillStyle('rgba(173,39,76,0.7)')
      .setLineWidth(1.5),
  },
};

export const styles = {
  xAxis,
  yAxis,
  series,
  chartGrid,
};
