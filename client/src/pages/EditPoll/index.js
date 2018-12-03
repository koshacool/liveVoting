import React from 'react';
import { compose } from 'redux'
import EditPoll from 'components/EditPoll';
import withPolls from 'utils/withPolls';


const EditPollPage = props => <EditPoll {...props} />;

export default compose(
  withPolls,
)(EditPollPage);
