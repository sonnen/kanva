import { createReactView } from '@kanva/react';
import {
  AreaChartView,
  AreaChartViewProps,
  AxisView,
  AxisViewProps,
  BarChartView,
  BarChartViewProps,
  PieChartView,
  PieChartViewProps,
} from './views';

export const ReactCharts = {
  AxisView: createReactView<AxisViewProps>(AxisView),
  AreaChartView: createReactView<AreaChartViewProps>(AreaChartView),
  PieChartView: createReactView<PieChartViewProps>(PieChartView),
  BarChartView: createReactView<BarChartViewProps>(BarChartView),
};
