import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { AUTH_ROUTES } from '@/navigation/routes';
import { LoginScreen } from '@/screens/auth/LoginScreen';

type AuthStackParamList = {
  Login: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName={AUTH_ROUTES.LOGIN}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={AUTH_ROUTES.LOGIN} component={LoginScreen} />
  </Stack.Navigator>
);

export { type AuthStackParamList, AuthNavigator };
