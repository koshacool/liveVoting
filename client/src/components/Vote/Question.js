import React from 'react';
import { object } from 'prop-types';

import withQuestions from 'utils/withQuestions';
import NoItems from 'components/NoItems';
import Answers from './Answers';

const Question = ({ question }) => question
  ? (
    <div className="questions-container">
      <h2 className="text-center">{question.title}</h2>
      <Answers questionId={question._id} question={question} />
    </div>
  )
  : <NoItems noItemsText="No questions to display" />;

Question.propTypes = {
  question: object,
};

export default withQuestions(Question);
