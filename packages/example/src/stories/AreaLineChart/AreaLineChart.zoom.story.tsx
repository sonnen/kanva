import { AxisOrientation, GridLines, DataContainerTransformExtension, SimpleOnScaleListenerArgs } from '@kanva/charts';
import * as React from 'react';
import { Kanva } from '@kanva/react';
import {
  AreaChartView as AreaChartViewComponent,
  AxisView,
  ChartGridView,
  ChartZoomView,
} from '@kanva/charts-react';
import { Paint, Rect, rgba } from '@kanva/core';
import { boolean } from '@storybook/addon-knobs';
import zoomAreaChartNotes from './AreaLineChart.zoom.notes.md';
import { layout, Views } from './AreaLineChart.layouts';
import { createDataContainer } from './AreaLineChart.dataContainer';
import { styles } from './AreaLineChart.styles';

export { zoomAreaChartNotes };

export const zoomAreaChartStory = () => {
  const dataContainer = createDataContainer();
  const debug = boolean('Debug', false);
  const baseTickCount = 9;

  const handleScale = ({ scaleX }: SimpleOnScaleListenerArgs) => {
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
      listenerThreshold: 0.001,
      scroll: true,
      selectArea: true,
      drag: false,
    },
  });

  dataContainer.addExtension(transformExtension);

  const resetScale = () => {
    transformExtension.setScale({ x: 1, y: 1 });
  }

  return (
    <div>
      <button onClick={resetScale}>
        Reset scale
      </button>
      <Kanva
        enablePointerEvents={true}
        className={'kanva-container'}
        debug={debug}
      >
        <ChartGridView
          layoutParams={layout.areaChartWrapper}
          dataContainer={dataContainer}
          style={styles.chartGrid}
          gridLines={GridLines.HORIZONTAL}
        >
          {
            dataContainer.getAllDataSeries().map(series => (
              <AreaChartViewComponent
                key={series.name}
                layoutParams={layout.areaChart}
                dataContainer={dataContainer}
                dataSeries={series.name}
                style={styles.series[series.name]}
              />
            ))
            }
            <ChartZoomView
              dataContainer={dataContainer}
              layoutParams={layout.areaChart}
              style={{
                paint: new Paint().setFillStyle(rgba('#FFF', 0.5)).setStrokeStyle('#FFF'),
                borders: new Rect({left: 5, right: 5, top: 5, bottom: 5 }),
              }}
            />
        </ChartGridView>
        <AxisView
          id={Views.X_AXIS}
          layoutParams={layout.xAxis}
          dataContainer={dataContainer}
          orientation={AxisOrientation.HORIZONTAL}
          style={styles.xAxis}
        />
        <AxisView
          id={Views.Y_AXIS}
          layoutParams={layout.yAxis}
          dataContainer={dataContainer}
          orientation={AxisOrientation.VERTICAL}
          style={styles.yAxis}
        />
      </Kanva>
    </div>
  );
};
