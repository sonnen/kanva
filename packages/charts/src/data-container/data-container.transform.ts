import { CanvasPointerEvent, DragEvent, DragGestureDetector, ScaleEvent, ScaleGestureDetector } from '@kanva/core';
import defaultsDeep from 'lodash/defaultsDeep';
import { XYPoint } from '../chart.types';
import { DeepPartial, floorToNearest, ScaleFunction, ScaleFunctions } from '../utils';
import { ChartView } from '../views';
import { DataContainer } from './data-container';
import { DataContainerEventType, GetScalesEvent } from './data-container.events';
import { DataContainerExtension } from './data-container.extension';

export const TRANSFORM_EXTENSION = 'DataContainerTransformExtension';

export type SimpleOnScaleListener = (scaleX: number, scaleY: number) => void;

export interface DataContainerTransformExtensionOptions {
  scale: {
    limit: {
      x: [number, number];
      y: [number, number];
    };
    multitouch: boolean;
    scroll: boolean;
    listener?: SimpleOnScaleListener;
    listenerThreshold: number;
  };
  pan: {
    pointers: number;
  };
}

export class DataContainerTransformExtension extends DataContainerExtension {
  public scale: XYPoint = { x: 1, y: 1 };
  public translate: XYPoint = { x: 0, y: 0 };

  private readonly options: DataContainerTransformExtensionOptions;
  private scales?: { xScale: ScaleFunction, yScale: ScaleFunction };
  private scaleGestureDetector: ScaleGestureDetector;
  private dragGestureDetector: DragGestureDetector;

  constructor(options: DeepPartial<DataContainerTransformExtensionOptions>) {
    super(TRANSFORM_EXTENSION);
    this.options = defaultsDeep(options, {
      scale: {
        limit: {
          x: [1, 1],
          y: [1, 1],
        },
        multitouch: true,
        scroll: true,
        listenerThreshold: 1,
      },
      pan: {
        pointers: 1,
      },
    });
    const { scale } = this.options;

    this.scaleGestureDetector = new ScaleGestureDetector({
      onScale: this.onScale,
      scroll: scale.scroll,
      multitouch: scale.multitouch,
    });
    this.dragGestureDetector = new DragGestureDetector({
      onDrag: this.onDrag,
    });
  }

  onChartPointerEvent(event: CanvasPointerEvent) {
    this.scales = (event.target as ChartView<any, any>).getScales();
    return (
      this.scaleGestureDetector.onPointerEvent(event) ||
      this.dragGestureDetector.onPointerEvent(event)
    );
  }

  setScale(scale: XYPoint, center: XYPoint = { x: 0, y: 0 }): boolean {
    const { limit, listener, listenerThreshold } = this.options.scale;
    const { scale: { x: oldScaleX, y: oldScaleY } } = this;
    const scaleX = Math.max(limit.x[0], Math.min(limit.x[1], scale.x));
    const scaleY = Math.max(limit.y[0], Math.min(limit.y[1], scale.y));
    const { xScale, yScale } = this.scales!;

    if (oldScaleX !== scaleX) {
      this.translate.x = this.normalizeScaleTranslate(
        this.translate.x,
        center.x,
        scaleX,
        oldScaleX,
        xScale,
      );
      this.scale.x = scaleX;
    }
    if (oldScaleY !== scaleY) {
      this.translate.y = this.normalizeScaleTranslate(
        this.translate.y,
        center.y,
        scaleY,
        oldScaleY,
        yScale,
      );
      this.scale.y = scaleY;
    }

    if (oldScaleX !== scaleX || oldScaleY !== scaleY) {
      if (listener && (
        floorToNearest(oldScaleX, listenerThreshold) !== floorToNearest(scaleX, listenerThreshold) ||
        floorToNearest(oldScaleY, listenerThreshold) !== floorToNearest(scaleY, listenerThreshold)
      )) {
        listener(scaleX, scaleY);
      }
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

  private normalizeScaleTranslate(
    translate: number,
    center: number,
    scale: number,
    oldScale: number,
    scaleFunction: ScaleFunction,
  ) {
    const [domainMin, domainMax] = scaleFunction.domain();
    const domainWidth = domainMax - domainMin;
    const windowWidth = domainWidth / scale;
    const oldWindowWidth = domainWidth / oldScale;
    const oldTranslate = translate + domainMin;

    const percentage = (center - oldTranslate) / oldWindowWidth;
    const newTranslate = center - percentage * windowWidth;

    return Math.max(0, Math.min(domainWidth - windowWidth, newTranslate - domainMin));
  }

  private onScale = (event: ScaleEvent) => {
    const { limit, listener, listenerThreshold } = this.options.scale;
    const { x: oldScaleX, y: oldScaleY } = this.scale;
    const { xScale, yScale } = this.scales!;

    return this.setScale({
        x: oldScaleX * event.scaleFactorX,
        y: oldScaleY * event.scaleFactorY,
      },
      {
        x: xScale.invert(event.current.centerX),
        y: yScale.invert(event.current.centerY),
      },
    );
  };

  private onDrag = (event: DragEvent) => {
    const { xScale } = this.scales!;
    const [domainMin, domainMax] = xScale.domain();
    const domainWidth = domainMax - domainMin;
    const windowWidth = domainWidth / this.scale.x;

    const newTranslateX = this.translate.x - (xScale.invert(event.deltaX) - xScale.invert(0));

    if (this.translate.x !== newTranslateX) {
      this.translate.x = Math.max(0, Math.min(domainWidth - windowWidth, newTranslateX));
      this.postEvent(DataContainerEventType.DATA_CHANGE);
      return true;
    }
    return false;
  };
}
