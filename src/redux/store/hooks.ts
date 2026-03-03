import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';

import { type AppDispatch, type RootState } from './types';

const useAppDispatch = useDispatch<AppDispatch>;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector };
