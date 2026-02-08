//#region Imports
/**
 * Initialize gesture handler properly.
 * ! Must be the first import.
 */
import 'react-native-gesture-handler';

// Initialize i18n.
import '@/i18n/i18n';

// Rest of the imports...
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { RootNavigator } from '@/navigation/RootNavigator';
import { LayoutProvider } from '@/providers/LayoutProvider';
import { persistor, store } from '@/redux/store/store';
//#endregion Imports

//#region Config
// Enable the optimization of react-native-screens.
enableScreens();
//#endregion Config

//#region Component
export const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <LayoutProvider>
        <RootNavigator />
      </LayoutProvider>
    </PersistGate>
  </Provider>
);
//#endregion Component
