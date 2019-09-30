import * as React from 'react';
import { Kanva } from '@kanva/react';
import { LineChartView as LineChartViewComponent, AxisView } from '@kanva/charts-react';
import { boolean } from '@storybook/addon-knobs';
import simpleLineChartNotes from './LineChart.simple.notes.md';
import { layout, Views } from './LineChart.layouts';
import { MOCK } from './LineChart.mock'
import {
  LineChartViewStyle,
  DataContainer,
  AxisOrientation,
  DataContainerTransformExtension
} from '@kanva/charts';
import { Paint } from '@kanva/core';
import { styles } from './LineChart.styles';

export { simpleLineChartNotes };

enum Series {
  HEATER_POWER = 'heaterPower',
}

const SeriesColors = {
  [Series.HEATER_POWER]: '#FF0000',
};

const lineChartStyle: LineChartViewStyle = {
  foreground: {
    paint: new Paint().setFillStyle(SeriesColors[Series.HEATER_POWER]),
    width: 8,
    radius: 8,
  },
  background: {
    paint: new Paint().setFillStyle('#AAA'),
    width: 4,
    radius: 4,
  },
  minChunkLength: {
    domain: .1,
    px: 1,
  }
};

const baseTickCount = 9;

const handleScale = (scaleX: number) => {
  const newScale = Math.floor(Math.log2(scaleX));

  const axisParams = dataContainer.getXAxisParameters();
  axisParams.tickCount = 1 + (baseTickCount - 1) * Math.pow(2, newScale);
  dataContainer.setXAxisParameters(axisParams);
}

const transformExtension = new DataContainerTransformExtension({
  scale: {
    limit: {
      x: [1, 100],
    },
    listener: handleScale,
  },
});

const dataContainer = new DataContainer()
.setData([{
  name: Series.HEATER_POWER,
  data: MOCK.consumptionPower.map(({ x, y }: {x: number, y: number }) => ({ x, y: y > 3000 ? 1 : 0 })),
}])
.setXAxisParameters({
  tickCount: baseTickCount,
  labelAccessor: (value: number) => {
    const date = new Date(value * 1000);
    return (
      `0${date.getUTCHours()}`.slice(-2) +
      ':' +
      `0${date.getUTCMinutes()}`.slice(-2)
    );
  },
})
.addExtension(transformExtension);

export const simpleLineChartStory = () => {
  const debug = boolean('Debug', false);

  return (
    <Kanva
      enablePointerEvents={true}
      className={'kanva-container'}
      debug={debug}
    >
      <LineChartViewComponent
        id={Views.LINE_CHART}
        layoutParams={layout.lineChart}
        dataContainer={dataContainer}
        dataSeries={Series.HEATER_POWER}
        style={lineChartStyle}
      />
      <AxisView
        id={Views.X_AXIS}
        layoutParams={layout.xAxis}
        dataContainer={dataContainer}
        orientation={AxisOrientation.HORIZONTAL}
        borderColor={styles.labelColor}
        border={{ top: 1 }}
        style={styles.xAxis}
      />
    </Kanva>
  );
};
