//#region Imports
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type Language, DEFAULT_LANGUAGE } from '@/i18n/i18n';
import { type Theme, DEFAULT_THEME } from '@/styles/themes';
//#endregion Imports

//#region Types
type LayoutState = {
  language: Language;
  theme: Theme;
};
//#endregion Types

//#region Constants
const initialState: LayoutState = {
  language: DEFAULT_LANGUAGE,
  theme: DEFAULT_THEME,
};
//#endregion Constants

//#region Slice
const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    clearLayout: () => initialState,
  },
});
//#endregion Slice

//#region Exports
export const { setLanguage, setTheme, clearLayout } = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
//#endregion Exports
