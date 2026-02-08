//#region Imports
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AUTH_ROUTES } from '@/navigation/routes';
import { LoginScreen } from '@/screens/auth/LoginScreen';
//#endregion Imports

//#region Types
type AuthStackParamList = {
  Login: undefined;
};
//#endregion Types

//#region Constants
const Stack = createStackNavigator<AuthStackParamList>();
//#endregion Constants

//#region Component
const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName={AUTH_ROUTES.LOGIN}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={AUTH_ROUTES.LOGIN} component={LoginScreen} />
  </Stack.Navigator>
);
//#endregion Component

//#region Exports
export { type AuthStackParamList, AuthNavigator };
//#endregion Exports
