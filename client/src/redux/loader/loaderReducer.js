import { SET_LOADING } from './types';

const initialState = {
  isLoading: false,
};

const loaderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { isLoading: payload.isLoading };
    default:
      return state;
  }
};

export default loaderReducer;
