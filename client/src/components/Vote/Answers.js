import React from 'react';
import * as R from 'ramda';
import { array, object, func } from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

import NoItems from 'components/NoItems';
import Highcharts from 'components/Highcharts';
import withAnswers from 'utils/withAnswers';
import { answersColors } from './colors';


const isVoted = (userId, votedBy) => votedBy.find(id => id === userId);
const getAnswerColor = answerIndex =>
  answersColors[answerIndex % answersColors.length];

const Answers = ({ answers, question, updateAnswerOnVote, user }) => {
  const { showResult } = question;

  return (
    <div className="p-3">
      {showResult && <Highcharts answers={answers} colors={answersColors} />}

      {
        answers.length
          ? answers.map(({ _id, votedBy, title }, index) => (
            <Button
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
  question: object.isRequired,
  updateAnswerOnVote: func.isRequired,
  answers: array,
};

Answers.defaultProps = {
  answers: [],
};

export default R.compose(
  withAnswers,
  connect(
    ({ auth }) => ({ user: auth.user }),
  ),
)(Answers);
