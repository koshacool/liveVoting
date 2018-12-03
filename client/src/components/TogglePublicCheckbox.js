import React from 'react';
import PropTypes from 'prop-types';

import { CustomInput } from 'reactstrap';

const getCheckboxId = poll => `checkbox-${poll._id}`;

const TogglePublicCheckbox = ({ poll, onPublicityToggle, name, className }) => (
  <CustomInput
    type="checkbox"
    className={className}
    id={getCheckboxId(poll)}
    name={name}
    checked={poll.isPublic}
    onChange={onPublicityToggle}
    label="Public"
    inline
  />
);

TogglePublicCheckbox.propTypes = {
  poll: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onPublicityToggle: PropTypes.func.isRequired,
};

export default TogglePublicCheckbox;
