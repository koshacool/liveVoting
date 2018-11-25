import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import loaderReducer from './loader/loaderReducer';
import authReducer from './auth/authReducer';
import pollsReducer from './polls/pollsReducer';


const store = createStore(
  combineReducers({
    loader: loaderReducer,
    auth: authReducer,
    polls: pollsReducer,
  }),
  applyMiddleware(logger)
);

export default store;
