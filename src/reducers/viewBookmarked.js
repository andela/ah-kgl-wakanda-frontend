import {
  VIEW_BOOKMARKED_ERROR,
  VIEW_BOOKMARKED_SUCCESS,
  VIEW_BOOKMARKED_STARTED,
} from '../actionTypes/viewBookmarked';

const viewBookmarkState = {
  bookmarkArticles: [],
  loading: false,
  error: false,
};

/**
 * view bookmarked reducer
 * @param {object} state
 * @param {object} action { type, payload }
 * @returns {object} state
 */
const viewBookmarkArticles = (state = viewBookmarkState, { type, payload }) => {
  switch (type) {
    case VIEW_BOOKMARKED_STARTED:
      return {
        ...state,
        loading: true,
      };
    case VIEW_BOOKMARKED_SUCCESS:
      return {
        ...state,
        bookmarkArticles: payload,
        loading: false,
        error: false,
      };
    case VIEW_BOOKMARKED_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default viewBookmarkArticles;
