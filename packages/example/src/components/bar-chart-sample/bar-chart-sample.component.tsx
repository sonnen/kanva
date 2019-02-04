import { AxisOrientation, DataContainer, DataSeriesType, ReactCharts } from '@kanva/charts';
import { Kanva, View } from '@kanva/react';
import * as React from 'react';
import { layout, Views } from './bar-chart-sample.layout';
import { MOCK } from './bar-chart-sample.mock';
import { barChartStyle, Series, xAxisStyle, yAxisStyle } from './bar-chart-sample.styles';

const { BarChartView, AxisView } = ReactCharts;

const container = new DataContainer<number>()
  .setData([
    {
      name: Series.PRODUCTION,
      type: DataSeriesType.XY,
      data: MOCK.production,
    },
    {
      name: Series.CONSUMPTION,
      type: DataSeriesType.XY,
      data: MOCK.consumption,
    },
  ])
  .setPointAccessor((point, index) => ({
    x: index,
    y: point,
  }))
  .setXAxisParameters({
    isGrouped: true,
    labelAccessor: (value: number, index: number) => {
      return index.toString();
    },
  })
  .setYAxisParameters({
    tickCount: 8,
    useApproximateValues: true,
    labelAccessor: (value: number) => (value / 1000) + ' kWh',
  });

export class BarChartSample extends React.Component<{}> {
  render() {
    return (
      <div className={'c-area-chart-sample'}>
        <Kanva className={'c-sample-canvas'}>
          <View layoutParams={layout.chartWrapper}>
            <BarChartView
              layoutParams={layout.barChart}
              dataContainer={container}
              style={barChartStyle}
            />
          </View>
          <AxisView
            id={Views.X_AXIS}
            layoutParams={layout.xAxis}
            dataContainer={container}
            orientation={AxisOrientation.HORIZONTAL}
            style={xAxisStyle}
            borderColor={'#FFF'}
            border={{ top: 1 }}
          />
          <AxisView
            id={Views.Y_AXIS}
            layoutParams={layout.yAxis}
            dataContainer={container}
            orientation={AxisOrientation.VERTICAL}
            borderColor={'#FFF'}
            border={{ right: 1 }}
            style={yAxisStyle}
          />
        </Kanva>
      </div>
    );
  }
}
