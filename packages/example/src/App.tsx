import * as React from 'react';

import './App.css';
import { AreaChartSample } from './components/area-chart-sample.component';

export class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <div className='wrapper'>
          <AreaChartSample />
        </div>
      </div>
    );
  }
}
