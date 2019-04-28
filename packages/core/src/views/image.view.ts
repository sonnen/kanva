import { Rect, ViewCanvas, WRAP_CONTENT } from '../canvas';
import { Context, RequiredViewChanges, View } from '../view';

export enum ImageScaleType {
  STRETCH,
  FIT_CENTER,
  FIT_START,
  FIT_END,
  CENTER_INSIDE,
}

export interface ImageViewProps {
  source: string;
  scaleType: ImageScaleType;
}

const scaleImage = (
  scaleType: ImageScaleType,
  imageWidth: number,
  imageHeight: number,
  innerWidth: number,
  innerHeight: number,
  rect: Rect,
): Rect => {
  let x: number;
  let y: number;
  let width: number;
  let height: number;
  switch (scaleType) {
    case ImageScaleType.FIT_END:
    case ImageScaleType.FIT_START:
    case ImageScaleType.FIT_CENTER: {
      const scale = Math.max(innerWidth, innerHeight) / (Math.min(imageWidth, imageHeight) || 1);
      width = scale * imageWidth;
      height = scale * imageHeight;
      break;
    }
    case ImageScaleType.CENTER_INSIDE: {
      const scale = Math.min(innerWidth, innerHeight) / (Math.max(imageWidth, imageHeight) || 1);
      width = scale * imageWidth;
      height = scale * imageHeight;
      break;
    }
    case ImageScaleType.STRETCH:
    default: {
      width = innerWidth;
      height = innerHeight;
      break;
    }
  }
  switch (scaleType) {
    case ImageScaleType.FIT_CENTER:
    case ImageScaleType.CENTER_INSIDE:
      x = (innerWidth - width) / 2;
      y = (innerHeight - height) / 2;
      break;
    case ImageScaleType.FIT_END:
      x = innerWidth - width;
      y = innerHeight - height;
      break;
    case ImageScaleType.FIT_START:
    case ImageScaleType.STRETCH:
    default:
      x = 0;
      y = 0;
      break;
  }
  rect.l = x;
  rect.r = x + width;
  rect.t = y;
  rect.b = y + height;
  return rect;
};

export class ImageView extends View<ImageViewProps> {
  private readonly image: HTMLImageElement;
  private readonly imageRect = new Rect(0);
  private scaleType: ImageScaleType = ImageScaleType.STRETCH;
  private imageWidth: number = 0;
  private imageHeight: number = 0;
  private source?: string;

  constructor(context: Context) {
    super(context, 'ImageView');
    this.image = new context.imageClass();
  }

  getScaleType() {
    return this.scaleType;
  }

  setScaleType(scaleType: ImageScaleType) {
    this.scaleType = scaleType;
  }

  getSource() {
    return this.source;
  }

  setSource(source: string) {
    if (source === this.source) {
      return;
    }
    this.source = source;
    this.image.onload = () => {
      this.imageWidth = this.image.naturalWidth;
      this.imageHeight = this.image.naturalHeight;
      this.refresh();
    };
    this.image.src = source;
  }

  getInternalWrappedWidth() {
    return this.imageWidth;
  }

  getInternalWrappedHeight() {
    return this.imageHeight;
  }

  onDraw(canvas: ViewCanvas) {
    const ctx = canvas.context;
    const { rect, scaleType, imageWidth, imageHeight, innerWidth, innerHeight } = this;
    scaleImage(scaleType, imageWidth, imageHeight, innerWidth, innerHeight, rect);
    ctx.drawImage(this.image, rect.l, rect.t, rect.width, rect.height);
  }

  onSnapshot() {
    return {
      source: this.source,
    };
  }

  private refresh() {
    if (this.lp.w === WRAP_CONTENT || this.lp.h === WRAP_CONTENT) {
      this.require(RequiredViewChanges.MEASURE);
    } else {
      this.require(RequiredViewChanges.DRAW);
    }
  }
}
