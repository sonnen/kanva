import { AxisOrientation, DataContainer, DataSeriesType, GridLines, ReactCharts, XYPoint } from '@kanva/charts';
import { Visibility } from '@kanva/core';
import { Kanva, View } from '@kanva/react';
import * as React from 'react';
import { layout, Views } from './area-chart-sample.layout';
import { MOCK } from './area-chart-sample.mock';
import { chartGridStyle, Series, SeriesColors, SeriesStyles, xAxisStyle, yAxisStyle } from './area-chart-sample.styles';

const { AreaChartView, AxisView, ChartGridView } = ReactCharts;

const container = new DataContainer<Partial<XYPoint>>()
  .setData([
    {
      name: Series.CONSUMPTION,
      type: DataSeriesType.XY,
      data: MOCK.consumptionPower,
    },
    {
      name: Series.DIRECT_USAGE,
      type: DataSeriesType.XY,
      data: MOCK.directUsagePower,
    },
    {
      name: Series.PRODUCTION,
      type: DataSeriesType.XY,
      data: MOCK.productionPower,
    },
  ])
  .setXAxisParameters({
    tickCount: 9,
    roundTo: 60 * 60,
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

const percentageContainer = new DataContainer<any>()
  .setData([
    {
      name: Series.BATTERY_STATE,
      type: DataSeriesType.XY,
      data: MOCK.batteryUsoc,
    },
  ])
  .setYBounds([0, 100]);

interface State {
  filters: Record<string, boolean>;
}

export class AreaChartSample extends React.Component<{}, State> {
  state: State = {
    filters: {
      [Series.BATTERY_STATE]: true,
      [Series.PRODUCTION]: true,
      [Series.CONSUMPTION]: true,
      [Series.DIRECT_USAGE]: true,
    },
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

  render() {
    return (
      <div className={'c-area-chart-sample'}>
        <div>
          <span className={'c-text'}>Filters:</span>
          {this.renderFilterButton(Series.CONSUMPTION)}
          {this.renderFilterButton(Series.PRODUCTION)}
          {this.renderFilterButton(Series.DIRECT_USAGE)}
          {this.renderFilterButton(Series.BATTERY_STATE)}
        </div>
        <Kanva className={'c-sample-canvas'}>
          <View layoutParams={layout.areaChartWrapper}>
            <ChartGridView
              layoutParams={layout.areaChart}
              dataContainer={container}
              style={chartGridStyle}
              gridLines={GridLines.HORIZONTAL}
            />
            <AreaChartView
              layoutParams={layout.areaChart}
              dataContainer={container}
              dataSeries={Series.CONSUMPTION}
              visibility={this.isVisible(Series.CONSUMPTION)}
              style={SeriesStyles[Series.CONSUMPTION]}
            />
            <AreaChartView
              layoutParams={layout.areaChart}
              dataContainer={container}
              dataSeries={Series.DIRECT_USAGE}
              visibility={this.isVisible(Series.DIRECT_USAGE)}
              style={SeriesStyles[Series.DIRECT_USAGE]}
            />
            <AreaChartView
              layoutParams={layout.areaChart}
              dataContainer={container}
              dataSeries={Series.PRODUCTION}
              visibility={this.isVisible(Series.PRODUCTION)}
              style={SeriesStyles[Series.PRODUCTION]}
            />
            <AreaChartView
              layoutParams={layout.areaChart}
              dataContainer={percentageContainer}
              dataSeries={Series.BATTERY_STATE}
              visibility={this.isVisible(Series.BATTERY_STATE)}
              style={SeriesStyles[Series.BATTERY_STATE]}
            />
          </View>
          <AxisView
            id={Views.X_AXIS}
            layoutParams={layout.xAxis}
            dataContainer={container}
            orientation={AxisOrientation.HORIZONTAL}
            style={xAxisStyle}
            borderColor={'#FFF'}
            border={{ top: 1 }}
          />
          <AxisView
            id={Views.Y_AXIS}
            layoutParams={layout.yAxis}
            dataContainer={container}
            orientation={AxisOrientation.VERTICAL}
            borderColor={'#FFF'}
            border={{ right: 1 }}
            style={yAxisStyle}
          />
        </Kanva>
      </div>
    );
  }
}