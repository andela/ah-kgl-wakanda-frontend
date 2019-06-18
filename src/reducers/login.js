import { SUBMIT_LOGIN, ERROR_LOGIN } from '../actionTypes/login';

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const login = (state = { errorMessage: '', loading: false }, { type, payload }) => {
  switch (type) {
    case SUBMIT_LOGIN:
      return {
        ...state,
        user: payload,
        errorMessage: null,
        loading: false,
      };
    case ERROR_LOGIN:
      return {
        ...state,
        errorMessage: payload,
        loading: false,
      };
    case 'LOADING_LOGIN':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default login;
