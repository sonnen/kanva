import { ViewCanvas } from '../canvas';
import { Context, RequiredViewChanges, View, WRAP_CONTENT } from '../view';

export interface ImageViewProps {
  source: string;
}

export class ImageView extends View<ImageViewProps> {
  private readonly image: HTMLImageElement;
  private imageWidth: number = 0;
  private imageHeight: number = 0;
  private source?: string;

  constructor(context: Context) {
    super(context, 'ImageView');
    this.image = new context.imageClass();
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

  getInternalWrappedWidth(canvas: ViewCanvas) {
    return this.imageWidth;
  }

  getInternalWrappedHeight() {
    return this.imageHeight;
  }

  onDraw(canvas: ViewCanvas) {
    const ctx = canvas.context;
    canvas.context.drawImage(this.image, 0, 0, this.innerWidth, this.innerHeight);
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
