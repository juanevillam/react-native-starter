---
description: How to create a new Redux slice with selectors following ReactNativeStarter conventions
---

# Create a New Redux Slice

1. **Create the slice file** at `src/redux/slices/<name>Slice.ts`:

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

2. **Register in rootReducer** (`src/redux/rootReducer.ts`):

   ```typescript
   import { myReducer } from './slices/mySlice';

   export const rootReducer = combineReducers({
     // existing...
     my: myReducer,
   });
   ```

3. **Add selectors** to `src/redux/selectors.ts` using the bottom Exports pattern:

   ```typescript
   const selectSomething = (state: RootState) => state.my.something;

   export { selectIsAuthenticated, selectSomething /* ...others */ };
   ```

   Note: selectors are declared without `export` at definition, then gathered in the bottom exports region.

4. **Update barrel files:**
   - `src/redux/slices/index.ts` — add action and reducer exports
   - `src/redux/index.ts` — add selector re-exports

5. **Use in components with typed hooks:**

   ```typescript
   import { selectSomething } from '@/redux';
   import { useAppSelector, useAppDispatch } from '@/redux/store';
   import { setSomething } from '@/redux/slices';

   const something = useAppSelector(selectSomething);
   const dispatch = useAppDispatch();
   dispatch(setSomething('value'));
   ```

6. **Verify:**
   ```bash
   npx tsc --noEmit
   npx eslint src/
   ```
