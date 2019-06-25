import { NOT_FOUND } from '../actionTypes/system';

const initialState = {
  notFound: {
    status: false,
    attribute: 'Page',
  },
  progressBar: 0,
  noInternet: false,
};

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const login = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOT_FOUND:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default login;
