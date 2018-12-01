import {
  get, post, patch, remove, APIAddresses,
} from 'utils/api';
import * as questionActions from 'redux/questions/questionsActions';
import * as answerActions from 'redux/answers/answersActions';
import { EDIT_POLL } from 'routes';
import * as actions from './pollsActions';

export const getPolls = () => async (dispatch) => {
  const { data: { polls } } = await get(APIAddresses.POLLS_LIST, dispatch);

  dispatch(actions.getPolls(polls));
};

export const createPoll = history => async (dispatch) => {
  const { data: { poll } } = await post(APIAddresses.POLLS_CREATE, {},
    dispatch);

  dispatch(actions.createPoll(poll));
  history.push(EDIT_POLL.replace(/:id/, poll._id));
};

export const updatePoll = (id, partToUpdate) => async (dispatch) => {
  const { data } = await patch(
    `${APIAddresses.POLLS_UPDATE}/${id}`,
    partToUpdate,
    dispatch,
  );

  dispatch(actions.updatePoll(data.poll));
};

export const removePoll = id => async (dispatch) => {
  await remove(`${APIAddresses.POLL_ITEM}/${id}`, {}, dispatch);
  dispatch(actions.removePoll(id));
};

export const getPollToEdit = id => async (dispatch) => {
  const { data } = await get(`${APIAddresses.POLL_ITEM}/${id}`, dispatch);
  const { poll, question, answers } = data;

  dispatch(actions.updatePoll(poll));
  question && dispatch(questionActions.updateQuestion(question));
  answers && dispatch(answerActions.updateAnswers(answers));
};

// Socket operations
export const pollOnPublic = poll => async dispatch => dispatch(actions.createPoll(poll));

export const pollUnPublic = poll => async dispatch => dispatch(actions.removePoll(poll._id));

export const pollUpdate = poll => async dispatch => dispatch(actions.updatePoll(poll));

export const pollRemove = id => async dispatch => dispatch(actions.removePoll(id));
