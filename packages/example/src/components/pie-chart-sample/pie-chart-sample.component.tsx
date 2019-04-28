import { DataContainer, LabelPosition } from '@kanva/charts';
import { PieChartView } from '@kanva/charts-react';
import { Paint, rgba, TextAlign, TextBaseline } from '@kanva/core';
import { Kanva, TextView } from '@kanva/react';
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

const Text: React.FC<{ paint: Paint }> = ({ paint }) => (
  <TextView
    id={'textView'}
    layoutParams={{
      centerHorizontal: true,
      centerVertical: true,
      height: 100,
      width: 100,
    }}
    text={'This is\na sample text'}
    backgroundColor={rgba('#000', .4)}
    textPaint={paint}
  />
);

export class PieChartSample extends React.Component {

  render() {
    return (
      <div className={'c-area-chart-sample'}>
        <Kanva className={'c-sample-canvas'}>
          <PieChartView
            layoutParams={layout.pieChart}
            dataContainer={container}
            style={pieChartStyle}
            labelOptions={{
              labelsPaint: new Paint().setFillStyle('#FFF'),
              contrastLabelsPaint: new Paint().setFillStyle('#000'),
              labelAccessor: value => (Math.round(value * 1000) / 10) + '%',
              padding: 10,
              position: LabelPosition.OUT,
              isBackgroundBright: false,
            }}
          >
            <Text paint={new Paint()
              .setFillStyle('#FFF')
              .setTextAlign(TextAlign.LEFT)
              .setTextBaseline(TextBaseline.TOP)
            } />
          </PieChartView>
          <PieChartView
            layoutParams={layout.pieChart2}
            dataContainer={container2}
            style={pieChartStyle2}
          >
            <Text paint={new Paint()
              .setFillStyle('#FFF')
              .setTextAlign(TextAlign.CENTER)
              .setTextBaseline(TextBaseline.MIDDLE)
            } />
          </PieChartView>
          <PieChartView
            layoutParams={layout.pieChart3}
            dataContainer={container}
            style={pieChartStyle3}
          >
            <Text paint={new Paint()
              .setFillStyle('#FFF')
              .setTextAlign(TextAlign.RIGHT)
              .setTextBaseline(TextBaseline.BOTTOM)
            } />
          </PieChartView>
        </Kanva>
      </div>
    );
  }
}
