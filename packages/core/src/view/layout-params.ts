import { Rect, RectLike } from '../canvas';
import { DimensionInput, parseDimension, WRAP_CONTENT } from '../canvas/dimension';
import { Id, LayoutProps } from './layout-props';

export const PARENT_ID = -1;

const DefaultProps = {
  BELOW: undefined,
  ABOVE: undefined,
  TO_START_OF: undefined,
  TO_END_OF: undefined,
  ALIGN_TOP: undefined,
  ALIGN_BOTTOM: undefined,
  ALIGN_START: undefined,
  ALIGN_END: undefined,
  CENTER_VERTICAL: false,
  CENTER_HORIZONTAL: false,
  WIDTH: WRAP_CONTENT,
  MIN_WIDTH: 0,
  MAX_WIDTH: Number.MAX_SAFE_INTEGER,
  HEIGHT: WRAP_CONTENT,
  MIN_HEIGHT: 0,
  MAX_HEIGHT: Number.MAX_SAFE_INTEGER,
  IS_ANIMATED: false,
  PADDING: new Rect(0),
  MARGIN: new Rect(0),
  IS_ABSOLUTE: false,
  X: 0,
  Y: 0,
};

export class LayoutParams {
  belowId?: Id = DefaultProps.BELOW;
  aboveId?: Id = DefaultProps.ABOVE;
  toStartOfId?: Id = DefaultProps.TO_START_OF;
  toEndOfId?: Id = DefaultProps.TO_END_OF;
  topId?: Id = DefaultProps.ALIGN_TOP;
  bottomId?: Id = DefaultProps.ALIGN_BOTTOM;
  startId?: Id = DefaultProps.ALIGN_START;
  endId?: Id = DefaultProps.ALIGN_END;
  centerV = DefaultProps.CENTER_VERTICAL;
  centerH = DefaultProps.CENTER_HORIZONTAL;
  x: DimensionInput = DefaultProps.X;
  y: DimensionInput = DefaultProps.Y;
  w: DimensionInput = DefaultProps.WIDTH;
  h: DimensionInput = DefaultProps.HEIGHT;
  xDimension = parseDimension(DefaultProps.X);
  yDimension = parseDimension(DefaultProps.Y);
  wDimension = parseDimension(DefaultProps.WIDTH);
  hDimension = parseDimension(DefaultProps.HEIGHT);
  minW = DefaultProps.MIN_WIDTH;
  minH = DefaultProps.MIN_HEIGHT;
  maxW = DefaultProps.MAX_WIDTH;
  maxH = DefaultProps.MAX_HEIGHT;
  paddingRect = DefaultProps.PADDING;
  marginRect = DefaultProps.MARGIN;
  isAnimated = DefaultProps.IS_ANIMATED;
  isAbsolute = DefaultProps.IS_ABSOLUTE;

  dependenciesModified: boolean = false;
  private props?: LayoutProps;

  below(id?: Id) {
    if (this.belowId === id) {
      return this;
    }
    this.dependenciesModified = true;
    this.belowId = id;
    return this;
  }

  above(id?: Id) {
    if (this.aboveId === id) {
      return this;
    }
    this.dependenciesModified = true;
    this.aboveId = id;
    return this;
  }

  toStartOf(id?: Id) {
    if (this.toStartOfId === id) {
      return this;
    }
    this.dependenciesModified = true;
    this.toStartOfId = id;
    return this;
  }

  toLeftOf(id?: Id) {
    return this.toStartOf(id);
  }

  toEndOf(id?: Id) {
    if (this.toEndOfId === id) {
      return this;
    }
    this.dependenciesModified = true;
    this.toEndOfId = id;
    return this;
  }

  toRightOf(id?: Id) {
    return this.toEndOf(id);
  }

  alignTop(id?: Id) {
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

  alignBottom(id?: Id) {
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

  alignStart(id?: Id) {
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

  alignEnd(id?: Id) {
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

  width(width: DimensionInput) {
    if (this.w !== width) {
      this.w = width;
      this.wDimension = parseDimension(width);
    }
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

  height(height: DimensionInput) {
    if (this.h !== height) {
      this.h = height;
      this.hDimension = parseDimension(height);
    }
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

  padding(padding?: RectLike) {
    this.paddingRect = Rect.from(padding || 0);
    return this;
  }

  margin(margin?: RectLike) {
    this.marginRect = Rect.from(margin || 0);
    return this;
  }

  absolute(absolute?: boolean) {
    this.isAbsolute = absolute !== false;
    return this;
  }

  posX(x: DimensionInput) {
    if (this.x !== x) {
      this.x = x;
      this.xDimension = parseDimension(x);
    }
    return this;
  }

  posY(y: DimensionInput) {
    if (this.x !== y) {
      this.y = y;
      this.yDimension = parseDimension(y);
    }
    return this;
  }

  asProps(): LayoutProps {
    return {
      below: this.belowId,
      above: this.aboveId,
      toStartOf: this.toStartOfId,
      toEndOf: this.toEndOfId,
      alignTop: this.topId,
      alignBottom: this.bottomId,
      alignStart: this.startId,
      alignEnd: this.endId,
      centerVertical: this.centerV,
      centerHorizontal: this.centerH,
      width: this.w,
      minWidth: this.minW,
      maxWidth: this.maxW,
      height: this.h,
      minHeight: this.minH,
      maxHeight: this.maxH,
      isAnimated: this.isAnimated,
      padding: this.paddingRect,
      margin: this.marginRect,
      isAbsolute: this.isAbsolute,
      posX: this.x,
      posY: this.y,
    };
  }

  updateWithProps({
    below = DefaultProps.BELOW,
    above = DefaultProps.ABOVE,
    toStartOf = DefaultProps.TO_START_OF,
    toEndOf = DefaultProps.TO_END_OF,
    alignTop = DefaultProps.ALIGN_TOP,
    alignBottom = DefaultProps.ALIGN_BOTTOM,
    alignStart = DefaultProps.ALIGN_START,
    alignEnd = DefaultProps.ALIGN_END,
    centerVertical = DefaultProps.CENTER_VERTICAL,
    centerHorizontal = DefaultProps.CENTER_HORIZONTAL,
    width = DefaultProps.WIDTH,
    minWidth = DefaultProps.MIN_WIDTH,
    maxWidth = DefaultProps.MAX_WIDTH,
    height = DefaultProps.HEIGHT,
    minHeight = DefaultProps.MIN_HEIGHT,
    maxHeight = DefaultProps.MAX_HEIGHT,
    isAnimated = DefaultProps.IS_ANIMATED,
    padding = DefaultProps.PADDING,
    margin = DefaultProps.MARGIN,
    isAbsolute = DefaultProps.IS_ABSOLUTE,
    posX = DefaultProps.X,
    posY = DefaultProps.Y,
  }: LayoutProps = {}) {
    const oldProps = this.props || this.asProps();
    const props = {
      below, above, toStartOf, toEndOf,
      alignTop, alignBottom, alignStart, alignEnd,
      centerVertical, centerHorizontal,
      width, minWidth, maxWidth,
      height, minHeight, maxHeight,
      padding, margin,
      isAnimated, isAbsolute,
      posX, posY,
    };
    let modified = false;
    const keys = Object.keys(props);
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i];
      const value = props[key];
      const oldValue = oldProps[key];
      if (value !== oldValue) {
        this[key](value);
        modified = true;
      }
    }
    this.props = props;
    return modified;
  }
}

export function createLayoutMap<K extends string>(
  t: Record<K, LayoutProps>,
): { [key in K]: LayoutProps } {
  return t as any;
}
