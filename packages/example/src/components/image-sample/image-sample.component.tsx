import { ImageScaleType, ImageViewProps, PARENT_ID, ViewProps } from '@kanva/core';
import { ImageView, Kanva } from '@kanva/react';
import * as React from 'react';

const sampleImage = './beagle.png';

const BaseImage: React.FC<Partial<ViewProps & ImageViewProps>> = (props) => (
  <ImageView
    {...props}
    layoutParams={{
      width: 150,
      height: 300,
      ...props.layoutParams,
      margin: 10,
    }}
    backgroundColor={'#FFF'}
    source={sampleImage}
  />
);

export const ImageSample: React.FC = () => (
  <Kanva
    className={'c-sample-canvas'}
  >
    <BaseImage
      id={'stretch'}
      scaleType={ImageScaleType.STRETCH}
      layoutParams={{
        alignTop: PARENT_ID,
        alignStart: PARENT_ID,
      }}
    />
    <BaseImage
      id={'fitCenter'}
      scaleType={ImageScaleType.FIT_CENTER}
      layoutParams={{
        alignTop: PARENT_ID,
        toEndOf: 'stretch',
      }}
    />
    <BaseImage
      id={'fitStart'}
      scaleType={ImageScaleType.FIT_START}
      layoutParams={{
        alignTop: PARENT_ID,
        toEndOf: 'fitCenter',
      }}
    />
    <BaseImage
      id={'fitEnd'}
      scaleType={ImageScaleType.FIT_END}
      layoutParams={{
        alignTop: PARENT_ID,
        toEndOf: 'fitStart',
      }}
    />
    <BaseImage
      id={'centerInside'}
      scaleType={ImageScaleType.CENTER_INSIDE}
      layoutParams={{
        alignTop: PARENT_ID,
        toEndOf: 'fitEnd',
      }}
    />
  </Kanva>
);
