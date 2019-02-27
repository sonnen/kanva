import { YValuesMatch } from '@kanva/charts';
import * as React from 'react';

interface Props {
  data?: YValuesMatch;
}

export const Tooltip: React.FunctionComponent<Props> = ({
  data,
}) => (
  <div className={'c-tooltip'}>
    {data ? (
      <>
        <span>{new Date(data.x).toString()}</span>
        <ul className={'c-tooltip__values'}>
          {Object.entries(data.y).map(([key, value]) => (
            <li key={key} className={'c-tooltip__value'}>{key}: {Math.round(value)}</li>
          ))}
        </ul>
      </>
    ) : (
      'Hover on chart to see the tooltip'
    )}
  </div>
);
