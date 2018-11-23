import React from 'react';
import { routeList } from 'pages/routes';
import {post} from "../../utils/api";
import APIAddresses from "../../utils/api/urls";
import {handleError} from "../../utils/error-handler";
import { unsetAuthToken } from 'utils/api/authorization';

const onLogout = (unsetUser, setLoading) => async () => {
    try {
        setLoading(true);

        await post(APIAddresses.SIGN_OUT, {});
        unsetAuthToken();
        unsetUser();

        setLoading(false);
    } catch (error) {
        handleError(error)
        setLoading(false);
        throw error;
    }
};

const Home = ({ history, user, unsetUser, setLoading }) => {
    if (!user) {
        history.push(routeList.LOGIN);
    }

    return (
        <div>
            <button onClick={onLogout(unsetUser, setLoading)}>Logout</button>
        </div>
    );
};

export default Home;