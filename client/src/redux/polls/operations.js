import { get, post, patch, remove, APIAddresses } from 'utils/api';
import * as actions from './pollsActions';
import { EDIT_POLL } from 'routes';

export const getPolls = () => async dispatch => {
  const { data: { polls } } = await get(APIAddresses.POLLS_LIST, dispatch);

  dispatch(actions.getPolls(polls));
};


export const createPoll = history => async dispatch => {
  const { data: { poll } } = await post(APIAddresses.POLLS_CREATE, {}, dispatch);

  dispatch(actions.createPoll(poll));
  history.push(EDIT_POLL.replace(/:id/, poll._id));
};

export const updatePoll = (id, partToUpdate) => async dispatch => {
  const { data } = await patch(
    `${APIAddresses.POLLS_UPDATE}/${id}`,
    partToUpdate,
    dispatch
  );

  dispatch(actions.updatePoll(data.poll));
};

export const removePoll = id => async dispatch => {
  await remove(`${APIAddresses.POLLS_DELETE}/${id}`, {}, dispatch);
  dispatch(actions.removePoll(id));
};


// Socket operations
export const pollOnPublic = poll => async dispatch =>
  dispatch(actions.createPoll(poll));

export const pollUnPublic = poll => async dispatch =>
  dispatch(actions.removePoll(poll._id));

export const pollUpdate = poll => async dispatch =>
  dispatch(actions.updatePoll(poll));

export const pollRemove = id => async dispatch =>
  dispatch(actions.removePoll(id));
