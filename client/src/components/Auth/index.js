import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import config from './config.json';
import { post, APIAddresses } from 'utils/api';
import { setAuthUser, getAuthToken, unSetAuthUser } from 'utils/api/authorization';
import { handleError } from 'utils/error-handler';
import { routeList } from 'pages/routes';
import setLoading from "../../redux/actions/loader";


const onLogout = async () => {
    try {
        post(APIAddresses.SIGN_OUT, {});
        unSetAuthUser();
    } catch (error) {
        handleError(error)
        throw error;
    }
};

const googleResponse = (push) => async (response) => {
    try {
        const { data } = await post(APIAddresses.SIGN_IN, {access_token: response.accessToken});
        const { user, token } = data;

        await setAuthUser(user.email, token);
        push(routeList.HOME)
    } catch (error) {
        handleError(error);
        throw error;
    }
};

const Login = ({ history, setLoading, ...props }) => {
    console.log(props)
    if (getAuthToken()) {
        setLoading(false)
        history.push(routeList.HOME);
    }

    return (
        <div>
            <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={googleResponse(history.push)}
                onFailure={handleError}
            />
        </div>
    );
}


export default Login;