//#region Imports
import type { KeyboardTypeOptions, TextInput } from 'react-native';

import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';

import { type TextInputContent } from './TextInput';
//#endregion Imports

//#region Types
type TextInputProps<T extends FieldValues> = {
  control: Control<T>;
  disabled?: boolean;
  error?: FieldError;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  name: Path<T>;
  required?: boolean;
};

type TextInputComponent = <T extends FieldValues>(
  props: TextInputProps<T> & { ref?: React.Ref<TextInput | null> },
) => ReturnType<typeof TextInputContent>;
//#endregion Types

//#region Exports
export { type TextInputProps, type TextInputComponent };
//#endregion Exports
