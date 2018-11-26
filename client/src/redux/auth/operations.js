import { get, post, APIAddresses } from "utils/api";
import * as actions from './authActions';
import {HOME_URL, LOGIN_URL} from "routes";
import { getAuthToken, setAuthToken } from "utils/api/authorization";

export const onGoogleResponse = response => async dispatch => {
  try {
    const { data } = await post(APIAddresses.SIGN_IN, {access_token: response.accessToken}, dispatch);
    const { user, token } = data;

    setAuthToken(token);
    dispatch(actions.setUser(user));
    // push(HOME_URL);

  } catch (error) {
    throw error;
  }
};

export const getUser = (push) => async dispatch => {
  const token = getAuthToken();

  if (!token) {
   return push(LOGIN_URL);
  } else {
    try {
      const { data } = await get(APIAddresses.AUTH, dispatch);
      const { user } = data;

      dispatch(actions.setUser(user));
    } catch (error) {
      push(LOGIN_URL);
      throw error;
    }
  }
};

export const unsetUser = () => async dispatch => dispatch(actions.unsetUser());
