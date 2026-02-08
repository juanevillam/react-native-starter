//#region Imports
import * as yup from 'yup';
//#endregion Imports

//#region Types
type LoginFormValues = {
  email: string;
};
//#endregion Types

//#region Constants
const defaultValues: LoginFormValues = {
  email: '',
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required({ input: 'required', snackbar: 'email-is-required' })
    .email({ input: 'must-be-valid', snackbar: 'email-must-be-valid' }),
});
//#endregion Constants

//#region Exports
export { type LoginFormValues, defaultValues, loginSchema };
//#endregion Exports
