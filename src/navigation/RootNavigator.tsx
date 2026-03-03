import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { selectIsAuthenticated } from '@/redux/selectors';
import { useAppSelector } from '@/redux/store/hooks';

import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

export const RootNavigator = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
