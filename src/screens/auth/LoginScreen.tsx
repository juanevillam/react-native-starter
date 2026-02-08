//#region Imports
import { useCallback, useMemo } from 'react';

import { StyleSheet, View } from 'react-native';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper';

import { Button, Text } from '@/components/ui';
import { TextInput } from '@/components/ui';
import { useSnackbar } from '@/hooks';
import { setIsAuthenticated } from '@/redux/slices';
import { useAppDispatch } from '@/redux/store';
import {
  type LoginFormValues,
  defaultValues,
  loginSchema,
} from '@/schemas/auth/loginSchema';
import { screenStyles } from '@/styles/screenStyles';
import { getFormErrorMessage } from '@/utils/getFormErrorMessage';
//#endregion Imports

//#region Component
export const LoginScreen = () => {
  //#region Hooks
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });
  //#endregion Hooks

  //#region Styles
  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.background,
        },
      }),
    [colors.background],
  );
  //#endregion Styles

  //#region Handlers
  const onSubmit = useCallback(
    (data: LoginFormValues) => {
      console.log('Login with:', data.email);
      dispatch(setIsAuthenticated(true));
    },
    [dispatch],
  );

  const onError = handleSubmit(onSubmit, validationErrors => {
    const message = getFormErrorMessage({
      errors: validationErrors,
      mode: 'snackbar',
    });

    showSnackbar(t(message));
  });
  //#endregion Handlers

  //#region Render
  return (
    <View style={[screenStyles.container, dynamicStyles.container]}>
      <Text text="auth.login.title" variant="headlineLarge" />
      <Text
        style={screenStyles.subtitle}
        text="auth.login.subtitle"
        variant="bodyLarge"
      />
      <TextInput
        control={control}
        error={errors.email}
        keyboardType="email-address"
        label="email"
        name="email"
        required
      />
      <Button
        label="auth.login.button.label"
        mode="contained"
        onPress={onError}
      />
    </View>
  );
  //#endregion Render
};
//#endregion Component
