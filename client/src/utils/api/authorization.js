import { post, get, APIAddresses } from 'utils/api';
import { handleError } from 'utils/error-handler';
import { LOGIN_URL, HOME_URL } from 'routes';


export const getAuthToken = () => window.localStorage.getItem('token');

export const setAuthToken = token => window.localStorage.setItem('token', token);

export const unsetAuthToken = () => setAuthToken('');

// eslint-disable-next-line
export const getTokenHeaderObject = token => {
  const authToken = token || getAuthToken();

  return {
    Authorization: `Bearer ${authToken}`,
  };
};

export const onGoogleResponse = (push, setLoading, setUser) => async response => {
  try {
    setLoading(true);

    const { data } = await post(APIAddresses.SIGN_IN, {access_token: response.accessToken});
    const { user, token } = data;

    setAuthToken(token);
    setUser(user);
    push(HOME_URL);

    setLoading(false);
  } catch (error) {
    handleError(error);
    setLoading(false);
    throw error;
  }
};

export const getUser = async (push, setLoading, setUser) => {
  const token = getAuthToken();

  if (!token) {
    push(LOGIN_URL);
  } else {
    try {
      setLoading(true);

      const { data } = await get(APIAddresses.AUTH);
      const { user } = data;

      setUser(user);
      setLoading(false);
    } catch (error) {
      handleError(error);
      setLoading(false);
      push(LOGIN_URL);
      throw error;
    }
  }
};
