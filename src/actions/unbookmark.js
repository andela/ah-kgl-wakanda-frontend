import { toast } from 'react-toastify';
import wakanda from '../api/wakanda';
import { UNBOOKMARK_SUCCESS, UNBOOKMARK_STARTED, UNBOOKMARK_ERROR } from '../actionTypes/bookmark';

/**
 * unBookmark action start
 * @returns {object} action
 */
export const unBookmarkStarted = () => ({
  type: UNBOOKMARK_STARTED,
});

/**
 * on unBookmark action success
 * @param {object} data
 * @returns {object} action
 */
export const unBookmarkSuccess = data => ({
  type: UNBOOKMARK_SUCCESS,
  payload: data,
});

/**
 * on unBookmark action error
 * @param {*} error
 * @returns {object} action
 */
export const unBookmarkError = error => ({
  type: UNBOOKMARK_ERROR,
  payload: error,
});

/**
 * action unBookmark on articles
 * @param {string} slug
 * @returns {func} dispatch
 */
export const unBookmark = slug => async dispatch => {
  dispatch(unBookmarkStarted());
  try {
    const res = await wakanda.delete(`/api/articles/${slug}/bookmark`);
    toast.success(res.data.message);
    dispatch(unBookmarkSuccess(res.data.message));

    return res;
  } catch (e) {
    const error = e.response.data
      ? e.response.data.message
      : 'Please check your internet connection';
    toast.error(error);
    dispatch(unBookmarkError(error));
    return e;
  }
};
