import { RectLike } from '../canvas';
import { Id } from './layout-params';

export interface LayoutRelativePositionProps {
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
}

export interface LayoutAbsolutePositionProps {
  isAbsolute?: boolean;
  posX?: number;
  posY?: number;
}

export interface LayoutSizeProps {
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  height?: number;
  minHeight?: number;
  maxHeight?: number;
}

export interface LayoutStandardProps {
  padding?: RectLike;
  margin?: RectLike;
  isAnimated?: boolean;
}

export interface LayoutProps extends LayoutRelativePositionProps,
  LayoutAbsolutePositionProps,
  LayoutSizeProps,
  LayoutStandardProps {
}
