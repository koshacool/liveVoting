import { SIGN_IN, SIGN_OUT } from './types';

export const setUser = user => ({
  type: SIGN_IN,
  payload: { user },
});
export const unsetUser = user => ({
  type: SIGN_OUT,
  payload: { user },
});

