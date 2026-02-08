//#region Imports
import { combineReducers } from 'redux';

import { authReducer } from './slices/authSlice';
import { layoutReducer } from './slices/layoutSlice';
//#endregion Imports

//#region Reducer
export const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
});
//#endregion Reducer
