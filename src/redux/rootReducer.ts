import { combineReducers } from 'redux';

import { authReducer } from './slices/authSlice';
import { layoutReducer } from './slices/layoutSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
});
