import { type AppStackParamList } from '@/navigation/AppNavigator';
import { type AuthStackParamList } from '@/navigation/AuthNavigator';

type Routes<T> = Record<string, keyof T>;

const APP_ROUTES = {
  HOME: 'Home',
} as const satisfies Routes<AppStackParamList>;

const AUTH_ROUTES = {
  LOGIN: 'Login',
} as const satisfies Routes<AuthStackParamList>;

export { APP_ROUTES, AUTH_ROUTES };
