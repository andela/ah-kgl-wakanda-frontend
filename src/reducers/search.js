import { SEARCH_ERROR, SEARCH_SUCCESS, SEARCH_STARTED } from '../actionTypes/search';

const searchState = {
  articles: [],
  loading: false,
  error: false,
};

/**
 * search reducer
 * @param {object} state
 * @param {object} action { type, payload }
 * @returns {object} state
 */
const searchFilter = (state = searchState, { type, payload }) => {
  switch (type) {
    case SEARCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        articles: payload,
        loading: false,
        error: false,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default searchFilter;
