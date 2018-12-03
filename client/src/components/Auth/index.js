import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { handleError } from 'utils/error-handler';
import { HOME_URL } from 'routes';
import config from './config.json';
import './styles.scss';

class Login extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    checkUser: PropTypes.func.isRequired,
    onGoogleResponse: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { checkUser, history } = this.props;

    checkUser(() => history.push(HOME_URL));
  }

  render() {
    const { history, onGoogleResponse } = this.props;

    return (
      <div className="col-12 text-center">
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={googleResponse => onGoogleResponse(googleResponse,
            history.push)}
          onFailure={handleError}
          className="google-auth-button"
        />
      </div>
    );
  }
}

export default Login;
