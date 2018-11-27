import { get, post, APIAddresses } from 'utils/api';
import * as actions from './authActions';
import {HOME_URL, LOGIN_URL} from 'routes';
import { getAuthToken, setAuthToken, unsetAuthToken } from 'utils/api/authorization';


export const checkUser = callback => async dispatch => {
  const token = getAuthToken();

  try {
    if (token) {
      const { data } = await get(APIAddresses.AUTH, dispatch);
      const { user } = data;

      dispatch(actions.setUser(user));

      if (typeof callback === 'function') {
        callback();
      }
    }
  } catch (error) {
    throw error;
  }
};

export const getUser = push => async dispatch => {
  const token = getAuthToken();

  try {
    return token ? checkUser()(dispatch) : push(LOGIN_URL);
  } catch (error) {
    push(LOGIN_URL);
    throw error;
  }
};

export const onGoogleResponse = (googleResponse, push) => async dispatch => {
  try {
    const { data } = await post(
      APIAddresses.SIGN_IN,
      {access_token: googleResponse.accessToken},
      dispatch
    );
    const { user, token } = data;

    setAuthToken(token);
    dispatch(actions.setUser(user));

    return push(HOME_URL);
  } catch (error) {
    throw error;
  }
};

export const onLogout = () => async dispatch => {
  try {
    await post(APIAddresses.SIGN_OUT, {}, dispatch);

    unsetAuthToken();
    dispatch(actions.unsetUser());
  } catch (error) {
    throw error;
  }
};
