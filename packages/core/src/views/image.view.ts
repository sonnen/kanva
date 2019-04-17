import { ViewCanvas } from '../canvas';
import { Context, RequiredViewChanges, View, WRAP_CONTENT } from '../view';

export enum ImageScaleType {
  STRETCH,
  FIT_CENTER,
  FIT_START,
  FIT_END,
  CENTER_CROP,
  CENTER_INSIDE,
}

export interface ImageViewProps {
  source: string;
  scaleType: ImageScaleType;
}

export class ImageView extends View<ImageViewProps> {
  private readonly image: HTMLImageElement;
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
    const { imageWidth, imageHeight, innerWidth, innerHeight } = this;

    switch (this.scaleType) {
      case ImageScaleType.FIT_CENTER: {
        const scale = Math.max(innerWidth, innerHeight) / Math.min(imageWidth, imageHeight);
        const newW = scale * imageWidth;
        const newH = scale * imageHeight;

        ctx.drawImage(this.image, (innerWidth - newW) / 2, (innerHeight - newH) / 2, newW, newH);
        break;
      }
      case ImageScaleType.FIT_START: {
        const scale = Math.max(innerWidth, innerHeight) / Math.min(imageWidth, imageHeight);
        const newW = scale * imageWidth;
        const newH = scale * imageHeight;

        ctx.drawImage(this.image, 0, 0, newW, newH);
        break;
      }
      case ImageScaleType.FIT_END: {
        const scale = Math.max(innerWidth, innerHeight) / Math.min(imageWidth, imageHeight);
        const newW = scale * imageWidth;
        const newH = scale * imageHeight;

        ctx.drawImage(this.image, innerWidth - newW, innerHeight - newH, newW, newH);
        break;
      }
      case ImageScaleType.CENTER_INSIDE: {
        const scale = Math.min(innerWidth, innerHeight) / Math.max(imageWidth, imageHeight);
        const newW = scale * imageWidth;
        const newH = scale * imageHeight;

        ctx.drawImage(this.image, (innerWidth - newW) / 2, (innerHeight - newH) / 2, newW, newH);

        break;
      }
      case ImageScaleType.STRETCH:
      default: {
        ctx.drawImage(this.image, 0, 0, innerWidth, innerHeight);
        break;
      }
    }
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
