import { combineReducers } from 'redux';
import currentUser from './currentUser';
import signupState from './signupReducer';

const reducers = combineReducers({ currentUser, signupState });

export default reducers;
