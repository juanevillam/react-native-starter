import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { APP_ROUTES } from '@/navigation/routes';
import { HomeScreen } from '@/screens/app/HomeScreen';

type AppStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName={APP_ROUTES.HOME}
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name={APP_ROUTES.HOME} component={HomeScreen} />
  </Stack.Navigator>
);

export { type AppStackParamList, AppNavigator };
