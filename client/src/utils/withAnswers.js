import { connect } from 'react-redux';
import { createAnswer, removeAnswer, updateAnswer } from 'redux/answers/operations';
import { findAllByField } from 'utils/helpers';


const withAnswers = connect(
  ({ answers }, { questionId }) => ({
    answers: findAllByField(answers.answers, 'questionId', questionId),
  }),
  { createAnswer, removeAnswer, updateAnswer }
);

export default withAnswers;
