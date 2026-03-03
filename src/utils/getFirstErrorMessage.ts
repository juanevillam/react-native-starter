import { type FlattenedErrors } from './types';

export const getFirstErrorMessage = (errorsMap: FlattenedErrors): string => {
  const firstKey = Object.keys(errorsMap)[0];

  return firstKey ? (errorsMap[firstKey] ?? '') : '';
};
