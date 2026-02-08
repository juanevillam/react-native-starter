//#region Imports
import React from 'react';

import { useTranslation } from 'react-i18next';
import {
  Button as PaperButton,
  type ButtonProps as PaperButtonProps,
} from 'react-native-paper';
//#endregion Imports

//#region Types
type ButtonProps = {
  disabled?: PaperButtonProps['disabled'];
  label: string;
  loading?: PaperButtonProps['loading'];
  loadingLabel?: string;
  mode: PaperButtonProps['mode'];
  onPress: PaperButtonProps['onPress'];
};
//#endregion Types

//#region Component
export const Button = ({
  disabled,
  label,
  loading,
  loadingLabel,
  mode,
  onPress,
}: ButtonProps) => {
  //#region Hooks
  const { t } = useTranslation();
  //#endregion Hooks

  //#region Render
  return (
    <PaperButton
      disabled={disabled}
      loading={loading}
      mode={mode}
      onPress={onPress}
    >
      {loading && loadingLabel ? t(loadingLabel) : t(label)}
    </PaperButton>
  );
  //#endregion Render
};
//#endregion Component
