import { CREATE_ANSWER, REMOVE_ANSWER, UPDATE_ANSWER, UPDATE_ANSWERS } from './types';


export const createAnswer = answer => ({
  type: CREATE_ANSWER,
  payload: { answer },
});

export const updateAnswer = answer => ({
  type: UPDATE_ANSWER,
  payload: { answer },
});

export const updateAnswers = answers => ({
  type: UPDATE_ANSWERS,
  payload: { answers },
});

export const removeAnswer = id => ({
  type: REMOVE_ANSWER,
  payload: { id },
});
