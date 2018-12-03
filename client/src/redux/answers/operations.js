import { post, patch, remove, APIAddresses } from 'utils/api';
import * as actions from './answersActions';

export const createAnswer = questionId => async (dispatch) => {
  const { data: { answer } } = await post(APIAddresses.ANSWER_CREATE,
    { questionId }, dispatch);
  dispatch(actions.createAnswer(answer));
};

export const updateAnswer = (id, partToUpdate) => async (dispatch) => {
  const { data: { answer } } = await patch(`${APIAddresses.ANSWER_ITEM}/${id}`,
    partToUpdate, dispatch);
  dispatch(actions.updateAnswer(answer));
};

export const updateAnswerOnVote = id => async (dispatch) => {
  const { data: { answers } } = await patch(`${APIAddresses.ANSWER_VOTE}/${id}`,
    {}, dispatch);

  dispatch(actions.updateAnswers(answers));
};

export const removeAnswer = id => async (dispatch) => {
  await remove(`${APIAddresses.ANSWER_ITEM}/${id}`, {}, dispatch);
  dispatch(actions.removeAnswer(id));
};

// Socket operations
export const answerCreate = answer => async dispatch =>
  dispatch(actions.createAnswer(answer));

export const answerUpdateOnVote = answers => async dispatch =>
  dispatch(actions.updateAnswers(answers));

export const answerUpdate = answer => async dispatch =>
  dispatch(actions.updateAnswer(answer));

export const answerRemove = id => async dispatch =>
  dispatch(actions.removeAnswer(id));
