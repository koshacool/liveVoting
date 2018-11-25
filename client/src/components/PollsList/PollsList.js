import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Button } from 'reactstrap';

import PollItem from './PollItem';
import NoItems from 'components/NoItems';

import { post, get, patch, APIAddresses } from 'utils/api';
import { handleError } from 'utils/error-handler';
import { EDIT_POLL } from 'routes';


class MyPolls extends React.Component {
  async componentDidMount(){
    const { setLoading, getPolls, showPrivate } = this.props;

    try {
      setLoading(true);

      const { data: { polls } } = await get(APIAddresses.POLLS_LIST);

      getPolls(polls);
      setLoading(false);
    } catch (error) {
      handleError(error);
      setLoading(false);
      throw error;
    }
  }

  onPublicityToggle = async (poll) => {
    const { setLoading, updatePoll } = this.props;

    try {
      setLoading(true);

      const { data } = await patch(
        `${APIAddresses.POLLS_UPDATE}/${poll._id}`,
        { isPublic: !poll.isPublic }
        );

      updatePoll(data.poll);
      setLoading(false);
    } catch (error) {
      handleError(error);
      setLoading(false);
      throw error;
    }
  }

   createPoll = async () => {
    const { setLoading, createPoll, history } = this.props;

    try {
      setLoading(true);

      const { data: { poll } } = await post(APIAddresses.POLLS_CREATE, {});

      createPoll(poll);
      history.push(EDIT_POLL.replace(/:id/, poll._id));

      setLoading(false);
    } catch (error) {
      handleError(error);
      setLoading(false);
      throw error;
    }
  }

  render() {
    const { polls, showPrivate, user } = this.props;

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
