const initialState = {
  emailSent: false,
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
const resetPassword = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'RESET_PASSWORD_SEND':
      return {
        ...state,
        error: false,
        loading: true,
        message: '',
      };
    case 'RESET_PASSWORD':
      return {
        ...state,
        emailSent: true,
        error: false,
        loading: false,
        message: '',
      };
    case 'RESET_PASSWORD_ERROR':
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

export default resetPassword;
