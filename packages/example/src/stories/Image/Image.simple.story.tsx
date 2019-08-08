import { ImageScaleType, ImageViewProps, PARENT_ID, ViewProps } from '@kanva/core';
import { ImageView, Kanva } from '@kanva/react';
import * as React from 'react';
import { boolean } from '@storybook/addon-knobs';
import simpleImageNotes from './Image.simple.notes.md';
import sampleImage from '../../../public/beagle.png';

import './Image.simple.story.css';

export { simpleImageNotes };

const BaseImage: React.FC<Partial<ViewProps & ImageViewProps>> = (props) => (
  <ImageView
    {...props}
    layoutParams={{
      width: '20%',
      height: '100%',
      ...props.layoutParams,
      margin: 10,
    }}
    backgroundColor={'red'}
    source={sampleImage}
    scaleType={props.scaleType}
  />
);

export const simpleImageStory = () => {
  const debug = boolean('Debug', false);

  return (
    <Kanva
      className={'c-image-simple-story'}
      debug={debug}
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
};

