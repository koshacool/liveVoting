import {
  get, post, patch, remove, APIAddresses,
} from 'utils/api';
import * as actions from './answersActions';


export const createAnswer = questionId => async (dispatch) => {
  const { data: { answer } } = await post(APIAddresses.ANSWER_CREATE, { questionId }, dispatch);
  dispatch(actions.createAnswer(answer));
};

export const updateAnswer = (id, partToUpdate) => async (dispatch) => {
  const { data: { answer } } = await patch(`${APIAddresses.ANSWER_ITEM}/${id}`, partToUpdate, dispatch);
  dispatch(actions.updateAnswer(answer));
};

export const removeAnswer = id => async (dispatch) => {
  await remove(`${APIAddresses.ANSWER_ITEM}/${id}`, {}, dispatch);
  dispatch(actions.removeAnswer(id));
};