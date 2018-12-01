import { connect } from 'react-redux';
import { createQuestion, removeQuestion, updateQuestion } from 'redux/questions/operations';
import { findOneByField } from 'utils/helpers';


const withQuestion = connect(
  ({ questions }, { pollId }) => ({
    question: findOneByField(questions.questions, 'pollId', pollId),
  }),
  { createQuestion, removeQuestion, updateQuestion }
);

export default withQuestion;
