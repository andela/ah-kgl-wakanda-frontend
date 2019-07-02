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
import searchFilter from './search';
import rating from './rating';
import bookmarkArticle from './bookmark';
import unBookmarkArticle from './unbookmark';
import viewBookmarkArticles from './viewBookmarked';

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
  viewBookmarkArticles,
  articles,
  searchFilter,
  rating,
  bookmarkArticle,
  unBookmarkArticle,
});

export default reducers;
