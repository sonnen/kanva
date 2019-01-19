export type FontStyle = 'normal' | 'italic' | 'oblique';

export type FontVariant = 'normal' | 'small-caps';

export type FontWeight =
  'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | 100 | '100'
  | 200 | '200'
  | 300 | '300'
  | 400 | '400'
  | 500 | '500'
  | 600 | '600'
  | 700 | '700'
  | 800 | '800'
  | 900 | '900'
  ;

export enum TextAlign {
  START = 'start',
  END = 'end',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export enum TextBaseline {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
}

export interface Font {
  fontStyle?: FontStyle;
  fontVariant?: FontVariant;
  fontWeight?: FontWeight;
  fontSize: number;
  lineHeight?: number;
  fontFamily: string;
}

export const font = ({
  fontStyle,
  fontVariant,
  fontWeight,
  fontSize,
  fontFamily,
}: Font): string => (
  (fontStyle ? fontStyle + ' ' : '') +
  (fontVariant ? fontVariant + ' ' : '') +
  (fontWeight ? fontWeight + ' ' : '') +
  (fontSize ? fontSize + 'px ' : '') +
  (fontFamily ? fontFamily + ' ' : '')
).slice(0, -1);
