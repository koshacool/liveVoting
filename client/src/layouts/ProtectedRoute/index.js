import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import withUser from 'utils/withUser';
import AppLayout from 'layouts/AppLayout';
import Login from 'pages/Login';

const ProtectedRoute = ({ component: Component, path, exact, user, ...rest }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props => (
        !user
          ? <Login {...{ ...rest, ...props, user }} />
          : <Component {...{ ...rest, ...props, user }} />
      )}
    />
  );
};
ProtectedRoute.propTypes = {
  user: PropTypes.object,
};

ProtectedRoute.defaultProps = {
  user: null,
};

export default AppLayout(ProtectedRoute);