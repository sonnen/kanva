import { Context, normalizeRadius, Paint, RadiusInput, rgba, ViewCanvas } from '@kanva/core';
import { last } from 'lodash';
import { CanvasPosition, XYPoint } from '../chart.types';
import { ScaleFunctions, ScaleFunction } from '../utils';
import { ChartView, ChartViewProps } from './chart.view';

const VIEW_TAG = 'LineChartView';

export interface LineChartViewStylePart {
  paint: Paint;
  width: number;
  radius?: RadiusInput;
}

export interface LineChartViewStyle {
  foreground?: LineChartViewStylePart;
  background?: LineChartViewStylePart;
  minChunkLength?: MinLineChartChunkLength;
}

interface NormalizedXYPoint {
  x: number;
  y: 0 | 1;
}

type DataNormalizer = (point: XYPoint) => NormalizedXYPoint;

export interface LineChartViewProps extends ChartViewProps<LineChartViewStyle> {
  dataSeries: string;
  normalizeData?: DataNormalizer;
}

interface LineEntry {
  x: [number, number];
  y: number;
}

interface MinLineChartChunkLength {
  domain: number;
  px?: number;
}

const defaultStyle = {
  background: {
    paint: new Paint()
      .setFillStyle(rgba('#FFF', .1)),
    radius: 0,
    width: 8,
  },
  foreground: {
    paint: new Paint()
      .setFillStyle(rgba('#FFF', .5)),
    radius: 0,
    width: 8,
  },
  minChunkLength: { domain: 0 },
};

const defaultNormalizeData: DataNormalizer = ({x, y}) =>
  y > 0
    ? { x, y: 1 }
    : { x, y: 0 };

const calculateMinLineLength = (start: number, end: number, scale: ScaleFunction, customMinLength?: MinLineChartChunkLength) =>
  (customMinLength && customMinLength.domain)
    ? Math.max(scale(end + customMinLength.domain) - scale(start), customMinLength.px || 0)
    : 0;

export class LineChartView<DataPoint> extends ChartView<LineChartViewProps> {
  // Calculated data
  private data: LineEntry[] = [];
  private normalizeData: DataNormalizer = defaultNormalizeData;

  constructor(context: Context, normalizeData?: DataNormalizer) {
    super(context, VIEW_TAG, defaultStyle);
    if (normalizeData) this.normalizeData = normalizeData;
  }

  onLayout(): void {
    const { dataContainer, dataSeries } = this;
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
      const normalizedPoint = this.normalizeData(point);
      if (!lastEntry || lastEntry.y !== normalizedPoint.y) {
        entries.push({
          x: [normalizedPoint.x, normalizedPoint.x],
          y: normalizedPoint.y,
        });
      } else {
        lastEntry.x[1] = normalizedPoint.x;
      }
      return entries;
    }, [] as LineEntry[]);
  }

  getInternalWrappedHeight(): number | undefined {
    return Math.max(
      (this.style.background || defaultStyle.background).width,
      (this.style.foreground || defaultStyle.foreground).width,
    );
  }

  onDraw(canvas: ViewCanvas) {
    const { innerWidth, innerHeight, data, dataContainer, style } = this;
    if (!dataContainer) {
      return;
    }

    const {
      background = defaultStyle.background,
      foreground = defaultStyle.foreground,
      minChunkLength = defaultStyle.minChunkLength,
    } = style;

    const ctx = canvas.context;
    const { xScale } = this.getScales();

    if (background.width > 0) {
      ctx.beginPath();
      canvas.roundRect(
        0,
        (innerHeight - background.width) / 2,
        innerWidth,
        background.width,
        normalizeRadius(background.radius),
      );
      canvas.drawPath(background.paint);
    }

    if (foreground.width > 0) {
      ctx.beginPath();
      for (let i = 0, l = data.length; i < l; i++) {
        const lineEntry = data[i];

        if (lineEntry.y === 0) continue;

        const minLineLength = calculateMinLineLength(
          lineEntry.x[0],
          lineEntry.x[1],
          xScale,
          minChunkLength,
        );

        canvas.roundRect(
          xScale(lineEntry.x[0]),
          (innerHeight - foreground.width) / 2,
          xScale(lineEntry.x[1]) - xScale(lineEntry.x[0]) || minLineLength,
          foreground.width,
          normalizeRadius(foreground.radius),
        );
      }
      canvas.drawPath(foreground.paint);
    }

  }

  getScales(): ScaleFunctions {
    return this.dataContainer!.getScales(this.innerWidth, 1);
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
      x: xScale.invert(position.x),
      y: yScale.invert(0),
    };
  }
}
