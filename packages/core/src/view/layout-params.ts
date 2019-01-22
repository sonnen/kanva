import { Rect, RectLike } from '../canvas/rect';

export const MATCH_PARENT = -1;
export const WRAP_CONTENT = -2;
export const PARENT_ID = -1;

export type Id = number | string;

export const isRelativeDimension = (dimension: number) => dimension < 0;

export interface LayoutParamsProps {
  below?: Id;
  above?: Id;
  toStartOf?: Id;
  toEndOf?: Id;
  alignTop?: Id;
  alignBottom?: Id;
  alignStart?: Id;
  alignEnd?: Id;
  centerVertical?: boolean;
  centerHorizontal?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  height?: number;
  minHeight?: number;
  maxHeight?: number;
  isAnimated?: boolean;
  padding?: RectLike;
  margin?: RectLike;
  isAbsolute?: boolean;
  posX?: number;
  posY?: number;
}

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
    this.h = height;
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

  posX(x: number) {
    this.x = x;
    return this;
  }

  posY(y: number) {
    this.y = y;
    return this;
  }

  asProps(): LayoutParamsProps {
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

  updateWithProps(props: LayoutParamsProps) {
    if (props.above !== this.aboveId) {
      this.above(props.above);
    }
    if (props.alignBottom !== this.bottomId) {
      this.alignBottom(props.alignBottom);
    }
    if (props.below !== this.belowId) {
      this.below(props.below);
    }
    if (props.above !== this.aboveId) {
      this.above(props.above);
    }
    if (props.toStartOf !== this.toStartOfId) {
      this.toStartOf(props.toStartOf);
    }
    if (props.toEndOf !== this.toEndOfId) {
      this.toEndOf(props.toEndOf);
    }
    if (props.alignTop !== this.topId) {
      this.alignTop(props.alignTop);
    }
    if (props.alignBottom !== this.bottomId) {
      this.alignBottom(props.alignBottom);
    }
    if (props.alignStart !== this.startId) {
      this.alignStart(props.alignStart);
    }
    if (props.alignEnd !== this.endId) {
      this.alignEnd(props.alignEnd);
    }
    if (props.centerVertical !== this.centerV) {
      this.centerVertical(props.centerVertical);
    }
    if (props.centerHorizontal !== this.centerH) {
      this.centerHorizontal(props.centerHorizontal);
    }
    // TODO Undefined checks should probably be handled in a different way.
    // Currently changing state from defined to undefined value is not supported.
    if (props.width !== this.w && props.width !== undefined) {
      this.width(props.width);
    }
    if (props.minWidth !== this.minW && props.minWidth !== undefined) {
      this.minWidth(props.minWidth);
    }
    if (props.maxWidth !== this.maxW && props.maxWidth !== undefined) {
      this.maxWidth(props.maxWidth);
    }
    if (props.height !== this.h && props.height !== undefined) {
      this.height(props.height);
    }
    if (props.minHeight !== this.minH && props.minHeight !== undefined) {
      this.minHeight(props.minHeight);
    }
    if (props.maxHeight !== this.maxH && props.maxHeight !== undefined) {
      this.maxHeight(props.maxHeight);
    }
    if (props.isAnimated !== this.isAnimated && props.isAnimated !== undefined) {
      this.animate(props.isAnimated);
    }
    if (props.padding !== this.paddingRect) {
      this.padding(props.padding);
    }
    if (props.margin !== this.marginRect) {
      this.margin(props.margin);
    }
    if (props.isAbsolute !== this.isAbsolute && props.isAbsolute !== undefined) {
      this.absolute(props.isAbsolute);
    }
    if (props.posX !== this.x && props.posX !== undefined) {
      this.posX(props.posX);
    }
    if (props.posY !== this.y && props.posY !== undefined) {
      this.posY(props.posY);
    }
  }
}
