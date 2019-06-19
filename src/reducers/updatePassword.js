import { UPDATE_PASSWORD, UPDATE_PASSWORD_SEND, UPDATE_PASSWORD_ERROR } from '../actionTypes/index';

const initialState = {
  updated: false,
  error: false,
  loading: false,
  message: '',
};

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const updatePassword = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PASSWORD_SEND:
      return {
        ...state,
        error: false,
        loading: true,
        message: '',
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        updated: true,
        loading: false,
        error: false,
        message: '',
      };
    case UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: payload.message,
      };
    default:
      return state;
  }
};

export default updatePassword;
