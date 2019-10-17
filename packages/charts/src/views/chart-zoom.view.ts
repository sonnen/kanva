import {
  Context,
  ViewCanvas,
  Paint,
  SelectedArea,
  RequiredViewChanges,
} from '@kanva/core';
import { ChartView, ChartViewProps } from './chart.view';
import { XYPoint, CanvasPosition } from '../chart.types';
import { DataContainer } from '../data-container';
import { DataContainerEventType, AreaSelectEvent } from '../data-container/data-container.events';

export interface ChartZoomViewStyle {
  paint: Paint;
}

const defaultStyle: ChartZoomViewStyle = {
  paint: new Paint().setFillStyle('rgba(0,0,0,.5)'),
};

export interface ChartZoomViewProps extends ChartViewProps<ChartZoomViewStyle> {
}

export class ChartZoomView extends ChartView<ChartZoomViewProps> {
  private area?: SelectedArea;

  constructor(context: Context) {
    super(context, 'ChartZoomView', defaultStyle);
  }

  onDataContainerChanged(dataContainer: DataContainer<any>, oldDataContainer: DataContainer<any> | undefined){
    if(oldDataContainer){
      oldDataContainer.removeEventListener(DataContainerEventType.AREA_SELECT, this.onAreaSelect);
    }
    dataContainer.addEventListener(DataContainerEventType.AREA_SELECT, this.onAreaSelect);
  }

  onDestroy(){
    if(this.dataContainer){
      this.dataContainer.removeEventListener(DataContainerEventType.AREA_SELECT, this.onAreaSelect);
    }
  }

  onAreaSelect = (area: AreaSelectEvent) => {
    this.area = area.payload;
    this.require(RequiredViewChanges.DRAW);
    return undefined; // TODO
  };

  onDraw(canvas: ViewCanvas) {
    if (this.area){
      canvas.setPaint(this.style.paint);
      canvas.context.fillRect(this.area.start.x, 0, this.area.end.x-this.area.start.x, this.innerHeight)
    }
  }

  getCanvasPositionForPoint(_point: XYPoint<number>): CanvasPosition {
    throw new Error('Method not implemented.');
  }
  getPointForCanvasPosition(_position: XYPoint<number>): XYPoint<number> | undefined {
    throw new Error('Method not implemented.');
  }

}
