const getAuthToken = () => window.localStorage.getItem('token');

const setAuthToken = token => window.localStorage.setItem('token', token);

const unsetAuthToken = () => setAuthToken('');

// eslint-disable-next-line
const getTokenHeaderObject = token => {
  const authToken = token || getAuthToken();

  return {
    Authorization: `Bearer ${authToken}`,
  };
};

export {
  setAuthToken,
  getAuthToken,
  unsetAuthToken,
  getTokenHeaderObject,
};
