---
description: How to create a new custom hook following ReactNativeStarter conventions
---

# Create a New Custom Hook

1. **Create the hook file** at `src/hooks/use<Name>.ts`:

```typescript
import { useEffect, useState } from 'react';
// ... other imports ...

type MyHookReturn = {
  isLoading: boolean;
  data: string | null;
};

const useMyHook = (): MyHookReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    // effect logic...
    return () => {
      /* cleanup */
    };
  }, []);

  return { isLoading, data };
};

export { useMyHook };
```

2. **Key conventions:**
   - File name: `camelCase` with `use` prefix (e.g., `useSnackbar.ts`)
   - Return an object `{ ... }` when returning multiple values — never a tuple
   - Boolean return values prefixed with `is`, `has`, `should`, `can`
   - If two hooks listen to the same event source, merge them into one hook
   - Always specify the return type explicitly
   - Use inline `type` imports: `import { type Foo } from './types'`
   - Declare without `export`, use bottom exports section

3. **Update the barrel file** at `src/hooks/index.ts`:

   ```typescript
   export { useMyHook } from './useMyHook';
   ```

4. **Verify:**
   ```bash
   npx tsc --noEmit
   npx eslint src/
   ```
