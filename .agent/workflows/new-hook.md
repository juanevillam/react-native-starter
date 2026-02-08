---
description: How to create a new custom hook following ReactNativeStarter conventions
---

# Create a New Custom Hook

// turbo-all

1. **Read the code style guide first:**
   Read `.agent/skills/reactnativestarter-code-style/SKILL.md` before proceeding.

2. **Create the hook file** at `src/hooks/use<Name>.ts`:

```typescript
//#region Imports
import { useEffect, useState } from 'react';
// ... other imports ...
//#endregion Imports

//#region Types
type MyHookReturn = {
  isLoading: boolean;
  data: string | null;
};
//#endregion Types

//#region Custom Hook
const useMyHook = (): MyHookReturn => {
  //#region Hooks
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  //#endregion Hooks

  //#region Effects
  useEffect(() => {
    // effect logic...
    return () => {
      /* cleanup */
    };
  }, []);
  //#endregion Effects

  //#region Return
  return { isLoading, data };
  //#endregion Return
};
//#endregion Custom Hook

//#region Exports
export { useMyHook };
//#endregion Exports
```

3. **Key conventions:**
   - File name: `camelCase` with `use` prefix (e.g., `useSnackbar.ts`)
   - Return an object `{ ... }` when returning multiple values — never a tuple
   - Boolean return values prefixed with `is`, `has`, `should`, `can`
   - If two hooks listen to the same event source, merge them into one hook
   - Always specify the return type explicitly
   - Use inline `type` imports: `import { type Foo } from './types'`
   - Declare without `export`, use bottom `//#region Exports` section

4. **Update the barrel file** at `src/hooks/index.ts`:

   ```typescript
   export { useMyHook } from './useMyHook';
   ```

5. **Verify:**
   ```bash
   npx tsc --noEmit
   npx eslint src/
   ```
