import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { element } from 'prop-types';
import Alert from 'react-s-alert';

import Header from 'components/Header';
import Loader from 'components/Loader';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';


const ALERTS_LIMIT = 3;
const TIMEOUT = 3000;

export const CoreLayout = ({ children }) => (
  <div className="app-container">
    <Fragment>
      <Header />
      {children}
    </Fragment>
        
    <Alert stack={{ limit: ALERTS_LIMIT }} timeout={TIMEOUT} position="bottom" />
    <Loader  />
  </div>
);
  
CoreLayout.propTypes = {
  children:     PropTypes.node,
};
  
export default CoreLayout;
