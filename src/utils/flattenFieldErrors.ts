//#region Imports
import { type ErrorMessageMode, type FlattenedErrors } from './types';
//#endregion Imports

//#region Types
type FlattenFieldErrorsProps = {
  errors: Record<string, unknown>;
  mode: ErrorMessageMode;
  prefix?: string;
};
//#endregion Types

//#region Utils
export const flattenFieldErrors = ({
  errors,
  mode,
  prefix = '',
}: FlattenFieldErrorsProps): FlattenedErrors => {
  const result: FlattenedErrors = {};

  for (const key of Object.keys(errors)) {
    const err = errors[key] as Record<string, unknown> | undefined;
    const path = `${prefix}${key}`;

    if (err?.message) {
      const message = err.message as Record<string, string> | string;
      const msg =
        typeof message === 'object' ? (message[mode] ?? message) : message;

      result[path] = msg as string;
    } else if (typeof err === 'object' && err !== null) {
      const errValue = err.value as Record<string, unknown> | undefined;
      const errLabel = err.label as Record<string, unknown> | undefined;

      if (errValue?.message) {
        const message = errValue.message as Record<string, string> | string;
        const msg =
          typeof message === 'object' ? (message[mode] ?? message) : message;

        result[`${path}.value`] = msg as string;
      }

      if (errLabel?.message) {
        const message = errLabel.message as Record<string, string> | string;
        const msg =
          typeof message === 'object' ? (message[mode] ?? message) : message;

        result[`${path}.label`] = msg as string;
      }

      Object.assign(
        result,
        flattenFieldErrors({
          errors: err as Record<string, unknown>,
          mode,
          prefix: `${path}.`,
        }),
      );
    }
  }

  return result;
};
//#endregion Utils
