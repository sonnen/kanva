import { Context, normalizeRadius, Radius, ViewCanvas } from '@kanva/core';
import { DataSeries } from '../chart.types';
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
  // Calculated series
  series: DataSeries<number>[] = [];
  seriesLength: number = 0;
  zeroPoint: number = 0;

  constructor(context: Context) {
    super(context, 'BarChartView', defaultStyle);
  }

  onLayout(): void {
    const { innerWidth, innerHeight, dataContainer } = this;
    if (!dataContainer) {
      this.zeroPoint = 0;
      this.seriesLength = 0;
      this.series = [];
      return;
    }
    const allSeries = dataContainer.getAllDataSeries();

    const { xScale, yScale } = dataContainer.getScales(innerWidth, innerHeight);

    this.zeroPoint = yScale(0);
    this.seriesLength = dataContainer.getSeriesLength();
    this.series = allSeries.map(series => ({
      ...series,
      data: series.data.map(value => yScale(value.y)),
    }));
  }

  onDraw(canvas: ViewCanvas) {
    const {
      innerWidth,
      innerHeight,
      zeroPoint,
      series: allSeries,
      seriesLength,
      style,
    } = this;

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
        const barY = series.data[i];
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
