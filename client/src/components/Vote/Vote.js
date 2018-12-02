import React from 'react';
import { object, string, func } from 'prop-types';
import { Container } from 'reactstrap';

import NoItems from 'components/NoItems';
import Question from './Question';

class Vote extends React.Component {
  componentDidMount() {
    const { getPollToEdit, pollId } = this.props;

    getPollToEdit(pollId);
  }

  render() {
    const { poll, pollId, user } = this.props;
    const isOwner = poll && poll.createdBy === user._id;
    const isAvailable = poll && (isOwner || poll.isPublic);

    return (
      <Container>
        {isAvailable
          ? <Question pollId={pollId} isOwner={isOwner} />
          : <NoItems noItemsText="This poll is not public" />
        }
      </Container>
    );
  }
}

Vote.propTypes = {
  poll: object,
  user: object.isRequired,
  pollId: string.isRequired,
  getPollToEdit: func.isRequired,
};

export default Vote;
