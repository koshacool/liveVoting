import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { element } from 'prop-types';

import withLoader from 'utils/withLoader';
import withUser from 'utils/withUser';


const AppLayout = R.compose(
  withLoader,
  withUser
);

AppLayout.propTypes = {
  Component: element.isRequired,
};

export default AppLayout;
