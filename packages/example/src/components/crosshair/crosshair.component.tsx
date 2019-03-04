import { SnapValuesMatch, YValuesMatch } from '@kanva/charts';
import * as React from 'react';

interface Props {
  snap?: SnapValuesMatch;
}

export class Crosshair extends React.Component<Props> {
  render() {
    const { snap } = this.props;

    return (
      <div
        className={'c-crosshair'}
        style={{ '--x': snap ? snap.x : 0 } as React.CSSProperties}
      >
        <div className={'c-crosshair__line'} />
        <div className={'c-crosshair__handle'} />
      </div>
    );
  }
}
