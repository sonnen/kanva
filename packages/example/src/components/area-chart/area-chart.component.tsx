import { AreaChartViewStyle, AxisOrientation, AxisViewStyle, DataContainer, GridLines } from '@kanva/charts';
import { AreaChartView as AreaChartViewComponent, AxisView, ChartGridView } from '@kanva/charts-react';
import { MATCH_PARENT, PARENT_ID, WRAP_CONTENT } from '@kanva/core';
import { createLayoutMap } from '@kanva/core';
import { Kanva } from '@kanva/react';
import * as React from 'react';
import { chartGridStyle } from '../area-chart-sample/area-chart-sample.styles';

// Layout

export const Views = {
  X_AXIS: 'xAxis',
  Y_AXIS: 'yAxis',
};

export const layout = createLayoutMap({
  areaChartWrapper: {
    alignTop: PARENT_ID,
    above: Views.X_AXIS,
    toEndOf: Views.Y_AXIS,
    alignEnd: PARENT_ID,
  },
  areaChart: {
    width: MATCH_PARENT,
    height: MATCH_PARENT,
  },
  xAxis: {
    width: MATCH_PARENT,
    alignBottom: PARENT_ID,
    height: WRAP_CONTENT,
    padding: { top: 4 },
  },
  yAxis: {
    width: WRAP_CONTENT,
    alignTop: PARENT_ID,
    above: Views.X_AXIS,
    padding: { right: 4 },
  },
});

// Component

interface Props {
  dataContainer: DataContainer<any>;
  seriesStyles: Record<string, AreaChartViewStyle>;
  xAxisStyle: AxisViewStyle;
  yAxisStyle: AxisViewStyle;
}

export const AreaChart: React.FC<Props> = ({
  dataContainer,
  seriesStyles,
  xAxisStyle,
  yAxisStyle,
}) => (
  <Kanva enablePointerEvents={true} className={'kanva-container'}>
    <ChartGridView
      layoutParams={layout.areaChartWrapper}
      dataContainer={dataContainer}
      style={chartGridStyle}
      gridLines={GridLines.HORIZONTAL}
    >
      {
        dataContainer.getAllDataSeries().map(series => (
          <AreaChartViewComponent
            key={series.name}
            layoutParams={layout.areaChart}
            dataContainer={dataContainer}
            dataSeries={series.name}
            style={seriesStyles[series.name]}
          />
        ))
      }
    </ChartGridView>
    <AxisView
      id={Views.X_AXIS}
      layoutParams={layout.xAxis}
      dataContainer={dataContainer}
      orientation={AxisOrientation.HORIZONTAL}
      style={xAxisStyle}
    />
    <AxisView
      id={Views.Y_AXIS}
      layoutParams={layout.yAxis}
      dataContainer={dataContainer}
      orientation={AxisOrientation.VERTICAL}
      style={yAxisStyle}
    />
  </Kanva>
);
