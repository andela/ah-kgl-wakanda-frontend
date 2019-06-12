import { SIGNUP_ERROR, SIGNUP_SUCCESS, SIGNUP_STARTED } from '../actionTypes/signupTypes';

const signupState = {
  user: null,
  loading: false,
  error: false,
};

/**
 * Signup reducer
 * @param {*} [state=auth]
 * @param {*} { type, payload }
 * @returns {object} updated state
 */
const signupReducer = (state = signupState, { type, payload }) => {
  switch (type) {
    case SIGNUP_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        error: false,
        loggedIn: true,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default signupReducer;
