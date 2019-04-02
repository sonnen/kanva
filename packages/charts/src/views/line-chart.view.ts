import {
  CanvasPointerEvent,
  Context,
  normalizeRadius,
  PointerAction,
  RadiusInput,
  RequiredViewChanges,
  ViewCanvas,
} from '@kanva/core';
import { isNil, last } from 'lodash';
import { CanvasPosition, XYPoint } from '../chart.types';
import { DataContainerTransformExtension, TRANSFORM_EXTENSION } from '../data-container';
import { ScaleFunctions } from '../utils';
import { ChartView, ChartViewProps } from './chart.view';

const VIEW_TAG = 'LineChartView';

export interface LineChartViewStyle {
  backgroundFillStyle?: string;
  backgroundLineWidth?: number;
  backgroundRadius?: number;
  fillStyle?: string;
  lineWidth?: number;
  radius?: RadiusInput;
}

export interface LineChartViewProps extends ChartViewProps<LineChartViewStyle> {
  dataSeries: string;
}

const defaultStyle = {
  backgroundLineWidth: 1.5,
  lineWidth: 3,
  radius: 0,
  backgroundRadius: 0,
};

interface LineEntry {
  x: [number, number];
  y: number;
}

export class LineChartView<DataPoint> extends ChartView<LineChartViewProps> {
  // Calculated data
  private data: LineEntry[] = [];

  constructor(context: Context) {
    super(context, VIEW_TAG, defaultStyle);
  }

  onLayout(): void {
    const { dataContainer, dataSeries, style } = this;
    if (!dataContainer || !dataSeries) {
      this.data = [];
      return;
    }
    if (dataSeries.length > 1) {
      throw new Error(`${VIEW_TAG}: LineChartView supports only one data series at a time.`);
    }
    const series = dataContainer.getDataSeries(dataSeries[0]);
    if (!series) {
      this.data = [];
      return;
    }

    this.data = series.data.reduce((entries, point) => {
      const lastEntry = last(entries);
      if (!lastEntry || lastEntry.y !== point.y) {
        entries.push({
          x: [point.x, point.x],
          y: point.y,
        });
      } else {
        lastEntry.x[1] = point.x;
      }
      return entries;
    }, [] as LineEntry[]);
  }

  getInternalWrappedHeight(canvas: ViewCanvas): number | undefined {
    return Math.max(
      this.style.lineWidth || defaultStyle.lineWidth,
      this.style.backgroundLineWidth || defaultStyle.backgroundLineWidth,
    );
  }

  onDraw(canvas: ViewCanvas) {
    const { innerWidth, innerHeight, dataSeries, data, dataContainer, style } = this;
    if (!dataContainer) {
      return;
    }

    const {
      lineWidth = defaultStyle.lineWidth, fillStyle, radius,
      backgroundLineWidth = defaultStyle.backgroundLineWidth, backgroundFillStyle, backgroundRadius,
    } = style;

    const ctx = canvas.context;
    const { xScale } = this.getScales();

    if (backgroundFillStyle) {
      ctx.beginPath();
      canvas.roundRect(
        0,
        (innerHeight - backgroundLineWidth) / 2,
        innerWidth,
        backgroundLineWidth,
        normalizeRadius(backgroundRadius),
      );
      ctx.fillStyle = backgroundFillStyle;
      ctx.fill();
    }

    if (fillStyle && lineWidth) {
      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      for (let i = 0, l = data.length; i < l; i++) {
        const lineEntry = data[i];
        if (lineEntry.y === 0) {
          continue;
        }
        canvas.roundRect(
          xScale(lineEntry.x[0]),
          (innerHeight - lineWidth) / 2,
          xScale(lineEntry.x[1]) - xScale(lineEntry.x[0]),
          lineWidth,
          normalizeRadius(style.radius),
        );
      }
      ctx.fill();
    }

  }

  onPointerEvent(event: CanvasPointerEvent): boolean {
    if (!this.dataContainer) {
      return false;
    }

    // Pan & zoom
    const transformExtension = this.dataContainer.getExtension<DataContainerTransformExtension>(TRANSFORM_EXTENSION);
    const scales = this.getScales();
    if (transformExtension && transformExtension.processPointerEvent(event, scales)) {
      this.require(RequiredViewChanges.DRAW);
      return true;
    }

    if (!this.onChartPointerEvent) {
      return false;
    }

    if (event.action !== PointerAction.UP) {
      // TODO Re-use TooltipExtension.processPointerEvent as in Pan&Zoom
      // Tooltip
      const dataSeries = this.dataContainer.getDataSeries(this.dataSeries[0]);
      const { xScale, yScale } = this.getScales();

      if (!dataSeries) {
        return false;
      }

      const { x, y } = event.primaryPointer;
      const point = {
        x: xScale.invert(x),
        y: yScale.invert(y),
      };

      const match = this.dataContainer.getYValuesMatch(point.x);

      if (isNil(match)) {
        return false;
      }

      const snap = {
        x: xScale(match.snapX) + this.offsetRect.l,
        y: xScale(match.snapY) + this.offsetRect.t,
      };

      this.onChartPointerEvent({
        pointerEvent: event,
        ...point,
        match,
        snap,
      });
    }

    return true;
  }

  getScales(): ScaleFunctions {
    const halfLineWidth = (this.style.lineWidth || 0) / 2;
    return this.dataContainer!.getScales(
      this.innerWidth - halfLineWidth,
      1,
    );
  }

  getCanvasPositionForPoint(point: XYPoint): CanvasPosition {
    const { xScale, yScale } = this.getScales();
    const x = xScale(point.x);
    const y = yScale(0);
    return {
      x,
      y,
      absoluteX: this.offsetRect.l + x,
      absoluteY: this.offsetRect.t + y,
    };
  }

  getPointForCanvasPosition(position: XYPoint): XYPoint {
    const { xScale, yScale } = this.getScales();
    return {
      x: xScale.invert(position.x - this.offsetRect.l),
      y: yScale.invert(0),
    };
  }
}
