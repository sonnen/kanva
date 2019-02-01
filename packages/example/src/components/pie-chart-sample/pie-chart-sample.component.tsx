import { DataContainer, DataSeriesType, ReactCharts } from '@kanva/charts';
import { Kanva } from '@kanva/react';
import * as React from 'react';
import { layout } from './pie-chart-sample.layout';
import { MOCK } from './pie-chart-sample.mock';
import { PieChartStyle, PieChartStyle2, PieChartStyle3, Series } from './pie-chart-sample.styles';

const { PieChartView } = ReactCharts;

const container = new DataContainer<number>()
  .setData([
    {
      name: Series.PRODUCTION,
      type: DataSeriesType.PIE,
      data: MOCK.production,
    },
    {
      name: Series.GRID,
      type: DataSeriesType.PIE,
      data: MOCK.grid,
    },
  ])
  .setPointAccessor(point => ({
    x: point as number,
    y: point as number,
  }))
  .setXAxisParameters({
    tickCount: 9,
    roundTo: 60 * 60,
    labelAccessor: (value: number) => {
      const date = new Date(value * 1000);
      return (
        `0${date.getUTCHours()}`.slice(-2) +
        ':' +
        `0${date.getUTCMinutes()}`.slice(-2)
      );
    },
  })
  .setYAxisParameters({
    tickCount: 8,
    roundTo: 100,
    labelAccessor: (value: number) => (value / 1000) + ' kWh',
  });

export class PieChartSample extends React.Component<{}> {

  render() {
    return (
      <div className={'c-area-chart-sample'}>
        <Kanva className={'c-sample-canvas'} debug>
          <PieChartView
            layoutParams={layout.pieChart}
            dataContainer={container}
            style={PieChartStyle}
          />
          <PieChartView
            layoutParams={layout.pieChart2}
            dataContainer={container}
            style={PieChartStyle2}
          />
          <PieChartView
            layoutParams={layout.pieChart3}
            dataContainer={container}
            style={PieChartStyle3}
          />
        </Kanva>
      </div>
    );
  }
}
