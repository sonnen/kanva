import { AxisOrientation, DataContainer, ReactCharts, XYPoint } from '@kanva/charts';
import { Visibility } from '@kanva/core';
import { Kanva, View } from '@kanva/react';
import * as React from 'react';
import { layout, Views } from './area-chart-sample.layout';
import { Series, SeriesColors, SeriesStyles, xAxisStyle, yAxisStyle } from './area-chart-sample.styles';
import { MOCK } from './mock';

const { AreaChartView, AxisView } = ReactCharts;

const normalize = ({ x, y }: Partial<XYPoint>, _: number, all: Partial<XYPoint>[]) => ({
  y: y!,
  x: (x! - all[0].x!) / 60,
});

const container = new DataContainer<Partial<XYPoint>>()
  .setData([
    {
      name: Series.CONSUMPTION,
      data: MOCK.consumptionPower,
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
    tickCount: 9,
    labelAccessor: (value: number) => `${`0${Math.floor(value / 60)}`.slice(-2)}:${`0${value % 60}`.slice(-2)}`,
    roundTo: 60,
  })
  .setYAxisParameters({
    tickCount: 8,
    roundTo: 100,
    labelAccessor: (value: number) => (value / 1000) + ' kWh',
  })
  .setXBounds([24 * 60])
  .setPointAccessor(normalize);

const percentageContainer = new DataContainer<any>()
  .setData([
    {
      name: Series.BATTERY_STATE,
      data: MOCK.batteryUsoc,
    },
  ])
  .setPointAccessor(normalize)
  .setXBounds([24 * 60])
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
        <Kanva className={'c-sample-canvas'} debug>
          <View layoutParams={layout.areaChartWrapper}>
            <AreaChartView
              id={Views.CHART}
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
