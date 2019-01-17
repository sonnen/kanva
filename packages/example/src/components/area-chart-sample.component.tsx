import { AreaChartReactView, DataContainer, DataDisplayType } from '@kanva/charts';
import { LayoutParams, MATCH_PARENT } from '@kanva/core';
import { Kanva, View } from '@kanva/react';
import * as React from 'react';
import { MOCK } from './mock';

const wrapperParams = new LayoutParams()
  .width(MATCH_PARENT)
  .height(MATCH_PARENT)
  .padding(10)
  .margin(20);

const chartParams = new LayoutParams()
  .width(MATCH_PARENT)
  .height(MATCH_PARENT);

const container = new DataContainer()
  .setData([
    {
      name: 'mockSeries',
      data: MOCK,
    },
  ]);

export const AreaChartSample: React.FunctionComponent = () => (
  <Kanva className={'c-sample-canvas'}>
    <View backgroundColor={'rgba(255, 255, 255, 0.8)'} layoutParams={wrapperParams}>
      <View backgroundColor={'rgba(255, 255, 0, 0.6)'} layoutParams={wrapperParams}>
        <View backgroundColor={'rgba(0, 0, 255, 0.6)'} layoutParams={wrapperParams}>
          <View backgroundColor={'rgba(255, 255, 255, 1)'} layoutParams={chartParams}>
            <AreaChartReactView
              layoutParams={chartParams}
              dataContainer={container}
              style={{
                type: DataDisplayType.AREA,
                fillColor: '#333BBB',
                lineThickness: 2,
                strokeColor: '#111888',
              }}
              dataSeries={'mockSeries'}
            />
          </View>
        </View>
      </View>
    </View>
  </Kanva>
);
