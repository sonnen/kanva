import { Context, ViewCanvas } from '@kanva/core';
import { DataDisplayType } from '../chart.types';
import { segmentizePoints } from '../utils';
import { ChartView, ChartViewProps } from './chart.view';

export interface AreaChartViewStyle {
  type: DataDisplayType;
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
}

export interface AreaChartViewProps extends ChartViewProps<AreaChartViewStyle> {
  dataSeries: string;
}

const defaultStyle = {
  type: DataDisplayType.LINE,
  lineThickness: 1.5,
};

export class AreaChartView extends ChartView<AreaChartViewProps> {
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
    const { xScale, yScale } = dataContainer.getScales(
      innerWidth - halfLineWidth,
      innerHeight - halfLineWidth,
    );

    const dataSegments = segmentizePoints(series.data, null);

    this.data = dataSegments.map(segment => {
      const array = new Int32Array(segment.length * 2);
      for (let i = 0; i < segment.length; i++) {
        const point = segment[i];
        array[i * 2] = xScale(point.x) | 0;
        array[i * 2 + 1] = yScale(point.y) | 0;
      }
      return array;
    });
  }

  onDraw(canvas: ViewCanvas) {
    const { innerWidth, innerHeight, dataSeries, dataContainer, style } = this;
    const { type, fillStyle, lineWidth = 0, strokeStyle } = style;
    const ctx = canvas.context;
    const dataSegments = this.data;

    if (!dataSegments.length) {
      return;
    }

    ctx.translate(lineWidth / 2, lineWidth / 2);
    ctx.beginPath();

    for (let s = 0, sl = dataSegments.length; s < sl; s++) {
      const data = dataSegments[s];
      switch (type) {
        case DataDisplayType.AREA:
          ctx.moveTo(data[0], innerHeight);
          for (let i = 0, l = data.length; i < l; i += 2) {
            ctx.lineTo(data[i], data[i + 1]);
          }
          ctx.lineTo(data[data.length - 2], innerHeight);
          ctx.lineTo(data[0], innerHeight);
          break;
        case DataDisplayType.POINTS:
          const size = lineWidth || 1;
          const radius = size / 2;
          if (fillStyle) {
            ctx.fillStyle = fillStyle;
            for (let i = 0, l = data.length; i < l; i += 2) {
              ctx.fillRect(data[i] - radius, data[i + 1] - radius, size, size);
            }
          }
          break;
        default:
        case DataDisplayType.LINE:
          ctx.moveTo(data[0], data[1]);
          for (let i = 2, l = data.length; i < l; i += 2) {
            ctx.lineTo(data[i], data[i + 1]);
          }
          break;
      }
    }
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth || 1;
      ctx.stroke();
    }
  }
}
