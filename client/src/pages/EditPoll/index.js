import React from 'react';
import EditPoll from 'components/EditPoll';
import withPolls from 'utils/withPolls';


const EditPollPage = props => <EditPoll {...props} />;

export default withPolls(EditPollPage);
