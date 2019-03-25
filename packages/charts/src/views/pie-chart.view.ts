import { Context, ViewCanvas } from '@kanva/core';
import { CanvasPosition, XYPoint } from '../chart.types';
import { ChartView, ChartViewProps } from './chart.view';

export interface PieChartSeriesViewStyle {
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
}

export interface PieChartViewStyle extends PieChartSeriesViewStyle {
  innerRadius?: number;
  padding?: number;
  lineRounding?: boolean;
  series: Record<string, PieChartSeriesViewStyle>;
}

export interface PieChartViewProps extends ChartViewProps<PieChartViewStyle> {
}

const defaultStyle: PieChartViewStyle = {
  series: {},
  lineWidth: 1.5,
  innerRadius: 0,
  lineRounding: false,
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
    const { fillStyle, lineWidth = 0, strokeStyle } = style;
    const ctx = canvas.context;
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    const radius = Math.min(centerX, centerY);
    const inner = style.innerRadius || 0;
    const outerRadius = Math.max(0, radius - lineWidth / 2);
    const innerRadius = Math.max(0, inner < 1 ? inner * outerRadius : inner);
    const pi2 = Math.PI * 2;
    const padding = style.padding || 0;

    let maxRingThickness = 0;
    for (let i = 0, l = allSeries.length; i < l; i++) {
      const s = style.series[allSeries[i].name] || defaultStyle;
      const lineThickness = s.lineWidth || 0;
      if (maxRingThickness < lineThickness) {
        maxRingThickness = lineThickness;
      }
    }

    if (style.lineRounding) {
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
    } else {
      ctx.lineJoin = 'miter';
      ctx.lineCap = 'square';
    }

    // Draw background circle
    {
      const ringThickness = style.lineWidth || 0;
      const ringShift = (maxRingThickness - ringThickness) / 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius - ringShift, 0, pi2, false);
      if (innerRadius) {
        ctx.arc(centerX, centerY, innerRadius - ringShift, pi2, 0, true);
        ctx.closePath();
      }
      if (style.fillStyle) {
        ctx.fillStyle = style.fillStyle;
        ctx.fill();
      }
      if (style.strokeStyle && style.lineWidth) {
        ctx.lineWidth = style.lineWidth;
        ctx.strokeStyle = style.strokeStyle;
        ctx.stroke();
      }
    }

    // Draw series (1 series = sum of all of it's Y values)
    const pad = padding * 0.5 * pi2;
    let angle = -.25 * pi2;
    for (let i = 0, l = allSeries.length; i < l; i++) {
      const series = allSeries[i];
      const s = style.series[series.name] || defaultStyle;
      const start = angle;
      const slice = series.sum! / total;
      const end = start + slice * pi2;
      const halfLineThickness = (s.lineWidth || 0) / 2;
      const outerRadius = Math.max(0, radius - halfLineThickness);
      const ringThickness = s.lineWidth || 0;
      const ringShift = (maxRingThickness - ringThickness) / 2;

      // Assume that padding can't be bigger than half of the whole arc area
      const maxPad = Math.min((end - start) / 4, pad);

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius - ringShift, start + maxPad, end - maxPad, false);
      if (innerRadius) {
        ctx.arc(centerX, centerY, innerRadius - ringShift, end - maxPad, start + maxPad, true);
        ctx.closePath();
      }

      angle = end;
      if (s.fillStyle) {
        ctx.fillStyle = s.fillStyle;
        ctx.fill();
      }
      if (s.strokeStyle && s.lineWidth) {
        ctx.lineWidth = s.lineWidth;
        ctx.strokeStyle = s.strokeStyle;
        ctx.stroke();
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
}
