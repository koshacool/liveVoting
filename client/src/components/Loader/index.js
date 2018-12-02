import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import './Loader.scss';

export const LoaderWrapper = ({ isLoading }) => isLoading ? (
    <div className="react-loader">
      <div>
        <div>
          <Loader type="TailSpin" color="#0099ca" height={50} width={50} />
        </div>
      </div>
    </div> ) : null;

LoaderWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default connect(
  ({ loader }) => ({ isLoading: loader.isLoading })
)(LoaderWrapper);

