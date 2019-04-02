import {
  AreaChartView as KanvaAreaChartView,
  AreaChartViewProps,
  AxisView as KanvaAxisView,
  AxisViewProps,
  BarChartView as KanvaBarChartView,
  BarChartViewProps,
  ChartGridView as KanvaChartGridView,
  ChartGridViewProps,
  LegendView as KanvaLegendView,
  LegendViewProps,
  LineChartView as KanvaLineChartView,
  LineChartViewProps,
  PieChartView as KanvaPieChartView,
  PieChartViewProps,
} from '@kanva/charts';
import { createReactView } from '@kanva/react';

export const AxisView = createReactView<AxisViewProps>(KanvaAxisView);
export const ChartGridView = createReactView<ChartGridViewProps>(KanvaChartGridView);
export const AreaChartView = createReactView<AreaChartViewProps>(KanvaAreaChartView);
export const PieChartView = createReactView<PieChartViewProps>(KanvaPieChartView);
export const BarChartView = createReactView<BarChartViewProps>(KanvaBarChartView);
export const LegendView = createReactView<LegendViewProps>(KanvaLegendView);
export const LineChartView = createReactView<LineChartViewProps>(KanvaLineChartView);
