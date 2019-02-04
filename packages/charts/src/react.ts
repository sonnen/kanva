import { createReactView } from '@kanva/react';
import {
  AreaChartView,
  AreaChartViewProps,
  AxisView,
  AxisViewProps,
  BarChartView,
  BarChartViewProps,
  ChartGridView,
  ChartGridViewProps,
  PieChartView,
  PieChartViewProps,
} from './views';

export const ReactCharts = {
  AxisView: createReactView<AxisViewProps>(AxisView),
  ChartGridView: createReactView<ChartGridViewProps>(ChartGridView),
  AreaChartView: createReactView<AreaChartViewProps>(AreaChartView),
  PieChartView: createReactView<PieChartViewProps>(PieChartView),
  BarChartView: createReactView<BarChartViewProps>(BarChartView),
};
