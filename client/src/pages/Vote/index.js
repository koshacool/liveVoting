import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import Vote from 'components/Vote';
import { findOneByField } from 'utils/helpers';
import { updateAnswer } from 'redux/answers/operations';
import { getPollToEdit } from 'redux/polls/operations';

const VotePage = props => <Vote {...props} />;

export default R.compose(
  connect(
    ({ polls }, { match }) => {
      const pollId = match.params.id;
      const poll = findOneByField(polls.polls, '_id', pollId);

      return { poll, pollId };
    },
    { updateAnswer, getPollToEdit },
  ),
)(VotePage);
