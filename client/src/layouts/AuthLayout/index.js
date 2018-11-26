import React from 'react';
import PropTypes from 'prop-types';
import AppLayout from 'layouts/AppLayout';


const AuthLayout = Component => {
  const wrapper = props => {
    const { history, user, getUser } = props;

    // If token exist try to get user or redirect to login page
    if (!user) {
      getUser(history.push);
    }

    return user ? <Component {...props} /> : null;
  };

  return AppLayout(wrapper);
};

AuthLayout.propTypes = {
  user: PropTypes.object,
};

AuthLayout.defaultProps = {
  user: null,
};

export default AuthLayout;

