import { View } from '../view';
import { RootCanvasView } from '../views';

const isSafari = () => {
  try {
    return (navigator.vendor || '').toLowerCase().indexOf('apple') >= 0;
  } catch {
    return false;
  }
};
const isChrome = () => {
  try {
    return (navigator.vendor || '').toLowerCase().indexOf('google') >= 0;
  } catch {
    return false;
  }
};

const getBox = (width: number, height: number, scale: number) => ({
  str: `+`,
  style: `
  font-size: 1px;
  padding: ${isSafari() ? height * scale / 2 : 0}px ${Math.floor(width * scale / 2)}px;
  color: transparent;
  line-height: ${height * scale}px;`,
});

export const logScreenshot = (view: View, scale = 1) => {
  if (!isChrome() && !isSafari()) {
    console.warn(`Screenshot logs are only supported on Chrome and Safari`);
    return;
  }
  const screenshot = view.screenshot();
  if (!screenshot) {
    console.warn(`${view.name}: Could not log a screenshot of a view at this time.`);
    return;
  }
  const viewOffset = view.offsetRect;
  const rootView = view.getRootView() as RootCanvasView;
  const rootViewScale = rootView.getScale();
  const w = view.innerWidth * rootViewScale;
  const h = view.innerHeight * rootViewScale;

  const { str, style } = getBox(w, h, scale);
  console.log('%c' + str, `${style}
    background: url(${screenshot}) no-repeat;
    background-size: ${w * scale}px ${h * scale}px;
  `);
};
