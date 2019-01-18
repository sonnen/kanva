import { createReactView } from '@kanva/react';
import { AreaChartView, AreaChartViewProps, AxisView, AxisViewProps } from './views';

export const React = {
  AxisView: createReactView<AxisViewProps>(AxisView),
  AreaChartView: createReactView<AreaChartViewProps>(AreaChartView),
};
