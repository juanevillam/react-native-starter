//#region Imports
import React, { createContext, useCallback, useState } from 'react';

import { Portal, Snackbar } from 'react-native-paper';
//#endregion Imports

//#region Types
type SnackbarContextValue = {
  showSnackbar: (message: string) => void;
};

type SnackbarProviderProps = {
  children: React.ReactNode;
};
//#endregion Types

//#region Context
const SnackbarContext = createContext<SnackbarContextValue | null>(null);
//#endregion Context

//#region Component
const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  //#region Hooks
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  //#endregion Hooks

  //#region Handlers
  const showSnackbar = useCallback((message: string) => {
    setMessage(message);
    setIsVisible(true);
  }, []);

  const onDismiss = useCallback(() => {
    setIsVisible(false);
  }, []);
  //#endregion Handlers

  //#region Render
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Portal>
        <Snackbar
          action={{ label: 'OK', onPress: onDismiss }}
          onDismiss={onDismiss}
          visible={isVisible}
        >
          {message}
        </Snackbar>
      </Portal>
    </SnackbarContext.Provider>
  );
  //#endregion Render
};
//#endregion Component

//#region Exports
export { SnackbarContext, SnackbarProvider };
//#endregion Exports
