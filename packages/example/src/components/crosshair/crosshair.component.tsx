import { SnapValuesMatch } from '@kanva/charts';
import { Offset } from '@kanva/core';
import * as React from 'react';

interface Props {
  snap?: SnapValuesMatch;
  offset?: Offset;
  onMove?: (x: number) => void;
}

export class Crosshair extends React.PureComponent<Props> {
  handleEvents: React.EventHandler<any> = ({ nativeEvent: event }) => {
    switch (event.constructor) {
      case MouseEvent:
        this.fromMouse(event);
        break;
      case TouchEvent:
        this.fromTouch(event);
        break;
      default:
        throw new Error(`Invalid event type: ${event.constructor.name}`);
    }
  };

  fromMouse = (event: MouseEvent) => {
    const { onMove, offset } = this.props;
    if (onMove && offset && event.which === 1) {
      onMove((event as MouseEvent).pageX - offset.left);
    }
  };

  fromTouch = (event: TouchEvent) => {
    const { onMove, offset } = this.props;
    if (onMove && offset) {
      onMove(event.touches[0].pageX - offset.left);
    }
  };

  get crosshairPosition() {
    const { snap } = this.props;
    return snap
      ? snap.x
      : 0;
  }

  render() {
    return (
      <div
        className={'c-crosshair'}
        style={{ '--x': this.crosshairPosition } as React.CSSProperties}
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
