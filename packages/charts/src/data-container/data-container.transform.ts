import { CanvasPointerEvent, PointerAction, ScaleEvent, ScaleGestureDetector } from '@kanva/core';
import { XYPoint } from '../chart.types';
import { ScaleFunction, ScaleFunctions } from '../utils';
import { ChartView } from '../views';
import { DataContainer } from './data-container';
import { DataContainerEventType, GetScalesEvent } from './data-container.events';
import { DataContainerExtension } from './data-container.extension';

export const TRANSFORM_EXTENSION = 'DataContainerTransformExtension';

export class DataContainerTransformExtension extends DataContainerExtension {
  scale: XYPoint = { x: 1, y: 1 };
  scaleLimit: [XYPoint, XYPoint] = [{ x: 1, y: 1 }, { x: 10, y: 1 }];
  translate: XYPoint = { x: 0, y: 0 };

  private scales?: { xScale: ScaleFunction, yScale: ScaleFunction };
  private scaleGestureDetector = new ScaleGestureDetector({
    onScale: (event: ScaleEvent) => {
      const oldScaleX = this.scale.x;
      const scaleX = Math.max(this.scaleLimit[0].x, Math.min(this.scaleLimit[1].x, oldScaleX * event.scaleFactorX));
      if (oldScaleX !== scaleX) {
        const target = event.pointerEvent.target as ChartView<any, any>;
        const { xScale } = this.scales!;
        const [domainMin, domainMax] = xScale.domain();
        const domainWidth = domainMax - domainMin;
        const windowWidth = domainWidth / scaleX;
        const oldWindowWidth = domainWidth / oldScaleX;
        const centerX = xScale.invert(event.current.centerX);
        const translateX = this.translate.x + domainMin;

        const percentage = (centerX - translateX) / oldWindowWidth;
        const newTranslateX = centerX - percentage * windowWidth;

        this.scale.x = scaleX;
        this.translate.x = Math.max(0, Math.min(domainWidth - windowWidth, newTranslateX - domainMin));
        this.postEvent(DataContainerEventType.DATA_CHANGE);
        return true;
      }
      return false;
    },
    multitouch: true,
    scroll: true,
  });

  constructor() {
    super(TRANSFORM_EXTENSION);
  }

  processZoomEvent(event: CanvasPointerEvent, scales: ScaleFunctions) {
    this.scales = scales;
    return this.scaleGestureDetector.onPointerEvent(event);
  }

  processPanEvent(event: CanvasPointerEvent, scales: ScaleFunctions) {
    let newTranslateX = this.translate.x;
    const { xScale } = scales;
    const [domainMin, domainMax] = xScale.domain();
    const domainWidth = domainMax - domainMin;
    const windowWidth = domainWidth / this.scale.x;

    if (event.action === PointerAction.MOVE && event.primaryPointer.pressure > 0) {
      newTranslateX -= xScale.invert(event.primaryPointer.deltaX) - xScale.invert(0);
    }

    if (this.translate.x !== newTranslateX) {
      this.translate.x = Math.max(0, Math.min(domainWidth - windowWidth, newTranslateX));
      this.postEvent(DataContainerEventType.DATA_CHANGE);
      return true;
    }
    return false;
  }

  protected onAttach(dataContainer: DataContainer<any>) {
    dataContainer.addEventListener(DataContainerEventType.GET_SCALES, this.getScales);
  }

  protected onDetach(dataContainer: DataContainer<any>) {
    dataContainer.removeEventListener(DataContainerEventType.GET_SCALES, this.getScales);
  }

  private getScales = ({ payload }: GetScalesEvent): ScaleFunctions => ({
    xScale: this.xScale(payload.xScale),
    yScale: this.yScale(payload.yScale),
  });

  private xScale(scale: ScaleFunction) {
    const [domainMin, domainMax] = scale.domain();
    const [rangeMin, rangeMax] = scale.range();
    const rangeWidth = rangeMax - rangeMin;
    const domainWidth = domainMax - domainMin;
    const translateX = (this.translate.x) / domainWidth * rangeWidth;
    return scale.range([
      (rangeMin - translateX) * this.scale.x,
      (rangeMax - translateX) * this.scale.x,
    ]);
  }

  private yScale(scale: ScaleFunction) {
    const [domainMin, domainMax] = scale.domain();
    const [rangeMin, rangeMax] = scale.range();
    const rangeWidth = rangeMax - rangeMin;
    const domainWidth = domainMax - domainMin;
    const translateY = (this.translate.y) / domainWidth * rangeWidth;

    return scale.range([
      (rangeMin - translateY) * this.scale.y,
      (rangeMax - translateY) * this.scale.y,
    ]);
  }

  private normalizeTranslateX(translateX: number) {
    const { xScale } = this.scales!;
    const [domainMin, domainMax] = xScale.domain();
    const domainWidth = domainMax - domainMin;
    const windowWidth = domainWidth / this.scale.x;
    return Math.max(0, Math.min(domainWidth - windowWidth, translateX - domainMin));
  }
}
