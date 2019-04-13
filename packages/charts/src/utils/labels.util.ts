import { Line, Paint, PaintOverrides, Point, TextAlign, TextBaseline, ViewCanvas } from '@kanva/core';
import { AxisLabelAccessor } from './axis.util';

export enum LabelPosition {
  START,
  CENTER,
  END,
  OUT,
}

export interface LabelOptions {
  labelsPaint: Paint;
  contrastLabelsPaint?: Paint;
  position: LabelPosition;
  labelAccessor: AxisLabelAccessor;
  padding?: number;
}

const labelPaintOverrides: PaintOverrides = {
  textBaseline: TextBaseline.BOTTOM,
  textAlign: TextAlign.CENTER,
};

const getTextPaint = (
  textPaint: Paint,
  contrastPaint: Paint | undefined,
  backgroundIsBright: boolean,
): Paint => !contrastPaint
  ? textPaint
  : backgroundIsBright === textPaint.isBright() ? contrastPaint : textPaint;

const drawLabelTemporaryPoint = new Point();
export const drawLabel = (
  canvas: ViewCanvas,
  value: number,
  index: number,
  line: Line,
  lineBackground: Paint,
  isBackgroundBright: boolean,
  {
    padding = 0,
    labelsPaint,
    contrastLabelsPaint,
    position,
    labelAccessor,
  }: LabelOptions,
) => {
  const textHeight = labelsPaint.font.fontSize;
  let x: number;
  let y: number;
  switch (position) {
    case LabelPosition.START:
      line.pointAt(0, drawLabelTemporaryPoint);
      break;
    case LabelPosition.END:
      line.pointAt(1, drawLabelTemporaryPoint);
      break;
    case LabelPosition.CENTER:
      line.pointAt(.5, drawLabelTemporaryPoint);
      break;
    case LabelPosition.OUT:
    default:
      line.pointAt(1, drawLabelTemporaryPoint);
      break;
  }
  x = drawLabelTemporaryPoint.x;
  y = drawLabelTemporaryPoint.y;
  const textInsideBar = line.length() >= textHeight + padding * 2;
  const textPaint = getTextPaint(
    labelsPaint,
    contrastLabelsPaint,
    textInsideBar ? lineBackground.isBright() : isBackgroundBright,
  );
  canvas.drawText(x, y, labelAccessor(value, index), textPaint, labelPaintOverrides);
};
