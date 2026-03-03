import type { RootState } from './store/types';

const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

const selectLanguage = (state: RootState) => state.layout.language;

const selectTheme = (state: RootState) => state.layout.theme;

const selectLayout = (state: RootState) => state.layout;

export { selectIsAuthenticated, selectLanguage, selectTheme, selectLayout };
