//#region Imports
import { type FlattenedErrors } from './types';
//#endregion Imports

//#region Utils
export const getFirstErrorMessage = (errorsMap: FlattenedErrors): string => {
  const firstKey = Object.keys(errorsMap)[0];

  return firstKey ? (errorsMap[firstKey] ?? '') : '';
};
//#endregion Utils
