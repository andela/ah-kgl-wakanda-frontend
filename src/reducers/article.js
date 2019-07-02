import { PUBLISH_ARTICLE, GET_SINGLE_ARTICLE, DELETE_SINGLE_ARTICLE } from '../actionTypes/article';

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
    default:
      return state;
  }
};

export default article;
