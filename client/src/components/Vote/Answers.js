import React from 'react';
import { compose } from 'redux'
import { array, object, func, bool } from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

import NoItems from 'components/NoItems';
import Highcharts from 'components/Highcharts';
import withAnswers from 'utils/withAnswers';
import { answersColors } from './colors';

const isVoted = (userId, votedBy) => votedBy.find(id => id === userId);
const getAnswerColor = answerIndex =>
  answersColors[answerIndex % answersColors.length];

const Answers = ({ answers, question, updateAnswerOnVote, user, isOwner }) => {
  const { showResult } = question;

  return (
    <div className="p-3">
      {(showResult || isOwner) &&
      <Highcharts answers={answers} colors={answersColors} />}

      {
        answers.length
          ? answers.map(({ _id, votedBy, title }, index) => (
            <Button
              key={_id}
              block
              className="answer-button"
              onClick={() => updateAnswerOnVote(_id)}
              style={{ backgroundColor: getAnswerColor(index) }}
              disabled={!!isVoted(user._id, votedBy)}
            >
              {`${title} ${showResult ? `(${votedBy.length})` : ''}`}
            </Button>
          ))
          : <NoItems noItemsText="No answers to display" />
      }
    </div>
  );
};

Answers.propTypes = {
  user: object.isRequired,
  isOwner: bool.isRequired,
  question: object.isRequired,
  updateAnswerOnVote: func.isRequired,
  answers: array,
};

Answers.defaultProps = {
  answers: [],
};

export default compose(
  withAnswers,
  connect(
    ({ auth }) => ({ user: auth.user }),
  ),
)(Answers);
