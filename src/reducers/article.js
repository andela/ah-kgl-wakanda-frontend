import {
  PUBLISH_ARTICLE,
  GET_SINGLE_ARTICLE,
  DELETE_SINGLE_ARTICLE,
  LOAD,
  STOP_LOADING,
  DISPLAY_COMMENTS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
} from '../actionTypes/article';

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const article = (state = {}, { type, payload }) => {
  switch (type) {
    case PUBLISH_ARTICLE:
      return {
        ...state,
        ...payload,
      };
    case GET_SINGLE_ARTICLE:
      return {
        ...state,
        ...payload,
      };
    case DELETE_SINGLE_ARTICLE:
      return {};
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case DISPLAY_COMMENTS:
      return {
        ...state,
        comments: payload.comments,
      };
    case LIKE_COMMENT:
      return {
        ...state,
      };
    case UNLIKE_COMMENT:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default article;
