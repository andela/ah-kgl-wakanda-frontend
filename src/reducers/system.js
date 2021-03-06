import { NOT_FOUND, SUCCESS_MESSAGE } from '../actionTypes/system';

const initialState = {
  notFound: {
    status: false,
    attribute: 'Page',
  },
  progressBar: 0,
  noInternet: false,
  successMessage: {
    status: false,
    message: '',
  },
};

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const system = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOT_FOUND:
      return {
        ...state,
        ...payload,
      };
    case SUCCESS_MESSAGE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default system;
