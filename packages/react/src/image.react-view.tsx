import { ImageView as KanvaImageView, ImageViewProps } from '@kanva/core';
import { createReactView } from './react-binding';

export const ImageView = createReactView<ImageViewProps>(KanvaImageView);
