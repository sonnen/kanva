import { CanvasPointerEvent, PointerAction } from '../canvas-pointer-event';
import { GestureDetector } from './gesture-detector';
import { Point, Rect } from '../../canvas';

const DEFAULT_POINTER_COUNT = 1;

export interface AreaSelectEvent {
  pointerEvent: CanvasPointerEvent;
  isSelecting: boolean;
  selectedArea?: Rect;
}

export interface AreaSelectGestureDetectorOptions {
  onAreaSelect: OnAreaSelectListener;
  selectArea?: boolean;
  pointers?: number;
}

export type OnAreaSelectListener = (areaSelectEvent: AreaSelectEvent) => boolean;

export class AreaSelectGestureDetector extends GestureDetector {
  private selectStart: Point | undefined;
  private selectEnd: Point | undefined;
  private isSelecting: boolean = false;

  constructor(private options: AreaSelectGestureDetectorOptions) {
    super();
  }

  onGestureEvent(event: CanvasPointerEvent): boolean {
    return !!this.options.selectArea && this.handleAreaSelectGesture(event);
  }

  private handleAreaSelectGesture(event: CanvasPointerEvent) {
    if (event.pointerCount > DEFAULT_POINTER_COUNT) {
      return false;
    }
    
    let selectedArea: Rect | undefined = undefined;
    switch (event.action) {
      case PointerAction.DOWN:
        this.selectStart = new Point(
          event.primaryPointer.x,
          event.primaryPointer.y
        );
        this.isSelecting = true;
        break;
      case PointerAction.MOVE:
        if (event.primaryPointer.pressure === 0) {
          return false;
        }
        this.selectEnd = new Point(
          event.primaryPointer.x,
          event.primaryPointer.y
        );
        selectedArea = this.selectedArea;
        break;
      case PointerAction.UP:
        this.selectEnd = new Point(
          event.primaryPointer.x,
          event.primaryPointer.y
        );
        this.isSelecting = false;
        selectedArea = this.selectedArea;
        this.selectStart = undefined;
        this.selectEnd = undefined;
        break;
      case PointerAction.CANCEL:
        this.isSelecting = false;
        this.selectStart = undefined;
        this.selectEnd = undefined;
        break;
      default:
        return true;
    }

    return this.options.onAreaSelect({
      pointerEvent: event,
      selectedArea,
      isSelecting: this.isSelecting, 
    });
  }

  private get selectedArea() {
    return this.selectStart && this.selectEnd && new Rect({
      left: Math.min(this.selectStart.x, this.selectEnd.x),
      bottom: Math.min(this.selectStart.y, this.selectEnd.y),
      right: Math.max(this.selectStart.x, this.selectEnd.x),
      top: Math.max(this.selectStart.y, this.selectEnd.y),
    });
  }
  
}
