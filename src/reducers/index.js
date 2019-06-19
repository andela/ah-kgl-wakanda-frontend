import { combineReducers } from 'redux';
import currentUser from './currentUser';
import login from './login';
import signupState from './signupReducer';
import navbar from './navbar';
import resetPassword from './resetPassword';
import updatePassword from './updatePassword';
import article from './article';
import system from './system';
import profile from './profileReducers';
import articles from './fetchArticles';

const reducers = combineReducers({
  currentUser,
  login,
  signupState,
  resetPassword,
  updatePassword,
  navbar,
  profile,
  article,
  system,
  articles,
});

export default reducers;
