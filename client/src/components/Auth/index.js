import React from 'react';
import { GoogleLogin } from 'react-google-login';
//
// import { onGoogleResponse } from 'redux/auth/operations';

import { handleError } from 'utils/error-handler';
import config from './config.json';

const Login = ({ history, onGoogleResponse }) => (
  <GoogleLogin
    clientId={config.GOOGLE_CLIENT_ID}
    buttonText="Login with Google"
    onSuccess={onGoogleResponse}
    onFailure={handleError}
  />
);

export default Login;
