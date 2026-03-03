import { useMemo } from 'react';

import { StyleSheet, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { RadioButton, useTheme } from 'react-native-paper';

import { Button, Text } from '@/components/ui';
import { type Language } from '@/i18n/i18n';
import { clearAuth } from '@/redux/slices/authSlice';
import { setLanguage, setTheme } from '@/redux/slices/layoutSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { screenStyles } from '@/styles/screenStyles';
import { type Theme } from '@/styles/themes';

const styles = StyleSheet.create({
  languageRow: {
    flexDirection: 'row',
    gap: 12,
  },
  radioRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  section: {
    gap: 8,
    marginBottom: 24,
  },
});

export const HomeScreen = () => {
  const { i18n } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { language, theme } = useAppSelector(store => store.layout);

  const handleSwitchLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
  };

  const handleThemeChange = (newTheme: string) =>
    dispatch(setTheme(newTheme as Theme));

  const handleLogout = () => dispatch(clearAuth());

  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.background,
        },
      }),
    [colors.background],
  );

  return (
    <View style={[screenStyles.container, dynamicStyles.container]}>
      <Text text="app-routes.home" variant="headlineLarge" />
      <Text
        style={screenStyles.subtitle}
        text="home.subtitle"
        variant="bodyLarge"
      />
      <View style={styles.section}>
        <Text text="home.language" variant="titleMedium" />
        <View style={styles.languageRow}>
          <Button
            label="home.english"
            mode={language === 'en' ? 'contained' : 'outlined'}
            onPress={() => handleSwitchLanguage('en')}
          />
          <Button
            label="home.spanish"
            mode={language === 'es' ? 'contained' : 'outlined'}
            onPress={() => handleSwitchLanguage('es')}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text text="theme.title" variant="titleMedium" />
        <RadioButton.Group onValueChange={handleThemeChange} value={theme}>
          <View style={styles.radioRow}>
            <RadioButton.Android value="system" />
            <Text text="theme.system" variant="bodyMedium" />
          </View>
          <View style={styles.radioRow}>
            <RadioButton.Android value="light" />
            <Text text="theme.light" variant="bodyMedium" />
          </View>
          <View style={styles.radioRow}>
            <RadioButton.Android value="dark" />
            <Text text="theme.dark" variant="bodyMedium" />
          </View>
        </RadioButton.Group>
      </View>
      <Button label="home.logout" mode="outlined" onPress={handleLogout} />
    </View>
  );
};
