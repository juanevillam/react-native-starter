import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  isAuthenticated: false,
};

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

export const { setIsAuthenticated, clearAuth } = authSlice.actions;

export const authReducer = authSlice.reducer;
