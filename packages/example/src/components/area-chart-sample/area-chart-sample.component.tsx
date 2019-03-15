import {
  AxisOrientation,
  DataContainer,
  DataContainerTransformExtension,
  GridLines,
  SnapValuesMatch,
  XYPoint,
  YValuesMatch,
} from '@kanva/charts';
import { AreaChartView, AxisView, ChartGridView } from '@kanva/charts-react';
import { Visibility } from '@kanva/core';
import { Kanva, View } from '@kanva/react';
import * as React from 'react';
import { Crosshair } from '../crosshair';
import { fabricateCrosshairEvent } from '../crosshair/crosshair.helper';
import { Tooltip } from '../tooltip';
import { layout, Views } from './area-chart-sample.layout';
import { MOCK } from './area-chart-sample.mock';
import {
  baseTickCount,
  chartGridStyle,
  Series,
  SeriesColors,
  SeriesStyles,
  xAxisStyle,
  yAxisStyle,
} from './area-chart-sample.styles';

const nulledConsumption = MOCK.consumptionPower.map(({ x, y }) => ({ x, y: y > 1000 ? y : null }));

interface State {
  filters: Record<string, boolean>;
  tooltipData?: {
    snap?: SnapValuesMatch,
    match?: YValuesMatch,
  };
  scale: number;
}

export class AreaChartSample extends React.Component<{}, State> {
  container = new DataContainer<XYPoint<number | null>>()
    .setData([
      {
        name: Series.CONSUMPTION,
        data: nulledConsumption,
      },
      {
        name: Series.DIRECT_USAGE,
        data: MOCK.directUsagePower,
      },
      {
        name: Series.PRODUCTION,
        data: MOCK.productionPower,
      },
    ])
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
    .setYAxisParameters({
      useApproximateValues: true,
      tickCount: 8,
      labelAccessor: (value: number) => (value / 1000) + ' kWh',
    });
  percentageContainer = new DataContainer<any>()
    .setData([
      {
        name: Series.BATTERY_STATE,
        data: MOCK.batteryUsoc,
      },
    ])
    .setYBoundsExtension([0, 100]);

  canvasRef?: HTMLCanvasElement;

  state: State = {
    filters: {
      [Series.BATTERY_STATE]: true,
      [Series.PRODUCTION]: true,
      [Series.CONSUMPTION]: true,
      [Series.DIRECT_USAGE]: true,
    },
    scale: 1,
  };

  constructor(props: {}) {
    super(props);
    const transformExtension = new DataContainerTransformExtension({
      scale: {
        limit: { x: [1, 10] },
        listener: this.handleScale,
      },
    });
    this.container.addExtension(transformExtension);
    this.percentageContainer.addExtension(transformExtension);
  }

  handleScale = (scaleX: number) => {
    const scale = Math.floor(Math.log2(scaleX));
    this.setState(state => {
      if (this.state.scale === scale) {
        return null;
      }
      const axisParams = this.container.getXAxisParameters();
      axisParams.tickCount = 1 + (baseTickCount - 1) * Math.floor(scaleX);
      this.container.setXAxisParameters(axisParams);
      return { scale };
    });
  };

  handleMove = ({ nativeEvent }: React.TouchEvent) => {
    if (this.canvasRef) {
      const fabricatedEvent = fabricateCrosshairEvent(this.canvasRef!, nativeEvent);
      this.canvasRef.dispatchEvent(fabricatedEvent);
    }
  };

  onFilterClick = (filter: string) => () => {
    this.setState(({ filters }) => ({
      filters: {
        ...filters,
        [filter]: !filters[filter],
      },
    }));
  };

  isVisible = (filter: string) => this.state.filters[filter]
    ? Visibility.VISIBLE
    : Visibility.INVISIBLE;

  renderFilterButton(name: Series) {
    return (
      <button
        className={'c-filter-btn'}
        style={{ color: SeriesColors[name] }}
        onClick={this.onFilterClick(name)}
      >
        {name.toUpperCase()}
      </button>
    );
  }

  setCanvasRef = (instance: HTMLCanvasElement | null) => {
    this.canvasRef = instance || undefined;
  };

  render() {
    const { tooltipData } = this.state;
    return (
      <div className={'c-area-chart-sample'}>
        <div>
          <span className={'c-text'}>Filters:</span>
          {this.renderFilterButton(Series.CONSUMPTION)}
          {this.renderFilterButton(Series.PRODUCTION)}
          {this.renderFilterButton(Series.DIRECT_USAGE)}
          {this.renderFilterButton(Series.BATTERY_STATE)}
        </div>
        <Tooltip
          data={tooltipData && tooltipData.match}
          xFormatter={x => new Date(x * 1000).toString()}
        />
        <Kanva
          className={'c-sample-canvas'}
          enablePointerEvents={true}
          canvasRef={this.setCanvasRef}
        >
          <View layoutParams={layout.areaChartWrapper}>
            <ChartGridView
              layoutParams={layout.areaChart}
              dataContainer={this.container}
              style={chartGridStyle}
              gridLines={GridLines.HORIZONTAL}
            />
            <AreaChartView
              layoutParams={layout.areaChart}
              dataContainer={this.container}
              dataSeries={Series.CONSUMPTION}
              visibility={this.isVisible(Series.CONSUMPTION)}
              style={SeriesStyles[Series.CONSUMPTION]}
            />
            <AreaChartView
              layoutParams={layout.areaChart}
              dataContainer={this.container}
              dataSeries={Series.DIRECT_USAGE}
              visibility={this.isVisible(Series.DIRECT_USAGE)}
              style={SeriesStyles[Series.DIRECT_USAGE]}
            />
            <AreaChartView
              layoutParams={layout.areaChart}
              dataContainer={this.container}
              dataSeries={Series.PRODUCTION}
              visibility={this.isVisible(Series.PRODUCTION)}
              style={SeriesStyles[Series.PRODUCTION]}
              onChartPointerEvent={event => {
                this.setState({
                  tooltipData: {
                    snap: event.snap,
                    match: event.match,
                  },
                });
              }}
              onMount={view => {
                const production = MOCK.productionPower;
                const canvasPosition = (view as any)
                  .getCanvasPositionForPoint({
                    ...production[production.length - 1],
                  });
                const values = this.container
                  .getYValuesMatch(production[production.length - 1].x);
                this.setState({
                  tooltipData: {
                    snap: {
                      x: canvasPosition.absoluteX,
                      y: canvasPosition.absoluteY,
                    },
                    match: values,
                  },
                });
              }}
            />
            <AreaChartView
              layoutParams={layout.areaChart}
              dataContainer={this.percentageContainer}
              dataSeries={Series.BATTERY_STATE}
              visibility={this.isVisible(Series.BATTERY_STATE)}
              style={SeriesStyles[Series.BATTERY_STATE]}
            />
          </View>
          <AxisView
            id={Views.X_AXIS}
            layoutParams={layout.xAxis}
            dataContainer={this.container}
            orientation={AxisOrientation.HORIZONTAL}
            style={xAxisStyle}
            borderColor={'#FFF'}
            border={{ top: 1 }}
          />
          <AxisView
            id={Views.Y_AXIS}
            layoutParams={layout.yAxis}
            dataContainer={this.container}
            orientation={AxisOrientation.VERTICAL}
            borderColor={'#FFF'}
            border={{ left: 1 }}
            style={yAxisStyle}
          />
        </Kanva>
        <Crosshair
          snap={tooltipData && tooltipData.snap}
          onMove={this.handleMove}
        />
      </div>
    );
  }
}
