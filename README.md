# react-native-starter

## Table of Contents

- [react-native-starter](#react-native-starter)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Why I Built This](#why-i-built-this)
    - [What's Included](#whats-included)
  - [Getting Started](#getting-started)
  - [Customization](#customization)
    - [Theming](#theming)
    - [Adding a New Language](#adding-a-new-language)
  - [Project Structure](#project-structure)
    - [components/](#components)
    - [hooks/](#hooks)
    - [i18n/](#i18n)
    - [navigation/](#navigation)
    - [providers/](#providers)
    - [redux/](#redux)
    - [schemas/](#schemas)
    - [screens/](#screens)
    - [styles/](#styles)
    - [types/](#types)
    - [utils/](#utils)
  - [Code Quality](#code-quality)
  - [License](#license)

## Introduction

**react-native-starter** is a production-ready React Native starter template designed to eliminate the repetitive boilerplate of setting up a new mobile project. It comes pre-configured with theming, internationalization, state management, form validation, and code quality tooling — so you can skip the setup and jump straight into building your app.

Built using [React Native](https://reactnative.dev) and [TypeScript](https://www.typescriptlang.org), this template delivers a clean, scalable foundation for both iOS and Android applications.

### Why I Built This

After working on several React Native projects, I noticed I was spending a significant amount of time setting up the same foundational infrastructure over and over again — theming with light/dark mode support, internationalization, Redux with persistence, form validation, navigation, linting, and formatting.

I decided to extract the essential building blocks from my projects into a single, clean starter template. The goal was to create something that is minimal yet complete: no unnecessary features, no leftover code from a specific app, just the core architecture patterns and tooling that every well-structured React Native app needs from day one.

And thus, **react-native-starter** was born.

### What's Included

- **UI Framework:** [React Native Paper](https://callstack.github.io/react-native-paper/) with Material Design 3 theming out of the box.

- **Theming:** Full Light, Dark, and System theme support, resolved at runtime and persisted across app restarts.

- **Internationalization:** [i18next](https://www.i18next.com/) with English and Spanish locale files, easily extendable to additional languages.

- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) with [Redux Persist](https://github.com/rt2zz/redux-persist) for automatic state persistence via AsyncStorage.

- **Navigation:** [React Navigation](https://reactnavigation.org/) with a Root navigator that switches between Auth and App stacks based on authentication state.

- **Form Validation:** [React Hook Form](https://react-hook-form.com/) paired with [Yup](https://github.com/jquense/yup) schemas, featuring dual-key validation messages for inline and snackbar error display.

- **Code Quality:** ESLint, Prettier, Husky, and lint-staged pre-configured with import ordering, unused import detection, and consistent type import enforcement.

This documentation provides a guide on setting up the project and an overview of the project structure, ensuring you can quickly locate and navigate the key components of the template.

## Getting Started

> Make sure you have completed the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) before proceeding.

Once your environment is ready, install the project dependencies and start the development server:

```bash
npm install
```

For iOS, install CocoaPods dependencies (only needed on first clone or after updating native deps):

```bash
bundle install
bundle exec pod install
```

Then start the app:

```bash
# Start Metro
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Customization

### Theming

This starter uses the default Material Design 3 themes from `react-native-paper`. To create your own custom color palette:

1. Visit the [Material Theme Builder](https://callstack.github.io/react-native-paper/docs/guides/theming#creating-dynamic-theme-colors) to generate your colors.
2. Uncomment and update `src/styles/colors.ts` with your palette.
3. Update `src/styles/themes.ts` to use your custom colors instead of the default MD3 themes.

### Adding a New Language

1. Create a new locale file in `src/i18n/locales/` (e.g., `fr.json`) following the same key structure as `en.json` and `es.json`.
2. Add the language resources to `src/i18n/i18n.ts`.
3. Add the new language code to the `Language` type union.
4. Update `src/redux/slices/layoutSlice.ts` if needed.

## Project Structure

The `src` folder is organized into several key directories, each with a clear purpose to promote maintainability and scalability. Below is an overview of the main folders and what they contain:

#### components/

- **Purpose:** Contains reusable React components used across the application.
- **Structure:**
  - **ui/**: UI primitives that wrap `react-native-paper` components with translation support and consistent APIs.
    - `Button.tsx`: Translatable button with loading state support.
    - `Image.tsx`: Optimized image component wrapping FastImage with caching and priority controls.
    - `Text.tsx`: Translatable text component with optional raw text mode.
    - **text-input/**: Form-connected text input with inline validation error display, using `react-hook-form` Controller.

#### hooks/

- **Purpose:** Contains custom React hooks that encapsulate reusable logic.
- **Structure:**
  - `useSnackbar.ts`: Provides access to the global snackbar context for displaying toast-style messages from anywhere in the app.

#### i18n/

- **Purpose:** Manages internationalization using i18next.
- **Structure:**
  - `i18n.ts`: Initialization and configuration of the i18next framework, including language type definitions and default language setting.
  - **locales/**: Contains translation files (`en.json`, `es.json`) with matching key structures across all supported languages.

#### navigation/

- **Purpose:** Contains all navigation configuration using React Navigation.
- **Structure:**
  - `RootNavigator.tsx`: Top-level navigator that switches between Auth and App stacks based on authentication state from Redux.
  - `AuthNavigator.tsx`: Stack navigator for authentication screens (Login).
  - `AppNavigator.tsx`: Native stack navigator for authenticated app screens (Home).
  - `routes.ts`: Centralized route name constants with type-safe `as const satisfies` pattern.

#### providers/

- **Purpose:** Application-level context providers that wrap the entire app.
- **Structure:**
  - `LayoutProvider.tsx`: Resolves the active theme (light/dark/system), applies it via `PaperProvider`, and syncs the persisted language preference with i18next.
  - `SnackbarProvider.tsx`: Global snackbar context using `react-native-paper`'s Portal and Snackbar components for app-wide toast notifications.

#### redux/

- **Purpose:** Redux Toolkit state management with persistence.
- **Structure:**
  - **slices/**: Individual feature slices.
    - `authSlice.ts`: Authentication state (`isAuthenticated`).
    - `layoutSlice.ts`: Layout preferences (theme, language).
  - **store/**: Store configuration, typed hooks (`useAppDispatch`, `useAppSelector`), and type definitions.
  - `rootReducer.ts`: Combines all slice reducers.
  - `selectors.ts`: Centralized selector functions for accessing state.

#### schemas/

- **Purpose:** Yup form validation schemas organized by feature.
- **Structure:**
  - **auth/**: Authentication-related schemas.
    - `loginSchema.ts`: Email validation with dual-key error messages (`input` for inline display, `snackbar` for toast display).

#### screens/

- **Purpose:** Screen components organized by navigation flow.
- **Structure:**
  - **app/**: Screens available to authenticated users.
    - `HomeScreen.tsx`: Main screen with language switching, theme selection, and logout functionality.
  - **auth/**: Screens for unauthenticated users.
    - `LoginScreen.tsx`: Login form with email validation and snackbar error feedback.

#### styles/

- **Purpose:** Centralized styling configuration.
- **Structure:**
  - `colors.ts`: Custom color palette definitions (commented out by default, with instructions for enabling custom themes).
  - `themes.ts`: MD3 theme objects for light and dark modes, used by `LayoutProvider`.
  - `screenStyles.ts`: Shared screen-level styles for consistent layout across all screens.

#### types/

- **Purpose:** App-wide TypeScript type definitions.
- **Structure:**
  - `index.ts`: Common types used across the app (`VoidCallback`, `Focusable`, `FormRefs`, `ScrollViewRef`).

#### utils/

- **Purpose:** Utility functions for common operations.
- **Structure:**
  - `getFormErrorMessage.ts`: Extracts the first validation error from a form submission and formats it as a translatable snackbar key.
  - `flattenFieldErrors.ts`: Recursively flattens nested `react-hook-form` field errors into a flat map, respecting the error message mode (input vs. snackbar).
  - `getFirstErrorMessage.ts`: Picks the first error message from a flattened error map.
  - `types.ts`: Shared types for the error utilities (`ErrorMessageMode`, `FlattenedErrors`).

## Code Quality

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Format
npm run format
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
