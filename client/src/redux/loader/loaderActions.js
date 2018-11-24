import { SET_LOADING} from './types';

const setLoading = isLoading => ({
  type: SET_LOADING,
  payload: {
    isLoading,
  },
});

export default setLoading;

