import { ChartOptions, DrawOptions, TextOptions, ValueFormatter } from './chart.types';
import { Rect } from '../canvas/rect';

export enum Type {
  BAR = 'bar',
  LINE = 'line',
}

export interface BarChartOptions extends ChartOptions {
  bounds?: Rect;

  title?: TextOptions & DrawOptions;
  titlePadding?: Rect;

  seriesLabels?: Omit<TextOptions & DrawOptions, 'text'>;
  seriesPadding?: Rect;

  tickLabels?: Omit<TextOptions & DrawOptions, 'text'>;
  tickPadding?: Rect;
  tickCount?: number;
  tickFormatter?: ValueFormatter;

  axisStyle?: DrawOptions;
  zeroAxisStyle?: DrawOptions;

  valueLabels?: Omit<TextOptions & DrawOptions & {lightFillStyle: string, darkFillStyle: string}, 'text'>;
  valuePadding?: Rect;

  legendLabels?: Omit<TextOptions & DrawOptions, 'text'>;
  legendPadding?: Rect;
  legendStyle?: LegendStyle;
}

export interface SeriesStyle {
  fill?: string[];
  stroke?: string[];
  lineWidth?: number[];
  lineDash?: number[];
  drawLabels?: boolean;
  barWidth: number;
}

export interface SeriesData {
  type: Type;
  formatter?: ValueFormatter;
  style: SeriesStyle;
  valueLabels?: string[];
  data: BarData[];
}

export interface BarData {
  label?: string;
  values: number[];
}

export interface DrawBarsOptions extends SeriesStyle {
  type: Type;
  left: number;
  right: number;
  values: number[];
  previousValues: number[];
  formatter: ValueFormatter;
}

export interface LegendElement extends DrawOptions {
  label: string;
}

export interface LegendStyle {
  align: 'left'|'center'|'right';
}
