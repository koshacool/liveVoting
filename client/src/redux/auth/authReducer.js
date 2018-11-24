import { SIGN_OUT, SIGN_IN } from './types';

const initialState = {
  user: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      return { ...state, user: payload.user };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
