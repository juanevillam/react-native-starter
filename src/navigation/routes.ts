//#region Imports
import { type AppStackParamList } from '@/navigation/AppNavigator';
import { type AuthStackParamList } from '@/navigation/AuthNavigator';
//#endregion Imports

//#region Types
type Routes<T> = Record<string, keyof T>;
//#endregion Types

//#region Constants
const APP_ROUTES = {
  HOME: 'Home',
} as const satisfies Routes<AppStackParamList>;

const AUTH_ROUTES = {
  LOGIN: 'Login',
} as const satisfies Routes<AuthStackParamList>;
//#endregion Constants

//#region Exports
export { APP_ROUTES, AUTH_ROUTES };
//#endregion Exports
