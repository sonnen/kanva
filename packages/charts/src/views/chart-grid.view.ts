import { Context, Paint, RequiredViewChanges, ViewCanvas } from '@kanva/core';
import { CanvasPosition, XYPoint } from '../chart.types';
import { AxisPoint, prepareAxisPoints } from '../utils';
import { ChartView, ChartViewProps } from './chart.view';

export enum GridLines {
  HORIZONTAL,
  VERTICAL,
  BOTH,
}

export interface ChartGridViewStyle {
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
    const scales = this.dataContainer.getScales(this.innerWidth, this.innerHeight);
    this.xAxis = prepareAxisPoints(
      this.dataContainer.getXAxisData(),
      scales.xScale,
    );
    this.yAxis = prepareAxisPoints(
      this.dataContainer.getYAxisData(),
      scales.yScale,
    );
  }

  getGridLines() {
    return this.gridLines;
  }

  setGridLines(gridLines: GridLines) {
    this.gridLines = gridLines;
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
      style: { paint },
      xAxis,
      yAxis,
    } = this;
    const ctx = canvas.context;
    const halfLineWidth = paint.lineWidth / 2;

    ctx.translate(paint.lineWidth / 2, paint.lineWidth / 2);
    ctx.beginPath();
    if (gridLines !== GridLines.HORIZONTAL) {
      for (let i = 0, l = xAxis.length; i < l; i++) {
        const position = xAxis[i].position;
        ctx.moveTo(position, 0);
        ctx.lineTo(position, innerHeight);
      }
    }
    if (gridLines !== GridLines.VERTICAL) {
      for (let i = 0, l = yAxis.length; i < l; i++) {
        const position = yAxis[i].position;
        ctx.moveTo(0, position);
        ctx.lineTo(innerWidth, position);
      }
    }
    canvas.drawPath(paint);
  }

  getCanvasPositionForPoint(point: XYPoint): CanvasPosition {
    // @TODO: implement when needed
    return { x: 0, y: 0, absoluteX: 0, absoluteY: 0 };
  }

  getPointForCanvasPosition(position: XYPoint): XYPoint {
    // @TODO: implement when needed
    return { x: 0, y: 0 };
  }
}
