---
description: How to create a new utility function following ReactNativeStarter conventions
---

# Create a New Utility

1. **Create the utility file** at `src/utils/<functionName>.ts`:

```typescript
// ... imports if needed ...

type MyUtilParams = {
  value: string;
};

const myUtil = ({ value }: MyUtilParams): boolean => {
  // logic here...
  return true;
};

export { myUtil };
```

2. **Key conventions:**
   - File name: `camelCase` matching the function name (e.g., `flattenFieldErrors.ts`, `getFormErrorMessage.ts`).
   - **Flat structure**: place directly in `src/utils/`, do NOT create subdirectories for single-file utils.
   - If types are only used by this util, define them inline. If shared across multiple utils, add them to `src/utils/types.ts`.
   - Always use named exports via bottom exports section — never `export default` or inline `export`.

3. **Verify:**
   ```bash
   npx tsc --noEmit
   npx eslint src/
   ```
