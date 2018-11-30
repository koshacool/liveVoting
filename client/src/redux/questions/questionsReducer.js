import { CREATE_QUESTION, UPDATE_QUESTION, REMOVE_QUESTION } from './types';


const initialState = {
  questions: [],
};

const updpateQuestion = (questions, question) => {
  const newArr = [...questions];
  const index = newArr.findIndex(({ _id }) => _id === question._id);

  if (index < 0) {
    newArr.push(question);
    return newArr;
  }

  newArr[index] = question;
  return newArr;
};


const questionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_QUESTION:
      return { ...state, questions: state.questions.concat([payload.question]) };
    case UPDATE_QUESTION:
      return {
        ...state,
        questions: updpateQuestion(state.questions, payload.question),
      };
    case REMOVE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(({ _id }) => _id !== payload.id),
      };
    default:
      return state;
  }
};

export default questionsReducer;
