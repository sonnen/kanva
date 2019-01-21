import {
  AreaChartViewStyle,
  AxisOrientation,
  AxisViewStyle,
  DataContainer,
  DataDisplayType,
  ReactCharts,
} from '@kanva/charts';
import { LayoutParams, MATCH_PARENT, TextAlign, TextBaseline } from '@kanva/core';
import { Kanva } from '@kanva/react';
import * as React from 'react';
import { rgba } from '../utils/color.utils';
import { MOCK } from './mock';

const { AreaChartView, AxisView } = ReactCharts;

const chartStyle: AreaChartViewStyle = {
  type: DataDisplayType.AREA,
  fillColor: rgba('#4ccfef', .5),
  lineThickness: 1,
  strokeColor: '#4ccfef',
};

const xAxisStyle: AxisViewStyle = {
  strokeColor: '#FFFFFF',
  textColor: '#FFFFFF',
  textAlign: TextAlign.START,
  textBaseline: TextBaseline.MIDDLE,
};

const yAxisStyle: AxisViewStyle = {
  strokeColor: '#FFFFFF',
  textColor: '#FFFFFF',
  textAlign: TextAlign.END,
  textBaseline: TextBaseline.BOTTOM,
};

const chartParams = new LayoutParams()
  .width(MATCH_PARENT)
  .height(MATCH_PARENT)
  .alignParentTop()
  .above('xAxis')
  .toEndOf('yAxis')
  .alignEnd('xAxis')
  .asProps();

const xAxisParams = new LayoutParams()
  .width(MATCH_PARENT)
  .height(40)
  .alignParentEnd()
  .toEndOf('yAxis')
  .alignParentBottom()
  .asProps();

const yAxisParams = new LayoutParams()
  .width(60)
  .height(MATCH_PARENT)
  .alignParentTop()
  .above('xAxis')
  .asProps();

const container = new DataContainer<any>()
  .setData([
    {
      name: 'mockSeries',
      data: MOCK,
    },
  ])
  .setXTicksCount(4)
  .setYTicksCount(8)
  .setXAxisLabelAccessor((value: number) => {
    const time = new Date(value * 1000);
    return `${`0${time.getHours()}`.slice(-2)}:${`0${time.getMinutes()}`.slice(-2)}`;
  })
  .setXBounds([MOCK[0].x + 24 * 3600])
  .setYAxisLabelAccessor((value: number, index: number, values: number[]) =>
    index === values.length - 1
      ? ''
      : (value / 1000) + ' kWh',
  );

export const AreaChartSample: React.FunctionComponent = () => (
  <Kanva className={'c-sample-canvas'}>
    <AreaChartView
      id={'chart'}
      layoutParams={chartParams}
      dataContainer={container}
      dataSeries={'mockSeries'}
      style={chartStyle}
    />
    <AxisView
      id={'xAxis'}
      layoutParams={xAxisParams}
      dataContainer={container}
      orientation={AxisOrientation.HORIZONTAL}
      style={xAxisStyle}
    />
    <AxisView
      id={'yAxis'}
      layoutParams={yAxisParams}
      dataContainer={container}
      orientation={AxisOrientation.VERTICAL}
      style={yAxisStyle}
    />
  </Kanva>
);
