## ImageView

### Required parameters
* source - Image URL
* scaleType - one of values defined in `ImageScaleType` enum

### Scaling modes

When scaling is set to one of `FIT` modes, the image is scaled uniformly, with bounds being greater or equal to containing `ImageView`. `ImageScaleType` allows to scale the image in one of ways defined below:

| Value | Description |
| --- | --- |
| STRETCH | Image is stretched to exactly match `ImageView`'s dimensions. |
| FIT_CENTER | The image fit's `ImageView`'s bounds and is centered along the greater dimension. |
| FIT_START | The image fit's `ImageView`'s bounds and is aligned to the start of the greater dimension. |
| FIT_END | The image fit's `ImageView`'s bounds and is aligned to the end of the greater dimension. |
| CENTER_INSIDE | The image's dimensions are smaller or equal to `ImageView`'s dimensions. |

### Usage example:

```tsx
<ImageView
  layoutParams={{
    width: '20%',
    height: '100%',
    margin: 10,
  }}
  backgroundColor={'white'}
  source={sampleImage}
  scaleType={ImageScaleType.STRETCH}
/>
```
