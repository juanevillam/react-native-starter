import React from 'react';

import { useTranslation } from 'react-i18next';
import {
  Button as PaperButton,
  type ButtonProps as PaperButtonProps,
} from 'react-native-paper';

type ButtonProps = {
  disabled?: PaperButtonProps['disabled'];
  label: string;
  loading?: PaperButtonProps['loading'];
  loadingLabel?: string;
  mode: PaperButtonProps['mode'];
  onPress: PaperButtonProps['onPress'];
};

export const Button = ({
  disabled,
  label,
  loading,
  loadingLabel,
  mode,
  onPress,
}: ButtonProps) => {
  const { t } = useTranslation();

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
};
