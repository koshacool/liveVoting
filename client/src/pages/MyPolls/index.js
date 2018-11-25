import React from 'react';
import PollsList from 'components/PollsList';
import withPolls from 'utils/withPolls';


const MyPollsPage = props => <PollsList {...props} showPrivate />;

export default withPolls(MyPollsPage);
