---
description: How to verify the codebase compiles and lints cleanly
---

# Verify Codebase

// turbo-all

1. **TypeScript check** — must produce 0 errors:

   ```bash
   npx tsc --noEmit
   ```

2. **ESLint check** — must produce 0 errors and 0 warnings:

   ```bash
   npx eslint src/
   ```

3. **Auto-fix** lint issues if safe:

   ```bash
   npx eslint src/ --fix
   ```

4. **Format** all files:
   ```bash
   npx prettier --write src/
   ```
