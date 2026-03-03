import { type FieldErrors } from 'react-hook-form';

import { flattenFieldErrors } from './flattenFieldErrors';
import { getFirstErrorMessage } from './getFirstErrorMessage';
import { type ErrorMessageMode } from './types';

type GetFormErrorMessageProps = {
  errors: FieldErrors;
  mode: ErrorMessageMode;
};

const getFormErrorMessage = ({
  errors,
  mode,
}: GetFormErrorMessageProps): string => {
  const flat = flattenFieldErrors({
    errors: errors as Record<string, unknown>,
    mode,
  });

  const msg = getFirstErrorMessage(flat);

  return `snackbar.${msg}`;
};

export { type GetFormErrorMessageProps, getFormErrorMessage };
