import * as React from 'react';
import {
  AxisOrientation,
  GridLines,
  DataContainerTransformExtension,
  DataContainerTooltipExtension,
  SimpleOnScaleListenerArgs,
} from '@kanva/charts';
import { Kanva } from '@kanva/react';
import { AreaChartView as AreaChartViewComponent, AxisView, ChartGridView, ChartZoomView } from '@kanva/charts-react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { createDataContainer } from './AreaBandChart.dataContainer';
import { layout, Views } from './AreaBandChart.layouts';
import { styles } from './AreaBandChart.styles';
import bandAreaChartNotes from './AreaBandChart.notes.md';

export { bandAreaChartNotes };

export const bandAreaChartStory = () => {
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
      scroll: false,
      selectArea: true,
      drag: false,
    },
  });

  const tooltipExtension = new DataContainerTooltipExtension({
    onTooltipEvent: action('ChartPointerEvent'),
  })

  dataContainer.addExtension(transformExtension, tooltipExtension);

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
            style={styles.zoomArea}
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
