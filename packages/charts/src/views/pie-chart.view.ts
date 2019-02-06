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

    const allSeries = dataContainer.getAllDataSeries();
    const total = dataContainer.getTotal();
    const { fillStyle, lineWidth = 0, strokeStyle, lineCap } = style;
    const ctx = canvas.context;
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    const radius = Math.min(centerX, centerY);
    const inner = style.innerRadius || 0;
    const outerRadius = Math.max(0, radius - lineWidth / 2);
    const innerRadius = Math.max(0, inner < 1 ? inner * outerRadius : inner);
    const pi2 = Math.PI * 2;
    const padding = style.padding || 0;

    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, pi2, false);
    if (innerRadius) {
      ctx.arc(centerX, centerY, innerRadius, pi2, 0, true);
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

      // Assume that padding can't be bigger than half of the whole arc area
      const maxPad = Math.min((end - start) / 4, pad);

      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, start + maxPad, end - maxPad, false);
      if (innerRadius) {
        ctx.arc(centerX, centerY, innerRadius, end - maxPad, start + maxPad, true);
      }

      angle = end;
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
