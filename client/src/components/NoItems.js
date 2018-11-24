import React from 'react';
import PropTypes from 'prop-types';


const NoItems = ({ noItemsText }) => (
  <h3 className="col">{noItemsText}</h3>
);

NoItems.propTypes = {
  noItemsText: PropTypes.string,
};

NoItems.defaultProps = {
  noItemsText: 'No items',
};

export default NoItems;
