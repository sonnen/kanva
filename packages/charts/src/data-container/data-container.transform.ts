import { 
  CanvasPointerEvent,
  DragEvent,
  DragGestureDetector,
  ScaleEvent,
  ScaleGestureDetector,
  Point,
  AreaSelectGestureDetector,
  AreaSelectEvent,
  Rect,
} from '@kanva/core';
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
    selectArea: boolean;
    minSelectedAreaThreshold: {
      x: number;
      y: number;
    };
    drag: boolean;
  };
  pan: {
    pointers: number;
  };
}

const DEFAULT_OPTIONS: DataContainerTransformExtensionOptions = {
  scale: {
    limit: {
      x: [1, 1],
      y: [1, 1],
    },
    multitouch: true,
    scroll: true,
    selectArea: false,
    drag: true,
    listenerThreshold: 1,
    minSelectedAreaThreshold: {
      x: 50,
      y: 0,
    },
  },
  pan: {
    pointers: 1,
  },
};

export class DataContainerTransformExtension extends DataContainerExtension {
  public scale: XYPoint = { x: 1, y: 1 };
  public translate: XYPoint = { x: 0, y: 0 };

  private readonly options: DataContainerTransformExtensionOptions;
  private scales?: ScaleFunctions;
  private areaSelectGestureDetector: AreaSelectGestureDetector;
  private dragGestureDetector: DragGestureDetector;
  private scaleGestureDetector: ScaleGestureDetector;

  constructor(transformOptions: DeepPartial<DataContainerTransformExtensionOptions>) {
    super(TRANSFORM_EXTENSION);

    const initialOptions = defaultsDeep(transformOptions, DEFAULT_OPTIONS);
    const {
      options,
      areaSelectGestureDetector,
      dragGestureDetector,
      scaleGestureDetector,
    } = this.updateOptions(initialOptions);

    this.options = options;
    this.areaSelectGestureDetector = areaSelectGestureDetector;
    this.dragGestureDetector = dragGestureDetector;
    this.scaleGestureDetector = scaleGestureDetector;
  }

  setOptions(transformOptions: DeepPartial<DataContainerTransformExtensionOptions>) {
    const {
      options,
      areaSelectGestureDetector,
      dragGestureDetector,
      scaleGestureDetector,
    } = this.updateOptions(transformOptions);
​
    Object.assign(this.options, options);
    this.areaSelectGestureDetector = areaSelectGestureDetector;
    this.dragGestureDetector = dragGestureDetector;
    this.scaleGestureDetector = scaleGestureDetector;
  }

  onChartPointerEvent(event: CanvasPointerEvent) {
    this.scales = (event.target as ChartView<any, any>).getScales();

    return (
      this.scaleGestureDetector.onPointerEvent(event) ||
      this.dragGestureDetector.onPointerEvent(event) ||
      this.areaSelectGestureDetector.onPointerEvent(event)
    );
  }

  private setSelectedArea(area: Rect): boolean {
    const { limit, listener, listenerThreshold } = this.options.scale;
    
    if (!this.scales) { 
      return false; 
    }
    const { xScale, yScale } = this.scales;

    const start = new Point(xScale.invert(area.l), xScale.invert(area.t));
    const end = new Point(xScale.invert(area.r), xScale.invert(area.b));

    const scale = new Point(
      this.calculateScale(start.x, end.x, xScale),
      this.calculateScale(start.y, end.y, yScale),
    )
    const scaleX = Math.max(limit.x[0], Math.min(limit.x[1], scale.x));
    const scaleY = Math.max(limit.y[0], Math.min(limit.y[1], scale.y));
    const { x: oldScaleX, y: oldScaleY } = this.scale;

    if (oldScaleX !== scaleX) {
      this.scale.x = scaleX;
      this.translate.x = start.x;
    }

    if (oldScaleY !== scaleY) {
      this.scale.y = scaleY;
      this.translate.y = start.y;
    }

    if (oldScaleX !== scaleX || oldScaleY !== scaleY) {
      if (listener && (
        floorToNearest(oldScaleX, listenerThreshold) !== floorToNearest(scaleX, listenerThreshold) ||
        floorToNearest(oldScaleY, listenerThreshold) !== floorToNearest(scaleY, listenerThreshold)
      )) {
        listener(scaleX, scaleY);
      }
      return true;
    }
    return false;
  }

  setScale(scale: XYPoint, center: XYPoint = { x: 0, y: 0 }): boolean {
    const { limit, listener, listenerThreshold } = this.options.scale;
    const { x: oldScaleX, y: oldScaleY } = this.scale;
    const scaleX = Math.max(limit.x[0], Math.min(limit.x[1], scale.x));
    const scaleY = Math.max(limit.y[0], Math.min(limit.y[1], scale.y));

    if (!this.scales) { return false; }

    const { xScale, yScale } = this.scales;

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

  // TODO: create setters in all detectors instead of rewriting each time with the new instance to set different options
  private updateOptions(optionsInput: DeepPartial<DataContainerTransformExtensionOptions>) {
    const options: DataContainerTransformExtensionOptions = defaultsDeep(optionsInput, this.options);
    const { scale } = options;
    const scaleGestureDetector = new ScaleGestureDetector({
      onScale: this.onScale,
      scroll: scale.scroll,
      multitouch: scale.multitouch,
    });
    const dragGestureDetector = new DragGestureDetector({
      onDrag: this.onDrag,
      drag: scale.drag && !scale.selectArea,
    });
    const areaSelectGestureDetector = new AreaSelectGestureDetector({
      onAreaSelect: this.onAreaSelect,
      selectArea: scale.selectArea,
    });

    return {
      options,
      scaleGestureDetector,
      dragGestureDetector,
      areaSelectGestureDetector,
    };
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

  private calculateScale(
    start: number,
    end: number,
    scaleFunction: ScaleFunction,
  ) {
    const [domainMin, domainMax] = scaleFunction.domain();
    const domainWidth = domainMax - domainMin;
    const windowWidth = end - start;
    return domainWidth/windowWidth;
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
  
  private isSufficientAreaSelected(area: Rect) {
    return area.width >= this.options.scale.minSelectedAreaThreshold.x
      && area.height >= this.options.scale.minSelectedAreaThreshold.y;
  }
    

  private onAreaSelect = (event: AreaSelectEvent): boolean => {
    const { isSelecting, selectedArea } = event;

    if (isSelecting) {
      this.postEvent(DataContainerEventType.AREA_SELECT, selectedArea);
      return true;
    } else {
      this.postEvent(DataContainerEventType.AREA_SELECT, undefined);
      return selectedArea && this.isSufficientAreaSelected(selectedArea)
          ? this.setSelectedArea(selectedArea)
          : true;
    }
  }
}
