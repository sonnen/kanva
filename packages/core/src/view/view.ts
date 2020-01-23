import { calcDimension, MATCH_PARENT, Rect, RectLike, ViewCanvas, WRAP_CONTENT } from '../canvas';
import { CanvasPointerEvent, PointerAction } from '../pointer-event';
import { removeUndefinedProps } from '../utils';
import { xor } from '../utils/boolean.util';
import { RootCanvasView } from '../views';
import { Context } from './context';
import { LayoutParams, PARENT_ID } from './layout-params';
import {
  horizontalLayoutDependencies,
  removeDefaultProps,
  resolveDimensionDependencies,
  resolveLayoutParamsIds,
  verticalLayoutDependencies,
} from './layout-params.utils';
import { LayoutProps } from './layout-props';

interface OrderedChildren {
  h: View[];
  v: View[];
}

export enum RequiredViewChanges {
  /** Children have to be measured */
  MEASURE = 3,
  /** Children are positioned */
  LAYOUT = 2,
  /** View has to be redrawn, because of data change */
  DRAW = 1,
  /** Nothing has to be done */
  NOTHING = 0,
}

export enum Visibility {
  VISIBLE = 1,
  INVISIBLE = 2,
  GONE = 3,
}

export interface ViewProps {
  id: string;
  viewRef?: (view: View<any>) => void;
  layoutParams?: LayoutProps;
  visibility?: Visibility;
  backgroundColor?: string;
  borderColor?: string;
  border?: RectLike;
  children?: any;
  onMount?: (view: View<any>) => void;
}

export class View<Props extends {} = ViewProps> {
  public id?: number;
  /** This are the bounds of view absolute offset. */
  public offsetRect: Rect = new Rect(0);

  // Layout
  protected lp: LayoutParams = new LayoutParams();
  protected visibility: Visibility = Visibility.VISIBLE;

  // Dimensions
  protected width = 0;
  protected height = 0;
  /** This are bounds of a view including margin and padding */
  protected rect: Rect = new Rect(0);
  /** This are the bounds of view including padding. */
  protected innerRect: Rect = new Rect(0);
  private oldWidth = 0;
  private oldHeight = 0;

  // State
  protected onMount?: (view: View<any>) => void;
  private parent: View | null = null;
  private requiredChanges: RequiredViewChanges = RequiredViewChanges.MEASURE;
  private hasCapturedPointer = false;
  private mounted = false;

  // Children
  private children: View[] = [];
  private childrenOrdered: OrderedChildren = { h: [], v: [] };
  private childrenIdMap: Record<number, View> = {};
  private childrenGraphChanged = false;

  // Style
  protected backgroundColor?: string;
  protected borderRect?: Rect;
  protected borderColor?: string;

  constructor(public readonly context: Context, public readonly name: string = 'View') {
  }

  dispatchPointerEvent(event: CanvasPointerEvent): boolean {
    const { action, primaryPointer } = event;
    // Dive to children if possible
    for (let i = this.children.length - 1; i >= 0; i--) {
      const child = this.children[i];
      const isPointerInside = child.innerRect.contains(primaryPointer.x, primaryPointer.y);
      if (child.hasCapturedPointer || isPointerInside) {
        const offsetX = child.innerRect.l + child.lp.paddingRect.l;
        const offsetY = child.innerRect.t + child.lp.paddingRect.t;

        // Shift state
        event.offsetPointers(-offsetX, -offsetY);
        if (event.action === PointerAction.MOVE) {
          if (!child.hasCapturedPointer) {
            event.action = event.primaryPointer.pressure > 0 ? PointerAction.DOWN : PointerAction.OVER;
          } else if (!isPointerInside) {
            event.action = PointerAction.CANCEL;
          }
        }

        child.hasCapturedPointer = isPointerInside;
        const dispatched = child.dispatchPointerEvent(event);

        // Restore state
        event.offsetPointers(offsetX, offsetY);
        event.action = action;

        if (dispatched) {
          return true;
        }
      }
    }
    // Process event
    event.target = this;
    return this.onPointerEvent(event);
  }

  onPointerEvent(_event: CanvasPointerEvent): boolean {
    return false;
  }

  /**
   * Prepares the layout for all children
   */
  layout(force?: boolean) {
    if (!this.requireGuardAndTake(RequiredViewChanges.LAYOUT, force)) {
      return;
    }
    const { children, childrenIdMap: map, context, innerHeight, innerWidth } = this;

    if (context.debugEnabled) {
      console.log(`${this.name}[${this.id}]: layout()`);
    }

    // Horizontal layout
    const horizontallyOrderedChildren = this.childrenOrdered.h;
    let maxWidth = 0;
    for (let i = 0, l = horizontallyOrderedChildren.length; i < l; i++) {
      const child = horizontallyOrderedChildren[i];
      const { lp, rect } = child;
      const w = calcDimension(lp.wDimension, innerWidth);
      if (w !== undefined) {
        child.width = w;
      }
      if (lp.isAbsolute) {
        rect.l = calcDimension(lp.xDimension, innerWidth)!;
        rect.r = rect.l + child.width;
        continue;
      }
      if (lp.centerH) {
        rect.l = (innerWidth - child.width) / 2;
        rect.r = rect.l + child.width;
      } else {
        let r: number | undefined;
        let l: number | undefined;
        // @TODO RTL support
        if (lp.toStartOfId !== undefined) {
          r = map[lp.toStartOfId].rect.l;
        } else if (lp.endId !== undefined) {
          r = lp.endId === PARENT_ID ? innerWidth : map[lp.endId].rect.r;
        }
        if (lp.toEndOfId !== undefined) {
          l = map[lp.toEndOfId].rect.r;
        } else if (lp.startId !== undefined) {
          l = lp.startId === PARENT_ID ? 0 : map[lp.startId].rect.l;
        }
        if (r === undefined && l === undefined) {
          l = 0;
          r = child.width;
        } else if (r === undefined) {
          r = l! + child.width;
        } else if (l === undefined) {
          l = r - child.width;
        }
        rect.l = l!;
        rect.r = r;
      }
      if (rect.l > rect.r) {
        const l = rect.r;
        rect.r = rect.l;
        rect.l = l;
      }
      maxWidth = Math.max(maxWidth, rect.r);
    }
    if (this.lp.w === WRAP_CONTENT) {
      const { paddingRect: padding, marginRect: margin, minW: min, maxW: max } = this.lp;
      const widthSpacing = padding.l + padding.r + margin.l + margin.r;
      let dimension = maxWidth + widthSpacing;
      if (dimension > max) {
        dimension = max;
      } else if (dimension < min) {
        dimension = min;
      }
      this.width = Math.round(Math.max(this.width, dimension));
    }

    // Vertical layout
    const verticallyOrderedChildren = this.childrenOrdered.v;
    let maxHeight = 0;
    for (let i = 0, l = verticallyOrderedChildren.length; i < l; i++) {
      const child = verticallyOrderedChildren[i];
      const { lp, rect } = child;
      const h = calcDimension(lp.hDimension, innerHeight);
      if (h !== undefined) {
        child.height = h;
      }
      if (lp.isAbsolute) {
        rect.t = calcDimension(lp.yDimension, innerHeight)!;
        rect.b = rect.t + child.height;
        continue;
      }
      if (lp.centerV) {
        rect.t = (innerHeight - child.height) / 2;
        rect.b = rect.t + child.height;
      } else {
        let t: number | undefined;
        let b: number | undefined;
        if (lp.aboveId !== undefined) {
          b = map[lp.aboveId].rect.t;
        } else if (lp.bottomId !== undefined) {
          b = lp.bottomId === PARENT_ID ? innerHeight : map[lp.bottomId].rect.b;
        }
        if (lp.belowId !== undefined) {
          t = map[lp.belowId].rect.b;
        } else if (lp.topId !== undefined) {
          t = lp.topId === PARENT_ID ? 0 : map[lp.topId].rect.t;
        }
        if (t === undefined && b === undefined) {
          t = 0;
          b = child.height;
        } else if (b === undefined) {
          b = t! + child.height;
        } else if (t === undefined) {
          t = b - child.height;
        }
        rect.t = t!;
        rect.b = b;
      }
      if (rect.t > rect.b) {
        const t = rect.b;
        rect.b = rect.t;
        rect.t = t;
      }
      maxHeight = Math.max(maxHeight, rect.b);
    }
    if (this.lp.h === WRAP_CONTENT) {
      const { paddingRect: padding, marginRect: margin, minH: min, maxH: max } = this.lp;
      const heightSpacing = padding.t + padding.b + margin.t + margin.b;
      let dimension = maxHeight + heightSpacing;
      if (dimension > max) {
        dimension = max;
      } else if (dimension < min) {
        dimension = min;
      }
      this.height = Math.round(Math.max(this.height, dimension));
    }

    // Retrigger nested layout if dimensions changed
    for (let i = 0, l = children.length; i < l; i++) {
      const child = children[i];
      child.width = child.rect.width;
      child.height = child.rect.height;

      const { width, height, oldWidth, oldHeight } = child;
      const sizeChanged = width !== oldWidth || height !== oldHeight;

      child.innerRect = child.rect.clone().inset(child.lp.marginRect);
      child.offsetRect = this.rect.clone()
        .offset(child.innerRect)
        .offset(child.lp.paddingRect);

      child.layout(sizeChanged);
      if (sizeChanged) {
        child.onSizeChanged(width, height, oldWidth, oldHeight);
      }
    }

    this.onLayout();
  }

  onLayout() {
    // Can be implemented by views to calculate internal element positions after resizing
  }

  /**
   * Prepare arrays of children ordered horizontally and vertically,
   * so that they could be measured in a single pass,
   * without waiting for their dependencies to be resolved.
   *
   * This has to be called before measure whenever child's layoutParams change or views are added/removed.
   *
   * @throws an error in case of unresolvable dependency (circular or lack of required view)
   */
  resolvePositionDependencies() {
    if (!this.childrenGraphChanged) {
      return;
    }
    const { children, context } = this;

    if (context.debugEnabled) {
      console.log(`${this.name}[${this.id}]: resolvePositionDependencies()`);
    }

    for (let i = 0, l = children.length; i < l; i++) {
      resolveLayoutParamsIds(children[i].lp, context);
    }

    const h = resolveDimensionDependencies(children, horizontalLayoutDependencies, context);
    const v = resolveDimensionDependencies(children, verticalLayoutDependencies, context);

    this.childrenOrdered = { h, v };
    this.childrenGraphChanged = false;
    if (this.context.debugEnabled) {
      console.log({
        h: this.childrenOrdered.h,
        v: this.childrenOrdered.v,
      });
    }
  }

  /**
   * Measures the component and adjusts it's dimensions to min/max width and height values.
   * @return true if width or height changed, false otherwise
   */
  measure(canvas: ViewCanvas, force?: boolean) {
    if (!this.requireGuardAndTake(RequiredViewChanges.MEASURE, force)) {
      return;
    }
    this.resolvePositionDependencies();

    const { context, children, lp, visibility } = this;
    const { w, h, minH, minW, maxH, maxW } = lp;

    if (context.debugEnabled) {
      console.log(`${this.name}[${this.id}]: measure()`);
    }
    this.oldWidth = this.width;
    this.oldHeight = this.height;

    if (visibility === Visibility.GONE) {
      this.width = this.height = 0;
      return;
    }

    const { paddingRect: padding, marginRect: margin } = this.lp;
    const heightSpacing = padding.t + padding.b + margin.t + margin.b;
    const widthSpacing = padding.l + padding.r + margin.l + margin.r;

    let width = 0;
    let height = 0;

    // Resolve width
    if (w === MATCH_PARENT) {
      width = this.getMatchParentWidth();
    } else if (w === WRAP_CONTENT) {
      const wrappedWidth = this.getInternalWrappedWidth(canvas);
      if (wrappedWidth !== undefined) {
        width = wrappedWidth + widthSpacing;
      } else if (children.some(child => !child.lp.isAbsolute && child.lp.w === MATCH_PARENT)) {
        width = this.getMatchParentWidth();
      } else {
        let foundWidth = 0;
        for (let i = children.length - 1; i >= 0; i--) {
          const child = this.children[i];
          if (child.lp.isAbsolute) {
            continue;
          }
          if (child.lp.w === WRAP_CONTENT) {
            // Child width WRAP_CONTENT has to be measured prior to getting it's width
            child.measure(canvas);
          }
          if (child.width > foundWidth) {
            foundWidth = child.width;
          }
        }
        width = foundWidth + widthSpacing;
      }
    } else {
      width = calcDimension(this.lp.wDimension, this.getMatchParentWidth())!;
    }

    // Resolve height
    if (h === MATCH_PARENT) {
      height = this.getMatchParentHeight();
    } else if (h === WRAP_CONTENT) {
      const wrappedHeight = this.getInternalWrappedHeight(canvas);
      if (wrappedHeight !== undefined) {
        height = wrappedHeight + heightSpacing;
      } else if (children.some(child => !child.lp.isAbsolute && child.lp.h === MATCH_PARENT)) {
        height = this.getMatchParentHeight();
      } else {
        let foundHeight = 0;
        for (let i = children.length - 1; i >= 0; i--) {
          const child = this.children[i];
          if (child.lp.isAbsolute) {
            continue;
          }
          if (child.lp.h === WRAP_CONTENT) {
            // Child width WRAP_CONTENT has to be measured prior to getting it's width
            child.measure(canvas);
          }
          if (child.height > foundHeight) {
            foundHeight = child.height;
          }
        }
        height = foundHeight + heightSpacing;
      }
    } else {
      height = calcDimension(this.lp.hDimension, this.getMatchParentHeight())!;
    }

    // Wrap to min/max
    if (width > maxW) {
      width = maxW;
    } else if (width < minW) {
      width = minW;
    }
    if (height > maxH) {
      height = maxH;
    } else if (height < minH) {
      height = minH;
    }

    // Normalize to integers
    width = Math.round(width);
    height = Math.round(height);

    const measuredDimensions = this.onMeasure(width, height);

    const sizeChanged = this.oldWidth !== measuredDimensions.width || this.oldHeight !== measuredDimensions.height;

    this.width = measuredDimensions.width;
    this.height = measuredDimensions.height;

    // Now all children can be measured
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].measure(canvas, sizeChanged);
    }
  }

  onMeasure(width: number, height: number) {
    return { width, height };
  }

  onSizeChanged(_width: number, _height: number, _oldWidth: number, _oldHeight: number) {
    // Views may implement this method
  }

  getMatchParentWidth() {
    let p = this.parent;
    while (p) {
      if (p.lp.w !== WRAP_CONTENT) {
        return p.innerWidth;
      }
      p = p.parent;
    }
    return 0;
  }

  getMatchParentHeight() {
    let p = this.parent;
    while (p) {
      if (p.lp.w !== WRAP_CONTENT) {
        return p.innerHeight;
      }
      p = p.parent;
    }
    return 0;
  }

  getInternalWrappedHeight(_canvas: ViewCanvas): number | undefined {
    return undefined;
  }

  getInternalWrappedWidth(_canvas: ViewCanvas): number | undefined {
    return undefined;
  }

  draw(canvas: ViewCanvas, force = false): void {
    if (!this.requireGuardAndTake(RequiredViewChanges.DRAW, force)) {
      return;
    }

    const {
      visibility,
      context,
      rect,
      lp: { marginRect: margin, paddingRect: padding },
    } = this;
    let { l, t, r, b } = rect;

    if (visibility !== Visibility.VISIBLE || l === r || t === b) {
      if (context.debugEnabled) {
        console.log(`${this.name}[${this.id}]: skipping draw()`);
      }
      // Rectangle is empty or invisible, don't draw anything
      return;
    }

    const ctx = canvas.context;

    if (context.debugEnabled) {
      console.log(`${this.name}[${this.id}]: draw()`);
    }

    ctx.save();

    if (context.debugEnabled) {
      // Draw margin bounds
      ctx.strokeStyle = '#F0F';
      ctx.fillStyle = '#F0F';
      ctx.lineWidth = 1;
      ctx.strokeRect(l, t, r - l, b - t);
      ctx.textAlign = 'end';
      ctx.textBaseline = 'top';
      ctx.font = '9px monospace';
      const boundsText = `${(r - l).toFixed(1)}x${(b - t).toFixed(1)}`;
      const width = ctx.measureText(boundsText).width;
      ctx.fillRect(Math.max(l, r - width), t, width, 9);
      ctx.fillStyle = '#FFF';
      ctx.fillText(boundsText, r, t, r - l);
    }

    // Apply margin
    l += margin.l;
    t += margin.t;
    r -= margin.r;
    b -= margin.b;

    // Draw background
    if (this.backgroundColor) {
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(l, t, r - l, b - t);
    }

    if (this.borderColor && this.borderRect) {
      const border = this.borderRect;
      ctx.fillStyle = this.borderColor;
      if (border.t) {
        ctx.fillRect(l, t, r - l, border.t);
      }
      if (border.b) {
        ctx.fillRect(l, b - border.b, r - l, border.b);
      }
      if (border.l) {
        ctx.fillRect(l, t, border.l, b - t);
      }
      if (border.r) {
        ctx.fillRect(r - border.r, t, border.r, b - t);
      }
    }

    if (context.debugEnabled) {
      // Draw padding bounds
      ctx.strokeStyle = '#0F0';
      ctx.fillStyle = '#0F0';
      ctx.lineWidth = 1;
      ctx.strokeRect(l, t, r - l, b - t);
      const boundsText = `${(r - l).toFixed(1)}x${(b - t).toFixed(1)}`;
      const width = ctx.measureText(boundsText).width;
      ctx.fillRect(Math.max(l, r - width), t, width, 9);
      ctx.fillStyle = '#FFF';
      ctx.fillText(boundsText, r, t, r - l);
    }

    ctx.beginPath();
    ctx.rect(l, t, r - l, b - t);
    ctx.clip();

    // Apply padding
    l += padding.l;
    t += padding.t;
    r -= padding.r;
    b -= padding.b;

    if (context.debugEnabled) {
      // Draw view bounds
      ctx.strokeStyle = '#F00';
      ctx.fillStyle = '#F00';
      ctx.lineWidth = 1;
      ctx.strokeRect(l, t, r - l, b - t);
      const boundsText = `${(r - l).toFixed(1)}x${(b - t).toFixed(1)}`;
      const width = ctx.measureText(boundsText).width;
      ctx.fillRect(Math.max(l, r - width), t, width, 9);
      ctx.fillStyle = '#FFF';
      ctx.fillText(boundsText, r, t, r - l);
    }

    ctx.translate(l, t);

    this.onDraw(canvas);

    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      // Since parent needs a redraw, all of it's children also have to be redrawn
      // Above is correct until I develop some kind of image cache (would be extremely useful for animation support)
      children[i].draw(canvas, true);
    }

    ctx.restore();
    this.mount();
  }

  onDraw(_canvas: ViewCanvas): void {
    // Views should implement this method
  }

  getOnMount() {
    return this.onMount;
  }

  setOnMount(callback: (view: View<any>) => void) {
    this.onMount = callback;
  }

  mount() {
    if (this.onMount && !this.mounted) {
      this.onMount(this);
    }
    this.mounted = true;
  }

  addChild(child: View, position = -1) {
    if (child.parent) {
      throw new Error('Child element can not be added to two containers at a time.');
    }
    if (position < 0) {
      this.children.push(child);
    } else {
      this.children.splice(position, 0, child);
    }
    child.attach(this);
    this.require(RequiredViewChanges.MEASURE);
  }

  setChildAt(child: View, position: number) {
    const oldChild = this.children[position];

    if (child === oldChild) {
      return;
    }

    this.children[position] = child;
    child.attach(this);
    if (oldChild) {
      child.detach();
    }
    this.require(RequiredViewChanges.MEASURE);
  }

  removeChild(child: View | number) {
    let id: number;
    if (typeof child === 'number') {
      id = child;
      child = this.childrenIdMap[id];
    } else {
      id = this.children.indexOf(child);
    }
    if (!child || child.parent !== this) {
      throw new Error('Element is not a child of this container.');
    }

    // Actual removal begins here
    this.children.splice(id, 1);
    child.detach();

    this.require(RequiredViewChanges.MEASURE);
  }

  removeChildAt(startIndex: number, endIndex: number = startIndex + 1) {
    const children = this.children;
    if (startIndex < 0 || startIndex >= children.length || endIndex < 0 || endIndex > children.length) {
      throw new Error(`removeChildAt: Invalid range (${startIndex}, ${endIndex}). Children length: ${children.length}`);
    }
    for (let i = endIndex; i >= startIndex; i++) {
      children[i].detach();
    }
    children.splice(startIndex, endIndex - startIndex);

    this.require(RequiredViewChanges.MEASURE);
  }

  get innerHeight() {
    const lp = this.lp;
    const height = Math.round(this.height - (lp.marginRect.t + lp.marginRect.b + lp.paddingRect.t + lp.paddingRect.b));
    return height > 0 ? height : 0;
  }

  get innerWidth() {
    const lp = this.lp;
    const width = Math.round(this.width - (lp.marginRect.l + lp.marginRect.r + lp.paddingRect.l + lp.paddingRect.r));
    return width > 0 ? width : 0;
  }

  getLayoutParams() {
    return this.lp;
  }

  setLayoutParams(lp: LayoutParams) {
    this.lp = lp;
    if (this.lp.dependenciesModified && this.parent) {
      this.parent.childrenGraphChanged = true;
    }
    this.require(RequiredViewChanges.MEASURE);
  }

  getVisibility() {
    return this.visibility;
  }

  setVisibility(visibility: Visibility = Visibility.VISIBLE) {
    const oldVisibility = this.visibility;
    if (oldVisibility === visibility) {
      return;
    }
    this.visibility = visibility;
    if (xor(oldVisibility === Visibility.GONE, visibility === Visibility.GONE)) {
      this.require(RequiredViewChanges.MEASURE);
    } else {
      this.require(RequiredViewChanges.DRAW);
    }
  }

  require(requiredChanges: RequiredViewChanges) {
    // Update required changes only if the new changes have bigger scope than is set currently
    if (this.requiredChanges < requiredChanges) {
      this.requiredChanges = requiredChanges;
      if (this.parent && requiredChanges > RequiredViewChanges.NOTHING) {
        this.parent.require(requiredChanges);
      }
    }
  }

  requireGuard(requiredChanges: RequiredViewChanges) {
    return this.requiredChanges === requiredChanges;
  }

  requireGuardAndTake(requiredChanges: RequiredViewChanges, force?: boolean) {
    if (this.requiredChanges === requiredChanges) {
      this.requiredChanges = this.requiredChanges - 1;
      return true;
    } else if (force) {
      return true;
    }
    return false;
  }

  getBackgroundColor() {
    return this.backgroundColor;
  }

  setBackgroundColor(backgroundColor: string | undefined) {
    if (this.backgroundColor !== backgroundColor) {
      this.backgroundColor = backgroundColor;
      this.require(RequiredViewChanges.DRAW);
    }
  }

  getBorderColor() {
    return this.borderColor;
  }

  setBorderColor(borderColor: string | undefined) {
    if (this.borderColor !== borderColor) {
      this.borderColor = borderColor;
      this.require(RequiredViewChanges.DRAW);
    }
  }

  getBorder() {
    return this.backgroundColor;
  }

  setBorder(borderRect: RectLike | undefined) {
    if (this.borderRect !== borderRect) {
      this.borderRect = borderRect ? Rect.from(borderRect) : undefined;
      this.require(RequiredViewChanges.DRAW);
    }
  }

  getId() {
    return this.context.getId(this.id);
  }

  setId(id?: string) {
    // Detach from existing parent
    const parent = this.parent;
    if (this.id !== undefined && parent) {
      delete parent.childrenIdMap[this.id];
    }
    // Register with the new id
    this.id = id === undefined ? undefined : this.context.registerView(id);
    // Attach to the same parent
    if (this.id !== undefined && parent) {
      parent.childrenIdMap[this.id] = this;
    }
  }

  destroy() {
    const children = this.children;

    // Remove from parent if any
    if (this.parent) {
      this.parent.removeChild(this);
    }

    // Remove all children
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];
      this.removeChild(child);
      child.destroy();
    }

    // Perform self-destruction
    this.onDestroy();
  }

  onDestroy() {
    // View should remove all listeners and external dependencies here
  }

  snapshot(): object {
    return removeUndefinedProps({
      ...this.onSnapshot(),
      id: this.id,
      name: this.name,
      layoutParams: removeDefaultProps(this.lp.asProps()),
      visibility: Visibility[this.visibility],
      children: this.children.map(c => c.snapshot()),
    });
  }

  screenshot(): string | undefined {
    const viewOffset = this.offsetRect;
    const rootView = this.getRootView() as RootCanvasView;
    const rootViewScale = rootView.getScale();
    const w = this.innerWidth * rootViewScale;
    const h = this.innerHeight * rootViewScale;

    if (!w || !h) {
      return undefined;
    }

    const imageData = rootView.getCanvas().getContext('2d')!
      .getImageData(viewOffset.l * rootViewScale, viewOffset.t * rootViewScale, w, h);

    const canvas = this.context.canvasCreator({
      width: w,
      height: h,
    });
    const ctx = canvas.getContext('2d')!;
    ctx.putImageData(imageData, 0, 0);

    return canvas.toDataURL();
  }

  onSnapshot(): object {
    return {};
  }

  getRootView() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let parent: View = this;
    while (parent.hasParent()) {
      parent = parent.getParent()!;
    }
    return parent;
  }

  getParent() {
    return this.parent;
  }

  hasParent() {
    return Boolean(this.parent);
  }

  private attach(parent: View) {
    if (this.parent) {
      throw new Error('A view can have only one parent.');
    }
    this.parent = parent;
    if (this.id !== undefined) {
      const childWithTheSameId = this.parent.childrenIdMap[this.id];
      if (childWithTheSameId) {
        throw new Error(`The parent already has a child with the same id: ${this.id}=${this.context.getId(this.id)}`);
      }
      this.parent.childrenIdMap[this.id] = this;
    }
    this.parent.childrenGraphChanged = true;
  }

  private detach() {
    if (!this.parent) {
      return;
    }
    if (this.id !== undefined) {
      delete this.parent.childrenIdMap[this.id];
    }
    this.parent.childrenGraphChanged = true;
    this.parent = null;
  }

}
