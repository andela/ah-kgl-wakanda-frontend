import wakanda from '../api/wakanda';
import { SEARCH_SUCCESS, SEARCH_STARTED, SEARCH_ERROR } from '../actionTypes/search';

/**
 * search action start
 * @returns {object} action
 */
export const searchStarted = () => ({
  type: SEARCH_STARTED,
});

/**
 * on search action success
 * @param {object} data
 * @returns {object} action
 */
export const searchSuccess = data => ({
  type: SEARCH_SUCCESS,
  payload: data,
});

/**
 * on search action error
 * @param {*} error
 * @returns {object} action
 */
export const searchError = error => ({
  type: SEARCH_ERROR,
  payload: error,
});

/**
 * action search filter on articles
 * @param {string} url
 * @returns {func} dispatch
 */
export const search = url => async dispatch => {
  dispatch(searchStarted());
  try {
    const res = await wakanda.get(url);
    dispatch(searchSuccess(res.data.data.articles));
    return res;
  } catch (e) {
    const error = e.response ? e.response.message : 'Please check your internet connection';
    dispatch(searchError(error));
    return e;
  }
};
