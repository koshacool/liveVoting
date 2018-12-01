import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import loaderReducer from './loader/loaderReducer';
import authReducer from './auth/authReducer';
import pollsReducer from './polls/pollsReducer';
import questionsReducer from './questions/questionsReducer';
import answersReducer from './answers/answersReducer';


const store = createStore(
  combineReducers({
    loader: loaderReducer,
    auth: authReducer,
    polls: pollsReducer,
    questions: questionsReducer,
    answers: answersReducer,
  }),
  composeWithDevTools(applyMiddleware(ReduxThunk, logger)),
);

export default store;
