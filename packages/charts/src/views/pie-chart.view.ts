import { Context, ViewCanvas } from '@kanva/core';
import { ChartView, ChartViewProps } from './chart.view';

export interface PieChartSeriesViewStyle {
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
  lineCap?: CanvasLineCap;
}

export interface PieChartViewStyle extends PieChartSeriesViewStyle {
  innerRadius?: number;
  padding?: number;
  series: Record<string, PieChartSeriesViewStyle>;
}

export interface PieChartViewProps extends ChartViewProps<PieChartViewStyle> {
}

const defaultStyle: PieChartViewStyle = {
  series: {},
  lineWidth: 1.5,
  innerRadius: 0,
  lineCap: 'butt',
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

    const allSeries = dataContainer.getAllDataSeries(innerWidth, innerHeight);
    const total = dataContainer.getTotal();
    const { fillStyle, lineWidth, strokeStyle, innerRadius, lineCap } = style;
    const ctx = canvas.context;
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    const radius = Math.min(centerX, centerY);
    const inner = innerRadius && (innerRadius < 1 ? innerRadius * radius : innerRadius);
    const pi2 = Math.PI * 2;
    const padding = style.padding || 0;

    // Draw background circle
    const halfLineThickness = (style.lineWidth || 0) / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - halfLineThickness, 0, pi2, false);
    if (inner) {
      ctx.arc(centerX, centerY, inner, pi2, 0, true);
    }
    if (style.fillStyle) {
      ctx.fillStyle = style.fillStyle;
      ctx.fill();
    }
    if (style.strokeStyle && style.lineWidth) {
      ctx.lineWidth = style.lineWidth;
      ctx.lineCap = 'butt';
      ctx.strokeStyle = style.strokeStyle;
      ctx.stroke();
    }

    // Draw series (1 series = sum of all of it's Y values)
    let angle = (-.25 + padding / 2) * pi2;
    for (let i = 0, l = allSeries.length; i < l; i++) {
      const series = allSeries[i];
      const s = style.series[series.name] || defaultStyle;
      const start = angle;
      const end = start + (series.sum! / total - padding) * pi2;
      const halfLineThickness = (s.lineWidth || 0) / 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - halfLineThickness, start, end, false);
      if (inner) {
        ctx.arc(centerX, centerY, inner, end, start, true);
      }

      angle = end + padding * pi2;
      if (s.fillStyle) {
        ctx.fillStyle = s.fillStyle;
        ctx.fill();
      }
      if (s.strokeStyle && s.lineWidth) {
        ctx.lineWidth = s.lineWidth;
        ctx.lineCap = s.lineCap || defaultStyle.lineCap!;
        ctx.strokeStyle = s.strokeStyle;
        ctx.stroke();
      }
    }
  }
}
