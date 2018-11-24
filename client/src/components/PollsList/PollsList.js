import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Button } from 'reactstrap';

import PollItem from './PollItem';
import NoItems from 'components/NoItems';

import { post, get, APIAddresses } from 'utils/api';
import { handleError } from 'utils/error-handler';
import { EDIT_POLL } from 'routes';


class MyPolls extends React.Component {
  constructor(props) {
    super(props);

    this.onPublicityToggle = this.onPublicityToggle.bind(this);
    // this.createPoll = this.createPoll.bind(this);
  }


  onPublicityToggle(isPublic, pollId) {
    // updatePoll.call({ _id: pollId, partToUpdate: { isPublic } },
    //   handleResult());
  }

   createPoll = async () => {
    const { setLoading, createPoll, history } = this.props;
console.log(this.props)
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
    const { polls, showPrivate } = this.props;
    const pollsToShow = showPrivate ? polls.private : polls.public;

    return (
      <Container>
        <Row>
          {pollsToShow && pollsToShow.length > 0
            ? pollsToShow.map(poll => (
              <PollItem
                key={poll._id}
                poll={poll}
                onPublicityToggle={this.onPublicityToggle}
              />
            ))
            : <NoItems />}
        </Row>

        <Button className="float-right" onClick={this.createPoll}>ADD</Button>
      </Container>
    );
  }
}

MyPolls.propTypes = {
  polls: PropTypes.array.isRequired,
};

export default MyPolls;
