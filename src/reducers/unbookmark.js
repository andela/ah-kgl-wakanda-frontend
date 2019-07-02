import { UNBOOKMARK_ERROR, UNBOOKMARK_SUCCESS, UNBOOKMARK_STARTED } from '../actionTypes/bookmark';

const unBookmarkState = {
  bookmark: [],
  loading: false,
  error: false,
};

/**
 * unbookmark reducer
 * @param {object} state
 * @param {object} action { type, payload }
 * @returns {object} state
 */
const unBookmarkArticle = (state = unBookmarkState, { type, payload }) => {
  switch (type) {
    case UNBOOKMARK_STARTED:
      return {
        ...state,
        loading: true,
      };
    case UNBOOKMARK_SUCCESS:
      return {
        ...state,
        bookmark: payload,
        loading: false,
        error: false,
      };
    case UNBOOKMARK_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default unBookmarkArticle;
