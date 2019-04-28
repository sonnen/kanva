import { Context, Line, Paint, ViewCanvas } from '@kanva/core';
import { CanvasPosition, DataSeries, XYPoint } from '../chart.types';
import { LabelOptions, LabelsHelper } from '../utils';
import { ChartView, ChartViewProps } from './chart.view';

interface PieChartFragmentChunk {
  radius: number;
  startAngle: number;
  endAngle: number;
}

interface PieFragment {
  paint: Paint;
  inner?: PieChartFragmentChunk;
  outer: PieChartFragmentChunk;
  labelLine: Line;
  value: number;
}

interface BackgroundLayout {
  inner: number;
  outer: number;
}

interface PieChartLayout {
  centerX: number;
  centerY: number;
  background?: BackgroundLayout;
}

export interface PieChartViewStyle {
  innerRadius?: number;
  padding?: number;
  backgroundPaint?: Paint;
  paints: Record<string, Paint>;
}

export interface PieChartViewProps extends ChartViewProps<PieChartViewStyle> {
  labelOptions: LabelOptions;
}

const defaultStyle: PieChartViewStyle = {
  paints: {},
  backgroundPaint: new Paint()
    .setLineWidth(1.5),
  innerRadius: 0,
  padding: 0,
};

export class PieChartView<DataPoint> extends ChartView<PieChartViewProps> {
  private readonly labelsHelper = new LabelsHelper();
  // Internal layout params
  private pieLayout?: PieChartLayout;
  private pieFragments: PieFragment[] = [];

  constructor(context: Context) {
    super(context, 'PieChartView', defaultStyle);
  }

  getLabelOptions() {
    return this.labelsHelper.getOptions();
  }

  setLabelOptions(labels: LabelOptions) {
    this.labelsHelper.setOptions(labels);
  }

  onLayout(): void {
    const { innerWidth, innerHeight, dataSeries, dataContainer, style } = this;
    if (!dataContainer) {
      return;
    }

    const allSeries = dataContainer.getAllDataSeries();
    const total = dataContainer.getTotal();

    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    const radius = Math.min(centerX, centerY);
    const inner = this.style.innerRadius || 0;
    const outerRadius = Math.max(0, radius - (style.backgroundPaint ? style.backgroundPaint.lineWidth / 2 : 0));
    const innerRadius = Math.max(0, inner <= 1 ? inner * outerRadius : inner); // TODO Use Dimension
    const pi2 = Math.PI * 2;
    const padding = this.style.padding || 0;

    const maxRingThickness = this.getMaxRingThickness(allSeries);
    const background = this.getBackgroundLayout(maxRingThickness, innerRadius, outerRadius);

    this.pieLayout = {
      centerX, centerY, background,
    };

    const pad = padding * 0.5 * pi2;
    let angle = -.25 * pi2;

    // Map pie fragments series (1 series = sum of all of it's Y values)
    this.pieFragments = allSeries.map(series => {
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

      const centerAngle = (start + end) / 2;

      angle = end;
      return {
        paint,
        value: slice,
        inner: inner > 0 ? {
          radius: inner,
          startAngle: end - maxPad,
          endAngle: start + maxPad,
        } : undefined,
        outer: {
          radius: outer,
          startAngle: start + maxPad,
          endAngle: end - maxPad,
        },
        labelLine: new Line(
          centerX + Math.cos(centerAngle) * inner,
          centerY + Math.sin(centerAngle) * inner,
          centerX + Math.cos(centerAngle) * outer,
          centerY + Math.sin(centerAngle) * outer,
        ),
      };
    });
  }

  onDraw(canvas: ViewCanvas) {
    const { pieLayout: layout, pieFragments, style } = this;
    const ctx = canvas.context;
    if (!layout || !pieFragments.length) {
      return;
    }
    const { centerX, centerY, background } = layout;

    // Draw background circle
    if (background && style.backgroundPaint) {
      const { inner, outer } = background;
      ctx.beginPath();
      if (inner > 0) {
        ctx.arc(centerX, centerY, inner, Math.PI * 2, 0, true);
      } else {
        ctx.moveTo(centerX, centerY);
      }
      ctx.arc(centerX, centerY, outer, 0, Math.PI * 2, false);
      ctx.closePath();
      canvas.drawPath(style.backgroundPaint);
    }

    // Draw series
    for (let i = 0, l = this.pieFragments.length; i < l; i++) {
      const { inner, outer, paint } = pieFragments[i];
      ctx.beginPath();

      if (inner) {
        ctx.arc(centerX, centerY, inner.radius, inner.startAngle, inner.endAngle, true);
      } else {
        ctx.moveTo(centerX, centerY);
      }
      ctx.arc(centerX, centerY, outer.radius, outer.startAngle, outer.endAngle, false);
      ctx.closePath();

      canvas.drawPath(paint);
    }

    if (this.getLabelOptions()) {
      for (let i = 0, l = this.pieFragments.length; i < l; i++) {
        const { labelLine, value, paint } = pieFragments[i];
        this.labelsHelper.draw(canvas, value, i, labelLine, paint);
      }
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

  private getMaxRingThickness(allSeries: DataSeries<any>[]) {
    let maxRingThickness = 0;
    for (let i = 0, l = allSeries.length; i < l; i++) {
      const s = this.style.paints[allSeries[i].name] || Paint.DEFAULT;
      const lineThickness = s.lineWidth || 0;
      if (maxRingThickness < lineThickness) {
        maxRingThickness = lineThickness;
      }
    }
    return maxRingThickness;
  }

  private getBackgroundLayout(maxRingThickness: number, innerRadius: number, outerRadius: number) {
    const { style } = this;
    if (style.backgroundPaint) {
      const ringThickness = style.backgroundPaint.lineWidth || 0;
      const ringShift = (maxRingThickness - ringThickness) / 2;
      const outer = Math.max(0, outerRadius - ringShift);
      const inner = Math.min(outer, Math.max(0, innerRadius - ringShift));
      return {
        outer,
        inner,
      };
    }
    return undefined;
  }
}
