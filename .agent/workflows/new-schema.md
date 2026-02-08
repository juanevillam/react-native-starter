---
description: How to create a new Yup form validation schema following ReactNativeStarter conventions
---

# Create a New Form Schema

// turbo-all

1. **Read the code style guide first:**
   Read `.agent/skills/reactnativestarter-code-style/SKILL.md` before proceeding.

2. **Create the schema file** at `src/schemas/<feature>/<name>Schema.ts`:

```typescript
//#region Imports
import * as yup from 'yup';
//#endregion Imports

//#region Types
type MyFormValues = {
  email: string;
  name: string;
};
//#endregion Types

//#region Constants
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
//#endregion Constants

//#region Exports
export { type MyFormValues, defaultValues, mySchema };
//#endregion Exports
```

3. **Validation message format:**
   Every validation message is an object with two keys:

   ```typescript
   { input: 'kebab-case-key', snackbar: 'kebab-case-key' }
   ```

   - `input` — the key used for inline field error messages (displayed below TextInput via `t('validations.<input>')`)
   - `snackbar` — the key used for snackbar notifications (displayed via `t('snackbar.<snackbar>')`)

4. **Always export `defaultValues`** alongside the schema and form values type. These are used by `useForm` in the screen:

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

5. **Add i18n translations** for all validation and snackbar message keys to both `en.json` and `es.json` (see `/add-translation` workflow).

6. **Verify:**
   ```bash
   npx tsc --noEmit
   npx eslint src/
   ```
