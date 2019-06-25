import { PUBLISH_ARTICLE, GET_SINGLE_ARTICLE } from '../actionTypes/article';

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const login = (state = {}, { type, payload }) => {
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
    default:
      return state;
  }
};

export default login;
