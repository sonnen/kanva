import { YValuesMatch } from '@kanva/charts';
import * as React from 'react';

interface Props {
  data?: YValuesMatch;
  xFormatter?: (value: number) => string;
}

export const Tooltip: React.FunctionComponent<Props> = ({
  data,
  xFormatter,
}) => (
  <div className={'c-tooltip'}>
    {data ? (
      <>
        <span>{xFormatter ? xFormatter(data.x) : String(data.x)}</span>
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
