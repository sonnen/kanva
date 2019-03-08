import { CanvasPointerEvent, ScaleEvent, ScaleGestureDetector } from '@kanva/core';
import { XYPoint } from '../chart.types';
import { ChartView } from '../views';

export class DataContainerTransform {
  scale: XYPoint = { x: 1, y: 1 };
  scaleLimit: [XYPoint, XYPoint] = [{ x: 1, y: 1 }, { x: 10, y: 1 }];
  translate: XYPoint = { x: 0, y: 0 };

  private scaleGestureDetector = new ScaleGestureDetector({
    onScale: (event: ScaleEvent) => {
      const scaleX = Math.max(this.scaleLimit[0].x, Math.min(this.scaleLimit[1].x, this.scale.x * event.scaleFactorX));
      if (this.scale.x !== scaleX) {
        this.scale.x = scaleX;
        const target = event.pointerEvent.target as ChartView<any, any>;
        const { xScale } = target.getDataContainer()!.getScales(target.innerWidth, target.innerHeight);
        const translateX = xScale.invert(this.translate.x);
        const centerX = xScale.invert(event.current.centerX);
        // TODO figure out how to translate the chart properly during zoom, with relation to the pointer position
        // console.log(translateX, centerX, scaleX);
        // this.translate.x -= xScale((translateX - centerX) * (1 - event.scaleFactorX));
        this.onTransformChanged();
        return true;
      }
      return false;
    },
    multitouch: true,
    scroll: true,
  });

  constructor(
    private onTransformChanged: () => void,
  ) {
  }

  processZoomEvent(event: CanvasPointerEvent) {
    return this.scaleGestureDetector.onPointerEvent(event);
  }

  processPanEvent(event: CanvasPointerEvent) {
    let xTranslate = this.translate.x;
    if (event.scrollX) {
      // const lastChunk = this.data[this.data.length - 1];
      // const width = lastChunk[lastChunk.length - 2];
      xTranslate = this.translate.x - event.scrollX / this.scale.x;
    }

    if (this.translate.x !== xTranslate) {
      // this.translate.x = xTranslate;
      this.onTransformChanged();
      return true;
    }
    return false;
  }

  xScaleRange(range: [number, number]) {
    return range.map(value => (value) * this.scale.x - this.translate.x);
  }

  yScaleRange(range: [number, number]) {
    return range.map(value => (value) * this.scale.y - this.translate.y);
  }
}
