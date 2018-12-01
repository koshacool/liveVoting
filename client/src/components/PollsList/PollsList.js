import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Button } from 'reactstrap';

import PollItem from './PollItem';
import NoItems from 'components/NoItems';


class MyPolls extends React.Component {
  componentDidMount(){
    const { getPolls } = this.props;
    getPolls();
  }

  onPublicityToggle = async (poll, isPublic) => {
    const { updatePoll } = this.props;
    updatePoll(poll._id,  { isPublic });
  }

   createPoll = async () => {
    const { createPoll, history } = this.props;
    createPoll(history);
  }

  render() {
    const { polls, showPrivate, user, removePoll } = this.props;

    const pollsToShow = showPrivate
      ? polls.filter(({ createdBy }) => createdBy === user._id)
      : polls.filter(({ isPublic }) => !!isPublic);

    return (
      <Container>
        <Row>
          {pollsToShow && pollsToShow.length > 0
            ? pollsToShow.map(poll => (
              <PollItem
                key={poll._id}
                poll={poll}
                onPublicityToggle={this.onPublicityToggle}
                userId={user._id}
                onRemove={() => removePoll(poll._id)}
              />
            ))
            : <NoItems />}
        </Row>

        <Button
          onClick={this.createPoll}
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        >
          ADD
        </Button>
      </Container>
    );
  }
}

MyPolls.propTypes = {
  polls: PropTypes.array.isRequired,
};

export default MyPolls;
