import { DataContainer } from '@kanva/charts';
import { PieChartView } from '@kanva/charts-react';
import { Kanva } from '@kanva/react';
import * as React from 'react';
import { layout } from './pie-chart-sample.layout';
import { MOCK } from './pie-chart-sample.mock';
import { pieChartStyle, pieChartStyle2, pieChartStyle3, Series } from './pie-chart-sample.styles';

const container = new DataContainer<number>()
  .setData([
    {
      name: Series.PRODUCTION,
      data: MOCK.production,
    },
    {
      name: Series.GRID,
      data: MOCK.grid,
    },
  ])
  .setPointAccessor(point => ({
    x: point as number,
    y: point as number,
  }));

const container2 = new DataContainer<number>()
  .setData([
    {
      name: Series.PRODUCTION,
      data: [1],
    },
    {
      name: Series.GRID,
      data: [99],
    },
  ])
  .setPointAccessor(point => ({
    x: point as number,
    y: point as number,
  }));

export class PieChartSample extends React.Component {

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
            dataContainer={container2}
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
