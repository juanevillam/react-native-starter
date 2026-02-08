//#region Imports
import { useContext } from 'react';

import { SnackbarContext } from '@/providers/SnackbarProvider';
//#endregion Imports

//#region Custom Hook
const useSnackbar = () => {
  //#region Hooks
  const context = useContext(SnackbarContext);
  //#endregion Hooks

  if (!context)
    throw new Error('useSnackbar must be used within a SnackbarProvider');

  //#region Return
  return context;
  //#endregion Return
};
//#endregion Custom Hook

//#region Exports
export { useSnackbar };
//#endregion Exports
