import { ContextLike, NoContext } from '@kanva/core';
import { View } from '@kanva/core';
import * as React from 'react';

export interface ContextObject {
  ctx: ContextLike;
  parent: View;
}

export const KanvaContext = React.createContext<ContextObject>({
  ctx: new NoContext(),
  parent: undefined as any,
});
