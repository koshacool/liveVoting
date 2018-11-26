import { SET_LOADING } from './types';

export const setLoading = isLoading => ({
  type: SET_LOADING,
  payload: {
    isLoading,
  },
});

export default setLoading;

