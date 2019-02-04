import { DataContainer, DataSeriesType, ReactCharts } from '@kanva/charts';
import { Kanva } from '@kanva/react';
import * as React from 'react';
import { layout } from './pie-chart-sample.layout';
import { MOCK } from './pie-chart-sample.mock';
import { pieChartStyle, pieChartStyle2, pieChartStyle3, Series } from './pie-chart-sample.styles';

const { PieChartView } = ReactCharts;

const container = new DataContainer<number>()
  .setData([
    {
      name: Series.PRODUCTION,
      type: DataSeriesType.RADIAL,
      data: MOCK.production,
    },
    {
      name: Series.GRID,
      type: DataSeriesType.RADIAL,
      data: MOCK.grid,
    },
  ])
  .setPointAccessor(point => ({
    x: point as number,
    y: point as number,
  }))
  .setYAxisParameters({
    tickCount: 8,
    roundTo: 100,
    labelAccessor: (value: number) => (value / 1000) + ' kWh',
  });

export class PieChartSample extends React.Component<{}> {

  render() {
    return (
      <div className={'c-area-chart-sample'}>
        <Kanva className={'c-sample-canvas'}>
          <PieChartView
            layoutParams={layout.pieChart}
            dataContainer={container}
            style={pieChartStyle}
          />
          <PieChartView
            layoutParams={layout.pieChart2}
            dataContainer={container}
            style={pieChartStyle2}
          />
          <PieChartView
            layoutParams={layout.pieChart3}
            dataContainer={container}
            style={pieChartStyle3}
          />
        </Kanva>
      </div>
    );
  }
}
