import { combineReducers } from 'redux';
import currentUser from './currentUser';
import login from './login';

const reducers = combineReducers({ currentUser, login });

export default reducers;
