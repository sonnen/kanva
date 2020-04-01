import { Context, Paint, RequiredViewChanges, ViewCanvas } from '@kanva/core';
import { CanvasPosition, XYPoint } from '../chart.types';
import { AxisPoint } from '../utils';
import { ChartView, ChartViewProps } from './chart.view';

export enum GridLines {
  HORIZONTAL,
  VERTICAL,
  BOTH,
}

export interface ChartGridViewStyle {
  centerPaint?: Paint;
  paint: Paint;
}

export interface ChartGridViewProps extends ChartViewProps<ChartGridViewStyle> {
  gridLines: GridLines;
}

const defaultStyle = {
  paint: new Paint()
    .setStrokeStyle('#000')
    .setLineWidth(1),
};

export class ChartGridView extends ChartView<ChartGridViewProps> {
  private gridLines: GridLines = GridLines.BOTH;
  private center: XYPoint = { x: 0, y: 0 };
  // Calculated values
  private xAxis: AxisPoint[] = [];
  private yAxis: AxisPoint[] = [];

  constructor(context: Context) {
    super(context, 'ChartGridView', defaultStyle);
  }

  onLayout(): void {
    if (!this.dataContainer) {
      this.xAxis = this.yAxis = [];
      return;
    }
    this.xAxis = this.dataContainer.getXAxisData();
    this.yAxis = this.dataContainer.getYAxisData();
  }

  getGridLines() {
    return this.gridLines;
  }

  setGridLines(gridLines: GridLines) {
    this.gridLines = gridLines;
    this.require(RequiredViewChanges.DRAW);
  }

  getCenterPoint() {
    return this.center;
  }

  setCenterPoint(center: XYPoint) {
    if (!center) {
      return;
    }
    this.center = center;
    this.require(RequiredViewChanges.DRAW);
  }

  getStyle() {
    return this.style;
  }

  setStyle(style: ChartGridViewStyle | undefined) {
    this.style = style || defaultStyle;
    this.require(RequiredViewChanges.DRAW);
  }

  onDraw(canvas: ViewCanvas) {
    const {
      gridLines,
      innerWidth, innerHeight,
      dataContainer,
      center,
      style: { paint, centerPaint },
      xAxis,
      yAxis,
    } = this;

    if (!dataContainer) {
      return;
    }

    const ctx = canvas.context;
    const halfLineWidth = paint.lineWidth / 2;

    const { xScale, yScale } = dataContainer.getScales(this.innerWidth, this.innerHeight);
    const { x, y } = center;

    ctx.translate(halfLineWidth, halfLineWidth);
    ctx.beginPath();
    if (gridLines !== GridLines.HORIZONTAL) {
      for (let i = 0, l = xAxis.length; i < l; i++) {
        const position = xAxis[i].position;
        const scaledPosition = xScale(position);

        if (position === x) {
          canvas.drawPath(paint);
          ctx.beginPath();
        }

        ctx.moveTo(scaledPosition, 0);
        ctx.lineTo(scaledPosition, innerHeight);

        if (position === x) {
          canvas.drawPath(centerPaint || paint);
          ctx.beginPath();
        }
      }
    }
    if (gridLines !== GridLines.VERTICAL) {
      for (let i = 0, l = yAxis.length; i < l; i++) {
        const position = yAxis[i].position;
        const scaledPosition = yScale(position);

        if (position === y) {
          canvas.drawPath(paint);
          ctx.beginPath();
        }

        ctx.moveTo(0, scaledPosition);
        ctx.lineTo(innerWidth, scaledPosition);

        if (position === y) {
          canvas.drawPath(centerPaint || paint);
          ctx.beginPath();
        }
      }
    }
    canvas.drawPath(paint);
  }

  getCanvasPositionForPoint(point: XYPoint<number>): CanvasPosition {
    const { xScale, yScale } = this.getScales();
    const x = xScale(point.x);
    const y = yScale(point.y);
    return {
      x,
      y,
      absoluteX: this.offsetRect.l + x,
      absoluteY: this.offsetRect.t + y,
    };
  }
  getPointForCanvasPosition(position: XYPoint<number>): XYPoint<number> | undefined {
    const { xScale, yScale } = this.getScales();
    return {
      x: xScale.invert(position.x),
      y: yScale.invert(position.y),
    };
  }
}
