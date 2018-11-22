import { createStore, combineReducers } from 'redux';

import loaderReducer from './reducers/loaderReducer';


const store = createStore(combineReducers({
    loader: loaderReducer,
}));

export default store;
