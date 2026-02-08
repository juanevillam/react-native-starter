//#region Imports
import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

// To use custom colors, uncomment the import below and update the themes accordingly.
// import { DARK_COLORS, LIGHT_COLORS } from './colors';
//#endregion Imports

//#region Types
type Theme = 'light' | 'dark' | 'system';
//#endregion Types

//#region Constants
const DEFAULT_THEME: Theme = 'system';

// Using default react-native-paper MD3 themes.
// To apply custom colors, spread the base theme and override the colors property:
//
// const CUSTOM_LIGHT_THEME: MD3Theme = {
//   ...MD3LightTheme,
//   colors: LIGHT_COLORS,
// };
//
// const CUSTOM_DARK_THEME: MD3Theme = {
//   ...MD3DarkTheme,
//   colors: DARK_COLORS,
// };

const CUSTOM_LIGHT_THEME: MD3Theme = MD3LightTheme;

const CUSTOM_DARK_THEME: MD3Theme = MD3DarkTheme;
//#endregion Constants

//#region Exports
export { type Theme, DEFAULT_THEME, CUSTOM_LIGHT_THEME, CUSTOM_DARK_THEME };
//#endregion Exports
