---
description: How to create a new React Native component following ReactNativeStarter conventions
---

# Create a New Component

// turbo-all

1. **Read the code style guide first:**
   Read `.agent/skills/reactnativestarter-code-style/SKILL.md` before proceeding.

2. **Determine location:**
   - UI primitives → `src/components/ui/`
   - Feature-specific → `src/components/<feature>/`
   - Screens → `src/screens/<app|auth>/`

3. **Create the component file** using this template:

```tsx
//#region Imports
import React from 'react';

import { StyleSheet, View } from 'react-native';

// ... other @/ imports ...
// ... relative imports ...
//#endregion Imports

//#region Types
type MyComponentProps = {
  // props here...
};
//#endregion Types

//#region Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
//#endregion Styles

//#region Component
export const MyComponent = ({ ...props }: MyComponentProps) => {
  //#region Hooks
  // hooks here...
  //#endregion Hooks

  //#region Render
  return <View style={styles.container}>{/* JSX */}</View>;
  //#endregion Render
};
//#endregion Component
```

4. **Apply conventions:**
   - Use `React.memo` if the component is purely presentational (no hooks, no state).
   - Use discriminated `variant` props instead of boolean mode-switching props.
   - Static styles at module level with `StyleSheet.create`.
   - Dynamic styles with `useMemo` + `StyleSheet.create` inside the component.
   - Prefix boolean variables with `is`, `has`, `should`, `can`.
   - Use `type` keyword for type-only imports: `import { type Foo } from './types'`
   - If shared types are needed, create a `types.ts` in the same directory.
   - Alphabetize JSX props.

5. **Update the barrel file:**
   Add the export to the directory's `index.ts`:

   ```typescript
   export { MyComponent } from './MyComponent';
   ```

6. **Verify:**
   ```bash
   npx tsc --noEmit
   npx eslint src/
   ```
