import { AxisViewStyle } from '@kanva/charts';
import { Paint, TextAlign, TextBaseline } from '@kanva/core';

const labelColor = '#333333';

const xAxis: AxisViewStyle = {
  labelPaint: new Paint()
    .setFillStyle(labelColor)
    .setTextAlign(TextAlign.RIGHT)
    .setTextBaseline(TextBaseline.MIDDLE),
  wrapLabelsOnEdge: true,
};

export const styles = {
  xAxis,
  labelColor,
}