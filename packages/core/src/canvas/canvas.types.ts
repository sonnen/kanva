export interface PositionOptions {
  x: number;
  y: number;
}

export interface DrawOptions {
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  lineDash?: number[];
}

export interface TextOptions {
  fontString: string;
  direction?: CanvasDirection;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  text: string;
}

export interface DrawLineOptions extends PositionOptions, DrawOptions {
  x2: number;
  y2: number;
}

export interface MeasureTextOptions extends TextOptions {
}

export interface DrawTextOptions extends PositionOptions, TextOptions, DrawOptions {
  maxWidth?: number;
}
