import { Rect, RectLike } from '../canvas/rect';

export const MATCH_PARENT = -1;
export const WRAP_CONTENT = -2;
export const PARENT_ID = -1;

export const isRelativeDimension = (dimension: number) => dimension < 0;

export enum Visibility {
  VISIBLE,
  INVISIBLE,
  GONE,
}

type Id = number | string;

export class LayoutParams {
  belowId?: Id;
  aboveId?: Id;
  toStartOfId?: Id;
  toEndOfId?: Id;
  topId?: Id;
  bottomId?: Id;
  startId?: Id;
  endId?: Id;
  centerV?: boolean;
  centerH?: boolean;
  visibility: Visibility = Visibility.VISIBLE;
  x: number = 0;
  y: number = 0;
  w: number = WRAP_CONTENT;
  h: number = WRAP_CONTENT;
  minW: number = 0;
  minH: number = 0;
  maxW: number = Number.MAX_SAFE_INTEGER;
  maxH: number = Number.MAX_SAFE_INTEGER;
  paddingRect: Rect = new Rect(0);
  marginRect: Rect = new Rect(0);
  isAnimated: boolean = false;
  isAbsolute: boolean = false;
  dependenciesModified: boolean = false;

  below(id: Id) {
    if (this.belowId === id) {
      return this;
    }
    this.dependenciesModified = true;
    this.belowId = id;
    return this;
  }

  above(id: Id) {
    if (this.aboveId === id) {
      return this;
    }
    this.dependenciesModified = true;
    this.aboveId = id;
    return this;
  }

  toStartOf(id: Id) {
    if (this.toStartOfId === id) {
      return this;
    }
    this.dependenciesModified = true;
    this.toStartOfId = id;
    return this;
  }

  toLeftOf(id: Id) {
    return this.toStartOf(id);
  }

  toEndOf(id: Id) {
    if (this.toEndOfId === id) {
      return this;
    }
    this.dependenciesModified = true;
    this.toEndOfId = id;
    return this;
  }

  toRightOf(id: Id) {
    return this.toEndOf(id);
  }

  alignTop(id: Id){
    if (this.topId === id) {
      return this;
    }
    this.dependenciesModified = true;
    this.topId = id;
    return this;
  }

  alignParentTop() {
    return this.alignTop(PARENT_ID);
  }

  alignBottom(id: Id){
    if (this.bottomId === id) {
      return this;
    }
    this.dependenciesModified = true;
    this.bottomId = id;
    return this;
  }

  alignParentBottom() {
    return this.alignBottom(PARENT_ID);
  }

  alignStart(id: Id){
    if (this.startId === id) {
      return this;
    }
    this.dependenciesModified = true;
    this.startId = id;
    return this;
  }

  alignParentStart() {
    return this.alignStart(PARENT_ID);
  }

  alignEnd(id: Id) {
    if (this.endId === id) {
      return this;
    }
    this.dependenciesModified = true;
    this.endId = id;
    return this;
  }

  alignParentEnd() {
    return this.alignEnd(PARENT_ID);
  }

  center(center?: boolean) {
    return this
      .centerHorizontal(center)
      .centerVertical(center);
  }

  centerVertical(center?: boolean) {
    this.centerV = center !== false;
    return this;
  }

  centerHorizontal(center?: boolean) {
    this.centerH = center !== false;
    return this;
  }

  width(width: number) {
    this.w = width;
    return this;
  }

  minWidth(minWidth: number) {
    this.minH = minWidth;
    return this;
  }

  maxWidth(maxWidth: number) {
    this.maxH = maxWidth;
    return this;
  }

  height(height: number) {
    this.w = height;
    return this;
  }

  minHeight(minHeight: number) {
    this.minH = minHeight;
    return this;
  }

  maxHeight(maxHeight: number) {
    this.maxH = maxHeight;
    return this;
  }

  animate(animate?: boolean) {
    this.isAnimated = animate !== false;
    return this;
  }

  padding(padding: RectLike) {
    this.paddingRect = Rect.from(padding);
    return this;
  }

  margin(margin: RectLike) {
    this.marginRect = Rect.from(margin);
    return this;
  }

  absolute(absolute?: boolean) {
    this.isAbsolute = absolute !== false;
    return this;
  }

  posX(x: number) {
    this.x = x;
    return this;
  }

  posY(y: number) {
    this.y = y;
    return this;
  }

}

const existingNonParentDependency = (id: undefined | Id): id is number => id !== undefined && id !== PARENT_ID;

export const horizontalLayoutDependencies = (lp: LayoutParams) => ([
  lp.startId,
  lp.toStartOfId,
  lp.endId,
  lp.toEndOfId,
]).filter(existingNonParentDependency);

export const verticalLayoutDependencies = (lp: LayoutParams) => ([
  lp.topId,
  lp.aboveId,
  lp.bottomId,
  lp.belowId,
]).filter(existingNonParentDependency);
