// import { get, query, post, APIAddresses } from '../../utils/api';
import * as actions from './actions';
import types from './types';

import { GET_POLLS, CREATE_POLLS, UPDATE_POLLS, REMOVE_POLLS } from './types';

export const getPolls = polls => ({
  type: GET_POLLS,
  payload: { polls },
});

export const createPoll = poll => ({
  type: CREATE_POLLS,
  payload: { poll },
});

export const updatePoll = poll => ({
  type: UPDATE_POLLS,
  payload: { poll },
});

export const removePoll = id => ({
  type: REMOVE_POLLS,
  payload: { id },
});

