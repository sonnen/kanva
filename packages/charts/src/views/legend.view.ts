import {
  Context,
  Font,
  font,
  normalizeRadius,
  RadiusInput,
  removeUndefinedProps,
  RequiredViewChanges,
  View,
  ViewCanvas,
} from '@kanva/core';
import { CanvasPosition, XYPoint } from '../chart.types';

export interface LegendViewStyle {
  alignment?: LegendAlignment;
  padding?: number;
  fillStyle?: string;
  font?: Font;
}

export enum LegendAlignment {
  ROW,
  COLUMN,
}

export enum LegendSeriesType {
  AREA,
  LINE,
  BAR,
  PIE,
}

export interface LegendDataSeries {
  name: string;
  type?: LegendSeriesType;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  radius?: RadiusInput;
  lineRounding?: boolean;
  lineDash?: number[];
}

export interface LegendViewProps {
  style: LegendViewStyle;
  dataSeries: LegendDataSeries[];
}

const defaultStyle = {
  alignment: LegendAlignment.ROW,
  padding: 4,
  fillStyle: '#000',
  font: { fontSize: 12, fontFamily: 'Arial' },
};

export class LegendView<DataPoint> extends View<LegendViewProps> {
  private style: LegendViewStyle = defaultStyle;
  private dataSeries: LegendDataSeries[] = [];

  constructor(context: Context) {
    super(context, 'LegendView');
  }

  getStyle() {
    return this.style;
  }

  setStyle(style: LegendViewStyle | undefined) {
    this.style = style || defaultStyle;
    this.require(RequiredViewChanges.DRAW);
  }

  getDataSeries() {
    return this.dataSeries;
  }

  setDataSeries(dataSeries: LegendDataSeries[]) {
    this.dataSeries = dataSeries;
    this.require(RequiredViewChanges.LAYOUT);
  }

  getInternalWrappedHeight(canvas: ViewCanvas) {
    switch (this.style.alignment) {
      case LegendAlignment.ROW:
        return this.font.fontSize;
      case LegendAlignment.COLUMN:
      default:
        return this.dataSeries.length * (this.font.fontSize + this.padding) - this.padding;
    }
  }

  getInternalWrappedWidth(canvas: ViewCanvas) {
    const boxWithPadding = this.font.fontSize * 1.5 + this.padding;
    switch (this.style.alignment) {
      case LegendAlignment.ROW:
        return this.dataSeries.reduce(
          (value, series) => value + boxWithPadding + this.getSeriesTextWidth(canvas, series), 0);
      case LegendAlignment.COLUMN:
      default:
        return boxWithPadding +
          this.dataSeries.reduce((value, series) => Math.max(value, this.getSeriesTextWidth(canvas, series)), 0);
    }

  }

  onDraw(canvas: ViewCanvas) {
    const {
      innerWidth, innerHeight,
      dataSeries,
      style: {
        alignment = defaultStyle.alignment,
        fillStyle = defaultStyle.fillStyle,
        font: fontStyle = defaultStyle.font,
      } = defaultStyle,
    } = this;

    const ctx = canvas.context;
    const fontSize = this.font.fontSize;
    const padding = this.padding;

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = font(fontStyle);
    switch (this.style.alignment) {
      case LegendAlignment.ROW:
        for (let i = 0, l = dataSeries.length; i < l; i++) {
          const series = dataSeries[i];
          const { width } = ctx.measureText(series.name);
          this.drawDataSeriesSymbol(canvas, series);
          ctx.translate(fontSize * 1.5, 0);
          ctx.fillStyle = fillStyle;
          ctx.fillText(series.name, 0, fontSize / 2);
          ctx.translate(padding + width, 0);
        }
        break;
      case LegendAlignment.COLUMN:
      default:
        for (let i = 0, l = dataSeries.length; i < l; i++) {
          const series = dataSeries[i];
          const { width } = ctx.measureText(series.name);
          this.drawDataSeriesSymbol(canvas, series);
          ctx.fillStyle = fillStyle;
          ctx.fillText(series.name, fontSize * 1.5, fontSize / 2);
          ctx.translate(0, fontSize + padding);
        }
        break;
    }
  }

  onSnapshot() {
    return {
      style: removeUndefinedProps(this.style),
    };
  }

  getCanvasPositionForPoint(point: XYPoint): CanvasPosition {
    // @TODO: implement when needed
    return { x: 0, y: 0, absoluteX: 0, absoluteY: 0 };
  }

  getPointForCanvasPosition(position: XYPoint): XYPoint {
    // @TODO: implement when needed
    return { x: 0, y: 0 };
  }

  private drawDataSeriesSymbol(canvas: ViewCanvas, series: LegendDataSeries) {
    const ctx = canvas.context;
    const lineWidth = series.lineWidth || 0;
    const size = this.font.fontSize - lineWidth;
    const radius = normalizeRadius(series.radius);

    ctx.translate(lineWidth / 2, lineWidth / 2);
    switch (series.type) {
      case LegendSeriesType.AREA:
        ctx.beginPath();
        ctx.moveTo(0, size);
        ctx.lineTo(0.33 * size, 0.3 * size);
        ctx.lineTo(0.66 * size, 0.6 * size);
        ctx.lineTo(size, 0.1 * size);
        ctx.lineTo(size, size);
        ctx.closePath();
        break;
      case LegendSeriesType.BAR:
        ctx.beginPath();
        canvas.roundRect(0, .4 * size, size / 3, .6 * size, radius);
        canvas.roundRect(size / 3, .2 * size, size / 3, .8 * size, radius);
        canvas.roundRect(2 * size / 3, .6 * size, size / 3, .4 * size, radius);
        break;
      case LegendSeriesType.LINE:
        ctx.beginPath();
        ctx.moveTo(0, size);
        ctx.lineTo(.33 * size, .3 * size);
        ctx.lineTo(.66 * size, .7 * size);
        ctx.lineTo(size, .1 * size);
        break;
      case LegendSeriesType.PIE:
        ctx.beginPath();
        const pi2 = Math.PI * 2;
        ctx.moveTo(0, size);
        ctx.arc(0, size, size, -.22 * pi2, -.09 * pi2);
        ctx.closePath();
        break;
      default:
        ctx.beginPath();
        canvas.roundRect(0, 0, size, size, radius);
        break;
    }
    if (series.fillStyle) {
      ctx.fillStyle = series.fillStyle;
      ctx.fill();
    }
    if (series.strokeStyle && series.lineWidth) {
      ctx.setLineDash(series.lineDash || []);
      ctx.lineWidth = series.lineWidth;
      ctx.strokeStyle = series.strokeStyle;
      ctx.stroke();
    }
    ctx.translate(-lineWidth / 2, -lineWidth / 2);
  }

  private getSeriesTextWidth(canvas: ViewCanvas, series: LegendDataSeries) {
    return canvas.measureText({
      text: series.name,
      fontString: font(this.style.font || defaultStyle.font),
    }).width;
  }

  private get padding(): number {
    return this.style.padding || defaultStyle.padding;
  }

  private get font(): Font {
    return this.style.font || defaultStyle.font;
  }
}
