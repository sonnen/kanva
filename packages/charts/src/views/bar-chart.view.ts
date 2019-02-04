import { Context, normalizeRadius, Radius, ViewCanvas } from '@kanva/core';
import { ChartView, ChartViewProps } from './chart.view';

export interface BarChartSeriesViewStyle {
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
  lineCap?: CanvasLineCap;
}

export interface BarChartViewStyle {
  padding?: number;
  barWidth?: number;
  barRadius?: Partial<Radius> | number;
  series: Record<string, BarChartSeriesViewStyle>;
}

export interface BarChartViewProps extends ChartViewProps<BarChartViewStyle> {
}

const defaultStyle = {
  series: {},
  barWidth: .5,
  barRadius: 0,
  padding: 0,
};

export class BarChartView<DataPoint> extends ChartView<BarChartViewProps> {
  constructor(context: Context) {
    super(context, 'BarChartView', defaultStyle);
  }

  onDraw(canvas: ViewCanvas) {
    const { innerWidth, innerHeight, dataSeries, dataContainer, style } = this;
    if (!dataContainer) {
      return;
    }

    const allSeries = dataContainer.getAllDataSeries(innerWidth, innerHeight);
    const zeroPoint = dataContainer.getZeroPoint(innerWidth, innerHeight).y;
    const total = dataContainer.getTotal();
    const seriesLength = dataContainer.getSeriesLength();
    const seriesCount = allSeries.length;
    const ctx = canvas.context;
    const groupWidth = innerWidth / seriesLength;
    const rawBarWidth = style.barWidth || 1;
    const barWidth = rawBarWidth <= 1
      ? rawBarWidth * groupWidth / seriesCount
      : Math.min(rawBarWidth, groupWidth / seriesCount);
    const radius = normalizeRadius(style.barRadius || 0);

    let left = 0;

    for (let i = 0, l = seriesLength; i < l; i++) {
      const right = left + groupWidth;

      let barRight = left + (groupWidth - barWidth * seriesCount) / 2;
      for (let j = 0; j < seriesCount; j++) {
        const series = allSeries[j];
        const s = style.series[series.name] || defaultStyle;
        const barY = series.data[i].vy;
        const top = Math.min(zeroPoint, barY);
        const bottom = Math.max(zeroPoint, barY);

        ctx.beginPath();
        canvas.roundRect(barRight, top, barWidth, Math.abs(top - bottom), radius);
        ctx.closePath();

        if (s.fillStyle) {
          ctx.fillStyle = s.fillStyle;
          ctx.fill();
        }
        if (s.strokeStyle && s.lineWidth) {
          ctx.strokeStyle = s.strokeStyle;
          ctx.lineWidth = s.lineWidth;
          ctx.lineCap = s.lineCap || 'butt';
          ctx.stroke();
        }

        barRight += barWidth;
      }

      left = right;
    }
  }
}
