//#region Imports
import { type FieldErrors } from 'react-hook-form';

import { flattenFieldErrors } from './flattenFieldErrors';
import { getFirstErrorMessage } from './getFirstErrorMessage';
import { type ErrorMessageMode } from './types';
//#endregion Imports

//#region Types
type GetFormErrorMessageProps = {
  errors: FieldErrors;
  mode: ErrorMessageMode;
};
//#endregion Types

//#region Utils
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
//#endregion Utils

//#region Exports
export { type GetFormErrorMessageProps, getFormErrorMessage };
//#endregion Exports
