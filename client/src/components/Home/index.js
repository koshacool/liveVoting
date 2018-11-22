import React from 'react';
import { getAuthToken } from 'utils/api/authorization';
import { routeList } from 'pages/routes';

const Home = ({ history, ...props }) => {
    console.log(props)
    if (!getAuthToken()) {
        history.push(routeList.LOGIN);
    }

    return (
        <div>
        home
    </div>
    );
};

export default Home;