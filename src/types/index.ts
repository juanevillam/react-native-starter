import type { RefObject } from 'react';

import { type ScrollView } from 'react-native';

type VoidCallback = () => void;

type Focusable = {
  focus?: VoidCallback;
};

type FormRefs = Record<string, RefObject<Focusable | null>>;

type ScrollViewRef = React.RefObject<ScrollView | null>;

export type { Focusable, VoidCallback, FormRefs, ScrollViewRef };
