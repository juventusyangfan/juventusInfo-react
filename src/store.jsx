/**
 * 组装store
 * */
import {createStore,combineReducers,applyMiddleware} from 'redux';
import reducer from "./reducer/Index"
import thunk from 'redux-thunk';

var store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunk)
);

export default store;