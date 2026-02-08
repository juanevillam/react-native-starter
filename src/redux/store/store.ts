//#region Imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { rootReducer } from '../rootReducer';
//#endregion Imports

//#region Persist Configuration
const PERSIST_CONFIG = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(PERSIST_CONFIG, rootReducer);
//#endregion Persist Configuration

//#region Store Setup
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
//#endregion Store Setup

//#region Exports
export { store, persistor };
//#endregion Exports
