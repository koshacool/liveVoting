import { post, patch, remove, APIAddresses } from 'utils/api';
import * as actions from "./questionsActions";


export const createQuestion = pollId => async dispatch => {
  const { data: { question } } = await post(APIAddresses.QUESTION_CREATE, { pollId }, dispatch);
  dispatch(actions.createQuestion(question));
};

export const updateQuestion = (id, partToUpdate) => async dispatch => {
  const { data } = await patch(`${APIAddresses.QUESTION_ITEM}/${id}`, partToUpdate, dispatch);
  dispatch(actions.updateQuestion(data.question));
};

export const removeQuestion = id => async dispatch => {
  await remove(`${APIAddresses.QUESTION_ITEM}/${id}`, {}, dispatch);
  dispatch(actions.removeQuestion(id));
};


// Socket operations
export const questionCreate = question => async dispatch =>
  dispatch(actions.createQuestion(question));

export const questionUpdate = question => async dispatch =>
  dispatch(actions.updateQuestion(question));

export const questionRemove = id => async dispatch =>
  dispatch(actions.removeQuestion(id));
