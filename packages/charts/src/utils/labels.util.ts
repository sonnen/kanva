import {
  Line,
  normalizeRadius,
  Paint,
  PaintOverrides,
  Point,
  RadiusInput,
  TextAlign,
  TextBaseline,
  ViewCanvas,
} from '@kanva/core';
import { AxisLabelAccessor } from './axis.util';

export enum LabelPosition {
  START,
  CENTER,
  END,
  OUT,
}

export interface LabelOptions {
  labelsPaint: Paint;
  backgroundPaint?: Paint;
  contrastLabelsPaint?: Paint;
  contrastBackgroundPaint?: Paint;
  position: LabelPosition;
  labelAccessor: AxisLabelAccessor;
  padding?: number;
  margin?: number;
  backgroundRadius?: RadiusInput;
}

const labelPaintOverrides: PaintOverrides = {
  textBaseline: TextBaseline.BOTTOM,
  textAlign: TextAlign.CENTER,
};

const getPaint = <P extends Paint | undefined>(
  paint: P,
  contrastPaint: P | undefined,
  backgroundIsBright: boolean,
): P => paint && (
  !contrastPaint
    ? paint
    : backgroundIsBright === paint.isBright() ? contrastPaint : paint
);

export class LabelsHelper {
  private readonly temporaryPoint = new Point();
  private readonly temporaryLine = new Line();
  private options?: LabelOptions;
  private fillRadius = normalizeRadius(0);

  getOptions() {
    return this.options;
  }

  setOptions(options: LabelOptions) {
    this.options = options;
    this.fillRadius = normalizeRadius(options.backgroundRadius);
  }

  draw(
    canvas: ViewCanvas,
    value: number,
    index: number,
    line: Line,
    lineBackground: Paint,
    isBackgroundBright: boolean,
  ) {
    if (!this.options) {
      throw new Error('LabelsHelper requires "options" to be present in order to draw labels.');
    }

    const {
      padding = 0,
      margin = 0,
      labelsPaint,
      backgroundPaint,
      contrastLabelsPaint,
      contrastBackgroundPaint,
      position,
      labelAccessor,
    } = this.options;
    const { temporaryPoint, temporaryLine, fillRadius } = this;
    const textHeight = labelsPaint.font.fontSize;
    const spacing = padding + margin;

    line.cloneTo(temporaryLine);

    switch (position) {
      case LabelPosition.START:
        temporaryLine
          .move(spacing)
          .extend(-2 * spacing - (line.startY < line.endY ? textHeight : 0))
          .pointAt(0, temporaryPoint);
        break;
      case LabelPosition.END:
        temporaryLine
          .move(padding)
          .extend(-2 * spacing - (line.startY > line.endY ? textHeight : 0))
          .pointAt(1, temporaryPoint);
        break;
      case LabelPosition.CENTER:
        temporaryLine
          .move(padding)
          .extend(-2 * spacing + textHeight * (line.startY < line.endY ? 1.5 : -.5))
          .pointAt(.5, temporaryPoint);
        break;
      case LabelPosition.OUT:
      default:
        temporaryLine
          .extend(spacing + (line.startY < line.endY ? textHeight : 0))
          .pointAt(1, temporaryPoint);
        break;
    }
    let { x, y } = temporaryPoint;
    const textInsideBar = position !== LabelPosition.OUT && temporaryLine.length() >= textHeight + padding * 2;
    if (!textInsideBar && position !== LabelPosition.OUT) {
      line.cloneTo(temporaryLine)
        .extend(padding + margin + (line.startY < line.endY ? textHeight : 0))
        .pointAt(1, temporaryPoint);
      x = temporaryPoint.x;
      y = temporaryPoint.y;
    }

    const backgroundIsBright = textInsideBar ? lineBackground.isBright() : isBackgroundBright;
    const textPaint = getPaint(labelsPaint, contrastLabelsPaint, backgroundIsBright);
    const blockPaint = textPaint === labelsPaint ? backgroundPaint : contrastBackgroundPaint;
    const text = labelAccessor(value, index);

    if (blockPaint) {
      const { width } = canvas.measureText(text, textPaint);
      canvas.context.beginPath();
      canvas.roundRect(
        x - width / 2 - padding,
        y - textHeight - padding,
        width + 2 * padding,
        textHeight + 2 * padding,
        fillRadius,
      );
      canvas.drawPath(blockPaint);
    }
    canvas.drawText(x, y, text, textPaint, labelPaintOverrides);
  }
}
