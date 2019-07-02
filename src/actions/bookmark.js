import { toast } from 'react-toastify';
import wakanda from '../api/wakanda';
import { BOOKMARK_SUCCESS, BOOKMARK_STARTED, BOOKMARK_ERROR } from '../actionTypes/bookmark';

/**
 * bookmark action start
 * @returns {object} action
 */
export const bookmarkStarted = () => ({
  type: BOOKMARK_STARTED,
});

/**
 * on bookmark action success
 * @param {object} data
 * @returns {object} action
 */
export const bookmarkSuccess = data => ({
  type: BOOKMARK_SUCCESS,
  payload: data,
});

/**
 * on bookmark action error
 * @param {*} error
 * @returns {object} action
 */
export const bookmarkError = error => ({
  type: BOOKMARK_ERROR,
  payload: error,
});

/**
 * action bookmark on articles
 * @param {string} slug
 * @returns {func} dispatch
 */
export const bookmark = slug => async dispatch => {
  dispatch(bookmarkStarted());
  try {
    const res = await wakanda.post(`/api/articles/${slug}/bookmark`);
    dispatch(bookmarkSuccess(res.data.message));
    toast.success(res.data.message);

    return res;
  } catch (e) {
    const error = e.response.data
      ? e.response.data.message
      : 'Please check your internet connection';
    dispatch(bookmarkError(error));
    toast.error(error);
    return e;
  }
};
