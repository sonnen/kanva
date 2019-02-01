import { Context, RequiredViewChanges, View } from '@kanva/core';
import { DataContainer, DataContainerEvent } from '../data-container';

export interface ChartViewProps<Style> {
  dataContainer?: DataContainer<any>;
  style?: Style;
}

export class ChartView<ChartProps extends ChartViewProps<any>,
  Style = NonNullable<ChartProps['style']>> extends View<ChartProps> {
  protected dataContainer?: DataContainer<any>;
  protected dataSeries?: string;
  protected style: Style;

  constructor(context: Context, name: string, private readonly defaultStyle: Style) {
    super(context, name);
    this.style = defaultStyle;
  }

  onDataContainerEvent = (event: DataContainerEvent) => {
    if (event === DataContainerEvent.DATA_CHANGE) {
      this.require(RequiredViewChanges.LAYOUT);
    }
  };

  getStyle() {
    return this.style;
  }

  setStyle(style: Style | undefined) {
    this.style = style || this.defaultStyle;
    this.require(RequiredViewChanges.DRAW);
  }

  getDataSeries() {
    return this.dataSeries;
  }

  setDataSeries(series: string) {
    this.dataSeries = series;
    this.require(RequiredViewChanges.DRAW);
  }

  getDataContainer() {
    return this.dataContainer;
  }

  setDataContainer(dataContainer: DataContainer<any>) {
    if (this.dataContainer === dataContainer) {
      return;
    }
    if (this.dataContainer) {
      this.dataContainer.removeEventListener(this.onDataContainerEvent);
    }
    this.dataContainer = dataContainer;
    dataContainer.addEventListener(this.onDataContainerEvent);
    this.require(RequiredViewChanges.LAYOUT);
  }

  onSizeChanged(w: number, h: number, ow: number, oh: number) {
    if (this.dataContainer) {
      this.dataContainer.calculate(this.innerWidth, this.innerHeight);
    }
  }

  onDestroy() {
    if (this.dataContainer) {
      this.dataContainer.removeEventListener(this.onDataContainerEvent);
    }
  }

  onSnapshot() {
    return {
      style: this.style,
      dataContainer: this.dataContainer,
      dataSeries: this.dataSeries,
    };
  }

}
