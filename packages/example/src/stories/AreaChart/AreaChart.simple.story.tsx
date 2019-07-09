import { AxisOrientation, GridLines } from '@kanva/charts';
import * as React from 'react';
import { Kanva } from '@kanva/react';
import { AreaChartView as AreaChartViewComponent, AxisView, ChartGridView } from '@kanva/charts-react';
import { boolean } from '@storybook/addon-knobs';
import simpleAreaChartNotes from './AreaChart.simple.notes.md';
import { layout, Views } from './AreaChart.layouts';
import { createDataContainer } from './AreaChart.dataContainer';
import { styles } from './AreaChart.styles';

export { simpleAreaChartNotes };

export const simpleAreaChartStory = () => {
  const dataContainer = createDataContainer();
  const debug = boolean('Debug', false);

  return (
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
  );
};
