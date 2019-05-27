import {
  calcDimension,
  Context,
  Dimension,
  DimensionInput,
  Line,
  normalizeRadius,
  Paint,
  parseDimension,
  Radius,
  ViewCanvas,
} from '@kanva/core';
import { CanvasPosition, DataSeries, XYPoint } from '../chart.types';
import { LabelOptions, LabelsHelper, ScaleFunctions } from '../utils';
import { ChartView, ChartViewProps } from './chart.view';

export interface BarChartViewStyle {
  barWidth?: DimensionInput;
  barRadius?: Partial<Radius> | number;
  paints: Record<string, Paint>;
}

export interface BarChartViewProps extends ChartViewProps<BarChartViewStyle> {
  labelOptions: LabelOptions;
}

const X_SCALE_BAR_OFFSET = .5;

const defaultStyle = {
  paints: {},
  barWidth: .5,
  barRadius: 0,
  isBackgroundBright: true,
};

export class BarChartView extends ChartView<BarChartViewProps> {
  private readonly labelsHelper = new LabelsHelper();
  private barWidth: Dimension = parseDimension(undefined);
  // Calculated series
  private series: DataSeries<{ y: number, barY: number }>[] = [];
  private seriesLength: number = 0;
  private zeroPoint: number = 0;

  constructor(context: Context) {
    super(context, 'BarChartView', defaultStyle);
  }

  getLabelOptions() {
    return this.labelsHelper.getOptions();
  }

  setLabelOptions(labels: LabelOptions) {
    this.labelsHelper.setOptions(labels);
  }

  setStyle(style: BarChartViewStyle | undefined) {
    super.setStyle(style);
    this.barWidth = parseDimension(this.style.barWidth);
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
    this.series = allSeries
      .filter(series => !this.dataSeries.length || this.dataSeries.includes(series.name))
      .map(series => ({
        ...series,
        data: series.data.map(value => ({ y: value.y || 0, barY: yScale(value.y || 0) })),
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
      groupWidth,
    } = this;

    const seriesCount = this.series.length;
    const ctx = canvas.context;
    const radius = normalizeRadius(style.barRadius || 0);
    const barLine = new Line();
    const maxBarWidth = groupWidth / this.series.length;
    const barWidth = calcDimension(this.barWidth, maxBarWidth) || maxBarWidth;

    for (let i = 0, left = 0, l = seriesLength; i < l; i++) {
      const right = left + groupWidth;

      let barRight = left + (groupWidth - barWidth * seriesCount) / 2;

      for (let j = 0; j < seriesCount; j++) {
        const series = allSeries[j];
        const s = style.paints[series.name];
        const { y, barY } = series.data[i] || { y: 0, barY: zeroPoint };
        const top = Math.min(zeroPoint, barY);
        const bottom = Math.max(zeroPoint, barY);
        const height = Math.abs(top - bottom);

        ctx.beginPath();
        canvas.roundRect(barRight, top, barWidth, height, radius);
        canvas.drawPath(s);

        if (this.getLabelOptions()) {
          barLine.startX = barLine.endX = barRight + barWidth / 2;
          barLine.startY = zeroPoint;
          barLine.endY = barY;
          this.labelsHelper.draw(canvas, y, j, barLine, s);
        }

        barRight += barWidth;
      }

      left = right;
    }
  }

  getCanvasPositionForPoint(point: XYPoint): CanvasPosition {
    const { xScale, yScale } = this.getScales();
    const x = (point.x + X_SCALE_BAR_OFFSET) * this.groupWidth;
    const y = yScale(point.y);

    return {
      x,
      y,
      absoluteX: this.offsetRect.l + x,
      absoluteY: this.offsetRect.t + y,
    };
  }

  getPointForCanvasPosition(position: XYPoint): XYPoint | undefined {
    if (!this.dataContainer) {
      return undefined;
    }
    const { xScale, yScale } = this.getScales();

    return {
      x: Math.round(position.x / this.groupWidth - X_SCALE_BAR_OFFSET),
      y: yScale.invert(position.y),
    };
  }

  getScales(): ScaleFunctions {
    return this.dataContainer!.getScales(
      this.innerWidth,
      this.innerHeight,
    );
  }

  private get groupWidth() {
    return this.innerWidth / this.seriesLength;
  }

}
