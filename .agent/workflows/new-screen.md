---
description: How to create a new screen with navigation registration following ReactNativeStarter conventions
---

# Create a New Screen

// turbo-all

1. **Read the code style guide first:**
   Read `.agent/skills/reactnativestarter-code-style/SKILL.md` before proceeding.

2. **Determine the navigator:**
   - Auth screens → `src/screens/auth/` and `AuthNavigator.tsx` (stack navigator)
   - App screens → `src/screens/app/` and `AppNavigator.tsx` (native stack navigator)

3. **Create the screen file** at `src/screens/<app|auth>/<Name>Screen.tsx`:

```tsx
//#region Imports
import { useMemo } from 'react';

import { StyleSheet, View } from 'react-native';

import { useTheme } from 'react-native-paper';

import { Text } from '@/components/ui';
import { screenStyles } from '@/styles/screenStyles';
//#endregion Imports

//#region Component
export const MyScreen = () => {
  //#region Hooks
  const { colors } = useTheme();
  //#endregion Hooks

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

  //#region Render
  return (
    <View style={[screenStyles.container, dynamicStyles.container]}>
      <Text text="my-screen.title" variant="headlineLarge" />
      <Text
        style={screenStyles.subtitle}
        text="my-screen.subtitle"
        variant="bodyLarge"
      />
      {/* Screen content */}
    </View>
  );
  //#endregion Render
};
//#endregion Component
```

4. **Register the route** — 3 files need updates:

   **a. Add to the param list** in the navigator file (e.g., `src/navigation/AppNavigator.tsx`):

   ```typescript
   //#region Types
   type AppStackParamList = {
     Home: undefined;
     MyScreen: undefined; // ← add here
   };
   //#endregion Types
   ```

   **b. Add the route constant** in `src/navigation/routes.ts`:

   ```typescript
   const APP_ROUTES = {
     HOME: 'Home',
     MY_SCREEN: 'MyScreen', // ← add here
   } as const satisfies Routes<AppStackParamList>;
   ```

   **c. Add the screen to the navigator** (e.g., `src/navigation/AppNavigator.tsx`):

   ```tsx
   import { MyScreen } from '@/screens/app/MyScreen';
   // ...
   <Stack.Screen name={APP_ROUTES.MY_SCREEN} component={MyScreen} />;
   ```

   The navigator export stays in the bottom Exports region:

   ```typescript
   //#region Exports
   export { type AppStackParamList, AppNavigator };
   //#endregion Exports
   ```

5. **Add i18n translations** if the screen has user-facing text (see `/add-translation` workflow).

6. **Verify:**
   ```bash
   npx tsc --noEmit
   npx eslint src/
   ```
