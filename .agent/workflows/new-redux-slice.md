---
description: How to create a new Redux slice with selectors following ReactNativeStarter conventions
---

# Create a New Redux Slice

// turbo-all

1. **Read the code style guide first:**
   Read `.agent/skills/reactnativestarter-code-style/SKILL.md` before proceeding.

2. **Create the slice file** at `src/redux/slices/<name>Slice.ts`:

```typescript
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type MyState = {
  // state shape...
};

const initialState: MyState = {
  // defaults...
};

const mySlice = createSlice({
  name: 'my',
  initialState,
  reducers: {
    setSomething: (state, action: PayloadAction<string>) => {
      state.something = action.payload;
    },
    clearMy: () => initialState, // return initialState directly
  },
});

export const { setSomething, clearMy } = mySlice.actions;
export const myReducer = mySlice.reducer;
```

3. **Register in rootReducer** (`src/redux/rootReducer.ts`):

   ```typescript
   import { myReducer } from './slices/mySlice';

   export const rootReducer = combineReducers({
     // existing...
     my: myReducer,
   });
   ```

4. **Add selectors** to `src/redux/selectors.ts` using the bottom Exports pattern:

   ```typescript
   const selectSomething = (state: RootState) => state.my.something;

   export { selectIsAuthenticated, selectSomething /* ...others */ };
   ```

   Note: selectors are declared without `export` at definition, then gathered in the bottom exports region.

5. **Update barrel files:**
   - `src/redux/slices/index.ts` — add action and reducer exports
   - `src/redux/index.ts` — add selector re-exports

6. **Use in components with typed hooks:**

   ```typescript
   import { selectSomething } from '@/redux';
   import { useAppSelector, useAppDispatch } from '@/redux/store';
   import { setSomething } from '@/redux/slices';

   const something = useAppSelector(selectSomething);
   const dispatch = useAppDispatch();
   dispatch(setSomething('value'));
   ```

7. **Verify:**
   ```bash
   npx tsc --noEmit
   npx eslint src/
   ```
