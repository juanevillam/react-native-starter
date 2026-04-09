## Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
  - [Why I Built This](#why-i-built-this)
  - [What's Included](#whats-included)
- [Getting Started](#getting-started)
- [Customization](#customization)
  - [Theming](#theming)
  - [Adding a New Language](#adding-a-new-language)
- [Project Structure](#project-structure)
  - [How It All Connects](#how-it-all-connects)
- [Code Quality](#code-quality)
- [License](#license)

## Introduction

**react-native-starter** is a production-ready React Native Starter template designed to eliminate the repetitive boilerplate of setting up a new mobile project. It comes pre-configured with theming, internationalization, state management, form validation, and code quality tooling — so you can skip the setup and jump straight into building your app.

Built with [React Native](https://reactnative.dev) and [TypeScript](https://www.typescriptlang.org), it delivers a clean, scalable foundation for both iOS and Android.

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

```
src/
├── components/ui/       # Reusable UI primitives
│   ├── text-input/      # Form-connected input with inline validation
│   ├── Button.tsx        # Translatable button with loading state
│   └── Text.tsx          # Translatable text with raw text mode
│
├── hooks/               # Custom React hooks
│   └── useSnackbar.ts   # Access the global snackbar context
│
├── i18n/                # Internationalization (i18next)
│   ├── i18n.ts          # i18next config, Language type, default language
│   └── locales/         # Translation files (en.json, es.json)
│
├── navigation/          # React Navigation configuration
│   ├── RootNavigator    # Switches between Auth ↔ App based on auth state
│   ├── AuthNavigator    # Stack navigator for unauthenticated screens
│   ├── AppNavigator     # Native stack for authenticated screens
│   └── routes.ts        # Centralized, type-safe route name constants
│
├── providers/           # App-level context providers
│   ├── LayoutProvider   # Resolves theme, syncs language, wraps with PaperProvider
│   └── SnackbarProvider # Global toast notifications via react-native-paper
│
├── redux/               # Redux Toolkit + Redux Persist
│   ├── slices/          # Feature slices (authSlice, layoutSlice)
│   ├── store/           # Store config, typed hooks, type definitions
│   ├── rootReducer.ts   # Combined slice reducers
│   └── selectors.ts     # Centralized state selectors
│
├── schemas/             # Yup form validation schemas by feature
│   └── auth/            # loginSchema with dual-key error messages
│
├── screens/             # Screen components by navigation flow
│   ├── app/             # Authenticated screens (HomeScreen)
│   └── auth/            # Unauthenticated screens (LoginScreen)
│
├── styles/              # Centralized styling
│   ├── colors.ts        # Custom color palette (template, commented out)
│   ├── themes.ts        # MD3 light/dark theme objects + Theme type
│   └── screenStyles.ts  # Shared screen-level layout styles
│
├── types/               # App-wide TypeScript types
│   └── index.ts         # VoidCallback, Focusable, FormRefs, ScrollViewRef
│
└── utils/               # Utility functions
    ├── getFormErrorMessage.ts   # Extract first validation error for snackbar
    ├── flattenFieldErrors.ts    # Flatten nested react-hook-form errors
    ├── getFirstErrorMessage.ts  # Pick first error from flattened map
    └── types.ts                 # ErrorMessageMode, FlattenedErrors
```

The app entry point (`App.tsx`) wires everything together: it initializes i18n, enables screen optimization, and wraps the app with `Redux Provider` → `PersistGate` → `LayoutProvider` → `RootNavigator`.

### How It All Connects

**Authentication flow:** `RootNavigator` reads `isAuthenticated` from Redux and renders either `AuthNavigator` (login) or `AppNavigator` (home). Logging in dispatches `setIsAuthenticated(true)`, which flips the navigator — no manual navigation needed.

**Theming:** The user's theme preference (`light`, `dark`, or `system`) is stored in Redux via `layoutSlice` and resolved in `LayoutProvider`, which maps it to the appropriate MD3 theme and passes it down through `PaperProvider`. All components access theme colors via `useTheme()`.

**Form validation:** Schemas define validation rules with dual-key error messages — one key for inline display beneath the input (`input` mode) and another for toast-style feedback (`snackbar` mode). On submit, `getFormErrorMessage` extracts the first error and pipes it through `useSnackbar` for display.

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
