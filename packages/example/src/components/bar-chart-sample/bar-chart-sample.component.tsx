import {
  AxisOrientation,
  BarChartView,
  DataContainer,
  DataContainerTooltipExtension,
  GridLines,
  LabelPosition,
  LegendAlignment,
  LegendSeriesType,
  TooltipEvent,
  TooltipEventHandler,
} from '@kanva/charts';
import { AxisView, BarChartView as BarChartViewComponent, ChartGridView, LegendView } from '@kanva/charts-react';
import { Paint, View } from '@kanva/core';
import { Kanva, View as ViewComponent } from '@kanva/react';
import * as React from 'react';
import { chartGridStyle } from '../area-chart-sample/area-chart-sample.styles';
import { Crosshair } from '../crosshair';
import { Tooltip } from '../tooltip';
import { layout, Views } from './bar-chart-sample.layout';
import { MOCK } from './bar-chart-sample.mock';
import { barChartStyle, Series, SeriesColors, xAxisStyle, yAxisStyle } from './bar-chart-sample.styles';

const container = new DataContainer<number>()
  .setData([
    {
      name: Series.PRODUCTION,
      data: MOCK[Series.PRODUCTION],
    },
    {
      name: Series.CONSUMPTION,
      data: MOCK[Series.CONSUMPTION],
    },
  ])
  .setYBoundsExtension([0])
  .setPointAccessor((point, index) => ({
    x: index,
    y: point,
  }))
  .setXAxisParameters({
    isGrouped: true,
    labelAccessor: (value: number, index: number) => {
      return index.toString();
    },
  })
  .setYAxisParameters({
    tickCount: 8,
    useApproximateValues: true,
    labelAccessor: (value: number) => (value / 1000) + ' kWh',
  });

interface State {
  tooltipEvent?: TooltipEvent;
}

export class BarChartSample extends React.Component<{}, State> {
  state: State = {};

  private tooltipExtension?: DataContainerTooltipExtension;

  constructor(props: {}) {
    super(props);
    this.tooltipExtension = new DataContainerTooltipExtension();
    this.tooltipExtension.setTooltipEventHandler(this.handleTooltipEvent);

    container.addExtension(this.tooltipExtension);
  }

  handleCanvasRef = (canvas: HTMLCanvasElement | null) => {
    this.tooltipExtension!.setCanvasOffset(canvas);
  };

  handleViewRef = (view: View<any>) => {
    if (this.tooltipExtension) {
      this.tooltipExtension.setView(view);
    }
  };

  handleTooltipEvent: TooltipEventHandler = (event) => {
    if (this.state.tooltipEvent === event) {
      return;
    }

    this.setState({ tooltipEvent: event });
  };

  handleTooltipPositionChange = (x: number) => {
    if (this.tooltipExtension) {
      this.tooltipExtension.setPosition({ x, y: 0 });
    }
  };

  componentWillUnmount() {
    if (this.tooltipExtension) {
      container.removeExtension(this.tooltipExtension);
    }
  }

  render() {
    const { tooltipEvent } = this.state;
    return (
      <div className={'c-area-chart-sample'}>
        <Tooltip data={tooltipEvent && tooltipEvent.match} />
        <Kanva
          className={'c-sample-canvas'}
          enablePointerEvents={true}
          canvasRef={this.handleCanvasRef}
        >
          <LegendView
            id={Views.LEGEND}
            layoutParams={layout.legend}
            style={{
              labelPaint: new Paint()
                .setFillStyle('#FFF'),
              labelPadding: 8,
              alignment: LegendAlignment.ROW,
            }}
            dataSeries={[
              {
                name: 'Consumption',
                type: LegendSeriesType.PIE,
                paint: new Paint().setFillStyle(SeriesColors[Series.CONSUMPTION]),
              },
              {
                name: 'Production',
                paint: new Paint()
                  .setFillStyle(SeriesColors[Series.CONSUMPTION])
                  .setLineWidth(2),
                radius: 1,
              },
            ]}
          />
          <ViewComponent layoutParams={layout.chartWrapper}>
            <ChartGridView
              layoutParams={layout.barChart}
              dataContainer={container}
              style={chartGridStyle}
              gridLines={GridLines.HORIZONTAL}
            />
            <BarChartViewComponent
              layoutParams={layout.barChart}
              dataContainer={container}
              labelOptions={{
                labelsPaint: new Paint()
                  .setFont({
                    fontFamily: 'Arial',
                    fontSize: 12,
                  })
                  .setFillStyle('#FFF'),
                contrastLabelsPaint: new Paint()
                  .setFont({
                    fontFamily: 'Arial',
                    fontSize: 12,
                  })
                  .setFillStyle('#000'),
                labelAccessor: x => Math.floor(x / 1000).toString(),
                position: LabelPosition.END,
              }}
              style={barChartStyle}
              viewRef={this.handleViewRef}
              onMount={view => {
                const { absoluteX } = (view as BarChartView<number>)
                  .getCanvasPositionForPoint({ x: 7, y: 0 });
                this.handleTooltipPositionChange(absoluteX);
              }}
            />
          </ViewComponent>
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
        <Crosshair
          snap={tooltipEvent && tooltipEvent.snap}
          offset={tooltipEvent && tooltipEvent.offset}
          onMove={this.handleTooltipPositionChange}
        />
      </div>
    );
  }
}
