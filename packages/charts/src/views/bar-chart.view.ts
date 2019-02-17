import { Context, Font, font, normalizeRadius, Radius, ViewCanvas } from '@kanva/core';
import { DataSeries } from '../chart.types';
import { AxisLabelAccessor } from '../utils';
import { ChartView, ChartViewProps } from './chart.view';

export interface BarChartSeriesViewStyle {
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
  lineCap?: CanvasLineCap;
}

export enum LabelPosition {
  START,
  CENTER,
  END,
  OUT,
}

export interface BarChartLabels {
  font: Font;
  fillStyle: string;
  position: LabelPosition;
  labelAccessor: AxisLabelAccessor;
}

export interface BarChartViewStyle {
  padding?: number;
  barWidth?: number;
  barRadius?: Partial<Radius> | number;
  series: Record<string, BarChartSeriesViewStyle>;
}

export interface BarChartViewProps extends ChartViewProps<BarChartViewStyle> {
  labels: BarChartLabels;
}

const defaultStyle = {
  series: {},
  barWidth: .5,
  barRadius: 0,
  padding: 0,
};

export class BarChartView<DataPoint> extends ChartView<BarChartViewProps> {
  private labels?: BarChartLabels;
  // Calculated series
  private series: DataSeries<{ y: number, barY: number }>[] = [];
  private seriesLength: number = 0;
  private zeroPoint: number = 0;

  constructor(context: Context) {
    super(context, 'BarChartView', defaultStyle);
  }

  getLabels() {
    return this.labels;
  }

  setLabels(labels: BarChartLabels) {
    this.labels = labels;
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
      data: [...series.data].map(value => ({ y: value.y || 0, barY: yScale(value.y || 0) })),
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
      labels,
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

    if (labels) {
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'center';
      ctx.font = font(labels.font);
    }

    for (let i = 0, l = seriesLength; i < l; i++) {
      const right = left + groupWidth;

      let barRight = left + (groupWidth - barWidth * seriesCount) / 2;
      for (let j = 0; j < seriesCount; j++) {
        const series = allSeries[j];
        const s = style.series[series.name] || defaultStyle;
        const { y, barY } = series.data[i] || { y: 0, barY: zeroPoint };
        const top = Math.min(zeroPoint, barY);
        const bottom = Math.max(zeroPoint, barY);
        const height = Math.abs(top - bottom);

        ctx.beginPath();
        canvas.roundRect(barRight, top, barWidth, height, radius);
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

        if (labels) {
          const textHeight = labels.font.fontSize;
          let yText;
          switch (labels.position) {
            case LabelPosition.START:
              yText = top <= zeroPoint ? zeroPoint : zeroPoint + textHeight;
              break;
            case LabelPosition.END:
              yText = top < zeroPoint ? top + textHeight : bottom;
              break;
            case LabelPosition.CENTER:
              yText = top + (height + textHeight) / 2;
              break;
            case LabelPosition.OUT:
            default:
              yText = top < zeroPoint ? top : bottom + textHeight;
              break;
          }
          ctx.fillStyle = labels.fillStyle;
          ctx.fillText(labels.labelAccessor(y, j), barRight + barWidth / 2, yText);
        }

        barRight += barWidth;
      }

      left = right;
    }
  }
}
