import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type Language, DEFAULT_LANGUAGE } from '@/i18n/i18n';
import { type Theme, DEFAULT_THEME } from '@/styles/themes';

type LayoutState = {
  language: Language;
  theme: Theme;
};

const initialState: LayoutState = {
  language: DEFAULT_LANGUAGE,
  theme: DEFAULT_THEME,
};

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

export const { setLanguage, setTheme, clearLayout } = layoutSlice.actions;

export const layoutReducer = layoutSlice.reducer;
