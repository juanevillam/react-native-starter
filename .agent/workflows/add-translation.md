---
description: How to add new i18n translation keys to both locale files (en/es)
---

# Add Translation Keys

// turbo-all

1. **Locale files are at:**
   - English: `src/i18n/locales/en.json`
   - Spanish: `src/i18n/locales/es.json`

2. **Key naming convention:**
   - Use `kebab-case` for all keys.
   - Group keys under feature namespaces (e.g., `auth`, `home`, `fields`, `validations`, `snackbar`).
   - Keep the same key structure in both files — every key in `en.json` must exist in `es.json` and vice versa.

3. **Existing key groups:**
   | Namespace | Purpose | Example |
   |-----------|---------|---------|
   | `app-routes` | Screen/route display names | `app-routes.home` |
   | `home` | Home screen labels | `home.language`, `home.logout` |
   | `theme` | Theme picker labels | `theme.light`, `theme.dark` |
   | `auth.<page>.title` | Auth page titles | `auth.login.title` |
   | `auth.<page>.subtitle` | Auth page subtitles | `auth.login.subtitle` |
   | `auth.<page>.button` | Auth page button labels | `auth.login.button.label` |
   | `fields` | Form field labels (used by `TextInput` via `t('fields.<key>')`) | `fields.email` |
   | `validations` | Inline validation messages (shown below inputs) | `validations.required` |
   | `snackbar` | Snackbar messages | `snackbar.email-is-required` |

4. **Add keys to BOTH files simultaneously.** Example:

   ```json
   // en.json
   {
     "my-feature": {
       "title": "My Feature",
       "description": "Feature description"
     }
   }

   // es.json
   {
     "my-feature": {
       "title": "Mi Función",
       "description": "Descripción de la función"
     }
   }
   ```

5. **Usage in components:**

   ```typescript
   const { t } = useTranslation();
   // Simple key
   t('my-feature.title');
   // Form field (TextInput uses this pattern internally)
   t(`fields.${label}`);
   // Validation (TextInput uses this pattern internally)
   t(`validations.${error.message.input}`);
   ```

6. **Verify:** Run `npx tsc --noEmit` to ensure no missing keys cause type errors.
