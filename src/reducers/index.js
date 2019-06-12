import { combineReducers } from 'redux';
import name from './name';
import login from './login';

const reducers = combineReducers({ name, login });

export default reducers;
