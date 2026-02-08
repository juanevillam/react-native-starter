//#region Imports
import React, { useEffect } from 'react';

import { useColorScheme } from 'react-native';

import { useTranslation } from 'react-i18next';
import { PaperProvider } from 'react-native-paper';

import { useAppSelector } from '@/redux/store/hooks';
import { CUSTOM_DARK_THEME, CUSTOM_LIGHT_THEME } from '@/styles/themes';

import { SnackbarProvider } from './SnackbarProvider';
//#endregion Imports

//#region Types
type LayoutProviderProps = {
  children: React.ReactNode;
};
//#endregion Types

//#region Component
export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  //#region Hooks
  const colorScheme = useColorScheme();
  const { i18n } = useTranslation();
  const { language, theme } = useAppSelector(store => store.layout);
  //#endregion Hooks

  //#region Derived Values
  const themeMapping = {
    system: colorScheme === 'light' ? CUSTOM_LIGHT_THEME : CUSTOM_DARK_THEME,
    light: CUSTOM_LIGHT_THEME,
    dark: CUSTOM_DARK_THEME,
  };

  const paperTheme = themeMapping[theme];
  //#endregion Derived Values

  //#region Effects
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);
  //#endregion Effects

  //#region Render
  return (
    <PaperProvider theme={paperTheme}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </PaperProvider>
  );
  //#endregion Render
};
//#endregion Component
