import {
  CREATE_ANSWER, REMOVE_ANSWER, UPDATE_ANSWER,
  UPDATE_ANSWERS,
} from './types';


const initialState = {
  answers: [],
};

const updpateAnswers = (answers, answer) => {
  const newArr = [...answers];
  const index = newArr.findIndex(({ _id }) => _id === answer._id);

  if (index < 0) {
    newArr.push(answer);
    return newArr;
  }

  newArr[index] = answer;
  return newArr;
};

const updateManyAnswers = (answers, newAnswers) =>
  newAnswers.reduce((prev, answer) => updpateAnswers(prev, answer), answers);



const answersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_ANSWER:
      return { ...state, answers: state.answers.concat([payload.answer]) };
    case UPDATE_ANSWER:
      return {
        ...state,
        answers: updpateAnswers(state.answers, payload.answer),
      };
    case UPDATE_ANSWERS:
      return {
        ...state,
        answers: updateManyAnswers(state.answers, payload.answers),
      };
    case REMOVE_ANSWER:
      return {
        ...state,
        answers: state.answers.filter(({ _id }) => _id !== payload.id),
      };
    default:
      return state;
  }
};

export default answersReducer;
