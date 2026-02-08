//#region Imports
import type { RefObject } from 'react';

import { type ScrollView } from 'react-native';
//#endregion Imports

//#region Types
type VoidCallback = () => void;

type Focusable = {
  focus?: VoidCallback;
};

type FormRefs = Record<string, RefObject<Focusable | null>>;

type ScrollViewRef = React.RefObject<ScrollView | null>;
//#endregion Types

//#region Exports
export type { Focusable, VoidCallback, FormRefs, ScrollViewRef };
//#endregion Exports
