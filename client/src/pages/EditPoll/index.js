import React from 'react';
import * as R from 'ramda';
import EditPoll from 'components/EditPoll';
import withPolls from 'utils/withPolls';


const EditPollPage = props => <EditPoll {...props} />;

export default R.compose(
  withPolls,
)(EditPollPage);
