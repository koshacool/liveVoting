import { connect } from 'react-redux';
import { createPoll, updatePoll, removePoll, getPolls, getPollToEdit } from 'redux/polls/operations';

const withPolls = connect(
  ({ polls }) => ({ polls: polls.polls }),
  { createPoll, updatePoll, removePoll, getPolls, getPollToEdit  }
);

export default withPolls;
