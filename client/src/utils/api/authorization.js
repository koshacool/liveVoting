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
