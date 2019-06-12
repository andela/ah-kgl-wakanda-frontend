import { combineReducers } from 'redux';
import currentUser from './currentUser';
import login from './login';
import signupState from './signupReducer';

const reducers = combineReducers({ currentUser, login, signupState });

export default reducers;
