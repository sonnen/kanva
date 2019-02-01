import { createReactView } from '@kanva/react';
import { AreaChartView, AreaChartViewProps, AxisView, AxisViewProps, PieChartView, PieChartViewProps } from './views';

export const ReactCharts = {
  AxisView: createReactView<AxisViewProps>(AxisView),
  AreaChartView: createReactView<AreaChartViewProps>(AreaChartView),
  PieChartView: createReactView<PieChartViewProps>(PieChartView),
};
