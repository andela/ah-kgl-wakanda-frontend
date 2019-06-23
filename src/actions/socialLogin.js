import wakanda from '../api/wakanda';
import { SUBMIT_LOGIN, ERROR_LOGIN } from '../actionTypes/login';
import { SIGNUP_SUCCESS } from '../actionTypes/signupTypes';
/**
 * @returns {*} dispatch
 * @param {string} accessToken
 * @param {string} provider
 */
export const socialLogin = (accessToken, provider) => async dispatch => {
  try {
    const result = await wakanda.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/${provider}`, {
      access_token: accessToken,
    });
    const { user } = result.data;
    dispatch({
      type: SUBMIT_LOGIN,
      payload: user,
    });
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: user,
    });
  } catch (error) {
    const message = error.response ? error.response.data.message : 'No internet access';
    dispatch({
      type: ERROR_LOGIN,
      payload: message,
    });
  }
};

/**
 * @returns {*} dispatch
 * @param {string} token
 * @param {string} username
 */
export const loginWithTwitter = (token, username) => dispatch => {
  const user = {
    token,
    username,
  };
  dispatch({
    type: SUBMIT_LOGIN,
    payload: user,
  });
};
