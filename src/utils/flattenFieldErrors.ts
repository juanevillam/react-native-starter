import { type ErrorMessageMode, type FlattenedErrors } from './types';

type FlattenFieldErrorsProps = {
  errors: Record<string, unknown>;
  mode: ErrorMessageMode;
  prefix?: string;
};

export const flattenFieldErrors = ({
  errors,
  mode,
  prefix = '',
}: FlattenFieldErrorsProps): FlattenedErrors => {
  const result: FlattenedErrors = {};

  for (const key of Object.keys(errors)) {
    const error = errors[key] as Record<string, unknown> | undefined;
    const path = `${prefix}${key}`;

    if (error?.message) {
      const rawMessage = error.message as Record<string, string> | string;
      const resolvedMessage =
        typeof rawMessage === 'object'
          ? (rawMessage[mode] ?? rawMessage)
          : rawMessage;

      result[path] = resolvedMessage as string;
    } else if (typeof error === 'object' && error !== null) {
      const errorValue = error.value as Record<string, unknown> | undefined;
      const errorLabel = error.label as Record<string, unknown> | undefined;

      if (errorValue?.message) {
        const rawMessage = errorValue.message as
          | Record<string, string>
          | string;

        const resolvedMessage =
          typeof rawMessage === 'object'
            ? (rawMessage[mode] ?? rawMessage)
            : rawMessage;

        result[`${path}.value`] = resolvedMessage as string;
      }

      if (errorLabel?.message) {
        const rawMessage = errorLabel.message as
          | Record<string, string>
          | string;

        const resolvedMessage =
          typeof rawMessage === 'object'
            ? (rawMessage[mode] ?? rawMessage)
            : rawMessage;

        result[`${path}.label`] = resolvedMessage as string;
      }

      Object.assign(
        result,
        flattenFieldErrors({
          errors: error as Record<string, unknown>,
          mode,
          prefix: `${path}.`,
        }),
      );
    }
  }

  return result;
};
