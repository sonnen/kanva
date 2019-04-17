import * as React from 'react';
import { AreaChartSample } from './components/area-chart-sample';
import { BarChartSample } from './components/bar-chart-sample';
import { PieChartSample } from './components/pie-chart-sample';

import './App.css';
import { ImageSample } from './components/image-sample';

interface Props {
}

interface State {
  chartCount: number;
}

export class App extends React.Component<Props, State> {
  state: State = {
    chartCount: 1,
  };

  render() {
    const { chartCount } = this.state;
    return (
      <div className='app'>
        {chartCount < 25 && (
          <button onClick={() => this.setState(({ chartCount }) => ({ chartCount: chartCount + 1 }))}>
            Add
          </button>
        )}
        {chartCount > 0 && (
          <button onClick={() => this.setState(({ chartCount }) => ({ chartCount: chartCount - 1 }))}>
            Remove
          </button>
        )}
        {
          new Array(chartCount).fill(0).map(
            (_, index) => (
              <div className='wrapper' key={index}>
                <AreaChartSample />
                <PieChartSample />
                <BarChartSample />
              </div>),
          )
        }
        <ImageSample />
      </div>
    );
  }
}
