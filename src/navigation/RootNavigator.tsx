//#region Imports
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { selectIsAuthenticated } from '@/redux/selectors';
import { useAppSelector } from '@/redux/store/hooks';

import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';
//#endregion Imports

//#region Component
export const RootNavigator = () => {
  //#region Hooks
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  //#endregion Hooks

  //#region Render
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
  //#endregion Render
};
//#endregion Component
