import { AxisOrientation, DataContainer, ReactCharts, XYPoint } from '@kanva/charts';
import { MATCH_PARENT, PARENT_ID, Visibility } from '@kanva/core';
import { Kanva } from '@kanva/react';
import * as React from 'react';
import { Series, SeriesColors, SeriesStyles, Views, xAxisStyle, yAxisStyle } from './area-chart-sample.styles';
import { MOCK } from './mock';

const { AreaChartView, AxisView } = ReactCharts;

const normalize = ({x, y}: Partial<XYPoint>, _: number, all: Partial<XYPoint>[]) => ({
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
  .setXTicksCount(8)
  .setYTicksCount(8)
  .setXBounds([24 * 60])
  .setPointAccessor(normalize)
  .setXAxisLabelAccessor((value: number, index: number, values: number[]) =>
    index === values.length - 1
      ? ''
      : `${`0${Math.floor(value / 60)}`.slice(-2)}:${`0${value % 60}`.slice(-2)}`,
  )
  .setYAxisLabelAccessor((value: number, index: number, values: number[]) =>
    index === values.length - 1
      ? ''
      : (value / 1000) + ' kWh',
  );

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
        style={{
          color: SeriesColors[name],
          background: 'transparent',
          border: 'transparent',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        onClick={this.onFilterClick(name)}
      >
        {name.toUpperCase()}
      </button>
    );
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
        }}
      >
        <div>
          <span style={{ fontSize: 12 }}>Filters:</span>
          {this.renderFilterButton(Series.CONSUMPTION)}
          {this.renderFilterButton(Series.PRODUCTION)}
          {this.renderFilterButton(Series.DIRECT_USAGE)}
          {this.renderFilterButton(Series.BATTERY_STATE)}
        </div>
        <Kanva className={'c-sample-canvas'}>
          <AreaChartView
            id={Views.CHART}
            layoutParams={{
              width: MATCH_PARENT,
              height: MATCH_PARENT,
              alignTop: PARENT_ID,
              above: Views.X_AXIS,
              toEndOf: Views.Y_AXIS,
              alignEnd: PARENT_ID,
            }}
            dataContainer={container}
            dataSeries={Series.CONSUMPTION}
            visibility={this.isVisible(Series.CONSUMPTION)}
            style={SeriesStyles[Series.CONSUMPTION]}
          />
          <AreaChartView
            layoutParams={{
              alignTop: Views.CHART,
              alignBottom: Views.CHART,
              alignStart: Views.CHART,
              alignEnd: Views.CHART,
            }}
            dataContainer={container}
            dataSeries={Series.DIRECT_USAGE}
            visibility={this.isVisible(Series.DIRECT_USAGE)}
            style={SeriesStyles[Series.DIRECT_USAGE]}
          />
          <AreaChartView
            layoutParams={{
              alignTop: Views.CHART,
              alignBottom: Views.CHART,
              alignStart: Views.CHART,
              alignEnd: Views.CHART,
            }}
            dataContainer={container}
            dataSeries={Series.PRODUCTION}
            visibility={this.isVisible(Series.PRODUCTION)}
            style={SeriesStyles[Series.PRODUCTION]}
          />
          <AreaChartView
            layoutParams={{
              alignTop: Views.CHART,
              alignBottom: Views.CHART,
              alignStart: Views.CHART,
              alignEnd: Views.CHART,
            }}
            dataContainer={percentageContainer}
            dataSeries={Series.BATTERY_STATE}
            visibility={this.isVisible(Series.BATTERY_STATE)}
            style={SeriesStyles[Series.BATTERY_STATE]}
          />
          <AxisView
            id={Views.X_AXIS}
            layoutParams={{
              width: MATCH_PARENT,
              height: 40,
              alignEnd: PARENT_ID,
              alignBottom: PARENT_ID,
              padding: { left: 64 },
            }}
            dataContainer={container}
            orientation={AxisOrientation.HORIZONTAL}
            style={xAxisStyle}
            borderColor={'#FFF'}
            border={{ top: 1 }}
          />
          <AxisView
            id={Views.Y_AXIS}
            layoutParams={{
              width: 60,
              height: MATCH_PARENT,
              top: PARENT_ID,
              bottom: PARENT_ID,
              padding: { right: 4 },
            }}
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
