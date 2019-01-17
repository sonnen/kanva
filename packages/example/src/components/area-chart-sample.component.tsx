import { AreaChartReactView } from '@kanva/charts';
import { LayoutParams, MATCH_PARENT } from '@kanva/core';
import { Kanva, View } from '@kanva/react';
import * as React from 'react';

const wrapperParams = () => new LayoutParams()
  .width(MATCH_PARENT)
  .height(MATCH_PARENT)
  .padding(10)
  .margin(20);

export const AreaChartSample: React.FunctionComponent = () => (
  <Kanva className={'c-sample-canvas'} debug>
    <View backgroundColor={'rgba(255, 255, 255, 0.8)'} layoutParams={wrapperParams()}>
      <View backgroundColor={'rgba(255, 255, 0, 0.6)'} layoutParams={wrapperParams()}>
        <View backgroundColor={'rgba(0, 0, 255, 0.6)'} layoutParams={wrapperParams()}>
          <View backgroundColor={'rgba(0, 255, 255, 0.6)'} layoutParams={wrapperParams()}>
            <AreaChartReactView />
          </View>
        </View>
      </View>
    </View>
  </Kanva>
);
