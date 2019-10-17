import { CanvasPointerEvent, PointerAction } from '../canvas-pointer-event';
import { GestureDetector } from './gesture-detector';
import { Point } from '../../canvas';

const DEFAULT_POINTER_COUNT = 1;

export interface SelectedArea {
  start: Point;
  end: Point;
}

export interface AreaSelectEvent {
  pointerEvent: CanvasPointerEvent;
  isSelecting: boolean;
  selectedArea?: SelectedArea;
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
    
    let selectedArea: SelectedArea | undefined = undefined;
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
          return true;
        }
        this.selectEnd = new Point(
          event.primaryPointer.x,
          event.primaryPointer.y
        );
        selectedArea = this.getSelectedArea();
        break;
      case PointerAction.UP:
        this.selectEnd = new Point(
          event.primaryPointer.x,
          event.primaryPointer.y
        );
        this.isSelecting = false;
        selectedArea = this.getSelectedArea();
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

  private getSelectedArea = () => this.selectStart && this.selectEnd && ({
    start: new Point(
      Math.min(this.selectStart.x, this.selectEnd.x),
      Math.min(this.selectStart.y, this.selectEnd.y),
    ),
    end: new Point(
      Math.max(this.selectStart.x, this.selectEnd.x),
      Math.max(this.selectStart.y, this.selectEnd.y),
    ),
  });
}
