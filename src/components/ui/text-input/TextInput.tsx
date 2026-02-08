//#region Imports
import React, { forwardRef } from 'react';

import {
  StyleSheet,
  View,
  type TextInput as NativeTextInput,
} from 'react-native';

import { Controller } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { HelperText, TextInput as PaperTextInput } from 'react-native-paper';

import type { TextInputComponent, TextInputProps } from './types';
//#endregion Imports

//#region Styles
const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
});
//#endregion Styles

//#region Component
const TextInputContent = <T extends FieldValues>(
  {
    control,
    disabled,
    error,
    keyboardType,
    label,
    name,
    required,
  }: TextInputProps<T>,
  ref: React.Ref<NativeTextInput | null>,
) => {
  //#region Hooks
  const { t } = useTranslation();
  //#endregion Hooks

  //#region Render
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field: { onChange, value } }) => (
        <View style={styles.wrapper}>
          <PaperTextInput
            disabled={disabled}
            mode="outlined"
            error={Boolean(error)}
            keyboardType={keyboardType}
            label={`${t(`fields.${label}`)}${required ? ' *' : ''}`}
            onChangeText={onChange}
            ref={ref as React.Ref<NativeTextInput>}
            value={value}
          />
          <HelperText type="error" visible={Boolean(error)}>
            {error &&
              t(
                `validations.${
                  (error.message as unknown as { input: string }).input
                }`,
              )}
          </HelperText>
        </View>
      )}
    />
  );
  //#endregion Render
};

const TextInput = forwardRef(TextInputContent) as TextInputComponent;
//#endregion Component

//#region Exports
export { TextInputContent, TextInput };
//#endregion Exports
