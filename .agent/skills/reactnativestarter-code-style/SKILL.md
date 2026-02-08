---
name: ReactNativeStarter Code Style Guide
description: Comprehensive code style, architecture, and conventions for the ReactNativeStarter React Native application. Read this BEFORE writing any code.
---

# ReactNativeStarter Code Style Guide

This document defines the authoritative coding conventions for the ReactNativeStarter React Native app. Every file you create or modify **must** follow these rules exactly.

---

## 1. Region Comments

Every file is organized with `//#region Name` and `//#endregion Name` comments. These are **mandatory** — never omit them.

### Standard section order (use only sections that apply):

```typescript
//#region Imports
// ... imports ...
//#endregion Imports

//#region Types
// ... local types ...
//#endregion Types

//#region Constants
// ... module-level constants ...
//#endregion Constants

//#region Styles
// ... module-level StyleSheet.create ...
//#endregion Styles

//#region Component
export const MyComponent = () => {
  //#region Hooks
  // ... all hooks (useState, useRef, useForm, custom hooks) ...
  //#endregion Hooks

  //#region Derived Values
  // ... computed values from hooks/props ...
  //#endregion Derived Values

  //#region Handlers
  // ... event handler functions ...
  //#endregion Handlers

  //#region Helpers
  // ... helper functions used in render ...
  //#endregion Helpers

  //#region Styles
  // ... dynamic styles via useMemo + StyleSheet.create ...
  //#endregion Styles

  //#region Effects
  // ... useEffect calls ...
  //#endregion Effects

  //#region Render
  return ( /* JSX */ );
  //#endregion Render
};
//#endregion Component

//#region Exports
export { MyComponent };
//#endregion Exports
```

For non-component files (hooks, utils, slices):

- Hooks use `//#region Custom Hook` ... `//#endregion Custom Hook`
- Redux slices use `//#region Slice` ... `//#endregion Slice`
- Utils use `//#region Utils` ... `//#endregion Utils`
- Helpers use `//#region Helpers` ... `//#endregion Helpers`
- Exports use `//#region Exports` ... `//#endregion Exports`
- Return values use `//#region Return` ... `//#endregion Return`

### Export pattern:

Declare items without `export` at the point of definition. Then add a bottom `//#region Exports` section with all exports gathered:

```typescript
//#region Exports
export { type MyType, myFunction, MY_CONSTANT };
//#endregion Exports
```

---

## 2. Imports

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

## 3. File & Directory Naming

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

## 4. Types & Type Safety

- **No `any`**. Use `unknown`, proper interfaces, or type assertions with `as unknown as T` when unavoidable.
- **No `export default`** for anything. Always use named exports.
- **Strict mode is enabled** (`noUncheckedIndexedAccess: true` in `tsconfig.json`).
- Local component prop types are defined in the same file under `//#region Types`.
- Shared types across multiple files go in a separate `types.ts` file in the same directory.
- App-wide types live in `src/types/index.ts` (`Focusable`, `VoidCallback`, `FormRefs`, `ScrollViewRef`).

---

## 5. StyleSheet & Styling

### Static styles → module level:

```typescript
//#region Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 20, fontWeight: 'bold' },
});
//#endregion Styles
```

### Dynamic styles → `useMemo` + `StyleSheet.create` inside component:

```typescript
//#region Styles
const dynamicStyles = useMemo(
  () =>
    StyleSheet.create({
      container: {
        backgroundColor: colors.background,
      },
    }),
  [colors.background],
);
//#endregion Styles
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

## 6. Component Architecture

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
//#region Exports
export { Button } from './Button';
export { Image } from './Image';
export { Text } from './Text';
//#endregion Exports
```

---

## 7. Redux

### Slice structure:

```typescript
//#region Imports
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
//#endregion Imports

//#region Types
type AuthState = { isAuthenticated: boolean };
//#endregion Types

//#region Constants
const initialState: AuthState = { isAuthenticated: false };
//#endregion Constants

//#region Slice
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
//#endregion Slice

//#region Exports
export const { setIsAuthenticated, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
//#endregion Exports
```

### Selectors — centralized in `src/redux/selectors.ts`:

```typescript
//#region Auth Selectors
const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
//#endregion Auth Selectors

//#region Exports
export { selectIsAuthenticated, selectLanguage, selectTheme, selectLayout };
//#endregion Exports
```

### Typed hooks — in `src/redux/store/hooks.ts`:

```typescript
const useAppDispatch = useDispatch<AppDispatch>;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Store — uses `redux-persist` with `AsyncStorage`:

The store is configured in `src/redux/store/store.ts` with `redux-persist` for state persistence across app restarts.

---

## 8. Hooks

### All hooks go in `//#region Hooks`:

This includes `useState`, `useRef`, `useForm`, `useTheme`, `useTranslation`, custom hooks — **all** in one region:

```typescript
//#region Hooks
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
//#endregion Hooks
```

### Custom hooks follow this structure:

```typescript
//#region Custom Hook
const useSnackbar = () => {
  //#region Hooks
  const context = useContext(SnackbarContext);
  //#endregion Hooks

  if (!context)
    throw new Error('useSnackbar must be used within a SnackbarProvider');

  //#region Return
  return context;
  //#endregion Return
};
//#endregion Custom Hook

//#region Exports
export { useSnackbar };
//#endregion Exports
```

### Consolidation rule:

If two hooks listen to the same event source, merge them into a single hook that returns an object.

---

## 9. Navigation

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
  //#region Exports
  export { type AppStackParamList, AppNavigator };
  //#endregion Exports
  ```
- Use `@/navigation/routes` for all route name references.

---

## 10. Theming

- Themes are defined in `src/styles/themes.ts` as MD3 theme overrides.
- Two custom themes: `CUSTOM_LIGHT_THEME` and `CUSTOM_DARK_THEME`, each spreading the base MD3 theme with custom color palettes from `@/styles/colors`.
- Theme selection (`'light' | 'dark' | 'system'`) is stored in Redux (`layoutSlice`) and resolved in `LayoutProvider`.
- `LayoutProvider` wraps the app with `PaperProvider` and `SnackbarProvider`.

---

## 11. i18n Translation Keys

- Locale files: `src/i18n/locales/en.json` and `es.json`.
- Key format: `kebab-case`, grouped by feature namespace.
- Current namespaces: `app-routes`, `home`, `theme`, `auth`, `fields`, `validations`, `snackbar`.
- Auth pages follow pattern: `auth.<page>.title`, `auth.<page>.subtitle`, `auth.<page>.button.label`.
- Form fields: `fields.<name>` (used by `TextInput` via `t('fields.${label}')`).
- Validation messages: `validations.<key>` (inline) and `snackbar.<key>` (toast).
- Both locale files must always have identical key structure.

---

## 12. Form Validation

- Schemas live in `src/schemas/<feature>/<name>Schema.ts`.
- Use `yup` for schema definition with `@hookform/resolvers/yup`.
- Validation messages use dual-key objects: `{ input: 'key', snackbar: 'key' }`.
- Form error utilities in `src/utils/`:
  - `getFormErrorMessage` — extracts the first error from `FieldErrors` for snackbar display.
  - `flattenFieldErrors` — recursively flattens nested field errors.
  - `getFirstErrorMessage` — picks the first error from a flattened map.
- Snackbar errors are displayed via `useSnackbar()` hook from `@/hooks`.

---

## 13. Project Structure Reference

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
