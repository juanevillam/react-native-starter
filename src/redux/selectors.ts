//#region Imports
import type { RootState } from './store/types';
//#endregion Imports

//#region Auth Selectors
const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
//#endregion Auth Selectors

//#region Layout Selectors
const selectLanguage = (state: RootState) => state.layout.language;

const selectTheme = (state: RootState) => state.layout.theme;

const selectLayout = (state: RootState) => state.layout;
//#endregion Layout Selectors

//#region Exports
export { selectIsAuthenticated, selectLanguage, selectTheme, selectLayout };
//#endregion Exports
