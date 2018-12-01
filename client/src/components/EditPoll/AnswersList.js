import React from 'react';
import { array, string, func } from 'prop-types';
import { Button } from 'reactstrap';

import Answer from './Answer';
import withAnswers from 'utils/withAnswers';

const AnswersList = (props) => {
  const {
    answers, questionId, createAnswer, removeAnswer, updateAnswer,
  } = props;

  const onChangeAnswer = answerId => ({ target }) => {
    const { name, value, checked } = target;
    updateAnswer(answerId, { [name]: name === 'showResult' ? checked : value });
  };

  return (
    <div className="p-3">
      {
        answers.length
          ? answers.map(answer => (
            <Answer
              key={answer._id}
              answer={answer}
              onRemove={removeAnswer}
              onUpdate={onChangeAnswer}
            />
          ))
          : <h3>No answers</h3>
      }
      <Button onClick={() => createAnswer(questionId)}>Add answer</Button>
    </div>
  );
};

AnswersList.propTypes = {
  answers: array,
  questionId: string.isRequired,
  createAnswer: func.isRequired,
  removeAnswer: func.isRequired,
  updateAnswer: func.isRequired,
};

AnswersList.defaultProps = {
  answers: [],
};

export default withAnswers(AnswersList);
