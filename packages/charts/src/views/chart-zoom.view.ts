import {
  Context,
  ViewCanvas,
  Paint,
  RequiredViewChanges,
  rgba,
  Rect,
} from '@kanva/core';
import { ChartView, ChartViewProps } from './chart.view';
import { XYPoint, CanvasPosition } from '../chart.types';
import { DataContainer } from '../data-container';
import { DataContainerEventType, AreaSelectEvent } from '../data-container/data-container.events';

export interface ChartZoomViewStyle {
  paint: Paint;
  borders?: Rect;
}

const defaultStyle: ChartZoomViewStyle = {
  paint: new Paint().setFillStyle(rgba('#FFF', 0.5)).setStrokeStyle('#FFF'),
  borders: new Rect({left: 1, right: 1, top: 1, bottom: 1 }),
};

export interface ChartZoomViewProps extends ChartViewProps<ChartZoomViewStyle> {
}

export class ChartZoomView extends ChartView<ChartZoomViewProps> {
  private area?: Rect;
  private drawnArea: Rect = new Rect({});

  constructor(context: Context) {
    super(context, 'ChartZoomView', defaultStyle);
  }

  onDataContainerChanged(dataContainer: DataContainer<any>, oldDataContainer: DataContainer<any> | undefined){
    if (oldDataContainer) {
      oldDataContainer.removeEventListener(DataContainerEventType.AREA_SELECT, this.onAreaSelect);
    }
    dataContainer.addEventListener(DataContainerEventType.AREA_SELECT, this.onAreaSelect);
  }

  onDestroy(){
    if (this.dataContainer) {
      this.dataContainer.removeEventListener(DataContainerEventType.AREA_SELECT, this.onAreaSelect);
    }
  }

  onAreaSelect = (area: AreaSelectEvent) => {
    this.area = area.payload;
    this.require(RequiredViewChanges.DRAW);
    return undefined; // TODO
  };

  onDraw(canvas: ViewCanvas) {
    if (this.area) {
      this.drawnArea.l = this.area.l;
      this.drawnArea.r = this.area.r;
      this.drawnArea.b = this.innerHeight;
      this.drawnArea.t = 0;
      canvas.drawRect(
        this.drawnArea,
        this.style.paint,
        this.style.borders,
      );
    }
  }

  getCanvasPositionForPoint(_point: XYPoint<number>): CanvasPosition {
    throw new Error('Method not implemented.');
  }
  getPointForCanvasPosition(_position: XYPoint<number>): XYPoint<number> | undefined {
    throw new Error('Method not implemented.');
  }

}
