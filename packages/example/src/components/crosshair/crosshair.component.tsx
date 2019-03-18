import { SnapValuesMatch } from '@kanva/charts';
import * as React from 'react';

interface Props {
  snap?: SnapValuesMatch;
  onMove?: (x: number) => void;
}

export class Crosshair extends React.PureComponent<Props> {
  handleEvents: React.EventHandler<any> = ({ nativeEvent: event }) => {
    const { onMove } = this.props;
    if (!onMove) {
      return;
    }

    switch (event.constructor) {
      case MouseEvent:
        if ((event as MouseEvent).which === 1) {
          onMove((event as MouseEvent).pageX);
        }
        break;
      case TouchEvent:
        onMove((event as TouchEvent).touches[0].pageX);
        break;
      default:
        throw new Error(`Invalid event type: ${event.constructor.name}`);
    }
  };

  render() {
    const { snap } = this.props;
    return (
      <div
        className={'c-crosshair'}
        style={{ '--x': snap ? snap.x : 0 } as React.CSSProperties}
      >
        <div className={'c-crosshair__line'} />
        <div
          className={'c-crosshair__handle-hitbox'}
          onMouseMove={this.handleEvents}
          onTouchMove={this.handleEvents}
        >
          <div className={'c-crosshair__handle'} />
        </div>
      </div>
    );
  }
}
