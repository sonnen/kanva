import {
  CanvasPointerEvent,
  Context,
  Line,
  normalizeRadius,
  Paint,
  PointerAction,
  Radius,
  ViewCanvas,
} from '@kanva/core';
import { isNil } from 'lodash';
import { CanvasPosition, DataSeries, XYPoint } from '../chart.types';
import { LabelOptions, LabelsHelper, ScaleFunctions } from '../utils';
import { ChartView, ChartViewProps } from './chart.view';

export interface BarChartViewStyle {
  padding?: number;
  barWidth?: number;
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
  padding: 0,
  isBackgroundBright: true,
};

export class BarChartView<DataPoint> extends ChartView<BarChartViewProps> {
  private readonly labelsHelper = new LabelsHelper();
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
      barWidth,
    } = this;

    const seriesCount = this.series.length;
    const ctx = canvas.context;
    const radius = normalizeRadius(style.barRadius || 0);
    const barLine = new Line();

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

  onPointerEvent(event: CanvasPointerEvent): boolean {
    if (!this.onChartPointerEvent || !this.dataContainer) {
      return false;
    }
    switch (event.action) {
      case PointerAction.OVER:
      case PointerAction.DOWN:
      case PointerAction.MOVE:
        const dataSeries = this.dataContainer.getAllDataSeries();
        const { yScale } = this.dataContainer.getScales(innerWidth, innerHeight);
        if (!dataSeries) {
          return false;
        }

        const { x, y } = event.primaryPointer;
        const point = {
          x: x / this.groupWidth,
          y: yScale.invert(y),
        };

        const match = this.dataContainer.getYValuesMatch(point.x);

        if (isNil(match)) {
          return false;
        }

        const snap = {
          x: match.snapX * this.groupWidth + this.offsetRect.l,
          y: yScale(match.snapY) + this.offsetRect.t,
        };

        this.onChartPointerEvent({
          pointerEvent: event,
          ...point,
          match,
          snap,
        });
        return true;
      default:
        return false;
    }
  }

  getCanvasPositionForPoint(point: XYPoint): CanvasPosition {
    const { yScale } = this.getScales();
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
    const match = this.dataContainer!.getYValuesMatch(
      (position.x - this.offsetRect.l) / this.groupWidth,
    );

    if (isNil(match)) {
      return undefined;
    }

    return {
      x: match.snapX + X_SCALE_BAR_OFFSET,
      y: match.snapY,
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

  private get barWidth() {
    const rawBarWidth = this.style.barWidth || 1;
    const width = this.groupWidth / this.series.length;
    return rawBarWidth <= 1  // TODO Use Dimension
      ? rawBarWidth * width
      : Math.min(rawBarWidth, width);
  }

}
