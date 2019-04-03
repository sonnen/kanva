import {
  Context,
  Font,
  normalizeRadius,
  Paint,
  RadiusInput,
  removeUndefinedProps,
  RequiredViewChanges,
  View,
  ViewCanvas,
} from '@kanva/core';

export interface LegendViewStyle {
  labelPaint: Paint;
  labelPadding?: number;
  alignment?: LegendAlignment;
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
  paint: Paint;
  radius?: RadiusInput;
}

export interface LegendViewProps {
  style: LegendViewStyle;
  dataSeries: LegendDataSeries[];
}

const defaultStyle = {
  labelPaint: new Paint(),
  labelPadding: 4,
  alignment: LegendAlignment.ROW,
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
        labelPaint = defaultStyle.labelPaint,
        labelPadding = defaultStyle.labelPadding,
      } = defaultStyle,
    } = this;

    const ctx = canvas.context;
    const fontSize = this.font.fontSize;
    const padding = this.padding;

    switch (this.style.alignment) {
      case LegendAlignment.ROW:
        for (let i = 0, l = dataSeries.length; i < l; i++) {
          const series = dataSeries[i];
          const { width } = canvas.measureText(series.name, labelPaint);
          this.drawDataSeriesSymbol(canvas, series);
          ctx.translate(fontSize * 1.5, 0);
          canvas.drawText(0, fontSize, series.name, labelPaint);
          ctx.translate(padding + width, 0);
        }
        break;
      case LegendAlignment.COLUMN:
      default:
        for (let i = 0, l = dataSeries.length; i < l; i++) {
          const series = dataSeries[i];
          const { width } = ctx.measureText(series.name);
          this.drawDataSeriesSymbol(canvas, series);
          canvas.drawText(fontSize * 1.5, fontSize, series.name, labelPaint);
          ctx.translate(0, fontSize + padding);
        }
        break;
    }
  }

  onSnapshot() {
    return {
      style: removeUndefinedProps({
        labelPaint: this.style.labelPaint.snapshot(),
        labelPadding: this.style.labelPadding,
        alignment: LegendAlignment[this.style.alignment || defaultStyle.alignment],
      }),
    };
  }

  private drawDataSeriesSymbol(canvas: ViewCanvas, series: LegendDataSeries) {
    const ctx = canvas.context;
    const lineWidth = series.paint.lineWidth || 0;
    const size = this.style.labelPaint.getLineHeight() - lineWidth;
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

    canvas.drawPath(series.paint);
    ctx.translate(-lineWidth / 2, -lineWidth / 2);
  }

  private getSeriesTextWidth(canvas: ViewCanvas, series: LegendDataSeries) {
    return canvas.measureText(series.name, this.style.labelPaint || defaultStyle.labelPaint).width;
  }

  private get padding(): number {
    return this.style.labelPadding || defaultStyle.labelPadding;
  }

  private get font(): Font {
    return this.style.labelPaint.font || defaultStyle.labelPaint.font;
  }
}
