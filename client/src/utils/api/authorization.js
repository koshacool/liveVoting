const getAuthToken = () => window.localStorage.getItem('token');
const setAuthToken = token => window.localStorage.setItem('token', token);
const getTokenHeaderValue = () => `Bearer ${getAuthToken()}`;

const getAuthUser = () => {
  const email = window.localStorage.getItem('email');

  return email;
};

const setAuthUser = (email, token) => {
  window.localStorage.setItem('email', email);
  setAuthToken(token);
};

const unSetAuthUser = () => {
  setAuthUser('', '');
  setAuthToken('');
};

// eslint-disable-next-line
const getTokenHeaderObject = token => ({
  Authorization: token ? `Bearer ${token}` : getTokenHeaderValue(),
});

export {
  setAuthToken,
  getAuthToken,
  getAuthUser,
  setAuthUser,
  unSetAuthUser,
  getTokenHeaderValue,
  getTokenHeaderObject,
};
