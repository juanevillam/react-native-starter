//#region Imports
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { APP_ROUTES } from '@/navigation/routes';
import { HomeScreen } from '@/screens/app/HomeScreen';
//#endregion Imports

//#region Types
type AppStackParamList = {
  Home: undefined;
};
//#endregion Types

//#region Constants
const Stack = createNativeStackNavigator<AppStackParamList>();
//#endregion Constants

//#region Component
const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName={APP_ROUTES.HOME}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={APP_ROUTES.HOME} component={HomeScreen} />
  </Stack.Navigator>
);
//#endregion Component

//#region Exports
export { type AppStackParamList, AppNavigator };
//#endregion Exports
