import { CanvasPointerEvent, Context, Line, Paint, PointerAction, RequiredViewChanges, ViewCanvas } from '@kanva/core';
import { isNil } from 'lodash';
import { CanvasPosition, XYPoint } from '../chart.types';
import { DataContainerTransformExtension, TRANSFORM_EXTENSION } from '../data-container';
import { LabelOptions, LabelsHelper, ScaleFunctions, segmentizePoints } from '../utils';
import { ChartView, ChartViewProps } from './chart.view';

export enum DataDisplayType {
  POINTS,
  LINE,
  LINE_STAIRS,
  AREA,
}

export interface AreaChartViewStyle {
  type: DataDisplayType;
  paint: Paint;
  isBackgroundBright?: boolean;
}

export interface AreaChartViewProps extends ChartViewProps<AreaChartViewStyle> {
  labelOptions: LabelOptions;
  dataSeries: string | string[];
  centerPoint?: XYPoint;
}

const defaultStyle = {
  type: DataDisplayType.LINE,
  paint: new Paint().setLineWidth(1.5),
};

export class AreaChartView extends ChartView<AreaChartViewProps> {
  private readonly labelsHelper = new LabelsHelper();
  private center: XYPoint = { x: 0, y: 0 };
  // Calculated data
  private data: Float64Array[] = [];

  constructor(context: Context) {
    super(context, 'AreaChartView', defaultStyle);
  }

  getLabelOptions() {
    return this.labelsHelper.getOptions();
  }

  setLabelOptions(labels: LabelOptions) {
    this.labelsHelper.setOptions(labels);
  }

  getCenterPoint() {
    return this.center;
  }

  setCenterPoint(center: XYPoint) {
    if (!center) {
      return;
    }
    this.center = center;
    this.require(RequiredViewChanges.DRAW);
  }

  onLayout(): void {
    const { dataContainer, dataSeries, style } = this;
    if (!dataContainer || !dataSeries) {
      this.data = [];
      return;
    }
    const series = dataContainer.getDataSeries(dataSeries[0]);
    if (!series || !series.data.length) {
      this.data = [];
      return;
    }

    const dataSegments = segmentizePoints(series.data, null);

    this.data = dataSegments.map(segment => {
      if (!segment.length) {
        return new Float64Array(0);
      }
      switch (style.type) {
        case DataDisplayType.LINE_STAIRS: {
          const count = series.data.length;
          const array = new Float64Array(segment.length * 4);
          let point = segment[0];
          let offset = 2;
          const start = point.x;
          const scale = (segment.length - 1) / segment.length;
          array[0] = start + (point.x - start) * scale;
          array[1] = point.y;
          for (let i = 1; i < segment.length; i++) {
            point = segment[i];
            // stroke horizontally: x offset belongs to the current point, y is copied from the previous one
            array[offset] = start + (point.x - start) * scale;
            array[offset + 1] = array[offset - 1];
            // stroke vertically: x & y belong to the current point
            array[offset + 2] = array[offset];
            array[offset + 3] = point.y;
            offset += 4;
          }
          array[offset] = point.x;
          array[offset + 1] = array[offset - 1];
          return array;
        }
        default: {
          const array = new Float64Array(segment.length * 2);
          for (let i = 0; i < segment.length; i++) {
            const point = segment[i];
            array[i * 2] = point.x;
            array[i * 2 + 1] = point.y;
          }
          return array;
        }
      }
    });
  }

  onDraw(canvas: ViewCanvas) {
    const { dataContainer, style, center } = this;
    const { type, paint, isBackgroundBright = true } = style;
    const ctx = canvas.context;
    const dataSegments = this.data;
    const halfLineWidth = paint.lineWidth / 2;

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
          ctx.moveTo(xScale(data[0]), yScale(center.y));
          for (let i = 0, l = data.length; i < l; i += 2) {
            ctx.lineTo(xScale(data[i]), yScale(data[i + 1]));
          }
          ctx.lineTo(xScale(data[data.length - 2]), yScale(center.y));
          ctx.lineTo(xScale(data[0]), yScale(center.y));
          break;
        case DataDisplayType.POINTS:
          const size = paint.lineWidth || 1;
          const useStroke = paint.canDrawStroke();
          const useFill = paint.canDrawFill();
          const radius = size / 2;
          canvas.setPaint(paint);
          for (let i = 0, l = data.length; i < l; i += 2) {
            const x = xScale(data[i]) - radius;
            const y = yScale(data[i + 1]) - radius;
            if (useFill) {
              ctx.fillRect(x, y, size, size);
            }
            if (useStroke) {
              ctx.strokeRect(x, y, size, size);
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
    canvas.drawPath(paint);

    if (this.getLabelOptions()) {
      const pointLine = new Line();
      let index = 0;
      for (let s = 0, sl = dataSegments.length; s < sl; s++) {
        const data = dataSegments[s];
        for (let i = 0, l = data.length; i < l; i += 2) {
          pointLine.startX = pointLine.endX = xScale(data[i]);
          pointLine.startY = pointLine.endY = yScale(data[i + 1]);

          this.labelsHelper.draw(canvas, data[i + 1], index++, pointLine, paint, isBackgroundBright);
        }
      }

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

  getCanvasPositionForPoint(point: XYPoint): CanvasPosition {
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

  getPointForCanvasPosition(position: XYPoint): XYPoint {
    const { xScale, yScale } = this.getScales();
    return {
      x: xScale.invert(position.x - this.offsetRect.l),
      y: yScale.invert(position.y - this.offsetRect.t),
    };
  }

  getScales(): ScaleFunctions {
    const halfLineWidth = (this.style.paint.lineWidth || 0) / 2;
    return this.dataContainer!.getScales(
      this.innerWidth - halfLineWidth,
      this.innerHeight - halfLineWidth,
    );
  }

  snapshot(): object {
    const snapshot = super.snapshot();

    return {
      ...snapshot,
      style: {
        ...(snapshot as any).style,
        paint: this.style.paint.snapshot(),
      },
    };
  }
}
