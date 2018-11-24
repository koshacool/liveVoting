import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import loaderReducer from './loader/loaderReducer';
import authReducer from './auth/authReducer';


const store = createStore(
  combineReducers({
    loader: loaderReducer,
    auth: authReducer,
  }),
  applyMiddleware(logger)
);

export default store;
