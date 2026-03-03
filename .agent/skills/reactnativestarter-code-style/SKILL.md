---
name: ReactNativeStarter Code Style Guide
description: Comprehensive code style, architecture, and conventions for the ReactNativeStarter React Native application. Read this BEFORE writing any code.
---

# ReactNativeStarter Code Style Guide

This document defines the authoritative coding conventions for the ReactNativeStarter React Native app. Every file you create or modify **must** follow these rules exactly.

---

---

## 1. Imports

### Ordering (enforced by ESLint `import/order`):

1. React imports (`import React from 'react'`)
2. React Native imports (`import { View } from 'react-native'`)
3. Third-party libraries (`react-native-paper`, `react-hook-form`, etc.)
4. Internal `@/` alias imports (`@/components/...`, `@/hooks/...`, `@/redux/...`)
5. Relative imports (`./types`, `../SnackbarProvider`)

Each group is separated by a blank line.

### Type imports — use inline `type` keyword:

```typescript
// ✅ Correct
import { type PayloadAction } from '@reduxjs/toolkit';
import { type Language, DEFAULT_LANGUAGE } from '@/i18n/i18n';

// ❌ Wrong
import { PayloadAction } from '@reduxjs/toolkit'; // missing type keyword
```

Use `import type { ... }` (separate) **only** when every import in the declaration is a type:

```typescript
import type { RootState } from './store/types';
import type { TextInputComponent, TextInputProps } from './types';
```

---

## 2. File & Directory Naming

| Kind                 | Convention                    | Example                                           |
| -------------------- | ----------------------------- | ------------------------------------------------- |
| Components (`.tsx`)  | `PascalCase`                  | `Button.tsx`, `TextInput.tsx`                     |
| Hooks (`.ts`)        | `camelCase` with `use` prefix | `useSnackbar.ts`                                  |
| Utils (`.ts`)        | `camelCase`                   | `flattenFieldErrors.ts`, `getFormErrorMessage.ts` |
| Redux slices (`.ts`) | `camelCase` + `Slice` suffix  | `authSlice.ts`, `layoutSlice.ts`                  |
| Type files           | Always `types.ts`             | `types.ts` (never `ComponentName.types.ts`)       |
| Barrel files         | Always `index.ts`             | `index.ts`                                        |
| Schemas (`.ts`)      | `camelCase` + `Schema` suffix | `loginSchema.ts`                                  |
| Directories          | `kebab-case`                  | `text-input/`                                     |

### Flat structure rule:

Do **not** over-nest. If a directory contains only one file, flatten it into the parent directory.

---

## 3. Types & Type Safety

- **No `any`**. Use `unknown`, proper interfaces, or type assertions with `as unknown as T` when unavoidable.
- **No `export default`** for anything. Always use named exports.
- **Strict mode is enabled** (`noUncheckedIndexedAccess: true` in `tsconfig.json`).
- Local component prop types are defined in the same file.
- Shared types across multiple files go in a separate `types.ts` file in the same directory.
- App-wide types live in `src/types/index.ts` (`Focusable`, `VoidCallback`, `FormRefs`, `ScrollViewRef`).

---

## 4. StyleSheet & Styling

### Static styles → module level:

```typescript
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold' },
});
```

### Dynamic styles → `useMemo` + `StyleSheet.create` inside component:

```typescript
const dynamicStyles = useMemo(
  () =>
    StyleSheet.create({
      container: {
        backgroundColor: colors.background,
      },
    }),
  [colors.background],
);
```

### Apply both via array syntax:

```tsx
<View style={[styles.container, dynamicStyles.container]}>
```

### **NEVER** use raw style objects in dynamic styles — always wrap with `StyleSheet.create`.

### Shared screen styles:

Use `screenStyles` from `@/styles/screenStyles` for consistent screen-level layout:

```typescript
import { screenStyles } from '@/styles/screenStyles';
// screenStyles.container: { flex: 1, padding: 24, paddingTop: 60 }
// screenStyles.subtitle: { marginBottom: 24, marginTop: 8, opacity: 0.7 }
```

### Colors:

Use theme colors via `useTheme()` from `react-native-paper` — never hardcode RGB strings in component files. Color palettes are defined in `@/styles/colors` (`LIGHT_COLORS` and `DARK_COLORS`).

---

## 5. Component Architecture

### Props — use discriminated variants, not booleans:

```typescript
// ✅ Correct
type TextProps = { variant?: 'headlineLarge' | 'bodyLarge' | 'titleMedium' };
<Text variant="bodyLarge" />

// ❌ Wrong
type TextProps = { large?: boolean };
<Text large />
```

### Props ordering on JSX — alphabetical:

```tsx
<TextInput
  control={control}
  error={errors.email}
  keyboardType="email-address"
  label="email"
  name="email"
  required
/>
```

### `React.memo` — wrap pure presentational (stateless) components:

```typescript
export const Image = React.memo(
  ({ source, style }: ImageProps) => (
    <FastImage source={source} style={style} />
  ),
);
```

### Boolean naming — always prefix with `is`, `has`, `should`, `can`:

```typescript
const isAuthenticated = ...;
const isVisible = ...;
const hasError = ...;
```

### Barrel files — every major directory has an `index.ts`:

```typescript
export { Button } from './Button';
export { Image } from './Image';
export { Text } from './Text';
```

---

## 6. Redux

### Slice structure:

```typescript
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = { isAuthenticated: boolean };

const initialState: AuthState = { isAuthenticated: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    clearAuth: () => initialState, // ← return initialState directly
  },
});

export const { setIsAuthenticated, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
```

### Selectors — centralized in `src/redux/selectors.ts`:

```typescript
const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export { selectIsAuthenticated, selectLanguage, selectTheme, selectLayout };
```

### Typed hooks — in `src/redux/store/hooks.ts`:

```typescript
const useAppDispatch = useDispatch<AppDispatch>;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Store — uses `redux-persist` with `AsyncStorage`:

The store is configured in `src/redux/store/store.ts` with `redux-persist` for state persistence across app restarts.

---

## 7. Hooks

### All hooks go together:

This includes `useState`, `useRef`, `useForm`, `useTheme`, `useTranslation`, custom hooks — **all** in one place:

```typescript
const { colors } = useTheme();
const { t } = useTranslation();
const dispatch = useAppDispatch();
const { showSnackbar } = useSnackbar();
const {
  control,
  formState: { errors },
  handleSubmit,
} = useForm<LoginFormValues>({
  defaultValues,
  mode: 'onChange',
  resolver: yupResolver(loginSchema),
});
```

### Custom hooks follow this structure:

```typescript
const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context)
    throw new Error('useSnackbar must be used within a SnackbarProvider');

  return context;
};

export { useSnackbar };
```

### Consolidation rule:

If two hooks listen to the same event source, merge them into a single hook that returns an object.

---

## 8. Navigation

- Navigators live directly in `src/navigation/` (flat, no subdirectories).
- Two navigators: `AuthNavigator` (stack) and `AppNavigator` (native stack).
- `RootNavigator` switches between them based on `isAuthenticated` from Redux.
- Route names use `as const satisfies` for literal type preservation:
  ```typescript
  const APP_ROUTES = {
    HOME: 'Home',
  } as const satisfies Routes<AppStackParamList>;
  ```
- Param list types are co-located in the navigator file, exported via bottom exports:
  ```typescript
  export { type AppStackParamList, AppNavigator };
  ```
- Use `@/navigation/routes` for all route name references.

---

## 9. Theming

- Themes are defined in `src/styles/themes.ts` as MD3 theme overrides.
- Two custom themes: `CUSTOM_LIGHT_THEME` and `CUSTOM_DARK_THEME`, each spreading the base MD3 theme with custom color palettes from `@/styles/colors`.
- Theme selection (`'light' | 'dark' | 'system'`) is stored in Redux (`layoutSlice`) and resolved in `LayoutProvider`.
- `LayoutProvider` wraps the app with `PaperProvider` and `SnackbarProvider`.

---

## 10. i18n Translation Keys

- Locale files: `src/i18n/locales/en.json` and `es.json`.
- Key format: `kebab-case`, grouped by feature namespace.
- Current namespaces: `app-routes`, `home`, `theme`, `auth`, `fields`, `validations`, `snackbar`.
- Auth pages follow pattern: `auth.<page>.title`, `auth.<page>.subtitle`, `auth.<page>.button.label`.
- Form fields: `fields.<name>` (used by `TextInput` via `t('fields.${label}')`).
- Validation messages: `validations.<key>` (inline) and `snackbar.<key>` (toast).
- Both locale files must always have identical key structure.

---

## 11. Form Validation

- Schemas live in `src/schemas/<feature>/<name>Schema.ts`.
- Use `yup` for schema definition with `@hookform/resolvers/yup`.
- Validation messages use dual-key objects: `{ input: 'key', snackbar: 'key' }`.
- Form error utilities in `src/utils/`:
  - `getFormErrorMessage` — extracts the first error from `FieldErrors` for snackbar display.
  - `flattenFieldErrors` — recursively flattens nested field errors.
  - `getFirstErrorMessage` — picks the first error from a flattened map.
- Snackbar errors are displayed via `useSnackbar()` hook from `@/hooks`.

---

## 12. Project Structure Reference

```
src/
├── components/
│   └── ui/
│       ├── text-input/
│       │   ├── TextInput.tsx
│       │   └── types.ts
│       ├── Button.tsx
│       ├── Image.tsx
│       ├── Text.tsx
│       └── index.ts
├── hooks/
│   ├── useSnackbar.ts
│   └── index.ts
├── i18n/
│   ├── i18n.ts
│   └── locales/
│       ├── en.json
│       └── es.json
├── navigation/
│   ├── AppNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── RootNavigator.tsx
│   └── routes.ts
├── providers/
│   ├── LayoutProvider.tsx
│   └── SnackbarProvider.tsx
├── redux/
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── layoutSlice.ts
│   │   └── index.ts
│   ├── store/
│   │   ├── hooks.ts
│   │   ├── store.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── rootReducer.ts
│   ├── selectors.ts
│   └── index.ts
├── schemas/
│   └── auth/
│       └── loginSchema.ts
├── screens/
│   ├── app/
│   │   └── HomeScreen.tsx
│   └── auth/
│       └── LoginScreen.tsx
├── styles/
│   ├── colors.ts
│   ├── screenStyles.ts
│   └── themes.ts
├── types/
│   └── index.ts
└── utils/
    ├── flattenFieldErrors.ts
    ├── getFirstErrorMessage.ts
    ├── getFormErrorMessage.ts
    └── types.ts
```
