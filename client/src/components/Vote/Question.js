import React from 'react';
import { object, bool } from 'prop-types';

import withQuestions from 'utils/withQuestions';
import NoItems from 'components/NoItems';
import Answers from './Answers';

const Question = ({ question, isOwner }) => question
  ? (
    <div className="questions-container">
      <h2 className="text-center">{question.title}</h2>
      <Answers
        questionId={question._id}
        question={question}
        isOwner={isOwner}
      />
    </div>
  )
  : <NoItems noItemsText="No questions to display" />;

Question.propTypes = {
  question: object,
  isOwner: bool.isRequired,
};

export default withQuestions(Question);
