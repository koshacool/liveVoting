import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { handleError } from 'utils/error-handler';
import { HOME_URL, LOGIN_URL } from 'routes';
import config from './config.json';

class Login extends Component {
  componentDidMount () {
    const { checkUser, history } = this.props;

    checkUser(() => history.push(HOME_URL));
  }

  render () {
    const { history, onGoogleResponse } = this.props;

    return (
      <GoogleLogin
        clientId={config.GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={googleResponse => onGoogleResponse(googleResponse, history.push)}
        onFailure={handleError}
      />
    );
  }
}

export default Login;
