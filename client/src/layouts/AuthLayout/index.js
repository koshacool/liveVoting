import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { Route, Redirect } from 'react-router-dom';
import AppLayout from 'layouts/AppLayout';
import Login from 'pages/Login';
import withUser from 'utils/withUser';
import { getUser } from 'utils/api/authorization';


const AuthLayout = Component => {
  const wrapper = (props) => {
    const { history, setLoading, user, setUser } = props;

    // If token exist try to get user or redirect to login page
    if (!user) {
      getUser(history.push, setLoading, setUser);
    }
    
    return user ? <Component {...props} /> : null;
  }
 return AppLayout(wrapper);
};

AuthLayout.propTypes = {
  user: PropTypes.object,
};

AuthLayout.defaultProps = {
  user: null,
};

export default AuthLayout

