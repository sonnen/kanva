import { RectLike } from '../canvas';
import { DimensionInput } from '../canvas/dimension';

export type Id = number | string;

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
  posX?: DimensionInput;
  posY?: DimensionInput;
}

export interface LayoutSizeProps {
  width?: DimensionInput;
  minWidth?: number;
  maxWidth?: number;
  height?: DimensionInput;
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
