import { connect } from 'react-redux';
import { createPoll, updatePoll, removePoll, getPolls } from 'redux/polls/pollsActions';

const withLoader = connect(
  ({ polls }) => ({ polls: polls.polls }),
  { createPoll, updatePoll, removePoll, getPolls  }
);

export default withLoader;
