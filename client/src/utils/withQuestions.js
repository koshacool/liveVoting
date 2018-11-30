import { connect } from 'react-redux';
import { createQuestion, removeQuestion, updateQuestion } from 'redux/questions/operations';

const withQuestion = connect(
  state => state.questions,
  { createQuestion, removeQuestion, updateQuestion }
);

export default withQuestion;
