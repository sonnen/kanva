import { AreaChartViewStyle, AxisOrientation, DataContainer, DataDisplayType, React as Charts } from '@kanva/charts';
import { AxisViewStyle } from '@kanva/charts';
import { LayoutParams, MATCH_PARENT, WRAP_CONTENT } from '@kanva/core';
import { Kanva } from '@kanva/react';
import * as React from 'react';
import { rgba } from '../utils/color.utils';
import { MOCK } from './mock';

const { AreaChartView, AxisView } = Charts;

const chartParams = new LayoutParams()
  .width(MATCH_PARENT)
  .height(MATCH_PARENT)
  .above('yAxis');

const chartStyle: AreaChartViewStyle = {
  type: DataDisplayType.AREA,
  fillColor: rgba('#4ccfef', .5),
  lineThickness: 1,
  strokeColor: '#4ccfef',
};

const axisStyle: AxisViewStyle = {
  strokeColor: '#FFFFFF',
  textColor: '#FFFFFF',
};

const axisParams = new LayoutParams()
  .width(MATCH_PARENT)
  .height(40)
  .alignParentBottom();

const container = new DataContainer()
  .setData([
    {
      name: 'mockSeries',
      data: MOCK,
    },
  ])
  .setXAxisLabelAccessor((value: number) => {
    const d = new Date(value);
    return d.toLocaleTimeString();
  });

export const AreaChartSample: React.FunctionComponent = () => (
  <Kanva className={'c-sample-canvas'}>
    <AreaChartView
      layoutParams={chartParams}
      dataContainer={container}
      dataSeries={'mockSeries'}
      style={chartStyle}
    />
    <AxisView
      id={'yAxis'}
      layoutParams={axisParams}
      dataContainer={container}
      orientation={AxisOrientation.HORIZONTAL}
      style={axisStyle}
    />
  </Kanva>
);
