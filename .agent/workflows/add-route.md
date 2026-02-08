---
description: How to add a new navigation route to an existing navigator
---

# Add a Navigation Route

// turbo-all

1. **Read the code style guide first:**
   Read `.agent/skills/reactnativestarter-code-style/SKILL.md` before proceeding.

2. **Determine the target navigator:**
   - **Auth stack** → `src/navigation/AuthNavigator.tsx` + `AuthStackParamList`
   - **App stack** → `src/navigation/AppNavigator.tsx` + `AppStackParamList`

3. **Update 3 files** (order matters — types first):

   **Step 1 — Add the screen type** to the param list in the navigator file:

   For app routes, edit `src/navigation/AppNavigator.tsx`:

   ```typescript
   //#region Types
   type AppStackParamList = {
     Home: undefined;
     MyScreen: undefined; // ← add here
     // or with params:
     Details: { id: string }; // ← with route params
   };
   //#endregion Types
   ```

   For auth routes, edit `src/navigation/AuthNavigator.tsx`:

   ```typescript
   //#region Types
   type AuthStackParamList = {
     Login: undefined;
     ForgotPassword: undefined; // ← add here
   };
   //#endregion Types
   ```

   **Step 2 — Add the route constant** in `src/navigation/routes.ts`:

   ```typescript
   const APP_ROUTES = {
     HOME: 'Home',
     MY_SCREEN: 'MyScreen', // ← add here (SCREAMING_SNAKE for key, PascalCase for value)
   } as const satisfies Routes<AppStackParamList>;
   ```

   **Step 3 — Register the screen** in the navigator:

   ```tsx
   import { MyScreen } from '@/screens/app/MyScreen';
   // ...
   <Stack.Screen name={APP_ROUTES.MY_SCREEN} component={MyScreen} />;
   ```

   Ensure the navigator exports types via the bottom Exports region:

   ```typescript
   //#region Exports
   export { type AppStackParamList, AppNavigator };
   //#endregion Exports
   ```

4. **Route naming conventions:**
   - ParamList key: `PascalCase` matching screen name without `Screen` suffix (e.g., `Home`, `MyInfo`)
   - Route constant key: `SCREAMING_SNAKE_CASE` (e.g., `HOME`, `MY_INFO`)

5. **Verify:**
   ```bash
   npx tsc --noEmit
   npx eslint src/
   ```
