import { SUBMIT_RATING, RATING_ERROR, GET_RATINGS } from '../actionTypes/rating';

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const rating = (state = { errorMessage: '', loading: false }, { type, payload }) => {
  switch (type) {
    case GET_RATINGS:
      return {
        ...state,
        ratings: payload.ratings,
        errorMessage: null,
        loading: false,
      };
    case SUBMIT_RATING:
      return {
        ...state,
        message: payload.message,
        errorMessage: null,
        loading: false,
      };
    case RATING_ERROR:
      return {
        ...state,
        errorMessage: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default rating;
