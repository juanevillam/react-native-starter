//#region Imports
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';

import { type AppDispatch, type RootState } from './types';
//#endregion Imports

//#region Hooks
const useAppDispatch = useDispatch<AppDispatch>;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//#endregion Hooks

//#region Exports
export { useAppDispatch, useAppSelector };
//#endregion Exports
