import { SnapValuesMatch } from '@kanva/charts';
import * as React from 'react';

interface Props {
  snap?: SnapValuesMatch;
  onMove?: React.EventHandler<React.TouchEvent>;
}

export const Crosshair: React.SFC<Props> = ({ snap, onMove }) => (
  <div
    className={'c-crosshair'}
    style={{ '--x': snap ? snap.x : 0 } as React.CSSProperties}
  >
    <div className={'c-crosshair__line'} />
    <div
      className={'c-crosshair__handle-hitbox'}
      onTouchMove={onMove}
    >
      <div className={'c-crosshair__handle'} />
    </div>
  </div>
);
