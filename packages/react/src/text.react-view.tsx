import { TextView as KanvaTextView, TextViewProps } from '@kanva/core';
import { createReactView } from './react-binding';

export const TextView = createReactView<TextViewProps>(KanvaTextView);
