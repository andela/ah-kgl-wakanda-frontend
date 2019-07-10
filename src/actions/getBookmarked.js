import wakanda from '../api/wakanda';
import {
  VIEW_BOOKMARKED_SUCCESS,
  VIEW_BOOKMARKED_STARTED,
  VIEW_BOOKMARKED_ERROR,
} from '../actionTypes/viewBookmarked';

/**
 * view bookmarked article action start
 * @returns {object} action
 */
export const viewBookmarkedStarted = () => ({
  type: VIEW_BOOKMARKED_STARTED,
});

/**
 * on view bookmarked action success
 * @param {array} payload
 * @returns {object} action
 */
export const viewBookmarkedSuccess = payload => ({
  type: VIEW_BOOKMARKED_SUCCESS,
  payload,
});

/**
 * on view bookmarked action error
 * @param {*} error
 * @returns {object} action
 */
export const viewBookmarkedError = error => ({
  type: VIEW_BOOKMARKED_ERROR,
  payload: error,
});

/**
 * action view bookmarked articles
 * @returns {func} dispatch
 */
export const viewBookmarked = () => async dispatch => {
  dispatch(viewBookmarkedStarted());
  try {
    const res = await wakanda.get('/api/articles/bookmark');
    let { articles } = res.data;
    articles = articles.filter(({ Article }) => Article);
    dispatch(viewBookmarkedSuccess(articles));
    return res;
  } catch (e) {
    const error = e.response ? e.response.data.message : 'Please check your internet connection';
    dispatch(viewBookmarkedError(error));
    return e;
  }
};
