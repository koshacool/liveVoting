import { SET_LOADING } from '../actions/types'

const initialState = {
  isLoading: true,
}

const loaderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return { isLoading: payload.isLoading };
    default:
      return state;
  }
}

export default loaderReducer
