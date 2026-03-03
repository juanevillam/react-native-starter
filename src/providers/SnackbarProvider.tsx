import React, { createContext, useCallback, useState } from 'react';

import { Portal, Snackbar } from 'react-native-paper';

type SnackbarContextValue = {
  showSnackbar: (message: string) => void;
};

type SnackbarProviderProps = {
  children: React.ReactNode;
};

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackbar = useCallback((message: string) => {
    setMessage(message);
    setIsVisible(true);
  }, []);

  const onDismiss = useCallback(() => {
    setIsVisible(false);
  }, []);

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
};

export { SnackbarContext, SnackbarProvider };
