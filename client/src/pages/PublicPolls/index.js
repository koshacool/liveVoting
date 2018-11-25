import React from 'react';
import PollsList from 'components/PollsList';
import withPolls from 'utils/withPolls';

const PublicPollsPage = props => <PollsList {...props} />;

export default withPolls(PublicPollsPage);
