import React from 'react';

import { useTranslation } from 'react-i18next';
import {
  Text as PaperText,
  type TextProps as PaperTextProps,
} from 'react-native-paper';

type TextProps = {
  doNotTranslate?: boolean;
  ellipsizeMode?: PaperTextProps<typeof PaperText>['ellipsizeMode'];
  numberOfLines?: PaperTextProps<typeof PaperText>['numberOfLines'];
  style?: PaperTextProps<typeof PaperText>['style'];
  text: string;
  variant?: PaperTextProps<typeof PaperText>['variant'];
};

export const Text = ({
  doNotTranslate = false,
  ellipsizeMode,
  numberOfLines,
  style,
  text,
  variant,
}: TextProps) => {
  const { t } = useTranslation();

  return (
    <PaperText
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={style}
      variant={variant}
    >
      {doNotTranslate ? text : t(text)}
    </PaperText>
  );
};
