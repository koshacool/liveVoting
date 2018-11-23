import React from 'react';
import { GoogleLogin } from 'react-google-login';
import config from './config.json';
import { post, get, APIAddresses } from 'utils/api';
import { setAuthToken, getAuthToken } from 'utils/api/authorization';
import { handleError } from 'utils/error-handler';
import { routeList } from 'pages/routes';


const googleResponse = (push, setLoading, setUser) => async (response) => {
    try {
        setLoading(true);

        const { data } = await post(APIAddresses.SIGN_IN, {access_token: response.accessToken});
        const { user, token } = data;

        setAuthToken(token);
        setUser(user);
        push(routeList.HOME);

        setLoading(false);
    } catch (error) {
        handleError(error);
        setLoading(false);
        throw error;
    }
};

const getUser = async (push, setLoading, setUser) => {
    const token = getAuthToken();

    if (token) {
        try {
            setLoading(true);

            const { data } = await get(APIAddresses.AUTH);
            const { user } = data;

            setUser(user);
            push(routeList.HOME);

            setLoading(false);
        } catch (error) {
            handleError(error);
            setLoading(false);
            throw error;
        }
    }
};

const Login = ({ history, setLoading, user, setUser, ...props }) => {
    if (user) {
        history.push(routeList.HOME);
    } else {
        getUser(history.push, setLoading, setUser);
    }

    return (
        <div>
            <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={googleResponse(history.push, setLoading, setUser)}
                onFailure={handleError}
            />
        </div>
    );
}


export default Login;