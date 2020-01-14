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
    type: DataDisplayType.LINE,
    paint: new Paint()
      .setStrokeStyle('#4a3865')
      .setLineWidth(1.5),
  },
  'Series 2': {
    type: DataDisplayType.LINE_STAIRS,
    paint: new Paint()
      .setStrokeStyle('#ad274c')
      .setLineWidth(1.5),
  },
};

export const styles = {
  xAxis,
  yAxis,
  series,
  chartGrid,
};
