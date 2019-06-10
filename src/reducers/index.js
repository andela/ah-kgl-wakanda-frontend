import { combineReducers } from 'redux';
import currentUser from './currentUser';
import login from './login';
import signupState from './signupReducer';
import navbar, { profile } from './navbar';
import resetPassword from './resetPassword';
import updatePassword from './updatePassword';

const reducers = combineReducers({
  currentUser,
  login,
  signupState,
  resetPassword,
  updatePassword,
  navbar,
  profile,
});

export default reducers;
