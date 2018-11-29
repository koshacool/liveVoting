import React from 'react';
import PropTypes from 'prop-types';

import { CustomInput } from 'reactstrap';

const getCheckboxId = poll => `checkbox-${poll._id}`;

const TogglePublicCheckbox = ({ poll, onPublicityToggle, className }) => (
  <CustomInput
    type="checkbox"
    className={className}
    id={getCheckboxId(poll)}
    name={getCheckboxId(poll)}
    checked={poll.isPublic}
    onChange={onPublicityToggle}
    label="Public"
    inline
  />
);

TogglePublicCheckbox.propTypes = {
  poll: PropTypes.object.isRequired,
};

export default TogglePublicCheckbox;
