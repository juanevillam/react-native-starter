//#region Imports
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
//#endregion Imports

//#region Types
type AuthState = {
  isAuthenticated: boolean;
};
//#endregion Types

//#region Constants
const initialState: AuthState = {
  isAuthenticated: false,
};
//#endregion Constants

//#region Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    clearAuth: () => initialState,
  },
});
//#endregion Slice

//#region Exports
export const { setIsAuthenticated, clearAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;
//#endregion Exports
