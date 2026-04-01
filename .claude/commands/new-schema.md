---
description: How to create a new Yup form validation schema following ReactNativeStarter conventions
---

# Create a New Form Schema

1. **Create the schema file** at `src/schemas/<feature>/<name>Schema.ts`:

```typescript
import * as yup from 'yup';

type MyFormValues = {
  email: string;
  name: string;
};

const defaultValues: MyFormValues = {
  email: '',
  name: '',
};

const mySchema = yup.object().shape({
  email: yup
    .string()
    .required({ input: 'required', snackbar: 'email-is-required' })
    .email({ input: 'must-be-valid', snackbar: 'email-must-be-valid' }),
  name: yup
    .string()
    .required({ input: 'required', snackbar: 'name-is-required' }),
});

export { type MyFormValues, defaultValues, mySchema };
```

2. **Validation message format:**
   Every validation message is an object with two keys:

   ```typescript
   { input: 'kebab-case-key', snackbar: 'kebab-case-key' }
   ```

   - `input` — the key used for inline field error messages (displayed below TextInput via `t('validations.<input>')`)
   - `snackbar` — the key used for snackbar notifications (displayed via `t('snackbar.<snackbar>')`)

3. **Always export `defaultValues`** alongside the schema and form values type. These are used by `useForm` in the screen:

   ```typescript
   const {
     control,
     formState: { errors },
     handleSubmit,
   } = useForm<MyFormValues>({
     defaultValues,
     mode: 'onChange',
     resolver: yupResolver(mySchema),
   });
   ```

4. **Add i18n translations** for all validation and snackbar message keys to both `en.json` and `es.json` (see `/add-translation` command).

5. **Verify:**
   ```bash
   npx tsc --noEmit
   npx eslint src/
   ```
