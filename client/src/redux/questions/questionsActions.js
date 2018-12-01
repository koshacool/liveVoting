import { CREATE_QUESTION, UPDATE_QUESTION, REMOVE_QUESTION } from './types';


export const createQuestion = question => ({
  type: CREATE_QUESTION,
  payload: { question },
});

export const updateQuestion = question => ({
  type: UPDATE_QUESTION,
  payload: { question },
});

export const removeQuestion = id => ({
  type: REMOVE_QUESTION,
  payload: { id },
});
