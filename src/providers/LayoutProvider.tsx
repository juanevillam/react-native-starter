import React, { useEffect } from 'react';

import { useColorScheme } from 'react-native';

import { useTranslation } from 'react-i18next';
import { PaperProvider } from 'react-native-paper';

import { useAppSelector } from '@/redux/store/hooks';
import { CUSTOM_DARK_THEME, CUSTOM_LIGHT_THEME } from '@/styles/themes';

import { SnackbarProvider } from './SnackbarProvider';

type LayoutProviderProps = {
  children: React.ReactNode;
};

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const colorScheme = useColorScheme();
  const { i18n } = useTranslation();
  const { language, theme } = useAppSelector(store => store.layout);

  const themeMapping = {
    system: colorScheme === 'light' ? CUSTOM_LIGHT_THEME : CUSTOM_DARK_THEME,
    light: CUSTOM_LIGHT_THEME,
    dark: CUSTOM_DARK_THEME,
  };

  const paperTheme = themeMapping[theme];

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <PaperProvider theme={paperTheme}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </PaperProvider>
  );
};
