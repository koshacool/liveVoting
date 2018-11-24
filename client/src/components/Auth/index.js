import React from 'react';
import { GoogleLogin } from 'react-google-login';

import {  onGoogleResponse } from 'utils/api/authorization';
import { handleError } from 'utils/error-handler';
import config from './config.json';


const Login = ({ history, setLoading, setUser }) =>  (
    <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={onGoogleResponse(history.push, setLoading, setUser)}
                onFailure={handleError}
    />
  );


export default Login;