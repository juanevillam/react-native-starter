//#region Imports
import { type store } from './store';
//#endregion Imports

//#region Types
type AppDispatch = typeof store.dispatch;

type RootState = ReturnType<typeof store.getState>;
//#endregion Types

//#region Exports
export type { AppDispatch, RootState };
//#endregion Exports
