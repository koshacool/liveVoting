import { GET_PRIVATE, GET_PUBLIC, CREATE, UPDATE, REMOVE } from './types';

export const getPrivate = polls => ({
  type: GET_PRIVATE,
  payload: { polls },
});
export const getPublic = polls => ({
  type: GET_PUBLIC,
  payload: { polls },
});

export const createPoll = poll => ({
  type: CREATE,
  payload: { poll },
});

export const updatePoll = poll => ({
  type: UPDATE,
  payload: { poll },
});

export const removePoll = id => ({
  type: REMOVE,
  payload: { id },
});
