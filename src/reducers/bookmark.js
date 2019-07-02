import { BOOKMARK_ERROR, BOOKMARK_SUCCESS, BOOKMARK_STARTED } from '../actionTypes/bookmark';

const bookmarkState = {
  bookmark: [],
  loading: false,
  error: false,
};

/**
 * bookmark reducer
 * @param {object} state
 * @param {object} action { type, payload }
 * @returns {object} state
 */
const bookmarkArticle = (state = bookmarkState, { type, payload }) => {
  switch (type) {
    case BOOKMARK_STARTED:
      return {
        ...state,
        loading: true,
      };
    case BOOKMARK_SUCCESS:
      return {
        ...state,
        bookmark: payload,
        loading: false,
        error: false,
      };
    case BOOKMARK_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default bookmarkArticle;
