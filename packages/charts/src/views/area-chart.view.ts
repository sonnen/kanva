import { CanvasPointerEvent, Context, RequiredViewChanges, ViewCanvas } from '@kanva/core';
import { CanvasPosition, XYPoint } from '../chart.types';
import { DataContainerTransformExtension, TRANSFORM_EXTENSION } from '../data-container';
import { ScaleFunctions, segmentizePoints } from '../utils';
import { ChartView, ChartViewProps } from './chart.view';

export enum DataDisplayType {
  POINTS,
  LINE,
  LINE_STAIRS,
  AREA,
}

export interface AreaChartViewStyle {
  type: DataDisplayType;
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
}

export interface AreaChartViewProps extends ChartViewProps<AreaChartViewStyle> {
  dataSeries: string | string[];
}

const defaultStyle = {
  type: DataDisplayType.LINE,
  lineThickness: 1.5,
};

export class AreaChartView extends ChartView<AreaChartViewProps> {
  // Calculated data
  private data: Int32Array[] = [];

  constructor(context: Context) {
    super(context, 'AreaChartView', defaultStyle);
  }

  onLayout(): void {
    const { dataContainer, dataSeries, innerHeight, innerWidth, style } = this;
    if (!dataContainer || !dataSeries) {
      this.data = [];
      return;
    }
    const series = dataContainer.getDataSeries(dataSeries[0]);
    if (!series || !series.data.length) {
      this.data = [];
      return;
    }

    const halfLineWidth = (style.lineWidth || 0);

    const dataSegments = segmentizePoints(series.data, null);

    this.data = dataSegments.map(segment => {
      if (!segment.length) {
        return new Int32Array(0);
      }
      switch (style.type) {
        case DataDisplayType.LINE_STAIRS: {
          const count = series.data.length;
          const array = new Int32Array(segment.length * 4);
          let point = segment[0];
          let offset = 2;
          const start = point.x;
          const scale = (segment.length - 1) / segment.length;
          array[0] = start + (point.x - start) * scale;
          array[1] = point.y;
          for (let i = 1; i < segment.length; i++) {
            point = segment[i];
            array[offset] = start + (point.x - start) * scale;
            array[offset + 1] = array[offset - 1];
            array[offset + 2] = array[offset];
            array[offset + 3] = point.y;
            offset += 4;
          }
          array[offset] = point.x;
          array[offset + 1] = array[offset - 1];
          return array;
        }
        default: {
          const array = new Int32Array(segment.length * 2);
          for (let i = 0; i < segment.length; i++) {
            const point = segment[i];
            array[i * 2] = point.x | 0;
            array[i * 2 + 1] = point.y | 0;
          }
          return array;
        }
      }
    });
  }

  onDraw(canvas: ViewCanvas) {
    const { innerWidth, innerHeight, dataSeries, dataContainer, style } = this;
    const { type, fillStyle, lineWidth = 0, strokeStyle } = style;
    const ctx = canvas.context;
    const dataSegments = this.data;
    const halfLineWidth = lineWidth / 2;

    if (!dataContainer || !dataSegments.length) {
      return;
    }

    const { xScale, yScale } = this.getScales();

    ctx.translate(halfLineWidth, halfLineWidth);
    ctx.beginPath();

    for (let s = 0, sl = dataSegments.length; s < sl; s++) {
      const data = dataSegments[s];
      switch (type) {
        case DataDisplayType.AREA:
          ctx.moveTo(xScale(data[0]), innerHeight);
          for (let i = 0, l = data.length; i < l; i += 2) {
            ctx.lineTo(xScale(data[i]), yScale(data[i + 1]));
          }
          ctx.lineTo(xScale(data[data.length - 2]), innerHeight);
          ctx.lineTo(xScale(data[0]), innerHeight);
          break;
        case DataDisplayType.POINTS:
          const size = lineWidth || 1;
          const radius = size / 2;
          if (fillStyle) {
            ctx.fillStyle = fillStyle;
            for (let i = 0, l = data.length; i < l; i += 2) {
              ctx.fillRect(xScale(data[i]) - radius, yScale(data[i + 1]) - radius, size, size);
            }
          }
          break;
        default:
        case DataDisplayType.LINE_STAIRS:
        case DataDisplayType.LINE:
          ctx.moveTo(xScale(data[0]), yScale(data[1]));
          for (let i = 2, l = data.length; i < l; i += 2) {
            ctx.lineTo(xScale(data[i]), yScale(data[i + 1]));
          }
          break;
      }
    }
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
    if (strokeStyle && lineWidth) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  }

  onPointerEvent(event: CanvasPointerEvent): boolean {
    if (!this.onChartPointerEvent || !this.dataContainer) {
      return false;
    }

    // Pan & zoom
    const transformExtension = this.dataContainer.getExtension<DataContainerTransformExtension>(TRANSFORM_EXTENSION);
    const scales = this.getScales();
    if (transformExtension && (
      transformExtension.processPanEvent(event, scales) || transformExtension.processZoomEvent(event, scales)
    )) {
      this.require(RequiredViewChanges.DRAW);
      return true;
    }

    // Tooltip
    const isTooltipEvent = event.pointerCount === 1 && !event.scrollY;
    const dataSeries = this.dataContainer.getDataSeries(this.dataSeries[0]);
    const { xScale, yScale } = this.dataContainer.getScales(
      this.innerWidth,
      this.innerHeight,
    );

    if (!dataSeries) {
      return false;
    }

    const { x, y } = event.primaryPointer;
    const point = {
      x: xScale.invert(x),
      y: yScale.invert(y),
    };

    const match = this.dataContainer.getYValuesMatch(point.x);

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

    return true;
  }

  getCanvasPositionForPoint(point: XYPoint): CanvasPosition {
    const { innerWidth, innerHeight, dataSeries, dataContainer, style } = this;
    if (!dataContainer) {
      return super.getCanvasPositionForPoint(point);
    }
    const { xScale, yScale } = this.getScales();
    const x = xScale(point.x);
    const y = yScale(point.y);
    return {
      x,
      y,
      absoluteX: this.offsetRect.l + x,
      absoluteY: this.offsetRect.t + y,
    };
  }

  getScales(): ScaleFunctions {
    const halfLineWidth = (this.style.lineWidth || 0) / 2;
    return this.dataContainer!.getScales(
      this.innerWidth - halfLineWidth,
      this.innerHeight - halfLineWidth,
    );
  }
}
