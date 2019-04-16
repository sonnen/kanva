import { Context, Paint, ViewCanvas } from '@kanva/core';
import { CanvasPosition, XYPoint } from '../chart.types';
import { ChartView, ChartViewProps } from './chart.view';

export interface PieChartViewStyle {
  innerRadius?: number;
  padding?: number;
  backgroundPaint?: Paint;
  paints: Record<string, Paint>;
}

export interface PieChartViewProps extends ChartViewProps<PieChartViewStyle> {
}

const defaultStyle: PieChartViewStyle = {
  paints: {},
  backgroundPaint: new Paint()
    .setLineWidth(1.5),
  innerRadius: 0,
  padding: 0,
};

export class PieChartView<DataPoint> extends ChartView<PieChartViewProps> {
  constructor(context: Context) {
    super(context, 'PieChartView', defaultStyle);
  }

  onDraw(canvas: ViewCanvas) {
    const { innerWidth, innerHeight, dataSeries, dataContainer, style } = this;
    if (!dataContainer) {
      return;
    }

    const allSeries = dataContainer.getAllDataSeries();
    const total = dataContainer.getTotal();
    const ctx = canvas.context;
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    const radius = Math.min(centerX, centerY);
    const inner = style.innerRadius || 0;
    const outerRadius = Math.max(0, radius - (style.backgroundPaint ? style.backgroundPaint.lineWidth / 2 : 0));
    const innerRadius = Math.max(0, inner <= 1 ? inner * outerRadius : inner);
    const pi2 = Math.PI * 2;
    const padding = style.padding || 0;

    let maxRingThickness = 0;
    for (let i = 0, l = allSeries.length; i < l; i++) {
      const s = style.paints[allSeries[i].name] || Paint.DEFAULT;
      const lineThickness = s.lineWidth || 0;
      if (maxRingThickness < lineThickness) {
        maxRingThickness = lineThickness;
      }
    }

    // Draw background circle
    if (style.backgroundPaint) {
      const ringThickness = style.backgroundPaint.lineWidth || 0;
      const ringShift = (maxRingThickness - ringThickness) / 2;
      const outer = Math.max(0, outerRadius - ringShift);
      const inner = Math.min(outer, Math.max(0, innerRadius - ringShift));

      ctx.beginPath();
      if (inner > 0) {
        ctx.arc(centerX, centerY, inner, pi2, 0, true);
      } else {
        ctx.moveTo(centerX, centerY);
      }
      ctx.arc(centerX, centerY, outer, 0, pi2, false);
      ctx.closePath();
      canvas.drawPath(style.backgroundPaint);
    }

    // Draw series (1 series = sum of all of it's Y values)
    const pad = padding * 0.5 * pi2;
    let angle = -.25 * pi2;
    for (let i = 0, l = allSeries.length; i < l; i++) {
      const series = allSeries[i];
      const paint = style.paints[series.name] || Paint.DEFAULT;
      const start = angle;
      const slice = series.sum! / total;
      const end = start + slice * pi2;
      const halfLineThickness = (paint.lineWidth || 0) / 2;
      const outerRadius = Math.max(0, radius - halfLineThickness);
      const ringThickness = paint.lineWidth || 0;
      const ringShift = (maxRingThickness - ringThickness) / 2;

      // Assume that padding can't be bigger than half of the whole arc area
      const maxPad = Math.min((end - start) / 4, pad);
      const outer = Math.max(0, outerRadius - ringShift);
      const inner = Math.min(outer, Math.max(0, innerRadius - ringShift));
      ctx.beginPath();

      if (inner > 0) {
        ctx.arc(centerX, centerY, inner, end - maxPad, start + maxPad, true);
      } else {
        ctx.moveTo(centerX, centerY);
      }
      ctx.arc(centerX, centerY, outer, start + maxPad, end - maxPad, false);
      ctx.closePath();

      angle = end;
      canvas.drawPath(paint);
    }
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
