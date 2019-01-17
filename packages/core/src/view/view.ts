import { Rect, ViewCanvas } from '../canvas';
import { Context } from './context';
import {
  horizontalLayoutDependencies,
  LayoutParams,
  MATCH_PARENT,
  PARENT_ID,
  verticalLayoutDependencies,
  Visibility,
  WRAP_CONTENT,
} from './layout-params';
import { resolveDimensionDependencies, resolveLayoutParamsIds } from './layout.utils';

interface OrderedChildren {
  h: number[];
  v: number[];
}

export enum RequiredViewChanges {
  /** Children have new layout params or are added/removed */
  DEPENDENCIES_ORDERING = 4,
  /** Children have to be measured */
  MEASURE = 3,
  /** Children are positioned */
  LAYOUT = 2,
  /** View has to be redrawn, because of data change */
  DRAW = 1,
  /** Nothing has to be done */
  NOTHING = 0,
}

export interface ViewProps {
  id: string;
  layoutParams: LayoutParams;
  backgroundColor?: string;
  children: any;
}

export class View<Props extends {} = ViewProps> {
  private static idCounter: number = 0;

  public readonly id: number;
  protected lp: LayoutParams = new LayoutParams();
  protected width: number = 0;
  protected height: number = 0;
  protected rect: Rect = new Rect(0);
  private parent: View | null = null;
  private children: View[] = [];
  private childrenOrdered: OrderedChildren = { h: [], v: [] };
  private childrenMap: Record<number, View> = {};
  private requiredChanges: RequiredViewChanges = RequiredViewChanges.DEPENDENCIES_ORDERING;

  protected backgroundColor?: string;

  constructor(public readonly context: Context, public readonly name: string = 'View') {
    this.id = View.idCounter++;
  }

  /**
   * Prepares the layout all children
   */
  layout() {
    if (!this.requires(RequiredViewChanges.LAYOUT)) {
      return;
    }
    this.requiredChanges--;
    const { children, childrenMap: map, context, innerHeight, innerWidth } = this;

    if (context.debugEnabled) {
      console.log(`${this.name}[${this.id}]: layout()`);
    }

    const getFromChildrenMap = (id: number) => map[id];

    // Horizontal layout
    const horizontallyOrderedChildren = this.childrenOrdered.h.map(getFromChildrenMap);
    for (let i = 0, l = horizontallyOrderedChildren.length; i < l; i++) {
      const child = horizontallyOrderedChildren[i];
      const { lp, rect } = child;
      if (lp.isAbsolute) {
        rect.l = lp.x;
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
    }

    // Vertical layout
    const verticallyOrderedChildren = this.childrenOrdered.v.map(getFromChildrenMap);
    for (let i = 0, l = verticallyOrderedChildren.length; i < l; i++) {
      const child = verticallyOrderedChildren[i];
      const { lp, rect } = child;
      if (lp.isAbsolute) {
        rect.t = lp.y;
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
    }

    // Retrigger nested layout if dimensions changed
    for (let i = 0, l = children.length; i < l; i++) {
      const child = children[i];
      child.width = child.rect.width;
      child.height = child.rect.height;
      child.layout();
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
    if (!this.requires(RequiredViewChanges.DEPENDENCIES_ORDERING)) {
      return;
    }
    this.requiredChanges--;
    const { children, context } = this;

    if (context.debugEnabled) {
      console.log(`${this.name}[${this.id}]: resolvePositionDependencies()`);
    }

    for (let i = 0, l = children.length; i < l; i++) {
      resolveLayoutParamsIds(children[i].lp, context);
    }

    const h = resolveDimensionDependencies(children, horizontalLayoutDependencies);
    const v = resolveDimensionDependencies(children, verticalLayoutDependencies);

    this.childrenOrdered = { h, v };
  }

  /**
   * Measures the component and adjusts it's dimensions to min/max width and height values.
   * @return true if width or height changed, false otherwise
   */
  measure(canvas: ViewCanvas) {
    if (!this.requires(RequiredViewChanges.MEASURE)) {
      return;
    }
    this.resolvePositionDependencies();

    this.requiredChanges--;
    const { context, children, lp } = this;
    const { w, h, minH, minW, maxH, maxW, visibility } = lp;

    if (context.debugEnabled) {
      console.log(`${this.name}[${this.id}]: measure()`);
    }
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
      width = this.lp.w;
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
      height = this.lp.h;
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

    const measuredDimensions = this.onMeasure(width, height);

    const sizeChanged = this.width !== measuredDimensions.width || this.height !== measuredDimensions.height;

    this.width = measuredDimensions.width;
    this.height = measuredDimensions.height;

    // If size got changed, force the measure of all children
    if (sizeChanged) {
      for (let i = children.length - 1; i >= 0; i--) {
        children[i].require(RequiredViewChanges.MEASURE);
      }
    }

    // Now all children can be measured
    for (let i = children.length - 1; i >= 0; i--) {
      children[i].measure(canvas);
    }
  }

  onMeasure(width: number, height: number) {
    return { width, height };
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

  draw(canvas: ViewCanvas): void {
    if (!this.requires(RequiredViewChanges.DRAW) || this.lp.visibility !== Visibility.VISIBLE) {
      return;
    }

    const {
      context,
      rect,
      lp: { marginRect: margin, paddingRect: padding },
    } = this;
    let { l, t, r, b } = rect;

    if (l >= r || t >= b) {
      // Rectangle is empty, don't draw anything
      return;
    }

    const ctx = canvas.context;

    if (context.debugEnabled) {
      console.log(`${this.name}[${this.id}]: draw()`);
    }

    ctx.save();

    if (context.debugEnabled) {
      // Draw margin bounds
      ctx.rect(l, t, r - l, b - t);
      ctx.strokeStyle = '#FF00FF';
      ctx.lineWidth = 1;
      ctx.stroke();
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

    if (context.debugEnabled) {
      // Draw padding bounds
      ctx.strokeStyle = '#00FF00';
      ctx.lineWidth = 1;
      ctx.strokeRect(l, t, r - l, b - t);
    }

    // Apply padding
    l += padding.l;
    t += padding.t;
    r -= padding.r;
    b -= padding.b;

    if (context.debugEnabled) {
      // Draw view bounds
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 1;
      ctx.strokeRect(l, t, r - l, b - t);
    }

    ctx.translate(l, t);
    ctx.rect(0, 0, r - l, b - t);
    ctx.clip();

    this.onDraw(canvas);

    const children = this.children;
    for (let i = 0, l = children.length; i < l; i++) {
      // Since parent needs a redraw, all of it's children also have to be redrawn
      // Above is correct until I develop some kind of image cache (would be extremely useful for animation support)
      children[i].require(RequiredViewChanges.DRAW);
      children[i].draw(canvas);
    }

    ctx.restore();
    this.requiredChanges--;
  }

  onDraw(canvas: ViewCanvas): void {
    // Components should implement this method
  }

  addChild(child: View, position: number = -1) {
    if (child.parent) {
      throw new Error('Child element can not be added to two containers at a time.');
    }
    if (position < 0) {
      this.children.push(child);
    } else {
      this.children.splice(position, 0, child);
    }
    child.attach(this);
    this.require(RequiredViewChanges.DEPENDENCIES_ORDERING);
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
    this.require(RequiredViewChanges.DEPENDENCIES_ORDERING);
  }

  removeChild(child: View | number) {
    let id: number;
    if (typeof child === 'number') {
      id = child;
      child = this.childrenMap[child];
    } else {
      id = this.children.indexOf(child);
    }
    if (!child || child.parent !== this) {
      throw new Error('Element is not a child of this container.');
    }

    // Actual removal begins here
    this.children.splice(id, 1);
    child.detach();

    this.require(RequiredViewChanges.DEPENDENCIES_ORDERING);
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

    this.require(RequiredViewChanges.DEPENDENCIES_ORDERING);
  }

  getInternalWrappedHeight(canvas: ViewCanvas): number | undefined {
    return undefined;
  }

  getInternalWrappedWidth(canvas: ViewCanvas): number | undefined {
    return undefined;
  }

  get innerHeight() {
    const lp = this.lp;
    return this.height - (lp.marginRect.t + lp.marginRect.b + lp.paddingRect.t + lp.paddingRect.b);
  }

  get innerWidth() {
    const lp = this.lp;
    return this.width - (lp.marginRect.l + lp.marginRect.r + lp.paddingRect.l + lp.paddingRect.r);
  }

  getLayoutParams() {
    return this.lp;
  }

  setLayoutParams(lp: LayoutParams) {
    this.lp = lp;
    if (lp.dependenciesModified) {
      this.require(RequiredViewChanges.DEPENDENCIES_ORDERING);
    } else {
      this.require(RequiredViewChanges.MEASURE);
    }
  }

  require(requiredChanges: RequiredViewChanges) {
    // Update required changes only if the new changes have bigger scope than is set currently
    if (this.requiredChanges < requiredChanges) {
      this.requiredChanges = requiredChanges;
      if (this.parent && requiredChanges >= RequiredViewChanges.DRAW) {
        this.parent.require(RequiredViewChanges.DRAW);
      }
    }
  }

  requires(requiredChanges: RequiredViewChanges) {
    return this.requiredChanges >= requiredChanges;
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

  getId() {
    return this.context.getId(this.id);
  }

  setId(id: string) {
    this.context.registerView(this.id, id);
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
    return {
      id: this.id,
      name: this.name,
      width: this.width,
      height: this.height,
      rect: this.rect,
      ...this.onSnapshot(),
      children: this.children.map(c => c.snapshot()),
    };
  }

  onSnapshot(): object {
    return {};
  }

  hasParent() {
    return Boolean(this.parent);
  }

  private attach(parent: View) {
    if (this.parent) {
      throw new Error('A view can have only one parent.');
    }
    this.parent = parent;
    this.parent.childrenMap[this.id] = this;
  }

  private detach() {
    if (!this.parent) {
      return;
    }
    delete this.parent.childrenMap[this.id];
    this.parent = null;
  }

}
