import { SUBMIT_LOGIN, ERROR_LOGIN } from '../actionTypes/login';

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const login = (state = { errorMessage: '' }, { type, payload }) => {
  switch (type) {
    case SUBMIT_LOGIN:
      return {
        ...state,
        user: payload,
        errorMessage: null,
      };
    case ERROR_LOGIN:
      return {
        ...state,
        errorMessage: payload,
      };
    default:
      return state;
  }
};

export default login;
