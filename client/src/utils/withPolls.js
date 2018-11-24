import { connect } from 'react-redux';
import { createPoll, updatePoll, removePoll, getPrivate, getPublic } from 'redux/polls/pollsActions';

const withLoader = connect(
  ({ polls }) => ({ polls }),
  { createPoll, updatePoll, removePoll, getPrivate, getPublic  }
);

export default withLoader;
