---
description: How to create a new utility function following ReactNativeStarter conventions
---

# Create a New Utility

// turbo-all

1. **Read the code style guide first:**
   Read `.agent/skills/reactnativestarter-code-style/SKILL.md` before proceeding.

2. **Create the utility file** at `src/utils/<functionName>.ts`:

```typescript
//#region Imports
// ... imports if needed ...
//#endregion Imports

//#region Types
type MyUtilParams = {
  value: string;
};
//#endregion Types

//#region Utils
const myUtil = ({ value }: MyUtilParams): boolean => {
  // logic here...
  return true;
};
//#endregion Utils

//#region Exports
export { myUtil };
//#endregion Exports
```

3. **Key conventions:**
   - File name: `camelCase` matching the function name (e.g., `flattenFieldErrors.ts`, `getFormErrorMessage.ts`).
   - **Flat structure**: place directly in `src/utils/`, do NOT create subdirectories for single-file utils.
   - If types are only used by this util, define them inline. If shared across multiple utils, add them to `src/utils/types.ts`.
   - Always use named exports via bottom `//#region Exports` section — never `export default` or inline `export`.
   - Region comments: use `//#region Utils` for the function body (or `//#region Helpers` for internal helpers).
   - If the util needs imports, add a `//#region Imports` section at the top.

4. **Verify:**
   ```bash
   npx tsc --noEmit
   npx eslint src/
   ```
