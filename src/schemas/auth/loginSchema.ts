import * as yup from 'yup';

type LoginFormValues = {
  email: string;
};

const defaultValues: LoginFormValues = {
  email: '',
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required({ input: 'required', snackbar: 'email-is-required' })
    .email({ input: 'must-be-valid', snackbar: 'email-must-be-valid' }),
});

export { type LoginFormValues, defaultValues, loginSchema };
