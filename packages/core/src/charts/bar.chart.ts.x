import { scaleLinear, ScaleLinear } from 'd3-scale';
import { isNil, last } from 'lodash';
import { isBright, parseColor } from '../color.util';
import { BarChartOptions, DrawBarsOptions, LegendElement, SeriesData, Type } from './bar.chart.types';
import { Chart } from './chart.util';
import { Rect, ZERO_RECT } from '../canvas/rect';

export class BarChart extends Chart {
  private scale: ScaleLinear<number, number>;
  private series: SeriesData[] = [];
  private legend: LegendElement[] = [];

  private titleRect: Rect = ZERO_RECT;
  private seriesLabelsRect: Rect = ZERO_RECT;
  private tickLabelsRect: Rect = ZERO_RECT;
  private chartRect: Rect = ZERO_RECT;
  private legendRect: Rect = ZERO_RECT;

  constructor(protected options: BarChartOptions) {
    super(options);
    this.scale = scaleLinear();
  }

  addSeries(series: SeriesData) {
    this.series.push(series);
    for (const data of series.data) {
      this.addValuesToScale(data.values);
    }
  }

  layout() {
    const { width, height } = this.options;
    const {
      bounds = new Rect({ left: 0, top: 0, right: width, bottom: height }),
      title, titlePadding = ZERO_RECT,
      tickLabels, tickPadding = ZERO_RECT,
      seriesLabels, seriesPadding = ZERO_RECT,
      legendLabels, legendPadding = ZERO_RECT, legendStyle = { align: 'right' },
      tickCount, tickFormatter,
    } = this.options;

    // Measure title
    this.titleRect = title
      ? new Rect({
        left: bounds.l + titlePadding.l,
        right: bounds.r - titlePadding.r,
        top: bounds.t + titlePadding.t,
        bottom: bounds.t + title.fontSize + titlePadding.t + titlePadding.b,
      })
      : ZERO_RECT;

    // Measure legend
    if (legendLabels) {
      this.legend = this.series.reduce((labels, series) => [
        ...labels,
        ...series.valueLabels
          ? series.valueLabels.map((label, index): LegendElement => ({
            label,
            fillStyle: (series.style.fill && series.style.fill[index % series.style.fill.length]),
            lineDash: series.style.lineDash,
            lineWidth: (series.style.lineWidth && series.style.lineWidth[index % series.style.lineWidth.length]),
            strokeStyle: (series.style.stroke && series.style.stroke[index % series.style.stroke.length]),
          }))
          : [],
      ], [] as LegendElement[]);
      const rectSize = legendLabels.fontSize;
      const rectPadding = rectSize / 2;
      const legendWidth = this.legend.reduce((width, l) => (
        width + this.measureText({ text: l.label, ...legendLabels }).width + rectSize + rectPadding * 3
      ), 0);

      this.legendRect = new Rect({
        top: this.titleRect.b + legendPadding.t,
        bottom: this.titleRect.b + legendPadding.t + legendPadding.b + legendLabels.fontSize,
        left: bounds.l + legendPadding.l,
        right: bounds.r - legendPadding.r,
      });
      switch (legendStyle.align) {
        case 'left':
          this.legendRect = this.legendRect.setRight(this.legendRect.l + legendWidth);
          break;
        case 'right':
          this.legendRect = this.legendRect.setLeft(this.legendRect.r - legendWidth);
          break;
        case 'center':
        default:
          this.legendRect = this.legendRect.setLeft((this.legendRect.w - legendWidth) / 2);
          this.legendRect = this.legendRect.setRight(this.legendRect.l + legendWidth);
          break;
      }
    } else {
      this.legendRect = this.titleRect;
    }

    // Measure series labels
    this.seriesLabelsRect = seriesLabels
      ? new Rect({
        bottom: bounds.b - seriesPadding.b,
        top: bounds.b - (seriesPadding.b + seriesLabels.fontSize + seriesPadding.t),
        left: bounds.l + seriesPadding.l,
        right: bounds.r - seriesPadding.r,
      })
      : ZERO_RECT;

    // Determine chart height
    this.chartRect = new Rect({
      top: this.legendRect.b,
      bottom: this.seriesLabelsRect.t,
      left: this.seriesLabelsRect.l,
      right: this.seriesLabelsRect.r,
    });
    this.scale = this.scale
      .range([this.chartRect.b, this.chartRect.t])
      .nice(tickCount)
      .clamp(true);

    // Measure tick labels
    if (tickLabels) {
      const tickLabelsWidth = this.scale.ticks(tickCount)
        .map(tickFormatter || String)
        .reduce((width, text) => Math.max(width, this.measureText({ text, ...tickLabels }).width), 0);
      this.tickLabelsRect = new Rect({
        left: bounds.l + tickPadding.l,
        right: bounds.l + tickPadding.l + tickLabelsWidth + tickPadding.r,
        top: this.chartRect.t,
        bottom: this.chartRect.b,
      });
    } else {
      this.tickLabelsRect = ZERO_RECT;
    }

    // Adjust chart rect after determining tick dimensions
    const chartLeft = this.tickLabelsRect.r + tickPadding.r;
    this.seriesLabelsRect = this.seriesLabelsRect.setLeft(chartLeft);
    this.chartRect = this.chartRect.setLeft(chartLeft);
  }

  draw() {
    this.drawTitle();
    this.drawHorizontalAxes(false);
    for (const data of this.series.filter(s => s.type === Type.BAR)) {
      this.drawSeries(data);
    }
    this.drawHorizontalAxes(true);
    for (const data of this.series.filter(s => s.type === Type.LINE)) {
      this.drawSeries(data);
    }
    this.drawLegend();
  }

  private drawTitle() {
    const { title, titlePadding = ZERO_RECT } = this.options;
    if (title) {
      const rect = this.titleRect;

      this.drawText({
        x: rect.l,
        y: rect.b - titlePadding.b,
        maxWidth: rect.w,
        ...title,
      });
    }
  }

  private drawLegend() {
    const { legendPadding = ZERO_RECT, legendLabels } = this.options;
    if (legendLabels) {
      const rectSize = legendLabels.fontSize;
      const rectPadding = rectSize / 2;
      let left = this.legendRect.l;

      for (const { label, ...style } of this.legend) {
        this.drawRect({
          x: left,
          y: this.legendRect.b - legendPadding.b - rectSize,
          w: rectSize,
          h: rectSize,
          ...style,
          radius: 5,
        });

        const { width } = this.measureText({ text: label, ...legendLabels });
        this.drawText({
          ...legendLabels,
          text: label,
          x: left + rectSize + rectPadding,
          y: this.legendRect.b - legendPadding.b,
        });
        left += width + rectSize + 3 * rectPadding;
      }
    }
  }

  private drawHorizontalAxes(zero: boolean) {
    const {
      tickLabels,
      tickCount,
      tickFormatter,
      axisStyle, zeroAxisStyle,
    } = this.options;
    if (tickLabels) {
      const ticks = this.scale.ticks(tickCount);
      for (const tick of ticks) {
        if (zero ? !tick : tick) {
          const y = this.scale(tick);
          this.drawText({
            ...tickLabels,
            text: (tickFormatter || String)(tick),
            x: this.tickLabelsRect.l,
            y,
            maxWidth: this.tickLabelsRect.w,
            textBaseline: 'middle',
          });
          if (axisStyle) {
            this.drawLine({
              x: this.chartRect.l,
              y,
              x2: this.chartRect.r,
              y2: y,
              lineWidth: 1,
              ...(tick === 0 ? zeroAxisStyle || axisStyle : axisStyle),
            });
          }
        }
      }
    }
  }

  private addValuesToScale(values: number[]) {
    if (isNil(values[0])) {
      return;
    }
    let min = values[0];
    let max = values[0];
    for (const v of values) {
      if (v < min) {
        min = v;
      }
      if (v > max) {
        max = v;
      }
    }
    const [oldMin, oldMax] = this.scale.domain();
    this.scale = this.scale.domain([
      Math.min(oldMin, min),
      Math.max(oldMax, max),
    ]);
  }

  private drawSeries(series: SeriesData) {
    const { seriesLabels } = this.options;
    const groupWidth = this.chartRect.w / series.data.length;

    let left = this.chartRect.l;
    let previousValues: number[] = [];
    for (const data of series.data) {
      this.drawVerticalBars({
        type: series.type,
        ...series.style,
        formatter: series.formatter || String,
        left,
        right: left + groupWidth,
        values: data.values,
        previousValues,
      });
      if (seriesLabels && data.label) {
        this.drawText({
          ...seriesLabels,
          text: data.label,
          x: left + groupWidth / 2,
          y: this.seriesLabelsRect.b,
        });
      }
      previousValues = data.values;
      left += groupWidth;
    }
  }

  private drawVerticalBars({
    type,
    fill, lineWidth: lineWidths, stroke, lineDash,
    formatter,
    left, right,
    barWidth,
    values,
    previousValues,
    drawLabels,
  }: DrawBarsOptions) {
    const { valueLabels, valuePadding = ZERO_RECT } = this.options;
    const totalWidth = right - left;
    let singleBarWidth = barWidth <= 1 ? totalWidth * barWidth : barWidth;
    if (singleBarWidth > totalWidth / values.length) {
      singleBarWidth = totalWidth / values.length;
    }
    const barsStart = (right + left - singleBarWidth * values.length) / 2;

    const zero = this.scale(0);

    let lastValue = last(previousValues);

    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      const previousScaledValue = lastValue ? this.scale(lastValue) : undefined;
      const scaledValue = this.scale(value);
      const y = Math.min(zero, scaledValue);
      const h = Math.max(zero, scaledValue) - y;

      const fillStyle = fill && fill[i % fill.length];
      const strokeStyle = stroke && stroke[i % stroke.length];
      const lineWidth = lineWidths && lineWidths[i % lineWidths.length];

      switch (type) {
        case Type.LINE:
          const startX = barsStart + singleBarWidth * i;
          const endX = startX + singleBarWidth;
          if (previousScaledValue) {
            this.drawLine({
              x: startX,
              y: previousScaledValue,
              x2: startX,
              y2: scaledValue,
              fillStyle,
              strokeStyle,
              lineWidth,
              lineDash,
            });
          }
          this.drawLine({
            x: startX,
            y: scaledValue,
            x2: endX,
            y2: scaledValue,
            fillStyle,
            strokeStyle,
            lineWidth,
            lineDash,
          });
          break;
        case Type.BAR:
        default:
          this.drawRect({
            x: barsStart + singleBarWidth * i,
            w: singleBarWidth,
            y,
            h,
            fillStyle,
            strokeStyle,
            lineWidth,
            lineDash,
            radius: scaledValue < zero ? { tl: 5, tr: 5 } : { bl: 5, br: 5 },
          });
          break;
      }

      if (drawLabels && valueLabels) {
        this.drawText({
          x: barsStart + singleBarWidth * (i + .5),
          y: scaledValue < zero
            ? Math.min(
              zero - valueLabels.fontSize - valuePadding.t,
              scaledValue + valueLabels.fontSize + valuePadding.t,
            )
            : Math.max(
              scaledValue - valuePadding.t,
              zero + valueLabels.fontSize + valuePadding.t,
            ),
          text: formatter(value),
          fillStyle: (valueLabels.darkFillStyle && valueLabels.lightFillStyle)
            ? isBright(parseColor(fillStyle!)!) ? valueLabels.darkFillStyle : valueLabels.lightFillStyle
            : undefined,
          ...valueLabels,
        });
      }

      lastValue = value;
    }
  }
}
